"use client"

import { useState, useEffect } from "react"
import { Typography, Table, Button, Select, Card, Modal, Spin, message } from "antd" // Thêm Spin, message
import { LeftOutlined, CheckOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import "./TeacherAttendance.css"

const { Title, Text } = Typography
const { Option } = Select

const TeacherAttendance = () => {
  const navigate = useNavigate()
  const [attendanceData, setAttendanceData] = useState([]) // Danh sách học sinh và trạng thái điểm danh
  const [attendanceStatuses, setAttendanceStatuses] = useState([]) // Các trạng thái điểm danh từ API
  const [classInfo, setClassInfo] = useState(null) // Thông tin lớp học cho sidebar
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false) // Trạng thái khi đang submit
  const [error, setError] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Helper để format thời gian (HH:MM:SS -> HH:MM)
  const formatTime = (timeString) => {
    if (!timeString) return ""
    return timeString.substring(0, 5) // Get HH:MM
  }

  useEffect(() => {
    const fetchAttendanceData = async () => {
      setLoading(true)
      setError(null)
      try {
        const classSessionId = localStorage.getItem("attendanceSessionId")
        if (!classSessionId) {
          throw new Error("Không tìm thấy ID buổi học. Vui lòng trở về và chọn lại.")
        }

        // 1. Fetch ClassSession details (for classInfo sidebar)
        const allClassSessionsRes = await fetch(
          "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/ClassSession",
        )
        if (!allClassSessionsRes.ok) throw new Error("Failed to fetch class sessions.")
        const allClassSessions = await allClassSessionsRes.json()
        const currentSession = allClassSessions.find(
          (session) => session.classSessionId === parseInt(classSessionId),
        )

        if (currentSession) {
          setClassInfo({
            code: currentSession.classCode,
            period: `Buổi: ${currentSession.sessionNumber} (${currentSession.dayOfWeekName}, ${new Date(currentSession.dateOfDay).toLocaleDateString('vi-VN')})`,
            level: `Môn: ${currentSession.instrumentName}`,
            time: `Giờ học: ${formatTime(currentSession.startTime)}-${formatTime(currentSession.endTime)}`,
          })
        } else {
          throw new Error("Không tìm thấy thông tin buổi học.")
        }

        // 2. Fetch attendance statuses
        const statusRes = await fetch(
          "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/AttendanceStatus",
        )
        if (!statusRes.ok) throw new Error("Failed to fetch attendance statuses.")
        const statuses = await statusRes.json()
        setAttendanceStatuses(statuses)

        // 3. Fetch users in the class session
        const usersRes = await fetch(
          `https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/ClassSession/${classSessionId}/users`,
        )
        if (!usersRes.ok) throw new Error("Failed to fetch class users.")
        const users = await usersRes.json()

        // Filter out non-student users (roleId 3 is Student)
        const students = users.filter((user) => user.role?.roleId === 3)

        // Initialize attendance data with default 'Unmarked' status (statusId: 0)
        const initialAttendance = students.map((student, index) => ({
          key: student.userId, // Dùng userId làm key
          stt: index + 1,
          userId: student.userId, // Lưu userId để gửi lên API
          name: student.accountName || student.username,
          status: 0, // Mặc định là Unmarked
          note: "none", // Mặc định là 'none'
        }))
        setAttendanceData(initialAttendance)
      } catch (err) {
        console.error("Error fetching attendance data:", err)
        setError("Không thể tải dữ liệu điểm danh: " + err.message)
        message.error("Lỗi: " + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAttendanceData()
  }, []) // Chỉ chạy một lần khi component mount

  const handleStatusChange = (value, userId) => {
    setAttendanceData((prev) =>
      prev.map((student) => (student.userId === userId ? { ...student, status: value } : student)),
    )
  }

  const handleConfirm = async () => {
    setSubmitting(true)
    setError(null)
    try {
      const classSessionId = localStorage.getItem("attendanceSessionId")
      if (!classSessionId) {
        throw new Error("Không tìm thấy ID buổi học để gửi điểm danh.")
      }

      const payload = {
        classSessionId: parseInt(classSessionId),
        attendances: attendanceData.map((student) => ({
          userId: student.userId,
          status: student.status,
          note: student.note || "none", // Đảm bảo có note
        })),
      }

      const response = await fetch(
        "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Attendance/bulk",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      )

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Lỗi khi gửi điểm danh: ${response.status} - ${errorText}`);
      }

      setShowSuccessModal(true)
    } catch (err) {
      console.error("Error submitting attendance:", err)
      setError("Gửi điểm danh thất bại: " + err.message)
      message.error("Lỗi: " + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleSuccessModalOk = () => {
    setShowSuccessModal(false)
    navigate("/teacher/class-detail") // Quay về trang chi tiết lớp sau khi điểm danh xong
  }

  const handleBack = () => {
    navigate("/teacher/class-detail") // Quay về trang chi tiết lớp
  }

  const getStatusColor = (statusId) => {
    switch (statusId) {
      case 1: // Present
        return "#52c41a" // Green
      case 2: // Absent
        return "#ff4d4f" // Red
      case 0: // Unmarked
      default:
        return "#d9d9d9" // Gray
    }
  }

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

  if (loading) {
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
            <Spin size="large" tip="Đang tải danh sách học sinh..." />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
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
            <Text type="danger">{error}</Text>
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
          <Button type="text" icon={<LeftOutlined />} onClick={handleBack} className="back-button">
            Trở về
          </Button>
          <Title level={1} className="page-title">
            ĐIỂM DANH
          </Title>
        </div>

        <div className="content-layout">
          {/* Main Table */}
          <div className="table-section">
            <Table
              columns={columns}
              dataSource={attendanceData}
              pagination={false}
              className="attendance-table"
              size="middle"
            />
          </div>

          {/* Class Info and Confirm Section */}
          <div className="sidebar-section">
            <Card className="class-info-card">
              <div className="class-header">
                <Text className="class-code">{classInfo?.code || "N/A"}</Text>
              </div>
              <div className="class-details">
                <div className="class-detail-item">
                  <Text className="detail-text">{classInfo?.period || "N/A"}</Text>
                </div>
                <div className="class-detail-item">
                  <Text className="detail-text">{classInfo?.level || "N/A"}</Text>
                </div>
                <div className="class-detail-item">
                  <Text className="detail-text">{classInfo?.time || "N/A"}</Text>
                </div>
              </div>
            </Card>

            <Button
              type="primary"
              className="confirm-button"
              onClick={handleConfirm}
              block
              loading={submitting}
              disabled={submitting}
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

export default TeacherAttendance