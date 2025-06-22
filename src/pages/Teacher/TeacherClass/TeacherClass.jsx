import { Typography, Row, Col, Card } from "antd"
import "./TeacherClass.css"
import { useNavigate } from "react-router-dom"

const { Title, Text } = Typography

const TeacherClass = () => {
  const navigate = useNavigate()
  const pianoClasses = [
    {
      id: "K01-PI-CB-01",
      code: "K01 - PI - CB - 01",
      period: "24/03 - 30/5",
      level: "Lớp thứ 3 - 5",
      time: "Giờ học: 18:00-19:30",
    },
    {
      id: "K01-PI-CB-02",
      code: "K01 - PI - CB - 01",
      period: "24/03 - 30/5",
      level: "Lớp thứ 4 - 6",
      time: "Giờ học: 18:00-19:30",
    },
    {
      id: "K01-PI-NC-01",
      code: "K01 - PI - NC - 01",
      period: "24/03 - 30/5",
      level: "Lớp thứ 4 - 6",
      time: "Giờ học: 18:00-19:30",
    },
  ]

  const guitarClasses = [
    {
      id: "K01-GU-CB-01",
      code: "K01 - GU - CB - 01",
      period: "24/03 - 30/5",
      level: "Lớp thứ 3 - 5",
      time: "Giờ học: 19:00-20:30",
    },
    {
      id: "K01-GU-CB-02",
      code: "K01 - GU - CB - 01",
      period: "24/03 - 30/5",
      level: "Lớp thứ 4 - 6",
      time: "Giờ học: 19:00-20:30",
    },
    {
      id: "K01-GU-NC-01",
      code: "K01 - GU - NC - 01",
      period: "24/03 - 30/5",
      level: "Lớp thứ 4 - 6",
      time: "Giờ học: 19:00-20:30",
    },
  ]

  const ClassCard = ({ classInfo, onClick }) => (
    <Col xs={24} sm={12} lg={8} key={classInfo.id}>
      <Card className="teacher-class-card" hoverable onClick={onClick}>
        <div className="teacher-class-header">
          <Text className="teacher-class-code">{classInfo.code}</Text>
        </div>
        <div className="teacher-class-details">
          <div className="teacher-class-detail-item">
            <Text className="teacher-detail-text">{classInfo.period}</Text>
          </div>
          <div className="teacher-class-detail-item">
            <Text className="teacher-detail-text">{classInfo.level}</Text>
          </div>
          <div className="teacher-class-detail-item">
            <Text className="teacher-detail-text">{classInfo.time}</Text>
          </div>
        </div>
      </Card>
    </Col>
  )

  return (
    <div className="teacher-attendance-page">
      <div className="teacher-attendance-container">
        <div className="teacher-page-header">
          <Title level={1} className="teacher-page-title">
            ĐIỂM DANH
          </Title>
        </div>

        <div className="teacher-instrument-section">
          <Title level={2} className="teacher-instrument-title">
            PIANO
          </Title>
          <Row gutter={[24, 24]} className="teacher-classes-grid">
            {pianoClasses.map((classInfo) => (
              <ClassCard key={classInfo.id} classInfo={classInfo} onClick={() => navigate("/teacher/class-detail")} />
            ))}
          </Row>
        </div>

        <div className="teacher-instrument-section">
          <Title level={2} className="teacher-instrument-title">
            GUITAR
          </Title>
          <Row gutter={[24, 24]} className="teacher-classes-grid">
            {guitarClasses.map((classInfo) => (
              <ClassCard key={classInfo.id} classInfo={classInfo} onClick={() => navigate("/teacher/class-detail")}/>
            ))}
          </Row>
        </div>
      </div>
    </div>
  )
}

export default TeacherClass
