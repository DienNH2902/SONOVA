import { Drawer, Menu } from "antd";
import {
  CheckCircleOutlined,
  CalendarOutlined,
  FileTextOutlined,
  ScheduleOutlined,
  UserOutlined,
  PhoneOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "../Sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";

const AdminSidebar = ({ visible }) => {
    const navigate = useNavigate()
    const location = useLocation();

    const getSelectedKey = () => {
    switch (location.pathname) {
      case "/admin":
        return ["statistics"];
      case "/admin/create-account":
        return ["create-account"];
      case "/admin/course-schedule":
        return ["course-schedule"];
      case "/admin/student-info":
        return ["student-info"];
      case "/admin/sheet-music":
        return ["sheet-music"];
      case "/admin/consultation":
        return ["consultation"];
      case "/admin/materials":
        return ["materials"];
      case "/admin/schedule":
        return ["schedule"];
      case "/admin/absence":
        return ["absence"];
      case "/admin/profile":
        return ["profile"];
      case "/admin/teacher-attendance":
        return ["teacher-attendance"];

      default:
        return []; // No default selection if no match
    }
  };


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
      icon: <CalendarOutlined />, // Changed icon for better representation
      label: "Tạo tài khoản",
      onClick: () => navigate("/admin/create-account"),
    },
    {
      key: "classes", // Parent key for "Lớp học"
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
      key: "students", // Parent key for "Học viên"
      icon: <ScheduleOutlined />, // Changed icon for better representation
      label: "Học viên",
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
      icon: <UserOutlined />, // Changed icon for better representation
      label: "Sheet nhạc",
      onClick: () => navigate("/admin/sheet-music"),
    },
    {
      key: "consultation",
      icon: <PhoneOutlined />, // Changed icon for better representation
      label: "Liên hệ tư vấn", // Updated label based on image
      onClick: () => navigate("/admin/consultation"),
    },
    {
      key: "teacher-attendance",
      icon: <PhoneOutlined />, // Changed icon for better representation
      label: "Điểm danh giáo viên", // Updated label based on image
      onClick: () => navigate("/admin/teacher-attendance"),
    },
  ];

  const bottomItems = [
    {
      key: "profile",
      icon: <PhoneOutlined />,
      label: "Tài khoản",
        onClick: () => navigate("/admin/profile"), // Assuming you have a profile page
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: () => {
        localStorage.removeItem("user");
        window.location.href = "/";
      },
    },
  ];

  return (
    <Drawer
      title={null}
      placement="left"
      // onClose={onClose}
      open={visible}
      mask={false}
      width={200}
      styles={{ body: { padding: 0 } }}
      className="sidebar-drawer no-blur"
  maskStyle={{ backdropFilter: "none", backgroundColor: "transparent" }}
  getContainer={false} // Makes drawer render inside its parent, not <body>
  style={{ position: 'relative' }} // Required when using getContainer={false}
    >
      <div className="sidebar-content">
        <div className="sidebar-main">
          <Menu mode="vertical" items={menuItems} className="sidebar-menu" selectedKeys={getSelectedKey()} />
        </div>
        <div className="sidebar-bottom">
          <Menu mode="vertical" items={bottomItems} className="sidebar-menu" selectedKeys={getSelectedKey()}/>
        </div>
      </div>
    </Drawer>
  );
};

export default AdminSidebar;