"use client"

import { useState, useEffect } from "react"
import { Typography, Table, Button, Tag, Card, Spin, message } from "antd"
import { LeftOutlined, ArrowRightOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom" // Bỏ useParams

import "./TeacherClassDetail.css"

const { Title, Text } = Typography

const TeacherClassDetail = () => {
  const navigate = useNavigate()
  const [classSessions, setClassSessions] = useState([]) // Tất cả các buổi học của cùng một lớp
  const [classInfo, setClassInfo] = useState(null) // Thông tin chi tiết của lớp học
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Helper để lấy ngày hôm nay ở định dạng YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, "0")
    const day = today.getDate().toString().padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // Helper để format ngày từ "YYYY-MM-DD" sang "DD/MM/YYYY"
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const [year, month, day] = dateString.split("-")
    return `${day}/${month}/${year}`
  }

  // Helper để format thời gian (HH:MM:SS -> HH:MM)
  const formatTime = (timeString) => {
    if (!timeString) return ""
    return timeString.substring(0, 5) // Get HH:MM
  }

  useEffect(() => {
    const fetchClassDetails = async () => {
      setLoading(true)
      setError(null)
      try {
        // Lấy classSessionId từ localStorage
        const initialClassSessionId = localStorage.getItem("selectedClassSessionId")
        if (!initialClassSessionId) {
          throw new Error("Không tìm thấy ID buổi học trong localStorage. Vui lòng chọn lại lớp.")
        }

        // 1. Lấy tất cả ClassSession để tìm thông tin lớp học và các buổi khác
        const allSessionsRes = await fetch(
          "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/ClassSession",
        )
        if (!allSessionsRes.ok)
          throw new Error("Failed to fetch class sessions.")
        const allSessions = await allSessionsRes.json()

        const foundInitialSession = allSessions.find(
          (session) => session.classSessionId === parseInt(initialClassSessionId),
        )

        if (!foundInitialSession) {
          throw new Error("Không tìm thấy buổi học này trong danh sách.")
        }

        // Set thông tin lớp học cho sidebar
        setClassInfo({
          code: foundInitialSession.classCode,
          instrumentName: foundInitialSession.instrumentName,
          period: "N/A", // API hiện không trả về trực tiếp, có thể tính toán nếu cần
          level: "N/A", // API hiện không trả về trực tiếp
          time: `Giờ học: ${formatTime(foundInitialSession.startTime)}-${formatTime(foundInitialSession.endTime)}`,
        })

        // 2. Lọc tất cả classSession có cùng classId
        const sessionsOfThisClass = allSessions.filter(
          (session) => session.classId === foundInitialSession.classId,
        )

        // Sắp xếp theo sessionNumber hoặc ngày để hiển thị thứ tự hợp lý
        sessionsOfThisClass.sort((a, b) => a.sessionNumber - b.sessionNumber);


        // 3. Xử lý trạng thái cho từng buổi học
        const today = getTodayDate()
        const processedSessions = sessionsOfThisClass.map((session) => {
          let status = "upcoming" // Chưa diễn ra
          // Lưu ý: So sánh ngày có thể cần điều chỉnh để chuẩn xác hơn
          // Ví dụ: new Date(session.dateOfDay).setHours(0,0,0,0) === new Date(today).setHours(0,0,0,0)
          // Hiện tại, so sánh string 'YYYY-MM-DD' là đủ nếu chỉ cần so sánh ngày.
          if (session.dateOfDay === today) {
            status = "in-progress" // Đang diễn ra
          } else if (new Date(session.dateOfDay) < new Date(today)) {
            status = "completed" // Đã xong
          }

          return {
            key: session.classSessionId,
            session: session.sessionNumber,
            date: formatDate(session.dateOfDay),
            status: status,
            classSessionId: session.classSessionId, // Để truyền khi click
          }
        })
        setClassSessions(processedSessions)
      } catch (err) {
        console.error("Error fetching class details:", err)
        setError("Không thể tải chi tiết lớp học: " + err.message)
        message.error("Lỗi: " + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchClassDetails()
  }, []) // Chạy 1 lần khi component mount, vì classSessionId được đọc từ localStorage

  const getStatusTag = (status) => {
    switch (status) {
      case "completed":
        return (
          <Tag className="status-tag completed-tag" color="default">
            Đã xong
          </Tag>
        )
      case "in-progress":
        return (
          <Tag className="status-tag progress-tag" color="green">
            Đang diễn ra
          </Tag>
        )
      case "upcoming":
        return (
          <Tag className="status-tag upcoming-tag" color="orange">
            Chưa diễn ra
          </Tag>
        )
      default:
        return null
    }
  }

  const columns = [
    {
      title: "Buổi",
      dataIndex: "session",
      key: "session",
      width: 80,
      align: "center",
      className: "session-column",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      width: 120,
      align: "center",
      className: "date-column",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 150,
      align: "center",
      render: (status) => getStatusTag(status),
      className: "status-column",
    },
    {
      title: "Điểm danh",
      key: "attendance",
      align: "center",
      render: (_, record) => (
        <Button
          type="text"
          className="student-list-btn"
          icon={<ArrowRightOutlined />}
          onClick={() => {
            localStorage.setItem("attendanceSessionId", record.classSessionId); // Lưu ID buổi học để trang điểm danh dùng
            navigate(`/teacher/class-detail/attendance`); // Điều hướng đến trang điểm danh học sinh
          }}
          disabled={record.status === 'upcoming'} // Disable nếu buổi học chưa diễn ra
        >
          {record.status === 'completed' ? 'Xem lại' : 'Điểm danh'}
        </Button>
      ),
      className: "students-column",
    },
  ]

  const handleBack = () => {
    navigate("/teacher") // Quay về trang tổng quan lớp học của giáo viên
  }

  if (loading) {
    return (
      <div className="attendance-detail-page">
        <div className="attendance-detail-container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <Spin size="large" tip="Đang tải chi tiết lớp học..." />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="attendance-detail-page">
        <div className="attendance-detail-container">
          <div className="page-header">
            <Button type="text" icon={<LeftOutlined />} onClick={handleBack} className="back-button">
              Trở về
            </Button>
            <Title level={1} className="page-title">
              CHI TIẾT LỚP HỌC
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
    <div className="attendance-detail-page">
      <div className="attendance-detail-container">
        {/* Header */}
        <div className="page-header">
          <Button type="text" icon={<LeftOutlined />} onClick={handleBack} className="back-button">
            Trở về
          </Button>
          <Title level={1} className="page-title">
            CHI TIẾT LỚP HỌC
          </Title>
        </div>

        <div className="content-layout">
          {/* Main Table */}
          <div className="table-section">
            <Table
              columns={columns}
              dataSource={classSessions} // Dùng dữ liệu từ API
              pagination={false}
              className="attendance-table"
              size="middle"
            />
          </div>

          {/* Class Info Sidebar */}
          <div className="sidebar-section">
            <Card className="class-info-card">
              <div className="class-header">
                <Text className="class-code">{classInfo?.code || "N/A"}</Text>
              </div>
              <div className="class-details">
                <div className="class-detail-item">
                  <Text className="detail-text">Môn: {classInfo?.instrumentName || "N/A"}</Text>
                </div>
                <div className="class-detail-item">
                  <Text className="detail-text">{classInfo?.time || "N/A"}</Text>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherClassDetail