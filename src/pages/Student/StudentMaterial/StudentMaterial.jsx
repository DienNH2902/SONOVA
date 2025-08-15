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
  Spin, // Thêm Spin component
} from "antd";
import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "../../Admin/Materials/Materials.css";
import { useState, useEffect } from "react";

const { Title } = Typography;
const { Option } = Select;

const baseUrl =
  "https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api";

const StudentMaterials = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInstrumentIds, setUserInstrumentIds] = useState([]); // State mới để lưu instrumentId của học sinh

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
    const fetchAllData = async () => {
      // Lấy dữ liệu tài liệu và nhạc cụ như cũ
      await fetchInstruments();
      await fetchMaterials();

      // Logic mới: Lấy thông tin lớp học của học sinh để xác định nhạc cụ được xem
      try {
        const userString = localStorage.getItem("user");
        if (userString) {
          const userData = JSON.parse(userString);
          const userClassIds = userData?.classIds;

          if (userClassIds && userClassIds.length > 0) {
            const response = await fetch(`${baseUrl}/Class`);
            const allClasses = await response.json();
            
            // Lọc ra các lớp học của người dùng
            const userClasses = allClasses.filter((cls) =>
              userClassIds.includes(cls.classId)
            );

            // Lấy danh sách instrumentId duy nhất từ các lớp học của người dùng
            const instrumentIds = [
              ...new Set(userClasses.map((cls) => cls.instrumentId)),
            ];
            setUserInstrumentIds(instrumentIds);
          }
        }
      } catch (error) {
        message.error("Không thể xác định khoá học của bạn.");
        console.error("Error fetching user classes:", error);
      }
    };

    fetchAllData();
  }, []);

  const showModal = (instrumentId) => {
    setIsEditMode(false);
    setEditingRecord(null);
    form.resetFields();
    form.setFieldsValue({ instrumentId: instrumentId });
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
      fetchMaterials();
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
      fetchMaterials();
    } catch (error) {
      message.error(error.message);
    }
  };

  const pianoMaterials = materials.filter((m) => m.instrumentId === 2);
  const guitarMaterials = materials.filter((m) => m.instrumentId === 1);

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
  ];

  return (
    <div className="materials-page">
      <div className="materials-container">
        <Title level={1} className="page-title">
          Tài liệu
        </Title>
        <Spin spinning={loading} tip="Đang tải..." style={{ marginTop: '200px'}}>
          {/* Cập nhật: Chỉ hiển thị mục Piano nếu học sinh có đăng ký lớp Piano (instrumentId = 2) */}
          {userInstrumentIds.includes(2) && (
            <div className="materials-section">
              <Title level={2} className="section-title-piano-title-material">
                PIANO
              </Title>
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
          )}

          {/* Cập nhật: Chỉ hiển thị mục Guitar nếu học sinh có đăng ký lớp Guitar (instrumentId = 1) */}
          {userInstrumentIds.includes(1) && (
            <div className="materials-section">
              <Title level={2} className="section-title-guitar-title-material">
                GUITAR
              </Title>
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
          )}
        </Spin>
        
        {/* Modal for Add/Edit (giữ nguyên) */}
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

export default StudentMaterials;