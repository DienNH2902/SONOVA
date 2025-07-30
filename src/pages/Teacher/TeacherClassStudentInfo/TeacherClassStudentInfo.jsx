// import { Typography, Row, Col, Card } from "antd"
// import { useNavigate } from "react-router-dom"

// const { Title, Text } = Typography

// const TeacherClassStudentInfo = () => {
//   const navigate = useNavigate()
//   const pianoClasses = [
//     {
//       id: "K01-PI-CB-01",
//       code: "K01 - PI - CB - 01",
//       period: "24/03 - 30/5",
//       level: "Lớp thứ 3 - 5",
//       time: "Giờ học: 18:00-19:30",
//     },
//     {
//       id: "K01-PI-CB-02",
//       code: "K01 - PI - CB - 01",
//       period: "24/03 - 30/5",
//       level: "Lớp thứ 4 - 6",
//       time: "Giờ học: 18:00-19:30",
//     },
//     {
//       id: "K01-PI-NC-01",
//       code: "K01 - PI - NC - 01",
//       period: "24/03 - 30/5",
//       level: "Lớp thứ 4 - 6",
//       time: "Giờ học: 18:00-19:30",
//     },
//   ]

//   const guitarClasses = [
//     {
//       id: "K01-GU-CB-01",
//       code: "K01 - GU - CB - 01",
//       period: "24/03 - 30/5",
//       level: "Lớp thứ 3 - 5",
//       time: "Giờ học: 19:00-20:30",
//     },
//     {
//       id: "K01-GU-CB-02",
//       code: "K01 - GU - CB - 01",
//       period: "24/03 - 30/5",
//       level: "Lớp thứ 4 - 6",
//       time: "Giờ học: 19:00-20:30",
//     },
//     {
//       id: "K01-GU-NC-01",
//       code: "K01 - GU - NC - 01",
//       period: "24/03 - 30/5",
//       level: "Lớp thứ 4 - 6",
//       time: "Giờ học: 19:00-20:30",
//     },
//   ]

//   const ClassCard = ({ classInfo, onClick }) => (
//     <Col xs={24} sm={12} lg={8} key={classInfo.id}>
//       <Card className="teacher-class-card" hoverable onClick={onClick}>
//         <div className="teacher-class-header">
//           <Text className="teacher-class-code">{classInfo.code}</Text>
//         </div>
//         <div className="teacher-class-details">
//           <div className="teacher-class-detail-item">
//             <Text className="teacher-detail-text">{classInfo.period}</Text>
//           </div>
//           <div className="teacher-class-detail-item">
//             <Text className="teacher-detail-text">{classInfo.level}</Text>
//           </div>
//           <div className="teacher-class-detail-item">
//             <Text className="teacher-detail-text">{classInfo.time}</Text>
//           </div>
//         </div>
//       </Card>
//     </Col>
//   )

//   return (
//     <div className="teacher-attendance-page">
//       <div className="teacher-attendance-container">
//         <div className="teacher-page-header">
//           <Title level={1} className="teacher-page-title">
//             Thông tin học viên
//           </Title>
//         </div>

//         <div className="teacher-instrument-section">
//           <Title level={2} className="teacher-instrument-title">
//             PIANO
//           </Title>
//           <Row gutter={[24, 24]} className="teacher-classes-grid">
//             {pianoClasses.map((classInfo) => (
//               <ClassCard key={classInfo.id} classInfo={classInfo} onClick={() => navigate("/teacher/class-detail-student-info/student-info-list")} />
//             ))}
//           </Row>
//         </div>

//         <div className="teacher-instrument-section">
//           <Title level={2} className="teacher-instrument-title">
//             GUITAR
//           </Title>
//           <Row gutter={[24, 24]} className="teacher-classes-grid">
//             {guitarClasses.map((classInfo) => (
//               <ClassCard key={classInfo.id} classInfo={classInfo} onClick={() => navigate("/teacher/class-detail-student-info/student-info-list")}/>
//             ))}
//           </Row>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default TeacherClassStudentInfo
import { useState, useEffect } from "react"
import { Typography, Row, Col, Card, Spin, message, Alert } from "antd" // Import Alert
// import "./TeacherClass.css"
import { useNavigate } from "react-router-dom"

const { Title, Text } = Typography

