"use client"

import { Typography, Card, Button, Row, Col } from "antd"
import { RightOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import "./Lesson.css"

const { Title, Text } = Typography

const Lesson = () => {
  const navigate = useNavigate()

  const attendanceData = [
    {
      id: 1,
      session: "Buổi 1",
      date: "Thứ 3, 04/03/2025",
      teacher: "GVHD: Trần Công Thủy",
      status: "attend",
    },
    {
      id: 2,
      session: "Buổi 2",
      date: "Thứ 3, 04/03/2025",
      teacher: "GVHD: Trần Công Thủy",
      status: "attend",
    },
  ]

  const materialsData = [
    { id: 1, session: "Buổi 1", title: "Giới thiệu đàn piano và tư thế chơi", status: "done" },
    { id: 2, session: "Buổi 2", title: "Nhận biết phím đen và nốt nhạc", status: "done" },
    { id: 3, session: "Buổi 3", title: "Kỹ thuật chạy ngón cơ bản", status: "done" },
    { id: 4, session: "Buổi 4", title: "Chơi giai điệu đơn giản", status: "done" },
    { id: 5, session: "Buổi 5", title: "Hợp âm cơ bản", status: "done" },
    { id: 6, session: "Buổi 6", title: "Phối hợp hai tay", status: "done" },
    { id: 7, session: "Buổi 7", title: "Nhịp điệu và tiết tấu", status: "today" },
    { id: 8, session: "Buổi 8", title: "Chơi bài hát đơn giản", status: "not-yet" },
    { id: 9, session: "Buổi 9", title: "Kỹ hiệu nhạc lý quan trọng", status: "not-yet" },
    { id: 10, session: "Buổi 10", title: "Chuyển hợp âm mượt mà", status: "not-yet" },
    { id: 11, session: "Buổi 11", title: "Cách dùng pedal cơ bản", status: "not-yet" },
    { id: 12, session: "Buổi 12", title: "Cải thiện kỹ thuật và cảm âm", status: "not-yet" },
    { id: 13, session: "Buổi 13", title: "Chuẩn bị bài biểu diễn", status: "not-yet" },
    { id: 14, session: "Buổi 14", title: "Biểu diễn và đánh giá", status: "not-yet" },
  ]

  const getStatusButton = (status) => {
    switch (status) {
      case "done":
        return <Button className="lesson-status-btn lesson-done-btn">Done</Button>
      case "today":
        return <Button className="lesson-status-btn lesson-today-btn">Today</Button>
      case "not-yet":
        return <Button className="lesson-status-btn lesson-not-yet-btn">Not yet</Button>
      default:
        return null
    }
  }

  const handleAttendanceNavigation = () => {
    navigate("/student/student-material");
    console.log("Navigate to attendance details")
  }

  return (
    <div className="lesson-dashboard-page">
      <div className="lesson-dashboard-container">
        {/* Attendance Section */}
        <div className="lesson-attendance-section">
          <div className="lesson-section-header">
            <Title level={2} className="lesson-section-title">
              Điểm danh
            </Title>
            <Button
              type="text"
              icon={<RightOutlined />}
              className="lesson-nav-arrow"
              onClick={handleAttendanceNavigation}
            />
          </div>

          <div className="lesson-week-header">
            <Text className="lesson-week-text">Tuần 4</Text>
          </div>

          <Row gutter={[20, 20]} className="lesson-attendance-grid">
            {attendanceData.map((item) => (
              <Col xs={24} sm={12} key={item.id}>
                <Card className="lesson-attendance-card">
                  <div className="lesson-attendance-content">
                    <div className="lesson-attendance-info">
                      <Text className="lesson-session-text">{item.session}</Text>
                      <Text className="lesson-date-text">{item.date}</Text>
                      <Text className="lesson-teacher-text">{item.teacher}</Text>
                    </div>
                    <Button className="lesson-attend-btn">Attend</Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Materials Section */}
        <div className="lesson-materials-section">
          <Title level={2} className="lesson-section-title">
            Tài liệu
          </Title>

          <Row gutter={[16, 16]} className="lesson-materials-grid">
            {materialsData.map((item) => (
              <Col xs={24} sm={12} lg={8} key={item.id}>
                <Card className="lesson-material-card">
                  <div className="lesson-material-content">
                    <div className="lesson-material-header">
                      <Text className="lesson-material-session">{item.session}</Text>
                      {getStatusButton(item.status)}
                    </div>
                    <Text className="lesson-material-title">{item.title}</Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Lesson
