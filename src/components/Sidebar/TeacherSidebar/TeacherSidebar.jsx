// TeacherSidebar.jsx
import { Menu } from "antd"; // Loại bỏ Drawer
import {
  CheckCircleOutlined,
  CalendarOutlined,
  FileTextOutlined,
  ScheduleOutlined,
  UserOutlined,
  PhoneOutlined,
  LogoutOutlined,
  ProjectOutlined,
  TeamOutlined
} from "@ant-design/icons";
import "../AdminSidebar/AdminSidebar.css"; // Import CSS chung từ AdminSidebar (hoặc Sidebar.css nếu đã đổi tên)
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Bỏ props 'visible' vì Sider sẽ luôn visible
const TeacherSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State để quản lý các SubMenu đang mở
  const [openKeys, setOpenKeys] = useState([]);

  const getSelectedKey = () => {
    switch (location.pathname) {
      case "/teacher":
        return ["teacher-class"];
      case "/teacher/schedule":
        return ["schedule"];
      case "/teacher/materials":
        return ["materials"];
      case "/teacher/course-schedule":
        return ["course-schedule"];
      case "/teacher/class-detail-student-info":
        return ["class-detail-student-info"];
      case "/teacher/profile":
        return ["profile"];
      default:
        return [];
    }
  };

  // Hàm để xác định các SubMenu nào nên được mở khi tải trang
  // TeacherSidebar hiện tại không có SubMenu, nhưng nếu sau này thêm vào thì dùng hàm này
  const getInitialOpenKeys = () => {
    // const path = location.pathname;
    // if (path.startsWith("/teacher/some-path-with-submenu")) {
    //   return ["parent-key"];
    // }
    return [];
  };

  useEffect(() => {
    setOpenKeys(getInitialOpenKeys());
  }, [location.pathname]);

  const menuItems = [
    {
      key: "teacher-class",
      icon: <CheckCircleOutlined />,
      label: "Điểm danh",
      className: "sidebar-item-yellow",
      onClick: () => navigate("/teacher"),
    },
    {
      key: "schedule",
      icon: <CalendarOutlined />,
      label: "Thời khóa biểu",
      onClick: () => navigate("/teacher/schedule"),
    },
    {
      key: "materials",
      icon: <ProjectOutlined />, // Icon này vẫn đang dùng UserOutlined, cân nhắc đổi nếu không phù hợp
      label: "Tài liệu",
      onClick: () => navigate("/teacher/materials"),
    },
    {
      key: "course-schedule",
      icon: <ScheduleOutlined />,
      label: "Lịch khai giảng",
      onClick: () => navigate("/teacher/course-schedule"),
    },
    {
      key: "class-detail-student-info",
      icon: <TeamOutlined />,
      label: "Thông tin học viên",
      onClick: () => navigate("/teacher/class-detail-student-info"),
    },
  ];

  const bottomItems = [
    {
      key: "profile",
      icon: <UserOutlined />, // Icon này vẫn đang dùng PhoneOutlined, cân nhắc đổi nếu không phù hợp
      label: "Tài khoản",
      onClick: () => navigate("/teacher/profile"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/";
        localStorage.removeItem("selectedClassSessionId")
    localStorage.removeItem("attendanceSessionId")
    localStorage.removeItem("selectedClassIdForStudents")
      },
    },
  ];

  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    // Toàn bộ nội dung của Drawer cũ, nhưng không còn là Drawer nữa
    // Mà sẽ được render trực tiếp trong Sider
    <div className="sidebar-content"> {/* Sử dụng class sidebar-content chung */}
      <div className="sidebar-main"> {/* Sử dụng class sidebar-main chung */}
        <Menu
          mode="inline" // Thay đổi mode thành "inline" để submenu hiển thị bên trong (nếu có sau này)
          items={menuItems}
          className="sidebar-menu" // Sử dụng class sidebar-menu chung
          selectedKeys={getSelectedKey()}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          inlineIndent={16}
        />
      </div>
      <div className="sidebar-bottom"> {/* Sử dụng class sidebar-bottom chung */}
        <Menu
          mode="vertical" // Menu dưới thường không có submenu nên giữ vertical
          items={bottomItems}
          className="sidebar-menu" // Vẫn dùng sidebar-menu cho style
          selectedKeys={getSelectedKey()}
        />
      </div>
    </div>
  );
};

export default TeacherSidebar;