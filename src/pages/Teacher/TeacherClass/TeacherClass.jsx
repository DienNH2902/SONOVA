import { useState, useEffect } from "react"
import { Typography, Row, Col, Card, Spin, message } from "antd"
import "./TeacherClass.css" // Đảm bảo CSS file này tồn tại và được cấu hình đúng
import { useNavigate } from "react-router-dom"

const { Title, Text } = Typography

const TeacherClass = () => {
  const navigate = useNavigate()
  const [todayTeacherSessions, setTodayTeacherSessions] = useState([]) // Các buổi học của giáo viên trong ngày hôm nay
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

  // Helper để format thời gian (HH:MM:SS -> HH:MM)
  const formatTime = (timeString) => {
    if (!timeString) return ""
    return timeString.substring(0, 5) // Get HH:MM
  }

  useEffect(() => {
    // Xóa classSessionId khỏi localStorage mỗi khi component này được mount
    localStorage.removeItem("selectedClassSessionId")
    localStorage.removeItem("attendanceSessionId")
    localStorage.removeItem("selectedClassIdForStudents")

    const fetchTeacherClasses = async () => {
      setLoading(true)
      setError(null)
      try {
        const userDataString = localStorage.getItem("user")
        if (!userDataString) {
          throw new Error("Không tìm thấy thông tin giáo viên trong localStorage.")
        }
        const userData = JSON.parse(userDataString)
        const teacherClassIds = userData.classIds // Đây là các classId mà giáo viên dạy

        if (!teacherClassIds || teacherClassIds.length === 0) {
          setTodayTeacherSessions([])
          setLoading(false)
          return
        }

        // Bước 1: Fetch tất cả ClassSessions
        const classSessionRes = await fetch(
          "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/ClassSession",
        )
        if (!classSessionRes.ok) throw new Error("Failed to fetch class sessions.")
        const allClassSessions = await classSessionRes.json()

        const today = getTodayDate()

        // Lọc ra các buổi học của giáo viên trong ngày hôm nay
        const filteredSessions = allClassSessions.filter(
          (session) =>
            teacherClassIds.includes(session.classId) && session.dateOfDay === today,
        )

        // Bước 2: Fetch tất cả OpeningSchedules để lấy instrumentName
        const openingScheduleRes = await fetch(
          "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/OpeningSchedule",
        )
        if (!openingScheduleRes.ok) throw new Error("Failed to fetch opening schedules.")
        const allOpeningSchedules = await openingScheduleRes.json()

        // Tạo một Map để dễ dàng tra cứu instrumentName theo classCode
        // Lưu ý: API OpeningSchedule không có classId mà chỉ có classCode
        // Cần đảm bảo rằng classCode trong ClassSession và OpeningSchedule khớp nhau
        const classCodeToInstrumentMap = new Map()
        allOpeningSchedules.forEach(schedule => {
            // Giả định rằng classCode là duy nhất hoặc lấy cái đầu tiên tìm thấy
            // Nếu có nhiều schedule với cùng classCode nhưng instrument khác, cần logic phức tạp hơn
            if (schedule.instrument?.instrumentName) {
                classCodeToInstrumentMap.set(schedule.classCode, schedule.instrument.instrumentName)
            }
        })

        // Bước 3: Kết hợp instrumentName vào filteredSessions
        const sessionsWithInstrument = filteredSessions.map(session => ({
            ...session,
            // Lấy instrumentName từ map dựa trên classCode của session
            instrumentName: classCodeToInstrumentMap.get(session.classCode) || session.instrumentName || "N/A"
        }))

        setTodayTeacherSessions(sessionsWithInstrument)
      } catch (err) {
        console.error("Error fetching teacher's classes:", err)
        setError("Không thể tải danh sách lớp học: " + err.message)
        message.error("Lỗi: " + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTeacherClasses()
  }, [])

  const ClassCard = ({ classInfo }) => (
    <Col xs={24} sm={12} lg={8}>
      <Card
        className="teacher-class-card"
        hoverable
        onClick={() => {
          localStorage.setItem("selectedClassSessionId", classInfo.classSessionId)
          navigate(`/teacher/class-detail`)
        }}
      >
        <div className="teacher-class-header">
          <Text className="teacher-class-code">{classInfo.classCode}</Text>
        </div>
        <div className="teacher-class-details">
          <div className="teacher-class-detail-item">
            <Text className="teacher-detail-text">
              Buổi: {classInfo.sessionNumber} ({classInfo.dayOfWeekName})
            </Text>
          </div>
          <div className="teacher-class-detail-item">
            <Text className="teacher-detail-text">
              Thời gian: {formatTime(classInfo.startTime)} - {formatTime(classInfo.endTime)}
            </Text>
          </div>
          <div className="teacher-class-detail-item">
            <Text className="teacher-detail-text">Môn: {classInfo.instrumentName}</Text>
          </div>
        </div>
      </Card>
    </Col>
  )

  if (loading) {
    return (
      <div className="teacher-attendance-page">
        <div className="teacher-attendance-container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <Spin size="large" tip="Đang tải danh sách lớp học..." />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="teacher-attendance-page">
        <div className="teacher-attendance-container">
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            <Text type="danger">{error}</Text>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="teacher-attendance-page">
      <div className="teacher-attendance-container">
        <div className="teacher-page-header">
          <Title level={1} className="teacher-page-title">
            ĐIỂM DANH
          </Title>
        </div>

        {todayTeacherSessions.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            <Text type="secondary">Hôm nay bạn không có buổi học nào để điểm danh đâu.</Text>
          </div>
        ) : (
          <>
            <div className="teacher-instrument-section">
              <Title level={2} className="teacher-instrument-title">
                CÁC LỚP HỌC HÔM NAY
              </Title>
              <Row gutter={[24, 24]} className="teacher-classes-grid">
                {todayTeacherSessions.map((classInfo) => (
                  <ClassCard
                    key={classInfo.classSessionId}
                    classInfo={classInfo}
                  />
                ))}
              </Row>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TeacherClass