// import { Layout, Menu, Button, Avatar, Dropdown } from "antd"
// import { UserOutlined } from "@ant-design/icons"
// import { useNavigate, useLocation } from "react-router-dom"
// import { useEffect, useState } from "react"
// import "./Header.css"

// const { Header: AntHeader } = Layout

// const Header = () => {
//   const navigate = useNavigate()
//   const location = useLocation()

//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user")
//     if (storedUser) {
//       setUser(JSON.parse(storedUser))
//     }
//   }, [location]) // Update when route changes

//   const handleMenuClick = (e) => {
//     if (e.key !== "submenu") {
//       navigate(e.key)
//     }
//   }

//   const handleLogin = () => {
//     navigate("/login")
//   }

//   const handleRegister = () => {
//     navigate("/register") // You can create this later
//   }

//   const handleAvatarClick = () => {
//     if (!user) return
//     switch (user.role) {
//       case "admin":
//         navigate("/admin")
//         break
//       case "teacher":
//         navigate("/teacher")
//         break
//       case "student":
//         navigate("/student")
//         break
//       case "guest":
//         navigate("/")
//         break
//       default:
//         navigate("/")
//     }
//   }

//   const menuItems = [
//     {
//       key: "/",
//       label: "Trang chủ",
//     },
//     {
//       key: "/about",
//       label: "Giới thiệu",
//     },
//     {
//       key: "submenu",
//       label: "Khóa học",
//       children: [
//         {
//           key: "/course/piano-basic",
//           label: "Piano Căn bản",
//         },
//         {
//           key: "/course/piano-advanced",
//           label: "Piano Nâng cao",
//         },
//         {
//           key: "/course/guitar-basic",
//           label: "Guitar Căn bản",
//         },
//         {
//           key: "/course/guitar-advanced",
//           label: "Guitar Nâng cao",
//         },
//       ],
//     },
//     {
//       key: "/contact",
//       label: "Liên hệ & Tư vấn",
//     },
//   ]

//   return (
//     <AntHeader className="header">
//       <div className="header-content">

//         <Menu
//           mode="horizontal"
//           selectedKeys={[location.pathname]}
//           items={menuItems}
//           onClick={handleMenuClick}
//           className="header-menu"
//         />

//         <div className="header-logo">
//           <span className="logo-text">SONOVA</span>
//         </div>

//         <div className="header-user">
//           {user ? (
//             <div
//               className="user-info"
//               onClick={handleAvatarClick}
//               style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontFamily: "Gilroy, sans-serif", fontSize: 16, lineHeight: "24px", fontWeight: 400 }}
//             >
//               <Avatar icon={<UserOutlined />} />
//               <span style={{ color: "#fff" }}>{user.username}</span>
//             </div>
//           ) : (
//             <>
//               <Button type="text" onClick={handleLogin} style={{ color: "#fff",  fontFamily: "Gilroy, sans-serif", fontSize: 16, lineHeight: "24px", fontWeight: 400 }}>
//                 Đăng nhập
//               </Button>
//               <Button type="text" onClick={handleRegister} style={{ color: "#fff",  fontFamily: "Gilroy, sans-serif", fontSize: 16, lineHeight: "24px", fontWeight: 400 }}>
//                 Đăng ký
//               </Button>
//             </>
//           )}
//         </div>
//       </div>
//     </AntHeader>
//   )
// }

// export default Header
import { Layout, Menu, Button, Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import "./Header.css"

const { Header: AntHeader } = Layout

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [user, setUser] = useState(null)
  const [hideHeader, setHideHeader] = useState(false)
  const [lastScrollTop, setLastScrollTop] = useState(0)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [location])

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY

      if (currentScroll > lastScrollTop && currentScroll > 100) {
        setHideHeader(true)
      } else {
        setHideHeader(false)
      }

      setLastScrollTop(currentScroll)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollTop])

  const handleMenuClick = (e) => {
    if (e.key !== "submenu") {
      navigate(e.key)
    }
  }

  const handleLogin = () => navigate("/login")
  const handleRegister = () => navigate("/register")

  const handleAvatarClick = () => {
    if (!user) return
    switch (user.role) {
      case "admin":
        navigate("/admin")
        break
      case "teacher":
        navigate("/teacher")
        break
      case "student":
        navigate("/student")
        break
      case "guest":
      default:
        navigate("/")
    }
  }

  const menuItems = [
    { key: "/", label: "Trang chủ" },
    { key: "/about", label: "Giới thiệu" },
    {
      key: "submenu",
      label: "Khóa học",
      children: [
        { key: "/course/piano-basic", label: "Piano Căn bản" },
        { key: "/course/piano-advanced", label: "Piano Nâng cao" },
        { key: "/course/guitar-basic", label: "Guitar Căn bản" },
        { key: "/course/guitar-advanced", label: "Guitar Nâng cao" },
      ],
    },
    { key: "/contact", label: "Liên hệ & Tư vấn" },
  ]

  return (
    <AntHeader className={`header ${hideHeader ? "header-hidden" : ""}`}>
      <div className="header-content">
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          className="header-menu"
        />

        <div className="header-logo">
          <span className="logo-text" onClick={() => navigate("/")}>SONOVA</span>
        </div>

        <div className="header-user">
          {user ? (
            <div
              className="user-info"
              onClick={handleAvatarClick}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "Gilroy, sans-serif",
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: 400,
              }}
            >
              <Avatar icon={<UserOutlined />} />
              <span style={{ color: "#fff" }}>{user.username}</span>
            </div>
          ) : (
            <>
              <Button type="text" onClick={handleLogin} style={{ color: "#fff" }}>
                Đăng nhập
              </Button>
              <Button type="text" onClick={handleRegister} style={{ color: "#fff" }}>
                Đăng ký
              </Button>
            </>
          )}
        </div>
      </div>
    </AntHeader>
  )
}

export default Header
