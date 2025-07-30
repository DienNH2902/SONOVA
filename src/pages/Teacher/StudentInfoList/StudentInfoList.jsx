"use client"

import { useState, useEffect } from "react" // Import useState, useEffect
import { Typography, Table, Button, Spin, Alert, message } from "antd" // Import Spin, Alert, message
import { LeftOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import "./StudentInfoList.css"

const { Title } = Typography

const StudentInfoList = () => {
  const navigate = useNavigate()
  const [studentData, setStudentData] = useState([]) // Dữ liệu học sinh sẽ được fetch từ API
  const [loading, setLoading] = useState(true) // Trạng thái loading
  const [error, setError] = useState(null) // Trạng thái lỗi
  const [classCode, setClassCode] = useState("Đang tải...") // Tên lớp hiển thị trên tiêu đề

  useEffect(() => {
    const fetchStudentsInClass = async () => {
      setLoading(true)
      setError(null)
      try {
        const selectedClassId = localStorage.getItem("selectedClassIdForStudents")

        if (!selectedClassId) {
          setError("Không tìm thấy ID lớp học. Vui lòng trở về và chọn lại lớp.")
          setLoading(false)
          return
        }

        // Gọi API Class để lấy thông tin chi tiết của lớp, bao gồm danh sách học sinh
        const classRes = await fetch(
          `https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/Class/${selectedClassId}`,
        )

        if (!classRes.ok) {
          throw new Error(`Failed to fetch class details for ID: ${selectedClassId}. Status: ${classRes.status}`)
        }

        const classDetails = await classRes.json()
        
        setClassCode(classDetails.classCode || "N/A") // Cập nhật tên lớp

        const studentsInClass = (classDetails.users || []).filter(
          (user) => user.roleId === 3
        )
        
        // Chuyển đổi dữ liệu học sinh sang định dạng phù hợp với bảng Ant Design
        const formattedStudentData = studentsInClass.map((student, index) => ({
          key: student.userId, // Sử dụng userId làm key
          stt: index + 1,
          name: student.accountName,
          // Format ngày sinh từ ISO string sang DD/MM/YYYY
          birthDate: student.birthday ? new Date(student.birthday).toLocaleDateString("vi-VN") : "N/A",
          phone: student.phoneNumber,
          address: student.address,
        }))

        setStudentData(formattedStudentData)
      } catch (err) {
        console.error("Lỗi khi fetch danh sách học sinh:", err)
        setError("Không thể tải danh sách học sinh: " + err.message)
        message.error("Lỗi: " + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStudentsInClass()
  }, []) // Dependency rỗng để chỉ chạy một lần khi component mount

  const handleBack = () => {
    navigate("/teacher/class-detail-student-info")
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 80,
      align: "center",
      className: "student-info-stt-column",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      width: 200,
      className: "student-info-name-column",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthDate",
      key: "birthDate",
      width: 150,
      align: "center",
      className: "student-info-birth-column",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
      width: 150,
      align: "center",
      className: "student-info-phone-column",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      className: "student-info-address-column",
    },
  ]

  if (loading) {
    return (
      <div className="student-info-list-page">
        <div className="student-info-list-container">
          <Spin size="large" tip="Đang tải danh sách học sinh..." style={{ display: "block", margin: "100px auto" }} />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="student-info-list-page">
        <div className="student-info-list-container">
          <Alert message="Lỗi" description={error} type="error" showIcon style={{ margin: "50px auto" }} />
        </div>
      </div>
    )
  }

  return (
    <div className="student-info-list-page">
      <div className="student-info-list-container">
        {/* Header */}
        <div className="student-info-page-header">
          <Button type="text" icon={<LeftOutlined />} onClick={handleBack} className="student-info-back-button">
            Trở về
          </Button>
          {/* Cập nhật tiêu đề lớp */}
          <Title level={1} className="student-info-page-title">
            Lớp: {classCode}
          </Title>
        </div>

        {/* Student Information Table */}
        <div className="student-info-table-section">
          {studentData.length === 0 ? (
            <div style={{ textAlign: "center", padding: "50px 0" }}>
              <Typography.Text type="secondary">Chưa có học sinh nào trong lớp này.</Typography.Text>
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={studentData}
              pagination={false}
              className="student-info-table"
              size="middle"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentInfoList