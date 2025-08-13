"use client"

import { useState, useEffect } from "react"
import { Typography, Row, Col, Card, Spin, message } from "antd"
import "./TeacherClass.css" // Đảm bảo CSS file này tồn tại và được cấu hình đúng
import { useNavigate } from "react-router-dom"

const { Title, Text } = Typography

const TeacherClass = () => {
  const navigate = useNavigate()
  const [todayTeacherSessions, setTodayTeacherSessions] = useState([]) // Các buổi học của giáo viên trong ngày hôm nay
  const [allTeacherClasses, setAllTeacherClasses] = useState([]) // Tất cả các lớp của giáo viên
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

  // Helper để format các ngày trong tuần
  const formatDaysOfWeek = (selectedDayOfWeekIds) => {
    const dayNames = {
      1: "T2",
      2: "T3",
      3: "T4",
      4: "T5",
      5: "T6",
      6: "T7",
      7: "CN",
    }
    return selectedDayOfWeekIds.map((dayId) => dayNames[dayId]).join(", ")
  }

  useEffect(() => {
    // Xóa classSessionId khỏi localStorage mỗi khi component này được mount
    localStorage.removeItem("selectedClassSessionId")
    localStorage.removeItem("attendanceSessionId")
    localStorage.removeItem("selectedClassIdForStudents")

    const fetchTeacherData = async () => {
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
          setAllTeacherClasses([])
          setLoading(false)
          return
        }

        // Fetch tất cả ClassSessions và OpeningSchedules song song
        const [classSessionRes, openingScheduleRes] = await Promise.all([
          fetch("https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/ClassSession"),
          fetch("https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/OpeningSchedule"),
        ])

        if (!classSessionRes.ok) throw new Error("Failed to fetch class sessions.")
        if (!openingScheduleRes.ok) throw new Error("Failed to fetch opening schedules.")

        const [allClassSessions, allOpeningSchedules] = await Promise.all([
          classSessionRes.json(),
          openingScheduleRes.json(),
        ])

        const today = getTodayDate()

        // Xử lý dữ liệu cho "Các lớp học hôm nay"
        const filteredTodaySessions = allClassSessions.filter(
          (session) => teacherClassIds.includes(session.classId) && session.dateOfDay === today,
        )

        const classCodeToInstrumentMap = new Map()
        allOpeningSchedules.forEach((schedule) => {
          if (schedule.instrument?.instrumentName) {
            classCodeToInstrumentMap.set(schedule.classCode, schedule.instrument.instrumentName)
          }
        })

        const todaySessionsWithInstrument = filteredTodaySessions.map((session) => ({
          ...session,
          instrumentName: classCodeToInstrumentMap.get(session.classCode) || session.instrumentName || "N/A",
        }))

        const sortedTodaySessions = todaySessionsWithInstrument.sort((a, b) => {
          return a.startTime.localeCompare(b.startTime)
        })

        setTodayTeacherSessions(sortedTodaySessions)

        // Xử lý dữ liệu cho "Các lớp học" (tất cả các lớp)
        const teacherOpeningSchedules = allOpeningSchedules.filter((schedule) =>
          teacherClassIds.some((classId) => {
            // Tìm classSession có classId tương ứng để lấy classCode
            const matchingSession = allClassSessions.find((session) => session.classId === classId)
            return matchingSession && matchingSession.classCode === schedule.classCode
          }),
        )

        // Tạo danh sách các lớp học với thông tin đầy đủ
        const allClassesWithSessions = teacherOpeningSchedules.map((schedule) => {
          // Tìm một classSession bất kỳ cho lớp này để có thể navigate
          const anySessionForClass = allClassSessions.find(
            (session) => session.classCode === schedule.classCode && teacherClassIds.includes(session.classId),
          )

          return {
            classCode: schedule.classCode,
            instrumentName: schedule.instrument?.instrumentName || "N/A",
            isAdvancedClass: schedule.isAdvancedClass,
            studentQuantity: schedule.studentQuantity,
            daysOfWeek: formatDaysOfWeek(schedule.selectedDayOfWeekIds),
            timeSlots: schedule.timeSlots,
            roomCode: schedule.defaultRoom?.roomCode || "N/A",
            totalSessions: schedule.totalSessions,
            // Thêm classSessionId để có thể navigate (lấy từ session bất kỳ của lớp này)
            classSessionId: anySessionForClass?.classSessionId,
            classId: anySessionForClass?.classId,
          }
        })

        setAllTeacherClasses(allClassesWithSessions)
      } catch (err) {
        console.error("Error fetching teacher's data:", err)
        setError("Không thể tải danh sách lớp học: " + err.message)
        message.error("Lỗi: " + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTeacherData()
  }, [])

  const TodayClassCard = ({ classInfo }) => (
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
              Buổi: {classInfo.sessionNumber} 
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

  const AllClassCard = ({ classInfo }) => (
    <Col xs={24} sm={12} lg={8}>
      <Card
        className="teacher-class-card"
        hoverable
        onClick={() => {
          if (classInfo.classSessionId) {
            localStorage.setItem("selectedClassSessionId", classInfo.classSessionId)
            navigate(`/teacher/class-detail`)
          }
        }}
      >
        <div className="teacher-class-header">
          <Text className="teacher-class-code">{classInfo.classCode}</Text>
        </div>
        <div className="teacher-class-details">
          <div className="teacher-class-detail-item">
            <Text className="teacher-detail-text">Môn: {classInfo.instrumentName}</Text>
          </div>
          <div className="teacher-class-detail-item">
            <Text className="teacher-detail-text">Lịch học: {classInfo.daysOfWeek}</Text>
          </div>
          <div className="teacher-class-detail-item">
            <Text className="teacher-detail-text">
              Thời gian:{" "}
              {classInfo.timeSlots
                ?.map((slot) => `${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`)
                .join(", ")}
            </Text>
          </div>
          {/* <div className="teacher-class-detail-item">
            <Text className="teacher-detail-text">
              Phòng: {classInfo.roomCode} | Sĩ số: {classInfo.studentQuantity}
            </Text>
          </div> */}
          {/* <div className="teacher-class-detail-item">
            <Text className="teacher-detail-text">
              Tổng buổi: {classInfo.totalSessions} | {classInfo.isAdvancedClass ? "Nâng cao" : "Cơ bản"}
            </Text>
          </div> */}
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

        {/* Phần các lớp học hôm nay */}
        {todayTeacherSessions.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            <Text type="secondary">Hôm nay bạn không có buổi học nào để điểm danh đâu.</Text>
          </div>
        ) : (
          <div className="teacher-instrument-section">
            <Title level={2} className="teacher-instrument-title">
              CÁC LỚP HỌC HÔM NAY
            </Title>
            <Row gutter={[24, 24]} className="teacher-classes-grid">
              {todayTeacherSessions.map((classInfo) => (
                <TodayClassCard key={classInfo.classSessionId} classInfo={classInfo} />
              ))}
            </Row>
          </div>
        )}

        {/* Phần tất cả các lớp học */}
        {allTeacherClasses.length > 0 && (
          <div className="teacher-instrument-section" style={{ marginTop: "40px" }}>
            <Title level={2} className="teacher-instrument-title">
              CÁC LỚP HỌC
            </Title>
            <Row gutter={[24, 24]} className="teacher-classes-grid">
              {allTeacherClasses.map((classInfo) => (
                <AllClassCard key={classInfo.classCode} classInfo={classInfo} />
              ))}
            </Row>
          </div>
        )}
      </div>
    </div>
  )
}

export default TeacherClass
