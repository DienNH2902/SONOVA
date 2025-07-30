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
  const [teacherClasses, setTeacherClasses] = useState([]) // Thay thế pianoClasses/guitarClasses
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
          // Khởi tạo teacherClasses với mảng rỗng cho piano và guitar
          setTeacherClasses({ piano: [], guitar: [] })
          setLoading(false)
          console.log("Không có classIds nào được phân công cho giáo viên này.") // Log ở đây
          return
        }

        // Gọi API Class để lấy thông tin chi tiết của tất cả các lớp
        const classRes = await fetch(
          "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Class",
        )
        if (!classRes.ok) throw new Error("Failed to fetch class data.")
        const allClasses = await classRes.json()

        // Lọc ra các lớp mà giáo viên này dạy
        const filteredTeacherClasses = allClasses.filter((classItem) =>
          teacherClassIds.includes(classItem.classId)
        )

        // Phân loại lớp theo nhạc cụ để hiển thị riêng nếu cần,
        // hoặc gộp chung lại nếu muốn hiển thị tất cả cùng một danh sách.
        // Hiện tại, giữ nguyên cách hiển thị Piano và Guitar riêng.
        const pianoClasses = filteredTeacherClasses.filter(
          (cls) => cls.instrument?.instrumentName === "Piano"
        );
        const guitarClasses = filteredTeacherClasses.filter(
          (cls) => cls.instrument?.instrumentName === "Guitar"
        );
        
        // Tạo một đối tượng để lưu trữ các lớp đã lọc, phân loại
        setTeacherClasses({ piano: pianoClasses, guitar: guitarClasses });

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
    <Col xs={24} sm={12} lg={8} key={classInfo.classId}> {/* Đổi key sang classInfo.classId */}
      <Card className="teacher-class-card" hoverable onClick={onClick}>
        <div className="teacher-class-header">
          {/* classInfo.classCode đã có sẵn từ API Class */}
          <Text className="teacher-class-code">{classInfo.classCode}</Text> 
        </div>
        <div className="teacher-class-details">
          {/* Các thông tin này không có trực tiếp trong API Class, nếu cần thì phải lấy từ ClassSession hoặc thêm vào API Class */}
          {/* Tùy thuộc vào dữ liệu API trả về, bạn có thể cần điều chỉnh lại các Text này */}
          <div className="teacher-class-detail-item">
            {/* API Class không có period, level, time. Chỉ có instrumentName. */}
            <Text className="teacher-detail-text">
              Môn: {classInfo.instrument?.instrumentName || "N/A"}
            </Text>
            <Text className="teacher-detail-text">
              Mã lớp: {classInfo.classCode || "N/A"}
            </Text>
          </div>
          {/* Nếu muốn hiển thị period, level, time, bạn cần đảm bảo dữ liệu đó có trong classInfo 
              hoặc fetch từ API ClassSession và xử lý merge data ở trên.
              Với API Class hiện tại, chỉ có classCode và instrumentName. */}
          {/* <div className="teacher-class-detail-item">
            <Text className="teacher-detail-text">{classInfo.period}</Text>
          </div>
          <div className="teacher-class-detail-item">
            <Text className="teacher-detail-text">{classInfo.level}</Text>
          </div>
          <div className="teacher-class-detail-item">
            <Text className="teacher-detail-text">{classInfo.time}</Text>
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
                    // Lưu classId vào localStorage khi click
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
                    // Lưu classId vào localStorage khi click
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
            {console.log("Không có lớp học nào được phân công cho giáo viên này.")}
          </div>
        )}
      </div>
    </div>
  )
}

export default TeacherClassStudentInfo