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
import "./Sidebar.css";

const Sidebar = ({ visible }) => {


const handleBottomMenuClick = ({ key }) => {
  if (key === "logout") {
    localStorage.removeItem("user");
    window.location.href = "/";
  }
};

  const menuItems = [
    {
      key: "attendance",
      icon: <CheckCircleOutlined />,
      label: "Điểm danh",
      className: "sidebar-item-yellow",
    },
    {
      key: "schedule",
      icon: <CalendarOutlined />,
      label: "Thời khóa biểu",
    },
    {
      key: "materials",
      icon: <FileTextOutlined />,
      label: "Tài liệu",
    },
    {
      key: "calendar",
      icon: <ScheduleOutlined />,
      label: "Lịch khai giảng",
    },
    {
      key: "student-info",
      icon: <UserOutlined />,
      label: "Thông tin học viên",
    },
  ];

  const bottomItems = [
    {
      key: "support",
      icon: <PhoneOutlined />,
      label: "Tài khoản",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
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
          <Menu mode="vertical" items={menuItems} className="sidebar-menu" selectedKeys={["attendance"]} />
        </div>
        <div className="sidebar-bottom">
          <Menu mode="vertical" items={bottomItems} className="sidebar-bottom-menu" onClick={handleBottomMenuClick}/>
        </div>
      </div>
    </Drawer>
  );
};

export default Sidebar;