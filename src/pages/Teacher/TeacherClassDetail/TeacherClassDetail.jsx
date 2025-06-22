"use client"

import { Typography, Table, Button, Tag, Card } from "antd"
import { LeftOutlined, ArrowRightOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import "./TeacherCLassDetail.css"

const { Title, Text } = Typography

const TeacherClassDetail = () => {
  const navigate = useNavigate()

  const classInfo = {
    code: "K01 - PI - CB - 01",
    period: "24/03 - 30/5",
    level: "Lớp thứ 3 - 5",
    time: "Giờ học: 18:00-19:30",
  }

  const attendanceData = [
    {
      key: 1,
      session: 1,
      date: "01/06/2025",
      status: "completed",
    },
    {
      key: 2,
      session: 2,
      date: "04/06/2025",
      status: "completed",
    },
    {
      key: 3,
      session: 3,
      date: "06/06/2025",
      status: "completed",
    },
    {
      key: 4,
      session: 4,
      date: "09/06/2025",
      status: "completed",
    },
    {
      key: 5,
      session: 5,
      date: "11/06/2025",
      status: "in-progress",
    },
    {
      key: 6,
      session: 6,
      date: "14/06/2025",
      status: "upcoming",
    },
    {
      key: 7,
      session: 7,
      date: "16/06/2025",
      status: "upcoming",
    },
    {
      key: 8,
      session: 8,
      date: "18/06/2025",
      status: "upcoming",
    },
    {
      key: 9,
      session: 9,
      date: "20/06/2025",
      status: "upcoming",
    },
    {
      key: 10,
      session: 10,
      date: "22/06/2025",
      status: "upcoming",
    },
    {
      key: 11,
      session: 11,
      date: "26/06/2025",
      status: "upcoming",
    },
    {
      key: 12,
      session: 12,
      date: "28/06/2025",
      status: "upcoming",
    },
    {
      key: 13,
      session: 13,
      date: "30/06/2025",
      status: "upcoming",
    },
    {
      key: 14,
      session: 14,
      date: "01/07/2025",
      status: "upcoming",
    },
  ]

  const getStatusTag = (status) => {
    switch (status) {
      case "completed":
        return (
          <Tag className="status-tag completed-tag" color="default">
            Đã xong
          </Tag>
        )
      case "in-progress":
        return (
          <Tag className="status-tag progress-tag" color="green">
            Đang diễn ra
          </Tag>
        )
      case "upcoming":
        return (
          <Tag className="status-tag upcoming-tag" color="orange">
            Chưa diễn ra
          </Tag>
        )
      default:
        return null
    }
  }

  const columns = [
    {
      title: "Buổi",
      dataIndex: "session",
      key: "session",
      width: 80,
      align: "center",
      className: "session-column",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      width: 120,
      align: "center",
      className: "date-column",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 150,
      align: "center",
      render: (status) => getStatusTag(status),
      className: "status-column",
    },
    {
      title: "Danh sách học sinh",
      key: "students",
      align: "center",
      render: (_, record) => (
        <Button type="text" className="student-list-btn" icon={<ArrowRightOutlined /> } onClick={() => navigate("/teacher/class-detail/attendance")}>
          Danh sách
        </Button>
      ),
      className: "students-column",
    },
  ]

  const handleBack = () => {
    navigate("/teacher")
  }

  return (
    <div className="attendance-detail-page">
      <div className="attendance-detail-container">
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

          {/* Class Info Sidebar */}
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherClassDetail
