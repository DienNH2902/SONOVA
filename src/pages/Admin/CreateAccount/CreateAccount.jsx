"use client"

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
} from "antd"
import { CloseOutlined, PlusOutlined } from "@ant-design/icons"
import { useState } from "react"
import "./CreateAccount.css"

const { Title } = Typography
const { TextArea } = Input

const CreateAccount = () => {
  const [form] = Form.useForm()
  const [courseDescription, setCourseDescription] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [accountInfo, setAccountInfo] = useState({ username: "", password: "" })

  const handleSubmit = (values) => {
    console.log("Form values:", values)

    const generatedPassword = "123456789" // Replace with actual logic if needed

    setAccountInfo({
      username: values.username,
      password: generatedPassword,
    })

    setIsModalVisible(true)
  }

  const clearCourseDescription = () => {
    setCourseDescription("")
    form.setFieldsValue({ courseDescription: "" })
  }

  const addCourse = () => {
    console.log("Add course clicked")
  }

  return (
    <div className="create-account-page">
      <div className="create-account-container">
        <Title level={1} className="page-title">
          Tạo tài khoản mới
        </Title>

        <Row gutter={[40, 0]} align="top">
          {/* Left Column - Form */}
          <Col xs={24} lg={14}>
            <div className="form-container">
              <Form form={form} layout="vertical" onFinish={handleSubmit} className="create-account-form">
                <Form.Item
                  label="Họ và tên"
                  name="fullName"
                  rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
                >
                  <Input placeholder="Nhập họ và tên" className="form-input" />
                </Form.Item>

                <Form.Item
                  label="Tên tài khoản"
                  name="username"
                  rules={[{ required: true, message: "Vui lòng nhập tên tài khoản" }]}
                >
                  <Input placeholder="Điền đúng tên người sử dụng" className="form-input" />
                </Form.Item>

                <Form.Item
                  label="Loại tài khoản"
                  name="accountType"
                  rules={[{ required: true, message: "Vui lòng chọn loại tài khoản" }]}
                >
                  <Radio.Group className="radio-group">
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
                  <Radio.Group className="radio-group">
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
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Vui lòng nhập email" },
                    { type: "email", message: "Email không hợp lệ" },
                  ]}
                >
                  <Input placeholder="Nhập email" className="form-input" />
                </Form.Item>

                <Form.Item label="Mô tả học" name="courseDescription">
                  <div className="textarea-container">
                    <TextArea
                      placeholder="Nhập mô tả khóa học"
                      className="form-textarea"
                      rows={4}
                      value={courseDescription}
                      onChange={(e) => setCourseDescription(e.target.value)}
                    />
                    {courseDescription && (
                      <Button
                        type="text"
                        icon={<CloseOutlined />}
                        className="clear-button"
                        onClick={clearCourseDescription}
                      />
                    )}
                  </div>
                </Form.Item>

                <div className="add-course-section">
                  <Button type="default" icon={<PlusOutlined />} onClick={addCourse} className="add-course-btn">
                    Thêm lớp học
                  </Button>
                </div>

                <Form.Item className="submit-section">
                  <Button type="primary" htmlType="submit" className="submit-btn">
                    Xác nhận
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>

          {/* Right Column - Image */}
          <Col xs={24} lg={10}>
            <div className="image-container">
              <img
                src="https://s3-us-west-1.amazonaws.com/contentlab.studiod/getty/737bfc64a68e418e911f79ed32128649.jpg"
                alt="Team collaboration"
                className="side-image"
              />
            </div>
          </Col>
        </Row>

        {/* Success Modal */}
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
              <p><strong>Tên tài khoản</strong><br />{accountInfo.username}</p>
              <p><strong>Mật khẩu</strong><br />{accountInfo.password}</p>
            </div>
            <Button type="primary" onClick={() => setIsModalVisible(false)}>
              Xác nhận
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default CreateAccount
