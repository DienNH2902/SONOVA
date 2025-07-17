import { Row, Col, Avatar, Button, Typography, Card, Modal, Form, Input, App, DatePicker, Select, Upload } from "antd"
import { EditOutlined, UploadOutlined } from "@ant-design/icons"
import { useState, useEffect, useRef } from "react"
import dayjs from "dayjs"
import "./AdminProfile.css"

const { Title, Text } = Typography
const { Option } = Select

const AdminProfile = () => {
  const { message: antdMessage } = App.useApp()
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false)
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false)
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [profileForm] = Form.useForm()
  const [passwordForm] = Form.useForm()
  const hasFetchedProfile = useRef(false)

  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      const user = localStorage.getItem("user")
      if (!user) {
        antdMessage.error("Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.")
        return
      }
      const userId = JSON.parse(user).userId
      const token = localStorage.getItem("token")

      if (!userId || !token) {
        antdMessage.error("Không tìm thấy thông tin đăng nhập. Vui lòng đăng nhập lại.")
        return
      }

      const response = await fetch(
        `https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/User/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

      if (!response.ok) {
        if (response.status === 401) {
          antdMessage.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.")
        } else {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return
      }

      const userData = await response.json()
      setProfileData(userData)
    } catch (error) {
      console.error("Error fetching user profile:", error)
      antdMessage.error(`Không thể tải thông tin người dùng: ${error.message || "Lỗi không xác định"}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!hasFetchedProfile.current) {
      hasFetchedProfile.current = true
      fetchUserProfile()
    }
  }, [])

  const openProfileModal = () => {
    if (profileData) {
      profileForm.setFieldsValue({
        accountName: profileData.accountName,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
        address: profileData.address,
        birthday: profileData.birthday ? dayjs(profileData.birthday) : null,
        genderId: profileData.genderId,
      })
      setAvatarPreview(profileData.avatarUrl)
      setAvatarFile(null)
    }
    setIsProfileModalVisible(true)
  }

  const closeProfileModal = () => {
    setIsProfileModalVisible(false)
    profileForm.resetFields()
    setAvatarFile(null)
    setAvatarPreview(null)
  }

  const openPasswordModal = () => {
    setIsPasswordModalVisible(true)
  }

  const closePasswordModal = () => {
    setIsPasswordModalVisible(false)
    passwordForm.resetFields()
  }

  const handleAvatarChange = (info) => {
    const file = info.file.originFileObj || info.file
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfileSubmit = async (values) => {
    try {
      const user = localStorage.getItem("user")
      if (!user) {
        antdMessage.error("Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.")
        return
      }
      const userId = JSON.parse(user).userId
      const token = localStorage.getItem("token")

      if (!userId || !token) {
        antdMessage.error("Không tìm thấy thông tin đăng nhập. Vui lòng đăng nhập lại.")
        return
      }

      const combinedData = { ...profileData }
      combinedData.accountName = values.accountName ?? combinedData.accountName
      combinedData.email = values.email ?? combinedData.email
      combinedData.phoneNumber = values.phoneNumber ?? combinedData.phoneNumber
      combinedData.address = values.address ?? combinedData.address
      combinedData.genderId = values.genderId ?? combinedData.genderId
      combinedData.birthday = values.birthday ? values.birthday.format("YYYY-MM-DD") : (combinedData.birthday || "")

      const formData = new FormData()
      formData.append("userId", userId)
      formData.append("accountName", combinedData.accountName || "")
      formData.append("email", combinedData.email || "")
      formData.append("phoneNumber", combinedData.phoneNumber || "")
      formData.append("address", combinedData.address || "")
      formData.append("birthday", combinedData.birthday || "")
      formData.append("genderId", combinedData.genderId || 3)
      formData.append("roleId", combinedData.roleId || 3)
            formData.append("role", combinedData.role || "student") // Giả sử role là "student" nếu không có


      if (avatarFile) {
        formData.append("avatarImageFile", avatarFile)
      }

      const response = await fetch(
        `https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/User/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      )

      if (response.ok) {
        antdMessage.success("Đã cập nhật thông tin cá nhân thành công!")
        closeProfileModal()
        fetchUserProfile()
      } else {
        const errorData = await response.json()
        console.error("Error updating profile:", errorData)
        antdMessage.error(`Cập nhật thông tin thất bại: ${errorData.message || response.statusText}`)
      }
    } catch (error) {
      console.error("Network error updating profile:", error)
      antdMessage.error(`Có lỗi xảy ra khi cập nhật thông tin: ${error.message || "Lỗi không xác định"}`)
    }
  }

  const handlePasswordSubmit = async (values) => {
  try {
    const user = localStorage.getItem("user")
    if (!user) {
      antdMessage.error("Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.")
      return
    }
    const userId = JSON.parse(user).userId
    const token = localStorage.getItem("token")

    if (!userId || !token) {
      antdMessage.error("Không tìm thấy thông tin đăng nhập. Vui lòng đăng nhập lại.")
      return
    }

    const formData = new FormData()
    formData.append("userId", userId)
    formData.append("accountName", profileData.accountName || "")
    formData.append("email", profileData.email || "")
    formData.append("phoneNumber", profileData.phoneNumber || "")
    formData.append("address", profileData.address || "")
    formData.append("birthday", profileData.birthday ? dayjs(profileData.birthday).format("YYYY-MM-DD") : "")
    formData.append("genderId", profileData.genderId || 3)
    formData.append("roleId", profileData.roleId || 3)
    formData.append("role", profileData.role || "student")

    formData.append("newPassword", values.newPassword)

    const response = await fetch(
      `https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/User/${userId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    )

    if (response.ok) {
      antdMessage.success("Đã cập nhật mật khẩu thành công!")
      closePasswordModal()
    } else {
      const errorData = await response.json()
      console.error("Error updating password:", errorData)
      antdMessage.error(`Cập nhật mật khẩu thất bại: ${errorData.message || response.statusText}`)
    }
  } catch (error) {
    console.error("Network error updating password:", error)
    antdMessage.error(`Có lỗi xảy ra khi cập nhật mật khẩu: ${error.message || "Lỗi không xác định"}`)
  }
}

  const getGenderText = (genderId) => {
    switch (genderId) {
      case 1:
        return "Nam"
      case 2:
        return "Nữ"
      case 3:
        return "Khác"
      default:
        return "Không xác định"
    }
  }

  const getRoleText = (roleId) => {
    switch (roleId) {
      case 1:
        return "Admin"
      case 2:
        return "Teacher"
      case 3:
        return "Student"
      default:
        return "Không xác định"
    }
  }

  if (loading) {
    return (
      <div className="admin-profile-main-page">
        <div className="admin-profile-main-container">
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            <Title level={3}>Đang tải thông tin...</Title>
          </div>
        </div>
      </div>
    )
  }

  if (!profileData) {
    return (
      <div className="admin-profile-main-page">
        <div className="admin-profile-main-container">
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            <Title level={3}>Không thể tải thông tin người dùng</Title>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-profile-main-page">
      <div className="admin-profile-main-container">
        <Title level={1} className="admin-profile-page-title">
          Tài khoản
        </Title>

        <Row gutter={[40, 40]} className="admin-profile-content">
          <Col xs={24} lg={8}>
            <div className="admin-profile-card">
              <div className="admin-profile-avatar-section">
                <Avatar
                  size={200}
                  src={profileData.avatarUrl || "/placeholder.svg?height=200&width=200"}
                  className="admin-profile-avatar"
                />
                <Button type="default" className="admin-profile-edit-avatar-btn" onClick={openProfileModal}>
                  Sửa
                </Button>
              </div>
              <div className="admin-profile-basic-info">
                <Title level={3} className="admin-profile-name">
                  {profileData.username || "Chưa cập nhật"}
                </Title>
                <Text className="admin-profile-role">{getRoleText(profileData.roleId)}</Text>
              </div>
            </div>
          </Col>

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
                    <Text className="admin-profile-info-value">{profileData.accountName || "Chưa cập nhật"}</Text>
                  </div>
                  <div className="admin-profile-info-row">
                    <Text className="admin-profile-info-label">Email</Text>
                    <Text className="admin-profile-info-value">{profileData.email || "Chưa cập nhật"}</Text>
                  </div>
                  <div className="admin-profile-info-row">
                    <Text className="admin-profile-info-label">Số điện thoại</Text>
                    <Text className="admin-profile-info-value">{profileData.phoneNumber || "Chưa cập nhật"}</Text>
                  </div>
                  <div className="admin-profile-info-row">
                    <Text className="admin-profile-info-label">Địa chỉ</Text>
                    <Text className="admin-profile-info-value">{profileData.address || "Chưa cập nhật"}</Text>
                  </div>
                  <div className="admin-profile-info-row">
                    <Text className="admin-profile-info-label">Ngày sinh</Text>
                    <Text className="admin-profile-info-value">
                      {profileData.birthday ? dayjs(profileData.birthday).format("DD/MM/YYYY") : "Chưa cập nhật"}
                    </Text>
                  </div>
                  <div className="admin-profile-info-row">
                    <Text className="admin-profile-info-label">Giới tính</Text>
                    <Text className="admin-profile-info-value">{getGenderText(profileData.genderId)}</Text>
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
                    <Text className="admin-profile-info-label">Tên đăng nhập</Text>
                    <Text className="admin-profile-info-value">{profileData.username || "Chưa cập nhật"}</Text>
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

      <Modal
        title="THAY ĐỔI THÔNG TIN CÁ NHÂN"
        open={isProfileModalVisible}
        onCancel={closeProfileModal}
        footer={null}
        centered
        className="admin-profile-modal"
        width={600}
      >
        <Form form={profileForm} layout="vertical" onFinish={handleProfileSubmit}>
          <Form.Item label="Ảnh đại diện" name="avatar">
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Avatar size={80} src={avatarPreview || profileData.avatarUrl} />
              <Upload
                accept="image/*"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleAvatarChange}
              >
                <Button icon={<UploadOutlined />}>Chọn ảnh mới</Button>
              </Upload>
            </div>
          </Form.Item>

          <Form.Item
            label="Họ tên"
            name="accountName"
            rules={[
              { required: true, message: "Vui lòng nhập họ tên!" },
              { min: 2, message: "Họ tên phải có ít nhất 2 ký tự!" },
            ]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập địa chỉ email" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              { pattern: /^(0[3|5|7|8|9])+([0-9]{8})$/, message: "Số điện thoại không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item label="Địa chỉ" name="address">
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>

          <Form.Item label="Ngày sinh" name="birthday">
            <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} placeholder="Chọn ngày sinh" />
          </Form.Item>

          <Form.Item
            label="Giới tính"
            name="genderId"
            rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
          >
            <Select placeholder="Chọn giới tính">
              <Option value={1}>Nam</Option>
              <Option value={2}>Nữ</Option>
              <Option value={3}>Khác</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="admin-profile-submit-btn" style={{ width: "100%" }}>
              Xác nhận cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="THAY ĐỔI MẬT KHẨU"
        open={isPasswordModalVisible}
        onCancel={closePasswordModal}
        footer={null}
        centered
        className="admin-profile-modal"
      >
        <Form form={passwordForm} layout="vertical" onFinish={handlePasswordSubmit}>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
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
            <Input.Password placeholder="Nhập lại mật khẩu mới" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="admin-profile-submit-btn" style={{ width: "100%" }}>
              Xác nhận thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AdminProfile