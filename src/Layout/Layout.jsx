// import { Layout as AntLayout } from "antd";
// import { Outlet } from "react-router-dom";
// import Header from "../components/Header/Header.jsx";
// import Footer from "../components/Footer/Footer.jsx";
// import Sidebar from "../components/Sidebar/Sidebar.jsx";
// import "./Layout.css";

// const { Content } = AntLayout;

// const Layout = () => {

//   return (
//     <AntLayout className="layout">
//       <Header className="header-layout" />
//       <AntLayout className="layout-content">
//         <Sidebar />
//         <Content className="main-content" style={{ paddingTop: "63px" }}>
//           <Outlet />
//         </Content>
//       </AntLayout>
//       <Footer />
//     </AntLayout>
//   );
// };

// export default Layout;
"use client"

import { Layout as AntLayout, Modal, Button } from "antd"
import { PhoneOutlined } from "@ant-design/icons"
import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import Header from "../components/Header/Header.jsx"
import Footer from "../components/Footer/Footer.jsx"
import Sidebar from "../components/Sidebar/Sidebar.jsx"
import "./Layout.css"

const { Content } = AntLayout

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showPhoneModal, setShowPhoneModal] = useState(false)

  // Check login status from localStorage
  useEffect(() => {
    const checkLoginStatus = () => {
      const token =
        localStorage.getItem("token") || localStorage.getItem("authToken") || localStorage.getItem("userToken")
      const username = localStorage.getItem("username") || localStorage.getItem("user")

      setIsLoggedIn(!!(token || username))
    }

    checkLoginStatus()

    // Listen for storage changes (login/logout from other tabs)
    const handleStorageChange = () => {
      checkLoginStatus()
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const handlePhoneClick = () => {
    setShowPhoneModal(true)
  }

  const handleModalClose = () => {
    setShowPhoneModal(false)
  }

  const phoneNumber = "0123-456-789" // Replace with your actual phone number

  return (
    <AntLayout className="layout">
      <Header className="header-layout" />
      <AntLayout className="layout-content">
        <Sidebar />
        <Content className="main-content" style={{ paddingTop: "63px" }}>
          <Outlet />
        </Content>
      </AntLayout>
      <Footer />

      {/* Floating Phone Button - Only show if not logged in */}
      {!isLoggedIn && (
        <div className="floating-phone-container">
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<PhoneOutlined />}
            className="floating-phone-btn"
            onClick={handlePhoneClick}
            title="Liên hệ tư vấn"
          />
          <div className="phone-tooltip">Cần hỗ trợ?</div>
        </div>
      )}

      {/* Phone Number Modal */}
      <Modal
        title="Liên hệ tư vấn"
        open={showPhoneModal}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Đóng
          </Button>,
          <Button key="call" type="primary" icon={<PhoneOutlined />} onClick={() => window.open(`tel:${phoneNumber}`)}>
            Gọi ngay
          </Button>,
        ]}
        centered
        width={400}
      >
        <div className="phone-modal-content">
          <div className="phone-icon-large">
            <PhoneOutlined />
          </div>
          <div className="phone-info">
            <h3>Hotline tư vấn</h3>
            <div className="phone-number-display">{phoneNumber}</div>
            <p className="phone-description">Liên hệ với chúng tôi để được tư vấn miễn phí về các khóa học âm nhạc</p>
            <div className="working-hours">
              <strong>Giờ làm việc:</strong>
              <br />
              Thứ 2 - Thứ 6: 8:00 - 18:00
              <br />
              Thứ 7 - Chủ nhật: 9:00 - 17:00
            </div>
          </div>
        </div>
      </Modal>
    </AntLayout>
  )
}

export default Layout
