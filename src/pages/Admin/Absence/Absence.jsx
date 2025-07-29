"use client"

import { Typography, Table, Spin, message } from "antd" // Bỏ Checkbox, Button
import { useState, useEffect } from "react" // Thêm useEffect
import "./Absence.css"

const { Title, Text } = Typography

const Absence = () => {
  const [absentStudents, setAbsentStudents] = useState([])
  const [absentTeachers, setAbsentTeachers] = useState([])
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

  useEffect(() => {
    const fetchAbsentUsers = async () => {
      setLoading(true)
      setError(null)
      try {
        const todayDate = getTodayDate()

        // 1. Fetch all attendance records
        const attendanceRes = await fetch(
          "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Attendance"
        )
        if (!attendanceRes.ok) throw new Error("Failed to fetch attendance data.")
        const allAttendances = await attendanceRes.json()

        // 2. Fetch all user details
        const userRes = await fetch(
          "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/User"
        )
        if (!userRes.ok) throw new Error("Failed to fetch user data.")
        const allUsers = await userRes.json()

        const usersMap = new Map(allUsers.map(user => [user.userId, user]));

        const absentStudentsList = [];
        const absentTeachersList = [];
        let studentCount = 0;
        let teacherCount = 0;

        // Filter for absent users today and categorize them
        for (const record of allAttendances) {
          // Check if the record is for today and status is "Absent"
          const recordDate = record.classSession?.date; // Assuming date is available directly or needs to be extracted
          if (record.statusName === "Absent" && recordDate === todayDate) {
            const user = usersMap.get(record.userId);
            if (user) {
              const userInfo = {
                key: user.userId,
                name: user.accountName || user.username,
                phone: user.phoneNumber || "N/A",
                email: user.email || "N/A",
                class: record?.classCode || "N/A", // Lấy thông tin lớp học từ classSession
                // Các thông tin khác có thể thêm vào đây nếu cần
              };

              if (user.role?.roleName === "Student") {
                studentCount++;
                absentStudentsList.push({ ...userInfo, stt: studentCount });
              } else if (user.role?.roleName === "Teacher") {
                teacherCount++;
                absentTeachersList.push({ ...userInfo, stt: teacherCount });
              }
            }
          }
        }
        
        setAbsentStudents(absentStudentsList);
        setAbsentTeachers(absentTeachersList);

      } catch (err) {
        console.error("Error fetching absent users:", err)
        setError("Không thể tải danh sách vắng: " + err.message)
        message.error("Lỗi: " + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAbsentUsers()
  }, []) // Chỉ chạy một lần khi component mount

  const commonColumns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 80,
      align: "center",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
      width: 140,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Lớp học",
      dataIndex: "class",
      key: "class",
      width: 150,
    },
  ]

  if (loading) {
    return (
      <div className="absence-page">
        <div className="absence-container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <Spin size="large" tip="Đang tải danh sách vắng mặt..." />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="absence-page">
        <div className="absence-container">
          <Title level={1} className="page-title">
            VẮNG
          </Title>
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            <Text type="danger">{error}</Text>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="absence-page">
      <div className="absence-container">
        <Title level={1} className="page-title">
          VẮNG
        </Title>

        {/* Bảng cho Học sinh vắng */}
        <div className="table-section">
          <Title level={3} className="section-title">
            Học sinh vắng ({absentStudents.length})
          </Title>
          {absentStudents.length > 0 ? (
            <Table
              columns={commonColumns}
              dataSource={absentStudents}
              pagination={false}
              className="absence-table"
              size="middle"
            />
          ) : (
            <div className="no-data-message">
              <Text type="secondary">Không có học sinh nào vắng mặt hôm nay.</Text>
            </div>
          )}
        </div>

        {/* --- */}

        {/* Bảng cho Giáo viên vắng */}
        <div className="table-section" style={{ marginTop: '40px' }}>
          <Title level={3} className="section-title">
            Giáo viên vắng ({absentTeachers.length})
          </Title>
          {absentTeachers.length > 0 ? (
            <Table
              columns={commonColumns}
              dataSource={absentTeachers}
              pagination={false}
              className="absence-table"
              size="middle"
            />
          ) : (
            <div className="no-data-message">
              <Text type="secondary">Không có giáo viên nào vắng mặt hôm nay.</Text>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Absence