"use client"

import { Typography, Table, Button, Tag, Form, App, Modal, Input, DatePicker, Select, Space } from "antd"
import { PlusOutlined, FilterOutlined } from "@ant-design/icons"
import "./CourseSchedule.css"
import { useState } from "react"

const { Title } = Typography
const { Option } = Select

const CourseSchedule = () => {
  const [basicModalVisible, setBasicModalVisible] = useState(false)
  const [advancedModalVisible, setAdvancedModalVisible] = useState(false)
  const [subjectFilter, setSubjectFilter] = useState("")
  const [teacherFilter, setTeacherFilter] = useState("")
  const { message } = App.useApp()
  const [form] = Form.useForm()

  const handleAddClass = (type) => {
    if (type === "basic") setBasicModalVisible(true)
    else setAdvancedModalVisible(true)
  }

  const handleModalSubmit = (values) => {
    message.success("Đã thêm lớp học thành công!")
    console.log("Submitted class data:", values)
    form.resetFields()
    setBasicModalVisible(false)
    setAdvancedModalVisible(false)
  }

  const handleModalCancel = () => {
    form.resetFields()
    setBasicModalVisible(false)
    setAdvancedModalVisible(false)
  }

  const clearFilters = () => {
    setSubjectFilter("")
    setTeacherFilter("")
  }

  // Basic Classes Data
  const basicClassesData = [
    {
      key: "1",
      stt: 1,
      subject: "Piano",
      teacher: "Nguyễn Văn A",
      classCode: "K01-PI-CB-01",
      startDate: "01/04/2025",
      endDate: "30/06/2025",
      schedule: "Thứ 2, 6 (18:00 - 19:30)",
      capacity: "6/10",
    },
    {
      key: "2",
      stt: 2,
      subject: "Guitar",
      teacher: "Trần Thị B",
      classCode: "K01-GU-CB-02",
      startDate: "15/04/2025",
      endDate: "15/07/2025",
      schedule: "Thứ 3, 7 (19:00 - 20:30)",
      capacity: "9/10",
    },
    {
      key: "3",
      stt: 3,
      subject: "Piano",
      teacher: "Lê Văn C",
      classCode: "K01-PI-CB-03",
      startDate: "01/06/2025",
      endDate: "01/09/2025",
      schedule: "Thứ 2, 6 (18:00 - 19:30)",
      capacity: "7/10",
    },
    {
      key: "4",
      stt: 4,
      subject: "Guitar",
      teacher: "Trần Thị B",
      classCode: "K01-GU-CB-04",
      startDate: "15/06/2025",
      endDate: "15/09/2025",
      schedule: "Thứ 3, 7 (19:00 - 20:30)",
      capacity: "3/10",
    },
    {
      key: "5",
      stt: 5,
      subject: "Piano",
      teacher: "Nguyễn Văn A",
      classCode: "K01-PI-CB-05",
      startDate: "01/08/2025",
      endDate: "01/11/2025",
      schedule: "Thứ 2, 6 (18:00 - 19:30)",
      capacity: "4/10",
    },
    {
      key: "6",
      stt: 6,
      subject: "Guitar",
      teacher: "Phạm Văn D",
      classCode: "K01-GU-CB-06",
      startDate: "15/08/2025",
      endDate: "15/11/2025",
      schedule: "Thứ 3, 7 (19:00 - 20:30)",
      capacity: "6/10",
    },
  ]

  // Advanced Classes Data
  const advancedClassesData = [
    {
      key: "1",
      stt: 1,
      subject: "Piano",
      teacher: "Nguyễn Văn A",
      classCode: "K01-PI-NC-01",
      startDate: "01/04/2025",
      endDate: "30/06/2025",
      schedule: "Thứ 2, 6 (18:00 - 19:30)",
      capacity: "6/10",
    },
    {
      key: "2",
      stt: 2,
      subject: "Guitar",
      teacher: "Trần Thị B",
      classCode: "K01-GU-NC-02",
      startDate: "15/04/2025",
      endDate: "15/07/2025",
      schedule: "Thứ 3, 7 (19:00 - 20:30)",
      capacity: "9/10",
    },
  ]

  // Filter data function
  const filterData = (data) => {
    return data.filter((item) => {
      const matchSubject = !subjectFilter || item.subject === subjectFilter
      const matchTeacher = !teacherFilter || item.teacher === teacherFilter
      return matchSubject && matchTeacher
    })
  }

  // Get unique subjects and teachers for filter options
  const allData = [...basicClassesData, ...advancedClassesData]
  const subjects = [...new Set(allData.map((item) => item.subject))]
  const teachers = [...new Set(allData.map((item) => item.teacher))]

  // Table columns configuration
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
      align: "center",
      className: "stt-column",
    },
    {
      title: "Môn học",
      dataIndex: "subject",
      key: "subject",
      width: 100,
      render: (text) => (
        <Tag color={text === "Piano" ? "blue" : "green"} className="subject-tag">
          {text}
        </Tag>
      ),
    },
    {
      title: "Giảng viên",
      dataIndex: "teacher",
      key: "teacher",
      width: 140,
    },
    {
      title: "Mã lớp",
      dataIndex: "classCode",
      key: "classCode",
      width: 140,
    },
    {
      title: "Thời gian",
      key: "duration",
      width: 180,
      render: (_, record) => (
        <span className="duration-text">
          {record.startDate} - {record.endDate}
        </span>
      ),
    },
    {
      title: "Lịch học",
      dataIndex: "schedule",
      key: "schedule",
      width: 180,
    },
    {
      title: "Số lượng",
      dataIndex: "capacity",
      key: "capacity",
      width: 100,
      align: "center",
      render: (text) => {
        const [current, total] = text.split("/")
        const percentage = (Number.parseInt(current) / Number.parseInt(total)) * 100
        let color = "green"
        if (percentage >= 80) color = "red"
        else if (percentage >= 60) color = "orange"
        return <span className={`capacity-text capacity-${color}`}>{text}</span>
      },
    },
  ]

  return (
    <div className="course-schedule-page">
      <div className="course-schedule-container">
        <Title level={1} className="page-title">
          Lịch khai giảng
        </Title>

        {/* Filter Section */}
        <div className="filter-section">
          <Space size="middle" wrap>
            <div className="filter-item">
              <label>Môn học:</label>
              <Select
                placeholder="Chọn môn học"
                style={{ width: 150 }}
                value={subjectFilter}
                onChange={setSubjectFilter}
                allowClear
              >
                {subjects.map((subject) => (
                  <Option key={subject} value={subject}>
                    {subject}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="filter-item">
              <label>Giảng viên:</label>
              <Select
                placeholder="Chọn giảng viên"
                style={{ width: 180 }}
                value={teacherFilter}
                onChange={setTeacherFilter}
                allowClear
              >
                {teachers.map((teacher) => (
                  <Option key={teacher} value={teacher}>
                    {teacher}
                  </Option>
                ))}
              </Select>
            </div>
            <Button icon={<FilterOutlined />} onClick={clearFilters} className="clear-filter-btn">
              Xóa bộ lọc
            </Button>
          </Space>
        </div>

        {/* Basic Classes Section */}
        <div className="schedule-section">
          <div className="section-header">
            <Title level={2} className="section-title basic-title">
              LỚP CƠ BẢN
            </Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleAddClass("basic")}
              className="add-button"
            >
              Thêm
            </Button>
          </div>
          <div className="table-container">
            <Table
              columns={columns}
              dataSource={filterData(basicClassesData)}
              pagination={false}
              className="schedule-table"
              size="middle"
            />
          </div>
        </div>

        {/* Advanced Classes Section */}
        <div className="schedule-section">
          <div className="section-header">
            <Title level={2} className="section-title advanced-title">
              LỚP NÂNG CAO
            </Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleAddClass("advanced")}
              className="add-button"
            >
              Thêm
            </Button>
          </div>
          <div className="table-container">
            <Table
              columns={columns}
              dataSource={filterData(advancedClassesData)}
              pagination={false}
              className="schedule-table"
              size="middle"
            />
          </div>
        </div>

        {/* Modal Form Shared for Both Types */}
        <Modal
          open={basicModalVisible || advancedModalVisible}
          onCancel={handleModalCancel}
          onOk={() => form.submit()}
          title={basicModalVisible ? "THÊM LỚP HỌC CƠ BẢN" : "THÊM LỚP HỌC NÂNG CAO"}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <Form form={form} layout="vertical" onFinish={handleModalSubmit}>
            <Form.Item name="classCode" label="Mã lớp" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="subject" label="Môn học" rules={[{ required: true }]}>
              <Select placeholder="Chọn môn học">
                <Option value="Piano">Piano</Option>
                <Option value="Guitar">Guitar</Option>
              </Select>
            </Form.Item>
            <Form.Item name="teacher" label="Giảng viên" rules={[{ required: true }]}>
              <Select placeholder="Chọn giảng viên">
                <Option value="Nguyễn Văn A">Nguyễn Văn A</Option>
                <Option value="Trần Thị B">Trần Thị B</Option>
                <Option value="Lê Văn C">Lê Văn C</Option>
                <Option value="Phạm Văn D">Phạm Văn D</Option>
              </Select>
            </Form.Item>
            <Form.Item name="startDate" label="Khai giảng" rules={[{ required: true }]}>
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="endDate" label="Kết thúc" rules={[{ required: true }]}>
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="schedule" label="Lịch học" rules={[{ required: true }]}>
              <Input placeholder="VD: Thứ 2, 6 (18:00 - 19:30)" />
            </Form.Item>
            <Form.Item name="capacity" label="Sức chứa" rules={[{ required: true }]}>
              <Input placeholder="VD: 10" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  )
}

export default CourseSchedule
