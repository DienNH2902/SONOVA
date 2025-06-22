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

const StudentSidebar = ({ visible }) => {
    const navigate = useNavigate()
    const location = useLocation();

    const getSelectedKey = () => {
    switch (location.pathname) {
      case "/student":
        return ["lesson"];
      case "/student/sheet-music":
        return ["sheet-music"];
      case "/student/course-schedule":
        return ["course-schedule"];
      case "/student/student-info":
        return ["student-info"];
      case "/student/consultation":
        return ["consultation"];
      case "/student/materials":
        return ["materials"];
      case "/student/schedule":
        return ["schedule"];
      case "/student/absence":
        return ["absence"];
      case "/student/profile":
        return ["profile"];

      default:
        return []; // No default selection if no match
    }
  };


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
      icon: <CalendarOutlined />, // Changed icon for better representation
      label: "Sheet nhạc",
      onClick: () => navigate("/student/sheet-music"),
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
    // {
    //   key: "sheet-music",
    //   icon: <UserOutlined />, // Changed icon for better representation
    //   label: "Sheet nhạc",
    //   onClick: () => navigate("/admin/sheet-music"),
    // },
    // {
    //   key: "consultation",
    //   icon: <PhoneOutlined />, // Changed icon for better representation
    //   label: "Liên hệ tư vấn", // Updated label based on image
    //   onClick: () => navigate("/admin/consultation"),
    // },
  ];

  const bottomItems = [
    {
      key: "profile",
      icon: <PhoneOutlined />,
      label: "Tài khoản",
      onClick: () => navigate("/student/profile"), // Assuming you have a profile page
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

export default StudentSidebar;