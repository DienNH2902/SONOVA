"use client"

import { useState, useEffect } from "react"
import { Typography, Table, Button, Select, Card, Modal, Spin, message } from "antd"
import { LeftOutlined, CheckOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import "./AdminTeacherAttendance.css"

const { Title, Text } = Typography
const { Option } = Select

const AdminTeacherAttendance = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate()

  const [attendanceData, setAttendanceData] = useState([]) 
  const [attendanceStatuses, setAttendanceStatuses] = useState([]) 
  const [todayClassSessions, setTodayClassSessions] = useState([]) 
  const [selectedClassSessionId, setSelectedClassSessionId] = useState(null) 
  const [selectedClassSession, setSelectedClassSession] = useState(null) 

  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [error, setError] = useState(null)

  const getTodayDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, "0")
    const day = today.getDate().toString().padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const formatTime = (timeString) => {
    if (!timeString) return ""
    return timeString.substring(0, 5) 
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true)
      setError(null)
      try {
        const statusRes = await fetch(
          "https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/AttendanceStatus",
        )
        if (!statusRes.ok) throw new Error("Failed to fetch attendance statuses.")
        const statuses = await statusRes.json()
        setAttendanceStatuses(statuses)

        const classSessionRes = await fetch(
          "https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/ClassSession",
        )
        if (!classSessionRes.ok) throw new Error("Failed to fetch class sessions.")
        const allClassSessions = await classSessionRes.json()

        const today = getTodayDate()
        const filteredSessions = allClassSessions.filter(
          (session) => session.dateOfDay === today,
        )
        setTodayClassSessions(filteredSessions)

        if (filteredSessions.length > 0) {
          const firstSession = filteredSessions[0]
          setSelectedClassSessionId(firstSession.classSessionId)
          setSelectedClassSession(firstSession)
          await fetchTeachersAndSetAttendance(firstSession.classSessionId, statuses)
        } else {
          setAttendanceData([]) 
        }
      } catch (err) {
        console.error("Error fetching initial data:", err)
        setError("Không thể tải dữ liệu: " + err.message)
        message.error("Lỗi: " + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
  }, []) 

  const fetchTeachersAndSetAttendance = async (classSessionId, statuses) => {
    setLoading(true) 
    setError(null)
    try {
      const usersRes = await fetch(
        `https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/ClassSession/${classSessionId}/users`,
      )
      if (!usersRes.ok) throw new Error("Failed to fetch users for class session.")
      const users = await usersRes.json()

      const teachers = users.filter((user) => user.role?.roleName === "Teacher")

      const existingAttendanceRes = await fetch(
        "https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/Attendance"
      )
      if (!existingAttendanceRes.ok) throw new Error("Failed to fetch existing attendance records.")
      const allExistingAttendances = await existingAttendanceRes.json()

      const sessionExistingTeacherAttendances = allExistingAttendances.filter(
        (attendance) => 
          attendance.classSessionId === parseInt(classSessionId) &&
          teachers.some(teacher => teacher.userId === attendance.userId) 
      )

      const unmarkedStatus = statuses.find((s) => s.statusName === "Unmarked")?.statusId || 0
      const initialAttendance = teachers.map((teacher, index) => {
        const existingRecord = sessionExistingTeacherAttendances.find(
          (record) => record.userId === teacher.userId
        )
        return {
          key: teacher.userId, 
          stt: index + 1,
          name: teacher.accountName || teacher.username || "N/A", 
          userId: teacher.userId,
          status: existingRecord ? existingRecord.statusId : unmarkedStatus, 
          note: existingRecord ? existingRecord.note : "none", 
        }
      })
      setAttendanceData(initialAttendance)
    } catch (err) {
      console.error("Error fetching teachers or attendance:", err)
      setError("Không thể tải danh sách giáo viên: " + err.message)
      message.error("Lỗi: " + err.message)
    } finally {
      setLoading(false) 
    }
  }

  const handleClassSessionChange = async (value) => {
    const session = todayClassSessions.find((s) => s.classSessionId === value)
    setSelectedClassSessionId(value)
    setSelectedClassSession(session)
    if (session) {
      await fetchTeachersAndSetAttendance(value, attendanceStatuses)
    } else {
      setAttendanceData([])
    }
  }

  const handleStatusChange = (value, userId) => {
    setAttendanceData((prev) =>
      prev.map((teacher) => (teacher.userId === userId ? { ...teacher, status: value } : teacher)),
    )
  }

  const handleConfirm = async () => {
    setIsSubmitting(true)
    setError(null)

    if (!selectedClassSessionId) {
      message.error("Vui lòng chọn một buổi học để điểm danh.")
      setIsSubmitting(false)
      return
    }

    const attendancePayload = {
      classSessionId: selectedClassSessionId,
      attendances: attendanceData.map((teacher) => ({
        userId: teacher.userId,
        status: teacher.status,
        note: teacher.note || "none",
      })),
    }

    try {
      const response = await fetch(
        "https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/Attendance/bulk",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attendancePayload),
        },
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to submit attendance.")
      }

      setShowSuccessModal(true)
    } catch (err) {
      console.error("Error submitting attendance:", err)
      setError("Điểm danh thất bại: " + err.message)
      message.error("Điểm danh thất bại: " + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSuccessModalOk = () => {
    setShowSuccessModal(false)
    if (selectedClassSessionId && attendanceStatuses.length > 0) {
      fetchTeachersAndSetAttendance(selectedClassSessionId, attendanceStatuses);
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  const getStatusColor = (statusId) => {
    const statusName = attendanceStatuses.find((s) => s.statusId === statusId)?.statusName
    switch (statusName) {
      case "Present":
        return "#52c41a" 
      case "Absent":
        return "#ff4d4f" 
      case "Unmarked":
      default:
        return "#d9d9d9"
    }
  }

  // Lọc bỏ trạng thái "Unmarked" khỏi danh sách lựa chọn
  const selectableStatuses = attendanceStatuses.filter(
    (status) => status.statusName !== "Unmarked"
  );

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 80,
      align: "center",
      className: "stt-column",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      className: "name-column",
    },
    {
      title: "Điểm danh",
      key: "attendance",
      width: 200,
      align: "center",
      render: (_, record) => (
        <Select
          placeholder="Trạng thái"
          value={record.status}
          onChange={(value) => handleStatusChange(value, record.userId)}
          className="status-select"
          style={{
            width: "100%",
            borderColor: getStatusColor(record.status),
          }}
          disabled={loading || isSubmitting}
        >
          {selectableStatuses.map((status) => (
            <Option key={status.statusId} value={status.statusId}>
              <span style={{ color: getStatusColor(status.statusId), fontWeight: "500" }}>
                {status.statusName === "Present" && "Hiện diện"}
                {status.statusName === "Absent" && "Vắng"}
              </span>
            </Option>
          ))}
        </Select>
      ),
      className: "attendance-column",
    },
  ]

  if (loading && !selectedClassSessionId) {
    return (
      <div className="student-attendance-page">
        <div className="student-attendance-container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <Spin size="large" tip="Đang tải dữ liệu..." />
          </div>
        </div>
      </div>
    )
  }

  if (todayClassSessions.length === 0) {
    return (
      <div className="student-attendance-page">
        <div className="student-attendance-container">
          <div className="page-header">
            <Title level={1} className="page-title-attendance">
              ĐIỂM DANH
            </Title>
          </div>
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            <Text type="secondary">Không có buổi học nào hôm nay để điểm danh.</Text>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="student-attendance-page">
      <div className="student-attendance-container">
        <div className="page-header">
          <Title level={1} className="page-title-attendance">
            ĐIỂM DANH
          </Title>
        </div>

        <div className="content-layout">
          <div className="table-section-attendance">
            <div className="class-session-selector">
              <Text className="choose-class" strong>Chọn buổi học hôm nay để điểm danh:</Text>
              <Select
                value={selectedClassSessionId}
                onChange={handleClassSessionChange}
                style={{ width: "100%", marginTop: "10px", marginBottom: "20px" }}
                disabled={loading || isSubmitting}
              >
                {todayClassSessions.map((session) => (
                  <Option key={session.classSessionId} value={session.classSessionId}>
                    {`${session.classCode} - Buổi ${session.sessionNumber} - ${formatTime(session.startTime)}-${formatTime(session.endTime)} - Phòng ${session.roomCode}`}
                  </Option>
                ))}
              </Select>
            </div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '50px 0' }}>
                <Spin tip="Đang tải danh sách giáo viên..." />
              </div>
            ) : attendanceData.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px 0' }}>
                    <Text type="secondary">Không có giáo viên nào trong buổi học này.</Text>
                </div>
            ) : (
              <Table
                columns={columns}
                dataSource={attendanceData}
                pagination={false}
                className="attendance-table"
                size="middle"
              />
            )}
          </div>

          <div className="sidebar-section">
            <Card className="class-info-card">
              <div className="class-header">
                <Text className="class-code-attendance">{selectedClassSession?.classCode || "N/A"}</Text>
              </div>
              <div className="class-details">
                <div className="class-detail-item">
                  <Text className="detail-text-attendance">
                    Buổi: {selectedClassSession?.sessionNumber || "N/A"}
                  </Text>
                </div>
                <div className="class-detail-item">
                  <Text className="detail-text-attendance">
                    Thời gian: {formatTime(selectedClassSession?.startTime)} -{" "}
                    {formatTime(selectedClassSession?.endTime)}
                  </Text>
                </div>
                <div className="class-detail-item">
                  <Text className="detail-text-attendance">
                    Phòng: {selectedClassSession?.roomCode || "N/A"}
                  </Text>
                </div>
                <div className="class-detail-item">
                  <Text className="detail-text-attendance">
                    Môn: {selectedClassSession?.instrumentName || "N/A"}
                  </Text>
                </div>
              </div>
            </Card>

            <Button
              type="primary"
              className="confirm-button-attendance"
              onClick={handleConfirm}
              block
              loading={isSubmitting}
              disabled={!selectedClassSessionId || attendanceData.length === 0}
            >
              Xác nhận
            </Button>
          </div>
        </div>

        <Modal
          open={showSuccessModal}
          onOk={handleSuccessModalOk}
          onCancel={handleSuccessModalOk}
          className="success-modal"
          centered
          footer={[
            <Button key="ok" type="primary" onClick={handleSuccessModalOk} className="modal-confirm-btn-attendance">
              Xác nhận
            </Button>,
          ]}
          closeIcon={null}
          maskClosable={false}
        >
          <div className="success-content">
            <div className="success-icon">
              <CheckOutlined />
            </div>
            <Title level={3} className="success-title">
              ĐIỂM DANH THÀNH CÔNG
            </Title>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default AdminTeacherAttendance