const TeacherClassStudentInfo = () => {
  const navigate = useNavigate()
  // Khởi tạo teacherClasses là một đối tượng rỗng ngay từ đầu
  const [teacherClasses, setTeacherClasses] = useState({ piano: [], guitar: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Xóa các ID cũ mỗi khi component được mount để tránh lỗi nếu người dùng back lại
    localStorage.removeItem("selectedClassSessionId")
    localStorage.removeItem("attendanceSessionId")
    localStorage.removeItem("selectedClassIdForStudents")
    
    const fetchTeacherAllClasses = async () => {
      setLoading(true)
      setError(null)
      try {
        const userDataString = localStorage.getItem("user")
        if (!userDataString) {
          throw new Error("Không tìm thấy thông tin giáo viên trong localStorage.")
        }
        const userData = JSON.parse(userDataString)
        const teacherClassIds = userData.classIds // Lấy mảng classIds của giáo viên

        if (!teacherClassIds || teacherClassIds.length === 0) {
          setTeacherClasses({ piano: [], guitar: [] })
          setLoading(false)
          console.log("Không có classIds nào được phân công cho giáo viên này.")
          return
        }

        // Bước 1: Gọi API Class để lấy thông tin chi tiết của tất cả các lớp
        const classRes = await fetch(
          "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Class",
        )
        if (!classRes.ok) throw new Error("Failed to fetch class data.")
        const allClasses = await classRes.json()

        // Lọc ra các lớp mà giáo viên này dạy
        let filteredTeacherClasses = allClasses.filter((classItem) =>
          teacherClassIds.includes(classItem.classId)
        )

        // Bước 2: Fetch tất cả OpeningSchedules để lấy instrumentName chính xác hơn
        const openingScheduleRes = await fetch(
          "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/OpeningSchedule",
        )
        if (!openingScheduleRes.ok) throw new Error("Failed to fetch opening schedules data.")
        const allOpeningSchedules = await openingScheduleRes.json()

        // Tạo một Map để dễ dàng tra cứu instrumentName theo classCode
        // Giả định classCode là đủ để xác định duy nhất môn học.
        const classCodeToInstrumentMap = new Map()
        allOpeningSchedules.forEach(schedule => {
            if (schedule.instrument?.instrumentName) {
                classCodeToInstrumentMap.set(schedule.classCode, schedule.instrument.instrumentName)
            }
        })

        // Bước 3: Kết hợp instrumentName từ OpeningSchedule vào filteredTeacherClasses
        const classesWithUpdatedInstrument = filteredTeacherClasses.map(classItem => {
            const updatedInstrumentName = classCodeToInstrumentMap.get(classItem.classCode)
            return {
                ...classItem,
                // Ưu tiên instrumentName từ OpeningSchedule, nếu không có thì giữ nguyên cái cũ hoặc "N/A"
                instrument: {
                    ...classItem.instrument, // Giữ lại các thuộc tính khác nếu có
                    instrumentName: updatedInstrumentName || classItem.instrument?.instrumentName || "N/A"
                }
            }
        })

        // Phân loại lớp theo nhạc cụ
        const pianoClasses = classesWithUpdatedInstrument.filter(
          (cls) => cls.instrument?.instrumentName === "Piano"
        );
        const guitarClasses = classesWithUpdatedInstrument.filter(
          (cls) => cls.instrument?.instrumentName === "Guitar"
        );
        
        setTeacherClasses({ piano: pianoClasses, guitar: guitarClasses });

        // Log ở đây nếu sau khi fetch và lọc mà vẫn không có lớp nào
        if (pianoClasses.length === 0 && guitarClasses.length === 0) {
          console.log("Sau khi fetch, không có lớp học nào được phân công cho giáo viên này.");
        }

      } catch (err) {
        console.error("Lỗi khi fetch dữ liệu lớp học của giáo viên:", err)
        setError("Không thể tải danh sách lớp học: " + err.message)
        message.error("Lỗi: " + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTeacherAllClasses()
  }, []) // Dependency rỗng để chỉ chạy một lần khi component mount

  const ClassCard = ({ classInfo, onClick }) => (
    <Col xs={24} sm={12} lg={8} key={classInfo.classId}>
      <Card className="teacher-class-card" hoverable onClick={onClick}>
        <div className="teacher-class-header">
          <Text className="teacher-class-code">{classInfo.classCode}</Text> 
        </div>
        <div className="teacher-class-details">
          <div className="teacher-class-detail-item">
            <Text className="teacher-detail-text">
              Môn: {classInfo.instrument?.instrumentName || "N/A"}
            </Text>
            <Text className="teacher-detail-text">
              Mã lớp: {classInfo.classCode || "N/A"}
            </Text>
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
            <Alert message="Lỗi" description={error} type="error" showIcon />
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
            Thông tin học viên
          </Title>
        </div>

        {/* Kiểm tra nếu có lớp Piano thì hiển thị */}
        {teacherClasses.piano && teacherClasses.piano.length > 0 && (
          <div className="teacher-instrument-section">
            <Title level={2} className="teacher-instrument-title">
              PIANO
            </Title>
            <Row gutter={[24, 24]} className="teacher-classes-grid">
              {teacherClasses.piano.map((classInfo) => (
                <ClassCard
                  key={classInfo.classId}
                  classInfo={classInfo}
                  onClick={() => {
                    localStorage.setItem("selectedClassIdForStudents", classInfo.classId)
                    navigate("/teacher/class-detail-student-info/student-info-list")
                  }}
                />
              ))}
            </Row>
          </div>
        )}

        {/* Kiểm tra nếu có lớp Guitar thì hiển thị */}
        {teacherClasses.guitar && teacherClasses.guitar.length > 0 && (
          <div className="teacher-instrument-section">
            <Title level={2} className="teacher-instrument-title">
              GUITAR
            </Title>
            <Row gutter={[24, 24]} className="teacher-classes-grid">
              {teacherClasses.guitar.map((classInfo) => (
                <ClassCard
                  key={classInfo.classId}
                  classInfo={classInfo}
                  onClick={() => {
                    localStorage.setItem("selectedClassIdForStudents", classInfo.classId)
                    navigate("/teacher/class-detail-student-info/student-info-list")
                  }}
                />
              ))}
            </Row>
          </div>
        )}

        {/* Hiển thị thông báo nếu không có lớp nào */}
        {(teacherClasses.piano?.length === 0 && teacherClasses.guitar?.length === 0) && !loading && !error && (
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            <Text type="secondary">Bạn không có lớp học nào được phân công.</Text>
            {/* console.log đã được di chuyển vào useEffect */}
          </div>
        )}
      </div>
    </div>
  )
}

export default TeacherClassStudentInfo