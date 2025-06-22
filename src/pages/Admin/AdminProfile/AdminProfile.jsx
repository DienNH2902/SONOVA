"use client"

import { Row, Col, Avatar, Button, Typography, Card, Modal, Form, Input, App } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { useState } from "react"
import "./AdminProfile.css"

const { Title, Text } = Typography

const AdminProfile = () => {
  const { message: antdMessage } = App.useApp()
  const profileData = {
    name: "Nguyễn Khánh Như",
    role: "Admin",
    email: "khanhnhu2004@gmail.com",
    phone: "0986534887",
    address: "20 Hoàng Hữu Nam, Phường Tân Phú, TP. Thủ Đức TP.HCM",
    username: "adminnhu.sonova",
    avatar:
      "https://i0.wp.com/biztechcollege.com/wp-content/uploads/2022/02/Administrative-Assistant.png?fit=500%2C377&ssl=1",
  }

  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false)
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false)

  const openProfileModal = () => setIsProfileModalVisible(true)
  const closeProfileModal = () => setIsProfileModalVisible(false)

  const openPasswordModal = () => setIsPasswordModalVisible(true)
  const closePasswordModal = () => setIsPasswordModalVisible(false)

  const handleProfileSubmit = (values) => {
    antdMessage.success("Đã cập nhật thông tin cá nhân")
    closeProfileModal()
    console.log("Updated profile:", values)
  }

  const handlePasswordSubmit = (values) => {
    antdMessage.success("Đã cập nhật mật khẩu")
    closePasswordModal()
    console.log("Updated profile:", values)
  }

  return (
    <div className="admin-profile-main-page">
      <div className="admin-profile-main-container">
        <Title level={1} className="admin-profile-page-title">
          Tài khoản
        </Title>

        <Row gutter={[40, 40]} className="admin-profile-content">
          {/* Left Column */}
          <Col xs={24} lg={8}>
            <div className="admin-profile-card">
              <div className="admin-profile-avatar-section">
                <Avatar size={200} src={profileData.avatar} className="admin-profile-avatar" />
                <Button type="default" className="admin-profile-edit-avatar-btn">
                  Sửa
                </Button>
              </div>
              <div className="admin-profile-basic-info">
                <Title level={3} className="admin-profile-name">
                  {profileData.name}
                </Title>
                <Text className="admin-profile-role">{profileData.role}</Text>
              </div>
            </div>
          </Col>

          {/* Right Column */}
          <Col xs={24} lg={16}>
            <div className="admin-profile-details">
              <Card className="admin-profile-info-card">
                <div className="admin-profile-card-header">
                  <Title level={4} className="admin-profile-section-title">
                    Thông tin cá nhân
                  </Title>
                  <Button
                    type="default"
                    icon={<EditOutlined />}
                    className="admin-profile-edit-btn"
                    onClick={openProfileModal}
                  >
                    Sửa
                  </Button>
                </div>
                <div className="admin-profile-info-content">
                  <div className="admin-profile-info-row">
                    <Text className="admin-profile-info-label">Họ và tên</Text>
                    <Text className="admin-profile-info-value">{profileData.name}</Text>
                  </div>
                  <div className="admin-profile-info-row">
                    <Text className="admin-profile-info-label">Email</Text>
                    <Text className="admin-profile-info-value">{profileData.email}</Text>
                  </div>
                  <div className="admin-profile-info-row">
                    <Text className="admin-profile-info-label">Số điện thoại</Text>
                    <Text className="admin-profile-info-value">{profileData.phone}</Text>
                  </div>
                  <div className="admin-profile-info-row">
                    <Text className="admin-profile-info-label">Địa chỉ</Text>
                    <Text className="admin-profile-info-value">{profileData.address}</Text>
                  </div>
                </div>
              </Card>

              <Card className="admin-profile-info-card">
                <div className="admin-profile-card-header">
                  <Title level={4} className="admin-profile-section-title">
                    Tài khoản và mật khẩu
                  </Title>
                  <Button
                    type="default"
                    icon={<EditOutlined />}
                    className="admin-profile-edit-btn"
                    onClick={openPasswordModal}
                  >
                    Sửa
                  </Button>
                </div>
                <div className="admin-profile-info-content">
                  <div className="admin-profile-info-row">
                    <Text className="admin-profile-info-label">Tài khoản</Text>
                    <Text className="admin-profile-info-value">{profileData.username}</Text>
                  </div>
                  <div className="admin-profile-info-row">
                    <Text className="admin-profile-info-label">Mật khẩu</Text>
                    <Text className="admin-profile-info-value admin-profile-password-dots">••••••••••</Text>
                  </div>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>

      {/* Modal - Update Profile */}
      <Modal
        title="THAY ĐỔI THÔNG TIN CÁ NHÂN"
        open={isProfileModalVisible}
        onCancel={closeProfileModal}
        footer={null}
        centered
        className="admin-profile-modal"
      >
        <Form layout="vertical" onFinish={handleProfileSubmit}>
          <Form.Item label="Họ tên" name="name" initialValue={profileData.name}>
            <Input />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone" initialValue={profileData.phone}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" initialValue={profileData.email}>
            <Input />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address" initialValue={profileData.address}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="admin-profile-submit-btn">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal - Change Password */}
      <Modal
        title="THAY ĐỔI MẬT KHẨU"
        open={isPasswordModalVisible}
        onCancel={closePasswordModal}
        footer={null}
        centered
        className="admin-profile-modal"
      >
        <Form layout="vertical" onFinish={handlePasswordSubmit}>
          <Form.Item
            label="Nhập lại khẩu cũ"
            name="oldPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Xác nhận lại mật khẩu mới"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"))
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="admin-profile-submit-btn">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AdminProfile
