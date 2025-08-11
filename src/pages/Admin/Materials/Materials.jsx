"use client";

import {
  Typography,
  Table,
  Button,
  Form,
  Input,
  Modal,
  message,
  Select,
  Popconfirm,
  Space,
} from "antd";
import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./Materials.css";
import { useState, useEffect } from "react";

const { Title } = Typography;
const { Option } = Select;
const { confirm } = Modal;

const baseUrl =
  "https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api";

const Materials = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  const fetchInstruments = async () => {
    try {
      const response = await fetch(`${baseUrl}/Instrument`);
      const data = await response.json();
      setInstruments(data);
    } catch (error) {
      message.error("Không thể tải danh sách nhạc cụ.");
      console.error("Error fetching instruments:", error);
    }
  };

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/Document`);
      const data = await response.json();
      setMaterials(data);
    } catch (error) {
      message.error("Không thể tải danh sách tài liệu.");
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstruments();
    fetchMaterials();
  }, []);

  const showModal = (instrumentId) => {
    setIsEditMode(false);
    setEditingRecord(null);
    form.resetFields();
    form.setFieldsValue({ instrumentId: instrumentId }); // Đặt giá trị mặc định cho nhạc cụ
    setIsModalVisible(true);
  };

  const showEditModal = (record) => {
    setIsEditMode(true);
    setEditingRecord(record);
    form.setFieldsValue({
      lesson: record.lesson,
      lessonName: record.lessonName,
      link: record.link,
      instrumentId: record.instrumentId,
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFinish = async (values) => {
    try {
      let response;
      if (isEditMode) {
        // Thêm documentId vào payload khi ở chế độ chỉnh sửa
        const payload = {
          documentId: editingRecord.documentId,
          ...values,
        };
        response = await fetch(`${baseUrl}/Document/${editingRecord.documentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch(`${baseUrl}/Document`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
      }

      if (!response.ok) {
        throw new Error("Lỗi khi lưu tài liệu.");
      }

      message.success(`Đã ${isEditMode ? "cập nhật" : "thêm"} tài liệu thành công!`);
      handleCancel();
      fetchMaterials(); // Reload data
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleDeleteMaterial = async (documentId) => {
    try {
      const response = await fetch(`${baseUrl}/Document/${documentId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Lỗi khi xóa tài liệu.");
      }
      message.success("Đã xóa tài liệu thành công!");
      fetchMaterials(); // Reload data
    } catch (error) {
      message.error(error.message);
    }
  };

  const pianoMaterials = materials.filter((m) => m.instrumentId === 2);
  const guitarMaterials = materials.filter((m) => m.instrumentId === 1);

  // Table columns configuration
  const columns = [
    {
      title: "Buổi",
      dataIndex: "lesson",
      key: "lesson",
      width: 80,
      align: "center",
      className: "session-column",
    },
    {
      title: "Tên bài học",
      dataIndex: "lessonName",
      key: "lessonName",
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
      title: "Thao tác",
      key: "action",
      width: 120,
      align: "center",
      className: "action-column",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="default"
            icon={<EditOutlined />}
            size="small"
            className="edit-button-material"
            onClick={() => showEditModal(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDeleteMaterial(record.documentId)}
            okText="Có"
            cancelText="Không"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
              className="delete-button-material"
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="materials-page">
      <div className="materials-container">
        <Title level={1} className="page-title">
          Tài liệu
        </Title>
        {/* Piano Materials Section */}
        <div className="materials-section">
          <Title level={2} className="section-title-piano-title-material">
            PIANO
          </Title>
          <div className="add-material-container">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => showModal(2)} // instrumentId = 2 cho Piano
              className="add-material-button"
            >
              Thêm tài liệu
            </Button>
          </div>
          <div className="table-container">
            <Table
              columns={columns}
              dataSource={pianoMaterials}
              pagination={false}
              className="materials-table"
              size="middle"
              rowClassName={(record, index) =>
                index % 2 === 0 ? "even-row" : "odd-row"
              }
              loading={loading}
            />
          </div>
        </div>

        {/* Guitar Materials Section */}
        <div className="materials-section">
          <Title level={2} className="section-title-guitar-title-material">
            GUITAR
          </Title>
          <div className="add-material-container">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => showModal(1)} // instrumentId = 1 cho Guitar
              className="add-material-button"
            >
              Thêm tài liệu
            </Button>
          </div>
          <div className="table-container">
            <Table
              columns={columns}
              dataSource={guitarMaterials}
              pagination={false}
              className="materials-table"
              size="middle"
              rowClassName={(record, index) =>
                index % 2 === 0 ? "even-row" : "odd-row"
              }
              loading={loading}
            />
          </div>
        </div>
        
        {/* Modal for Add/Edit */}
        <Modal
          title={isEditMode ? "Cập nhật tài liệu" : "Thêm tài liệu"}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item
              label="Buổi"
              name="lesson"
              rules={[{ required: true, message: "Vui lòng nhập buổi" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Tên bài học"
              name="lessonName"
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
            {isEditMode ? (
              <Form.Item
                label="Nhạc cụ"
                name="instrumentId"
                rules={[{ required: true, message: "Vui lòng chọn nhạc cụ" }]}
              >
                <Select placeholder="Chọn nhạc cụ">
                  {instruments.map((instrument) => (
                    <Option
                      key={instrument.instrumentId}
                      value={instrument.instrumentId}
                    >
                      {instrument.instrumentName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            ) : (
              // Trường này chỉ dùng để truyền giá trị khi thêm mới
              <Form.Item name="instrumentId" noStyle>
                <Input type="hidden" />
              </Form.Item>
            )}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Materials;