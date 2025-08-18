import {
  Form,
  Input,
  Radio,
  DatePicker,
  Button,
  Row,
  Col,
  Typography,
  Modal,
  Select,
  message,
} from "antd";
import { useState, useEffect } from "react";
import taotk from "../../../assets/taotk.png";
import "./CreateAccount.css";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;

const CreateAccount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accountInfo, setAccountInfo] = useState({ username: "", password: "" });
  const [availableClasses, setAvailableClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(false);

  const fetchClasses = async () => {
    setLoadingClasses(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        message.error("Không tìm thấy token xác thực. Vui lòng đăng nhập lại.");
        setLoadingClasses(false);
        return;
      }

      const response = await fetch("https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/Class", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          message.error("Phiên đăng nhập hết hạn hoặc không có quyền truy cập. Vui lòng đăng nhập lại.");
        } else {
          const errorBody = await response.text();
          console.error("Error response body for classes:", errorBody);
          throw new Error(`HTTP error! status: ${response.status} - ${errorBody || response.statusText}`);
        }
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setAvailableClasses(data);
      } else {
        setAvailableClasses([]);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
      message.error("Không thể tải danh sách lớp học.");
    } finally {
      setLoadingClasses(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleSubmit = async (values) => {
    console.log("Form values:", values);

    const roleIdMap = {
      admin: 1,
      teacher: 2,
      student: 3,
    };

    const genderIdMap = {
      male: 1,
      female: 2,
    };

    const formData = new FormData();

    formData.append("username", values.username);
    formData.append("accountName", values.fullName);
    formData.append("address", values.address);
    formData.append("password", "123456");
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("email", values.email);
    formData.append("roleId", roleIdMap[values.accountType]);
    formData.append("genderId", genderIdMap[values.gender]);

    if (values.dateOfBirth) {
      formData.append("birthday", moment(values.dateOfBirth).format("YYYY-MM-DD"));
    } else {
      formData.append("birthday", "");
    }

    if (values.classId) {
      formData.append("classId", values.classId.toString());
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        message.error("Không tìm thấy token xác thực. Vui lòng đăng nhập lại.");
        return;
      }

      const requestHeaders = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch("https://innovus-api-f8ajdzdzhda0hxge.japanwest-01.azurewebsites.net/api/User", {
        method: "POST",
        headers: requestHeaders,
        body: formData,
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("API Error Response:", errorBody);
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = JSON.parse(errorBody);
          errorMessage = errorData.message || errorData.error || errorData.detail || errorMessage;
        } catch (e) {
          errorMessage = errorBody || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const responseText = await response.text();
      let result = {};
      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch (e) {
          console.warn("Response is not valid JSON but status is OK:", responseText);
        }
      }

      setAccountInfo({
        username: values.username,
        password: "123456",
      });
      setIsModalVisible(true);
      form.resetFields();
      message.success("Tạo tài khoản thành công!");
    } catch (error) {
      console.error("Error creating account:", error);
      message.error(`Tạo tài khoản thất bại: ${error.message || "Lỗi không xác định"}`);
    }
  };

  return (
    <div className="create-account-page">
      <div className="create-account-container">
        <Title level={1} className="page-title">
          Tạo tài khoản mới
        </Title>

        <Row gutter={[40, 0]} align="top">
          <Col xs={24} lg={14}>
            <div className="form-container">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="create-account-form"
              >
                <Form.Item
                  label="Họ và tên"
                  className="form-item-create"
                  name="fullName"
                  rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
                >
                  <Input placeholder="Nhập họ và tên" className="form-input" />
                </Form.Item>

                <Form.Item
                  label="Tên đăng nhập"
                  name="username"
                  rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
                >
                  <Input placeholder="Tên đăng nhập" className="form-input" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Vui lòng nhập email" },
                    { type: "email", message: "Email không hợp lệ" },
                  ]}
                >
                  <Input placeholder="Nhập email" className="form-input" />
                </Form.Item>

                <Form.Item
                  label="Loại tài khoản"
                  name="accountType"
                  rules={[{ required: true, message: "Vui lòng chọn loại tài khoản" }]}
                >
                  <Radio.Group className="radio-group-create">
                    <Radio value="student">Học viên</Radio>
                    <Radio value="teacher">Giáo viên</Radio>
                    <Radio value="admin">Admin</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Ngày / tháng / năm sinh"
                  name="dateOfBirth"
                  rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
                >
                  <DatePicker placeholder="Chọn ngày sinh" className="form-input date-picker" format="DD/MM/YYYY" />
                </Form.Item>

                <Form.Item
                  label="Giới tính"
                  name="gender"
                  rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
                >
                  <Radio.Group className="radio-group-create">
                    <Radio value="male">Nam</Radio>
                    <Radio value="female">Nữ</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Số điện thoại"
                  name="phoneNumber"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" },
                    { pattern: /^[0-9]{10,11}$/, message: "Số điện thoại không hợp lệ" },
                  ]}
                >
                  <Input placeholder="Nhập số điện thoại" className="form-input" />
                </Form.Item>

                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
                >
                  <Input placeholder="Nhập địa chỉ" className="form-input" />
                </Form.Item>
                
                {/* Thay thế Form.List bằng Form.Item và Select */}
                <Form.Item
                  label="Mã lớp học (Không bắt buộc)"
                  name="classId"
                  // rules={[
                  //   ({ getFieldValue }) => ({
                  //     validator(_, value) {
                  //       const accountType = getFieldValue('accountType');
                  //       if ((accountType === 'student' || accountType === 'teacher') && !value) {
                  //         return Promise.reject(new Error('Vui lòng chọn mã lớp học!'));
                  //       }
                  //       return Promise.resolve();
                  //     },
                  //   }),
                  // ]}
                >
                  <Select
                    placeholder="Chọn mã lớp học"
                    className="form-input-create"
                    loading={loadingClasses}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    allowClear
                  >
                    {availableClasses.map((cls) => (
                      <Option key={cls.classId} value={cls.classId}>
                        {cls.classCode}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item className="submit-section">
                  <Button type="primary" htmlType="submit" className="submit-btn">
                    Xác nhận
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>

          <Col xs={24} lg={10}>
            <div className="image-container">
              <img src={taotk} alt="Team collaboration" className="side-image" loading="lazy" />
            </div>
          </Col>
        </Row>

        <Modal
          open={isModalVisible}
          footer={null}
          closable={false}
          centered
          className="registration-success-modal"
        >
          <div className="success-content">
            <h2>ĐĂNG KÝ THÀNH CÔNG</h2>
            <div className="check-icon">✔️</div>
            <p>Bạn đã tạo tài khoản thành công</p>
            <div className="info-box">
              <p>
                <strong>Tên tài khoản</strong>
                <br />
                {accountInfo.username}
              </p>
              <p>
                <strong>Mật khẩu</strong>
                <br />
                {accountInfo.password}
              </p>
            </div>
            <Button type="primary" onClick={() => setIsModalVisible(false)}>
              Xác nhận
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CreateAccount;