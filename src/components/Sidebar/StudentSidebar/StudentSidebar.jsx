// StudentSidebar.jsx
import { Menu } from "antd";
import {
  CheckCircleOutlined,
  CalendarOutlined, // Giữ lại CalendarOutlined cho Sheet nhạc
  // Loại bỏ các icon không dùng
  // FileTextOutlined,
  // ScheduleOutlined,
  // UserOutlined,
  PhoneOutlined, // Dùng cho Tài khoản
  LogoutOutlined,
} from "@ant-design/icons";
import "../Sidebar.css"; // Giả sử đây là file CSS chung
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const StudentSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openKeys, setOpenKeys] = useState([]);

  const getSelectedKey = () => {
    switch (location.pathname) {
      case "/student":
        return ["lesson"];
      case "/student/sheet-music":
        return ["sheet-music"];
      case "/student/profile":
        return ["profile"];
      default:
        return [];
    }
  };

  // Hàm này vẫn giữ nguyên, nhưng sẽ trả về mảng rỗng vì không có submenu
  const getInitialOpenKeys = () => {
    return [];
  };

  useEffect(() => {
    setOpenKeys(getInitialOpenKeys());
  }, [location.pathname]);

  const menuItems = [
    {
      key: "lesson",
      icon: <CheckCircleOutlined />,
      label: "Khoá học của tôi",
      className: "sidebar-item-yellow",
      onClick: () => navigate("/student"),
    },
    {
      key: "sheet-music",
      icon: <CalendarOutlined />, // Vẫn dùng CalendarOutlined như mày muốn
      label: "Sheet nhạc",
      onClick: () => navigate("/student/sheet-music"),
    },
    // Loại bỏ các mục menu không mong muốn:
    // { key: "course-schedule", icon: <FileTextOutlined />, label: "Lịch khai giảng", onClick: () => navigate("/student/course-schedule"), },
    // { key: "student-info", icon: <ScheduleOutlined />, label: "Thông tin học viên", onClick: () => navigate("/student/student-info"), },
    // { key: "consultation", icon: <PhoneOutlined />, label: "Liên hệ tư vấn", onClick: () => navigate("/student/consultation"), },
    // { key: "materials", icon: <UserOutlined />, label: "Tài liệu", onClick: () => navigate("/student/materials"), },
    // { key: "schedule", icon: <CalendarOutlined />, label: "Thời khóa biểu", onClick: () => navigate("/student/schedule"), },
    // { key: "absence", icon: <CheckCircleOutlined />, label: "Vắng", onClick: () => navigate("/student/absence"), },
  ];

  const bottomItems = [
    {
      key: "profile",
      icon: <PhoneOutlined />, // Vẫn dùng PhoneOutlined như mày muốn
      label: "Tài khoản",
      onClick: () => navigate("/student/profile"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/";
      },
    },
  ];

  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <div className="sidebar-content">
      <div className="sidebar-main">
        <Menu
          mode="inline"
          items={menuItems}
          className="sidebar-menu"
          selectedKeys={getSelectedKey()}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          inlineIndent={16}
        />
      </div>
      <div className="sidebar-bottom">
        <Menu
          mode="vertical"
          items={bottomItems}
          className="sidebar-menu"
          selectedKeys={getSelectedKey()}
        />
      </div>
    </div>
  );
};

export default StudentSidebar;