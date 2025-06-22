"use client"

import { Typography, Table, Button, Tabs, Form, Input, Modal, message } from "antd"
import { EditOutlined, PlusOutlined } from "@ant-design/icons"
import "./Materials.css"
import { useState } from "react"

const { Title } = Typography
const { TabPane } = Tabs

const Materials = () => {


const [isModalVisible, setIsModalVisible] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [form] = Form.useForm()
  const [currentType, setCurrentType] = useState("piano")
  const [editingRecord, setEditingRecord] = useState(null)

  const showModal = (type) => {
    setIsEditMode(false)
    setCurrentType(type)
    form.resetFields()
    setIsModalVisible(true)
  }

  const showEditModal = (record, type) => {
    setIsEditMode(true)
    setCurrentType(type)
    setEditingRecord(record)
    form.setFieldsValue({
      session: record.session,
      title: record.title,
      link: record.link,
    })
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleFinish = (values) => {
    const newRecord = {
      ...values,
      key: editingRecord ? editingRecord.key : Date.now().toString(),
    }

    const updateMaterials = (prev) => {
      if (isEditMode) {
        return prev.map((item) =>
          item.key === editingRecord.key ? { ...item, ...values } : item
        )
      } else {
        return [...prev, newRecord]
      }
    }

    if (currentType === "piano") {
      setPianoMaterials(updateMaterials)
      message
    } else {
      setGuitarMaterials(updateMaterials)
    }

    handleCancel()
  }


  // Piano materials data
  const [pianoMaterials, setPianoMaterials] = useState([
    {
      key: "1",
      session: 1,
      title: "Giới thiệu đàn piano và lý thế chơi",
      link: "https://drive.google.com/file/d/1k3BXCxfz6Ef",
    },
    {
      key: "2",
      session: 2,
      title: "Tư thế ngồi đàn và vị trí tay",
      link: "https://drive.google.com/file/d/7G8RfRu3KzL",
    },
    {
      key: "3",
      session: 3,
      title: "Kỹ thuật chạy ngón cơ bản",
      link: "https://drive.google.com/file/d/1k3BXCxfz6Ef",
    },
    {
      key: "4",
      session: 4,
      title: "Chơi giai điệu đơn giản",
      link: "https://drive.google.com/file/d/7G8RfRu3KzL",
    },
    {
      key: "5",
      session: 5,
      title: "Nốt đen và trắng",
      link: "https://drive.google.com/file/d/1k3BXCxfz6Ef",
    },
    {
      key: "6",
      session: 6,
      title: "Phối hợp hai tay",
      link: "https://drive.google.com/file/d/7G8RfRu3KzL",
    },
    {
      key: "7",
      session: 7,
      title: "Nhịp điệu và tiết tấu",
      link: "https://drive.google.com/file/d/1k3BXCxfz6Ef",
    },
    {
      key: "8",
      session: 8,
      title: "Chơi bài hát đơn giản",
      link: "https://drive.google.com/file/d/7G8RfRu3KzL",
    },
    {
      key: "9",
      session: 9,
      title: "Kỹ hiệu nhạc và quãng trong",
      link: "https://drive.google.com/file/d/1k3BXCxfz6Ef",
    },
    {
      key: "10",
      session: 10,
      title: "Chuyển hợp âm mượt mà",
      link: "https://drive.google.com/file/d/7G8RfRu3KzL",
    },
    {
      key: "11",
      session: 11,
      title: "Cách dùng pedal cơ bản",
      link: "https://drive.google.com/file/d/1k3BXCxfz6Ef",
    },
    {
      key: "12",
      session: 12,
      title: "Cải thiện kỹ thuật với gam âm",
      link: "https://drive.google.com/file/d/7G8RfRu3KzL",
    },
    {
      key: "13",
      session: 13,
      title: "Chuyển từ bài tiểu đến",
      link: "https://drive.google.com/file/d/1k3BXCxfz6Ef",
    },
    {
      key: "14",
      session: 14,
      title: "Biểu diễn và đánh giá",
      link: "https://drive.google.com/file/d/7G8RfRu3KzL",
    },
  ])

  // Guitar materials data
  const [guitarMaterials, setGuitarMaterials] = useState([
    {
      key: "1",
      session: 1,
      title: "Giới thiệu đàn guitar và lý thế chơi",
      link: "https://drive.google.com/file/d/1k3BXCxfz6Ef",
    },
    {
      key: "2",
      session: 2,
      title: "Tư thế ngồi đàn và vị trí tay",
      link: "https://drive.google.com/file/d/7G8RfRu3KzL",
    },
    {
      key: "3",
      session: 3,
      title: "Kỹ thuật chạy ngón cơ bản",
      link: "https://drive.google.com/file/d/1k3BXCxfz6Ef",
    },
    {
      key: "4",
      session: 4,
      title: "Chơi giai điệu đơn giản",
      link: "https://drive.google.com/file/d/7G8RfRu3KzL",
    },
    {
      key: "5",
      session: 5,
      title: "Nốt đen và trắng",
      link: "https://drive.google.com/file/d/1k3BXCxfz6Ef",
    },
    {
      key: "6",
      session: 6,
      title: "Phối hợp hai tay",
      link: "https://drive.google.com/file/d/7G8RfRu3KzL",
    },
    {
      key: "7",
      session: 7,
      title: "Nhịp điệu và tiết tấu",
      link: "https://drive.google.com/file/d/1k3BXCxfz6Ef",
    },
    {
      key: "8",
      session: 8,
      title: "Chơi bài hát đơn giản",
      link: "https://drive.google.com/file/d/7G8RfRu3KzL",
    },
    {
      key: "9",
      session: 9,
      title: "Kỹ hiệu nhạc và quãng trong",
      link: "https://drive.google.com/file/d/1k3BXCxfz6Ef",
    },
    {
      key: "10",
      session: 10,
      title: "Chuyển hợp âm mượt mà",
      link: "https://drive.google.com/file/d/7G8RfRu3KzL",
    },
    {
      key: "11",
      session: 11,
      title: "Cách dùng pedal cơ bản",
      link: "https://drive.google.com/file/d/1k3BXCxfz6Ef",
    },
    {
      key: "12",
      session: 12,
      title: "Cải thiện kỹ thuật với gam âm",
      link: "https://drive.google.com/file/d/7G8RfRu3KzL",
    },
    {
      key: "13",
      session: 13,
      title: "Chuyển từ bài tiểu đến",
      link: "https://drive.google.com/file/d/1k3BXCxfz6Ef",
    },
    {
      key: "14",
      session: 14,
      title: "Biểu diễn và đánh giá",
      link: "https://drive.google.com/file/d/7G8RfRu3KzL",
    },
  ])

  // Table columns configuration
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
      title: "Tên bài học",
      dataIndex: "title",
      key: "title",
      className: "title-column",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      className: "link-column",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer" className="material-link">
          {text}
        </a>
      ),
    },
    {
      title: "Buổi",
      key: "action",
      width: 80,
      align: "center",
      className: "action-column",
      render: (_, record) => (
        <Button type="default" icon={<EditOutlined />} size="small" className="edit-button" onClick={() => showEditModal(record, currentType)}>
          Sửa
        </Button>
      ),
    },
  ]


  return (
    <div className="materials-page">
      <div className="materials-container">
        <Title level={1} className="page-title">
          Tài liệu
        </Title>

        {/* Piano Materials Section */}
        <div className="materials-section">
          <Title level={2} className="section-title piano-title">
            PIANO
          </Title>

          <div className="table-container">
            <Table
              columns={columns}
              dataSource={pianoMaterials}
              pagination={false}
              className="materials-table"
              size="middle"
              rowClassName={(record, index) => (index % 2 === 0 ? "even-row" : "odd-row")}
            />
          </div>

          <div className="add-material-container">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => showModal("piano")}
              className="add-material-button"
            >
              Thêm tài liệu
            </Button>
          </div>
        </div>

        {/* Guitar Materials Section */}
        <div className="materials-section">
          <Title level={2} className="section-title guitar-title">
            GUITAR
          </Title>

          <div className="table-container">
            <Table
              columns={columns}
              dataSource={guitarMaterials}
              pagination={false}
              className="materials-table"
              size="middle"
              rowClassName={(record, index) => (index % 2 === 0 ? "even-row" : "odd-row")}
            />
          </div>

          <div className="add-material-container">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => showModal("guitar")}
              className="add-material-button"
            >
              Thêm tài liệu
            </Button>
          </div>



          {/* Modal for Add/Edit */}
        <Modal
          title={isEditMode ? "Cập nhật tài liệu" : "Thêm tài liệu"}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            {!isEditMode && (
              <Form.Item
                label="Buổi"
                name="session"
                rules={[{ required: true, message: "Vui lòng nhập buổi" }]}
              >
                <Input />
              </Form.Item>
            )}
            <Form.Item
              label="Tên bài học"
              name="title"
              rules={[{ required: true, message: "Vui lòng nhập tên bài học" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Link"
              name="link"
              rules={[{ required: true, message: "Vui lòng nhập link tài liệu" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        </div>
      </div>
    </div>
  )
}

export default Materials
