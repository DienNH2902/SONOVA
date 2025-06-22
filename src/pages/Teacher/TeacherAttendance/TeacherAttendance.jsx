"use client"

import { useState } from "react"
import { Typography, Table, Button, Select, Card, Modal } from "antd"
import { LeftOutlined, CheckOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import "./TeacherAttendance.css"

const { Title, Text } = Typography
const { Option } = Select

const TeacherAttendance = () => {
  const navigate = useNavigate()
  const [attendanceData, setAttendanceData] = useState([
    { key: 1, stt: 1, name: "Nguyễn Minh An", status: null },
    { key: 2, stt: 2, name: "Trần Gia Bảo", status: null },
    { key: 3, stt: 3, name: "Lê Khanh Châu", status: null },
    { key: 4, stt: 4, name: "Phạm Hoàng Duy", status: null },
    { key: 5, stt: 5, name: "Vũ Tuấn Khánh", status: null },
    { key: 6, stt: 6, name: "Đặng Quang Hưng", status: null },
    { key: 7, stt: 7, name: "Bùi Thảo Linh", status: null },
    { key: 8, stt: 8, name: "Đỗ Mai Ngọc", status: null },
    { key: 9, stt: 9, name: "Trịnh Hữu Quân", status: null },
    { key: 10, stt: 10, name: "Nguyễn Đức Phúc", status: null },
    { key: 11, stt: 11, name: "Phan Thành Thảo", status: null },
    { key: 12, stt: 12, name: "Lý Công Tuấn", status: null },
    { key: 13, stt: 13, name: "Trương Ngọc Vân", status: null },
    { key: 14, stt: 14, name: "Bùi Thảo Linh", status: null },
  ])

  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const classInfo = {
    code: "K01 - PI - CB - 01",
    period: "24/03 - 30/5",
    level: "Lớp thứ 3 - 5",
    time: "Giờ học: 18:00-19:30",
  }

  const handleStatusChange = (value, studentKey) => {
    setAttendanceData((prev) =>
      prev.map((student) => (student.key === studentKey ? { ...student, status: value } : student)),
    )
  }

  const handleConfirm = () => {
    setShowSuccessModal(true)
  }

  const handleSuccessModalOk = () => {
    setShowSuccessModal(false)
    // Navigate back to class detail after successful submission
    navigate("/teacher/class-detail")
  }

  const handleBack = () => {
    navigate("/teacher/class-detail")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "#52c41a" // Green
      case "absent":
        return "#ff4d4f" // Red
      default:
        return "#d9d9d9" // Gray
    }
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 80,
      align: "center",
      className: "stt-column",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      className: "name-column",
    },
    {
      title: "Điểm danh",
      key: "attendance",
      width: 200,
      align: "center",
      render: (_, record) => (
        <Select
          placeholder="Trạng thái"
          value={record.status}
          onChange={(value) => handleStatusChange(value, record.key)}
          className="status-select"
          style={{
            width: "100%",
            borderColor: getStatusColor(record.status),
          }}
        >
          <Option value="present">
            <span style={{ color: "#52c41a", fontWeight: "500" }}>Hiện diện</span>
          </Option>
          <Option value="absent">
            <span style={{ color: "#ff4d4f", fontWeight: "500" }}>Vắng</span>
          </Option>
        </Select>
      ),
      className: "attendance-column",
    },
  ]

  return (
    <div className="student-attendance-page">
      <div className="student-attendance-container">
        {/* Header */}
        <div className="page-header">
          <Button type="text" icon={<LeftOutlined />} onClick={handleBack} className="back-button">
            Trở về
          </Button>
          <Title level={1} className="page-title">
            ĐIỂM DANH
          </Title>
        </div>

        <div className="content-layout">
          {/* Main Table */}
          <div className="table-section">
            <Table
              columns={columns}
              dataSource={attendanceData}
              pagination={false}
              className="attendance-table"
              size="middle"
            />
          </div>

          {/* Class Info and Confirm Section */}
          <div className="sidebar-section">
            <Card className="class-info-card">
              <div className="class-header">
                <Text className="class-code">{classInfo.code}</Text>
              </div>
              <div className="class-details">
                <div className="class-detail-item">
                  <Text className="detail-text">{classInfo.period}</Text>
                </div>
                <div className="class-detail-item">
                  <Text className="detail-text">{classInfo.level}</Text>
                </div>
                <div className="class-detail-item">
                  <Text className="detail-text">{classInfo.time}</Text>
                </div>
              </div>
            </Card>

            <Button type="primary" className="confirm-button" onClick={handleConfirm} block>
              Xác nhận
            </Button>
          </div>
        </div>

        {/* Success Modal */}
        <Modal
          open={showSuccessModal}
          onOk={handleSuccessModalOk}
          onCancel={handleSuccessModalOk}
          className="success-modal"
          centered
          footer={[
            <Button key="ok" type="primary" onClick={handleSuccessModalOk} className="modal-confirm-btn">
              Xác nhận
            </Button>,
          ]}
          closeIcon={null}
          maskClosable={false}
        >
          <div className="success-content">
            <div className="success-icon">
              <CheckOutlined />
            </div>
            <Title level={3} className="success-title">
              ĐIỂM DANH THÀNH CÔNG
            </Title>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default TeacherAttendance
