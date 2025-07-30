// AdminSidebar.jsx
import { Menu } from "antd"; // Loại bỏ Drawer
import {
  CheckCircleOutlined,
  CalendarOutlined,
  FileTextOutlined,
  ScheduleOutlined,
  UserOutlined,
  PhoneOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
  ProfileOutlined
} from "@ant-design/icons";
import "../Sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Bỏ props 'visible' vì Sider sẽ luôn visible
const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openKeys, setOpenKeys] = useState([]);

  const getSelectedKey = () => {
    switch (location.pathname) {
      case "/admin":
        return ["statistics"];
      case "/admin/create-account":
        return ["create-account"];
      case "/admin/course-schedule":
        return ["course-schedule"];
      case "/admin/materials":
        return ["materials"];
      case "/admin/schedule":
        return ["schedule"];
      case "/admin/student-info":
        return ["student-info"];
      case "/admin/absence":
        return ["absence"];
      case "/admin/sheet-music":
        return ["sheet-music"];
      case "/admin/consultation":
        return ["consultation"];
      case "/admin/teacher-attendance":
        return ["teacher-attendance"];
      case "/admin/profile":
        return ["profile"];
      default:
        return [];
    }
  };

  const getInitialOpenKeys = () => {
    const path = location.pathname;
    if (path.startsWith("/admin/course-schedule") || path.startsWith("/admin/materials") || path.startsWith("/admin/schedule")) {
      return ["classes"];
    }
    if (path.startsWith("/admin/student-info") || path.startsWith("/admin/absence")) {
      return ["students"];
    }
    return [];
  };

  useEffect(() => {
    setOpenKeys(getInitialOpenKeys());
  }, [location.pathname]);

  const menuItems = [
    {
      key: "statistics",
      icon: <CheckCircleOutlined />,
      label: "Thống kê",
      className: "sidebar-item-yellow",
      onClick: () => navigate("/admin"),
    },
    {
      key: "create-account",
      icon: <UsergroupAddOutlined />,
      label: "Tạo tài khoản",
      onClick: () => navigate("/admin/create-account"),
    },
    {
      key: "classes",
      icon: <FileTextOutlined />,
      label: "Lớp học",
      children: [
        {
          key: "course-schedule",
          label: "Lịch khai giảng",
          onClick: () => navigate("/admin/course-schedule"),
        },
        {
          key: "materials",
          label: "Tài liệu",
          onClick: () => navigate("/admin/materials"),
        },
        {
          key: "schedule",
          label: "Thời khóa biểu",
          onClick: () => navigate("/admin/schedule"),
        },
      ],
    },
    {
      key: "students",
      icon: <TeamOutlined />,
      label: "Người dùng",
      children: [
        {
          key: "student-info",
          label: "Thông tin",
          onClick: () => navigate("/admin/student-info"),
        },
        {
          key: "absence",
          label: "Vắng",
          onClick: () => navigate("/admin/absence"),
        },
      ],
    },
    {
      key: "sheet-music",
      icon: <ProfileOutlined />,
      label: "Sheet nhạc",
      onClick: () => navigate("/admin/sheet-music"),
    },
    {
      key: "consultation",
      icon: <PhoneOutlined />,
      label: "Liên hệ tư vấn",
      onClick: () => navigate("/admin/consultation"),
    },
    {
      key: "teacher-attendance",
      icon: <UserOutlined />,
      label: "Điểm danh giáo viên",
      onClick: () => navigate("/admin/teacher-attendance"),
    },
  ];

  const bottomItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Tài khoản",
      onClick: () => navigate("/admin/profile"),
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
    // Toàn bộ nội dung của Drawer cũ, nhưng không còn là Drawer nữa
    // Mà sẽ được render trực tiếp trong Sider
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
          className="sidebar-menu" // Vẫn dùng sidebar-menu cho style
          selectedKeys={getSelectedKey()}
        />
      </div>
    </div>
  );
};

export default AdminSidebar;