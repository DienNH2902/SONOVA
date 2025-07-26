"use client"

import { useState, useEffect } from "react"
import { Typography, Table, Button, Select, Card, Modal, Spin, message } from "antd"
import { LeftOutlined, CheckOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import "./AdminTeacherAttendance.css" // Đảm bảo CSS file này tồn tại và được cấu hình đúng

const { Title, Text } = Typography
const { Option } = Select

const AdminTeacherAttendance = () => {
  const navigate = useNavigate()

  const [attendanceData, setAttendanceData] = useState([]) // Danh sách giáo viên và trạng thái điểm danh
  const [attendanceStatuses, setAttendanceStatuses] = useState([]) // Các trạng thái điểm danh từ API
  const [todayClassSessions, setTodayClassSessions] = useState([]) // Các classSession trong ngày hiện tại
  const [selectedClassSessionId, setSelectedClassSessionId] = useState(null) // classSessionId được chọn để điểm danh
  const [selectedClassSession, setSelectedClassSession] = useState(null) // Thông tin chi tiết của classSession được chọn

  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [error, setError] = useState(null)

  // Helper để lấy ngày hôm nay ở định dạng YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, "0")
    const day = today.getDate().toString().padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // Helper để format thời gian (HH:MM:SS -> HH:MM)
  const formatTime = (timeString) => {
    if (!timeString) return ""
    return timeString.substring(0, 5) // Get HH:MM
  }

  // --- Fetch Data ---
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true)
      setError(null)
      try {
        // 1. Fetch Attendance Statuses
        const statusRes = await fetch(
          "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/AttendanceStatus",
        )
        if (!statusRes.ok) throw new Error("Failed to fetch attendance statuses.")
        const statuses = await statusRes.json()
        setAttendanceStatuses(statuses)

        // 2. Fetch Class Sessions
        const classSessionRes = await fetch(
          "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/ClassSession",
        )
        if (!classSessionRes.ok) throw new Error("Failed to fetch class sessions.")
        const allClassSessions = await classSessionRes.json()

        const today = getTodayDate()
        // Lọc các classSession diễn ra trong ngày hôm nay
        const filteredSessions = allClassSessions.filter(
          (session) => session.dateOfDay === today,
        )
        setTodayClassSessions(filteredSessions)

        // Nếu có classSession trong ngày, chọn cái đầu tiên và fetch giáo viên
        if (filteredSessions.length > 0) {
          const firstSession = filteredSessions[0]
          setSelectedClassSessionId(firstSession.classSessionId)
          setSelectedClassSession(firstSession)
          await fetchTeachersAndSetAttendance(firstSession.classSessionId, statuses)
        } else {
          setAttendanceData([]) // Không có buổi học nào hôm nay, set rỗng
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
  }, []) // Chạy 1 lần khi component mount

  // Hàm fetch danh sách giáo viên và set trạng thái điểm danh
  const fetchTeachersAndSetAttendance = async (classSessionId, statuses) => {
    setLoading(true)
    setError(null)
    try {
      const usersRes = await fetch(
        `https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/ClassSession/${classSessionId}/users`,
      )
      if (!usersRes.ok) throw new Error("Failed to fetch users for class session.")
      const users = await usersRes.json()

      // Lọc ra chỉ giáo viên
      const teachers = users.filter((user) => user.role?.roleName === "Teacher")

      // Gán trạng thái mặc định "Unmarked" cho giáo viên
      const unmarkedStatus = statuses.find((s) => s.statusName === "Unmarked")?.statusId || 0
      const initialAttendance = teachers.map((teacher, index) => ({
        key: teacher.userId, // Dùng userId làm key
        stt: index + 1,
        name: teacher.accountName || teacher.username || "N/A", // Ưu tiên accountName
        userId: teacher.userId,
        status: unmarkedStatus, // Mặc định là Unmarked (statusId: 0)
        note: "none", // Mặc định note
      }))
      setAttendanceData(initialAttendance)
    } catch (err) {
      console.error("Error fetching teachers:", err)
      setError("Không thể tải danh sách giáo viên: " + err.message)
      message.error("Lỗi: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  // --- Handlers ---
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
        note: teacher.note || "none", // Đảm bảo có note, mặc định là "none"
      })),
    }

    try {
      const response = await fetch(
        "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Attendance/bulk",
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
    navigate("/admin/teacher-attendance") // Điều hướng về trang chi tiết lớp học sau khi điểm danh thành công
  }

  const handleBack = () => {
    navigate("/admin/teacher-attendance")
  }

  const getStatusColor = (statusId) => {
    const statusName = attendanceStatuses.find((s) => s.statusId === statusId)?.statusName
    switch (statusName) {
      case "Present":
        return "#52c41a" // Green
      case "Absent":
        return "#ff4d4f" // Red
      case "Unmarked":
      default:
        return "#d9d9d9" // Gray
    }
  }

  // Định nghĩa cột cho Table
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
          disabled={loading || isSubmitting} // Disable khi đang tải hoặc gửi
        >
          {attendanceStatuses.map((status) => (
            <Option key={status.statusId} value={status.statusId}>
              <span style={{ color: getStatusColor(status.statusId), fontWeight: "500" }}>
                {status.statusName === "Present" && "Hiện diện"}
                {status.statusName === "Absent" && "Vắng"}
                {status.statusName === "Unmarked" && "Chưa điểm danh"}
              </span>
            </Option>
          ))}
        </Select>
      ),
      className: "attendance-column",
    },
  ]

  // Hiển thị loading spinner toàn màn hình nếu đang tải
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

  // Nếu không có buổi học nào trong ngày hôm nay
  if (todayClassSessions.length === 0) {
    return (
      <div className="student-attendance-page">
        <div className="student-attendance-container">
          <div className="page-header">
            <Button type="text" icon={<LeftOutlined />} onClick={handleBack} className="back-button">
              Trở về
            </Button>
            <Title level={1} className="page-title">
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
        {/* Header */}
        <div className="page-header">
          {/* <Button type="text" icon={<LeftOutlined />} onClick={handleBack} className="back-button">
            Trở về
          </Button> */}
          <Title level={1} className="page-title">
            ĐIỂM DANH
          </Title>
        </div>

        <div className="content-layout">
          {/* Main Table */}
          <div className="table-section">
            <div className="class-session-selector">
              <Text strong>Chọn buổi học hôm nay:</Text>
              <Select
                value={selectedClassSessionId}
                onChange={handleClassSessionChange}
                style={{ width: "100%", marginTop: "10px" }}
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

          {/* Class Info and Confirm Section */}
          <div className="sidebar-section">
            <Card className="class-info-card">
              <div className="class-header">
                <Text className="class-code">{selectedClassSession?.classCode || "N/A"}</Text>
              </div>
              <div className="class-details">
                <div className="class-detail-item">
                  <Text className="detail-text">
                    Buổi: {selectedClassSession?.sessionNumber || "N/A"}
                  </Text>
                </div>
                <div className="class-detail-item">
                  <Text className="detail-text">
                    Thời gian: {formatTime(selectedClassSession?.startTime)} -{" "}
                    {formatTime(selectedClassSession?.endTime)}
                  </Text>
                </div>
                <div className="class-detail-item">
                  <Text className="detail-text">
                    Phòng: {selectedClassSession?.roomCode || "N/A"}
                  </Text>
                </div>
                <div className="class-detail-item">
                  <Text className="detail-text">
                    Môn: {selectedClassSession?.instrumentName || "N/A"}
                  </Text>
                </div>
              </div>
            </Card>

            <Button
              type="primary"
              className="confirm-button"
              onClick={handleConfirm}
              block
              loading={isSubmitting}
              disabled={!selectedClassSessionId || attendanceData.length === 0}
            >
              Xác nhận
            </Button>
          </div>
        </div>

        {/* Success Modal */}
        <Modal
          open={showSuccessModal}
          onOk={handleSuccessModalOk}
          onCancel={handleSuccessModalOk}
          className="success-modal"
          centered
          footer={[
            <Button key="ok" type="primary" onClick={handleSuccessModalOk} className="modal-confirm-btn">
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