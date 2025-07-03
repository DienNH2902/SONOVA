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
import "../AdminSidebar/AdminSidebar.css";
import { useLocation, useNavigate } from "react-router-dom";

const TeacherSidebar = ({ visible }) => {
    const navigate = useNavigate()
    const location = useLocation();

    const getSelectedKey = () => {
    switch (location.pathname) {
      case "/teacher":
        return ["teacher-class"];
      case "/teacher/create-account":
        return ["create-account"];
      case "/teacher/course-schedule":
        return ["course-schedule"];
      case "/teacher/class-detail-student-info":
        return ["class-detail-student-info"];
      case "/teacher/sheet-music":
        return ["sheet-music"];
      case "/teacher/consultation":
        return ["consultation"];
      case "/teacher/materials":
        return ["materials"];
      case "/teacher/schedule":
        return ["schedule"];
      case "/teacher/absence":
        return ["absence"];
      case "/teacher/profile":
        return ["profile"];

      default:
        return []; // No default selection if no match
    }
  };


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
      icon: <CalendarOutlined />, // Changed icon for better representation
      label: "Thời khóa biểu",
      onClick: () => navigate("/teacher/schedule"),
    },
    // {
    //   key: "classes", // Parent key for "Lớp học"
    //   icon: <FileTextOutlined />,
    //   label: "Lớp học",
    //   children: [
    //     {
    //       key: "course-schedule",
    //       label: "Lịch khai giảng",
    //       onClick: () => navigate("/admin/course-schedule"),
    //     },
    //     {
    //       key: "materials",
    //       label: "Tài liệu",
    //       onClick: () => navigate("/admin/materials"),
    //     },
    //     {
    //       key: "schedule",
    //       label: "Thời khóa biểu",
    //       onClick: () => navigate("/admin/schedule"),
    //     },
    //   ],
    // },
    // {
    //   key: "students", // Parent key for "Học viên"
    //   icon: <ScheduleOutlined />, // Changed icon for better representation
    //   label: "Học viên",
    //   children: [
    //     {
    //       key: "student-info",
    //       label: "Thông tin",
    //       onClick: () => navigate("/admin/student-info"),
    //     },
    //     {
    //       key: "absence",
    //       label: "Vắng",
    //       onClick: () => navigate("/admin/absence"),
    //     },
    //   ],
    // },
    {
      key: "materials",
      icon: <UserOutlined />, // Changed icon for better representation
      label: "Tài liệu",
      onClick: () => navigate("/teacher/materials"),
    },
    {
      key: "course-schedule",
      icon: <FileTextOutlined />, // Changed icon for better representation
      label: "Lịch khai giảng", // Updated label based on image
      onClick: () => navigate("/teacher/course-schedule"),
    },
    {
      key: "class-detail-student-info",
      icon: <ScheduleOutlined />, // Changed icon for better representation
      label: "Thông tin học viên",
      onClick: () => navigate("/teacher/class-detail-student-info"),
    },
    // {
    //   key: "absence",
    //   icon: <CheckCircleOutlined />, // Changed icon for better representation
    //   label: "Điểm danh vắng",
    //   onClick: () => navigate("/teacher/absence"),
    // },
    // {
    //   key: "sheet-music",
    //   icon: <FileTextOutlined />, // Changed icon for better representation
    //   label: "Sheet nhạc",
    //   onClick: () => navigate("/teacher/sheet-music"),
    // },
    // {
    //   key: "consultation",
    //   icon: <PhoneOutlined />, // Changed icon for better representation
    //   label: "Liên hệ tư vấn", // Updated label based on image
    //   onClick: () => navigate("/teacher/consultation"),
    // },
  ];

  const bottomItems = [
    {
      key: "profile",
      icon: <PhoneOutlined />,
      label: "Tài khoản",
        onClick: () => navigate("/teacher/profile"), // Assuming you have a profile page
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

export default TeacherSidebar;