"use client"

import { Typography, Card, Row, Col, Spin, Alert } from "antd"
import { FileTextOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "./Lesson.css"

const { Title, Text } = Typography

const Lesson = () => {
  const navigate = useNavigate()
  const [classSessions, setClassSessions] = useState([])
  const [attendanceStatus, setAttendanceStatus] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const materialsData = [
    { id: 1, session: "Buổi 1", title: "Giới thiệu đàn piano và tư thế chơi" },
    { id: 2, session: "Buổi 2", title: "Nhận biết phím đen và nốt nhạc" },
    { id: 3, session: "Buổi 3", title: "Kỹ thuật chạy ngón cơ bản" },
    { id: 4, session: "Buổi 4", title: "Chơi giai điệu đơn giản" },
    { id: 5, session: "Buổi 5", title: "Hợp âm cơ bản" },
    { id: 6, session: "Buổi 6", title: "Phối hợp hai tay" },
    { id: 7, session: "Buổi 7", title: "Nhịp điệu và tiết tấu" },
    { id: 8, session: "Buổi 8", title: "Chơi bài hát đơn giản" },
    { id: 9, session: "Buổi 9", title: "Kỹ hiệu nhạc lý quan trọng" },
    { id: 10, session: "Buổi 10", title: "Chuyển hợp âm mượt mà" },
    { id: 11, session: "Buổi 11", title: "Cách dùng pedal cơ bản" },
    { id: 12, session: "Buổi 12", title: "Cải thiện kỹ thuật và cảm âm" },
    { id: 13, session: "Buổi 13", title: "Chuẩn bị bài biểu diễn" },
    { id: 14, session: "Buổi 14", title: "Biểu diễn và đánh giá" },
    { id: 15, session: "Buổi 15", title: "Ôn tập và thực hành tổng hợp" },
    { id: 16, session: "Buổi 16", title: "Giới thiệu các thể loại nhạc" },
    { id: 17, session: "Buổi 17", title: "Phân tích cấu trúc bài hát" },
    { id: 18, session: "Buổi 18", title: "Kỹ thuật nâng cao (arpeggios, scales)" },
    { id: 19, session: "Buổi 19", title: "Sáng tác và ngẫu hứng cơ bản" },
    { id: 20, session: "Buổi 20", title: "Tổng kết khóa học và định hướng" },
  ]

  // Color scheme for session numbers
  const getSessionColor = (sessionNumber) => {
    const colors = [
      "#1890ff",
      "#52c41a",
      "#722ed1",
      "#13c2c2",
      "#eb2f96",
      "#f5222d",
      "#fa541c",
      "#faad14",
      "#a0d911",
      "#1890ff",
    ]
    return colors[(sessionNumber - 1) % colors.length]
  }

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        setLoading(true)
        const userInfo = JSON.parse(localStorage.getItem("user"))
        const userId = userInfo?.userId
        const classIds = userInfo?.classIds

        if (!classIds || classIds.length === 0) {
          setError("Bạn chưa được xếp vào lớp nào cả.")
          setLoading(false)
          return
        }

        // Lấy tất cả class sessions
        const classSessionResponse = await fetch(
          "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/ClassSession",
        )
        if (!classSessionResponse.ok) {
          throw new Error(`HTTP error! status: ${classSessionResponse.status}`)
        }
        const allClassSessions = await classSessionResponse.json()

        // Lọc ra các class sessions mà học sinh thuộc về
        const studentClassSessions = allClassSessions
          .filter((session) => classIds.includes(session.classId))
          .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sắp xếp theo ngày

        setClassSessions(studentClassSessions)

        // Lấy dữ liệu điểm danh của học sinh
        const attendanceResponse = await fetch(
          "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Attendance",
        )
        if (!attendanceResponse.ok) {
          throw new Error(`HTTP error! status: ${attendanceResponse.status}`)
        }
        const allAttendance = await attendanceResponse.json()

        const userAttendanceMap = {}
        allAttendance.forEach((att) => {
          if (att.userId === userId) {
            userAttendanceMap[att.classSessionId] = att.statusName
          }
        })

        setAttendanceStatus(userAttendanceMap)
      } catch (e) {
        console.error("Lỗi khi fetch dữ liệu:", e)
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.")
      } finally {
        setLoading(false)
      }
    }

    fetchClassData()
  }, [])

  const getSessionStatus = (sessionDate, classSessionId) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const sessionDay = new Date(sessionDate)
    sessionDay.setHours(0, 0, 0, 0)

    if (sessionDay < today) {
      return "done"
    } else if (sessionDay.getTime() === today.getTime()) {
      const status = attendanceStatus[classSessionId]
      return status ? (status === "Present" ? "present" : "absent") : "today"
    } else {
      return "not-yet"
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "today":
        return <span className="lesson-status-badge lesson-today-badge">Today</span>
      case "not-yet":
        return <span className="lesson-status-badge lesson-not-yet-badge">Not yet</span>
      case "done":
        return <span className="lesson-status-badge lesson-done-badge">Done</span>
      case "present":
        return <span className="lesson-status-badge lesson-present-badge">Present</span>
      case "absent":
        return <span className="lesson-status-badge lesson-absent-badge">Absent</span>
      default:
        return null
    }
  }

  const handleMaterialNavigation = (sessionId) => {
    navigate(`/student/student-material/${sessionId}`)
    console.log(`Maps to material details for session ${sessionId}`)
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin size="large" tip="Đang tải dữ liệu..." />
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <Alert message="Lỗi" description={error} type="error" showIcon />
      </div>
    )
  }

  return (
    <div className="lesson-dashboard-page">
      <div className="lesson-dashboard-container">
        {/* Materials Section */}
        <div className="lesson-materials-section">
          <Title level={2} className="lesson-section-title">
            Tài liệu
          </Title>
          <Row gutter={[16, 16]} className="lesson-materials-grid">
            {classSessions.map((session, index) => {
              const material = materialsData[index]
              const title = material
                ? material.title
                : session.sessionNumber > 20
                  ? "Ôn tập"
                  : `Buổi ${session.sessionNumber}`
              const sessionStatus = getSessionStatus(session.date, session.classSessionId)
              const sessionColor = getSessionColor(session.sessionNumber)

              return (
                <Col xs={24} sm={12} lg={8} key={session.classSessionId}>
                  <Card
                    className="lesson-material-card"
                    onClick={() => handleMaterialNavigation(session.classSessionId)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="lesson-material-content">
                      <div className="lesson-material-header">
                        <div className="lesson-session-info">
                          <div className="lesson-session-number" style={{ backgroundColor: sessionColor }}>
                            {session.sessionNumber}
                          </div>
                          <div className="lesson-session-details">
                            <Text className="lesson-session-text">Buổi {session.sessionNumber}</Text>
                            <Text className="lesson-date-text">
                              {new Date(session.date).toLocaleDateString("vi-VN")}
                            </Text>
                          </div>
                        </div>
                        {getStatusBadge(sessionStatus)}
                      </div>
                      <div className="lesson-material-body">
                        <FileTextOutlined className="lesson-material-icon" />
                        <Text className="lesson-material-title">{title}</Text>
                      </div>
                    </div>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Lesson
