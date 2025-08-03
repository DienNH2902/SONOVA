// import { Layout, Menu, Button, Avatar } from "antd"
// import { UserOutlined } from "@ant-design/icons"
// import { useNavigate, useLocation } from "react-router-dom"
// import { useEffect, useState } from "react"
// import "./Header.css"

// const { Header: AntHeader } = Layout

// const Header = () => {
//   const navigate = useNavigate()
//   const location = useLocation()

//   const [user, setUser] = useState(null)
//   const [hideHeader, setHideHeader] = useState(false)
//   const [lastScrollTop, setLastScrollTop] = useState(0)

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user")
//     if (storedUser) {
//       setUser(JSON.parse(storedUser))
//     }
//   }, [location])

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScroll = window.scrollY
//       if (currentScroll > lastScrollTop && currentScroll > 100) {
//         setHideHeader(true)
//       } else {
//         setHideHeader(false)
//       }
//       setLastScrollTop(currentScroll)
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [lastScrollTop])

//   const handleMenuClick = (e) => {
//     if (e.key !== "submenu") {
//       navigate(e.key)
//     }
//   }

//   const handleLogin = () => navigate("/login")
//   const handleRegister = () => navigate("/register")

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
//       default:
//         navigate("/")
//     }
//   }

//   const menuItems = [
//     { key: "/", label: "Trang chủ" },
//     { key: "/about", label: "Giới thiệu" },
//     {
//       key: "submenu",
//       label: "Khóa học",
//       children: [
//         { key: "/course/piano-basic", label: "Piano Căn bản" },
//         { key: "/course/piano-advanced", label: "Piano Nâng cao" },
//         { key: "/course/guitar-basic", label: "Guitar Căn bản" },
//         { key: "/course/guitar-advanced", label: "Guitar Nâng cao" },
//       ],
//     },
//     { key: "/contact", label: "Liên hệ & Tư vấn" },
//   ]

//   return (
//     <AntHeader className={`header ${hideHeader ? "header-hidden" : ""}`}>
//       <div className="header-content">
//         <Menu
//           mode="horizontal"
//           selectedKeys={[location.pathname]}
//           items={menuItems}
//           onClick={handleMenuClick}
//           className="header-menu"
//         />

//         <div className="header-logo">
//           <span className="logo-text" onClick={() => navigate("/")}>SONOVA</span>
//         </div>

//         <div className="header-user">
//           {user ? (
//             <div
//               className="user-info"
//               onClick={handleAvatarClick}
//               style={{
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 8,
//                 fontFamily: "Gilroy, sans-serif",
//                 fontSize: 16,
//                 lineHeight: "24px",
//                 fontWeight: 400,
//               }}
//             >
//               {/* Logic mới ở đây */}
//               {user.avatarUrl ? (
//                 <Avatar src={user.avatarUrl} alt="User Avatar" />
//               ) : (
//                 <Avatar icon={<UserOutlined />} />
//               )}
//               <span style={{ color: "#fff" }}>{user.displayName}</span>
//             </div>
//           ) : (
//             <>
//               <Button type="text" onClick={handleLogin} style={{ color: "#fff" }}>
//                 Đăng nhập
//               </Button>
//               {/* <Button type="text" onClick={handleRegister} style={{ color: "#fff" }}>
//                 Đăng ký
//               </Button> */}
//             </>
//           )}
//         </div>
//       </div>
//     </AntHeader>
//   )
// }

// export default Header;
import { Layout, Menu, Button, Avatar, Drawer } from "antd";
import { UserOutlined, MenuOutlined, HomeOutlined, InfoCircleOutlined, BookOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";

const { Header: AntHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScrollTop && currentScroll > 100) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }
      setLastScrollTop(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const handleMenuClick = (e) => {
    if (e.key !== "submenu") {
      navigate(e.key);
      setIsDrawerVisible(false); // Đóng drawer khi chọn menu item
    }
  };
  
  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setIsDrawerVisible(false);
  };

  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");

  const handleAvatarClick = () => {
    if (!user) return;
    switch (user.role) {
      case "admin":
        navigate("/admin");
        break;
      case "teacher":
        navigate("/teacher");
        break;
      case "student":
        navigate("/student");
        break;
      default:
        navigate("/");
    }
  };

  const menuItems = [
    { key: "/", label: "Trang chủ", icon: <HomeOutlined /> },
    { key: "/about", label: "Giới thiệu", icon: <InfoCircleOutlined /> },
    {
      key: "submenu",
      label: "Khóa học",
      icon: <BookOutlined />,
      children: [
        { key: "/course/piano-basic", label: "Piano Căn bản" },
        { key: "/course/piano-advanced", label: "Piano Nâng cao" },
        { key: "/course/guitar-basic", label: "Guitar Căn bản" },
        { key: "/course/guitar-advanced", label: "Guitar Nâng cao" },
      ],
    },
    { key: "/contact", label: "Liên hệ & Tư vấn", icon: <MailOutlined /> },
  ];

  const desktopMenuItems = menuItems.map(item => {
    if (item.children) {
      return {
        key: item.key,
        label: item.label,
        children: item.children.map(child => ({
          key: child.key,
          label: child.label,
          onClick: handleMenuClick
        }))
      }
    }
    return {
      key: item.key,
      label: item.label,
      onClick: handleMenuClick
    }
  })

  return (
    <AntHeader className={`header ${hideHeader ? "header-hidden" : ""}`}>
      <div className="header-content">
        {/* Menu cho Desktop */}
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={desktopMenuItems}
          className="header-menu header-menu-desktop"
        />

        {/* Nút menu cho Mobile */}
        <Button
          type="text"
          className="mobile-menu-button"
          icon={<MenuOutlined style={{ color: "#fff", fontSize: 24 }} />}
          onClick={showDrawer}
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
              {user.avatarUrl ? (
                <Avatar src={user.avatarUrl} alt="User Avatar" />
              ) : (
                <Avatar icon={<UserOutlined />} />
              )}
              <span className="username-text" style={{ color: "#fff" }}>{user.displayName}</span>
            </div>
          ) : (
            <>
              <Button type="text" onClick={handleLogin} style={{ color: "#fff" }}>
                Đăng nhập
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Drawer cho Mobile */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={onCloseDrawer}
        visible={isDrawerVisible}
        className="mobile-drawer"
        bodyStyle={{ padding: 0 }}
        width={200}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems.map(item => {
            if (item.children) {
              return {
                ...item,
                children: item.children.map(child => ({
                  ...child,
                  onClick: handleMenuClick
                }))
              }
            }
            return {
              ...item,
              onClick: handleMenuClick
            }
          })}
        />
        {/* Nút đăng nhập/đăng ký trong Drawer cho Mobile */}
        {/* {!user && (
          <div style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }}>
            <Button type="primary" block onClick={handleLogin}>
              Đăng nhập
            </Button>
          </div>
        )} */}
      </Drawer>
    </AntHeader>
  );
};

export default Header;