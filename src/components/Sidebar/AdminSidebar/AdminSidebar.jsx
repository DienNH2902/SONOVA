// import { Drawer, Menu } from "antd";
// import {
//   CheckCircleOutlined,
//   CalendarOutlined,
//   FileTextOutlined,
//   ScheduleOutlined,
//   UserOutlined,
//   PhoneOutlined,
//   LogoutOutlined,
// } from "@ant-design/icons";
// import "../Sidebar.css";
// import { useLocation, useNavigate } from "react-router-dom";

// const AdminSidebar = ({ visible }) => {
//     const navigate = useNavigate()
//     const location = useLocation();

//     const getSelectedKey = () => {
//     switch (location.pathname) {
//       case "/admin":
//         return ["statistics"];
//       case "/admin/create-account":
//         return ["create-account"];
//       case "/admin/course-schedule":
//         return ["course-schedule"];
//       case "/admin/student-info":
//         return ["student-info"];
//       case "/admin/sheet-music":
//         return ["sheet-music"];
//       case "/admin/consultation":
//         return ["consultation"];
//       case "/admin/materials":
//         return ["materials"];
//       case "/admin/schedule":
//         return ["schedule"];
//       case "/admin/absence":
//         return ["absence"];
//       case "/admin/profile":
//         return ["profile"];
//       case "/admin/teacher-attendance":
//         return ["teacher-attendance"];

//       default:
//         return []; // No default selection if no match
//     }
//   };


//   const menuItems = [
//     {
//       key: "statistics",
//       icon: <CheckCircleOutlined />,
//       label: "Thống kê",
//       className: "sidebar-item-yellow",
//       onClick: () => navigate("/admin"),
//     },
//     {
//       key: "create-account",
//       icon: <CalendarOutlined />, // Changed icon for better representation
//       label: "Tạo tài khoản",
//       onClick: () => navigate("/admin/create-account"),
//     },
//     {
//       key: "classes", // Parent key for "Lớp học"
//       icon: <FileTextOutlined />,
//       label: "Lớp học",
//       children: [
//         {
//           key: "course-schedule",
//           label: "Lịch khai giảng",
//           onClick: () => navigate("/admin/course-schedule"),
//         },
//         {
//           key: "materials",
//           label: "Tài liệu",
//           onClick: () => navigate("/admin/materials"),
//         },
//         {
//           key: "schedule",
//           label: "Thời khóa biểu",
//           onClick: () => navigate("/admin/schedule"),
//         },
//       ],
//     },
//     {
//       key: "students", // Parent key for "Học viên"
//       icon: <ScheduleOutlined />, // Changed icon for better representation
//       label: "Học viên",
//       children: [
//         {
//           key: "student-info",
//           label: "Thông tin",
//           onClick: () => navigate("/admin/student-info"),
//         },
//         {
//           key: "absence",
//           label: "Vắng",
//           onClick: () => navigate("/admin/absence"),
//         },
//       ],
//     },
//     {
//       key: "sheet-music",
//       icon: <UserOutlined />, // Changed icon for better representation
//       label: "Sheet nhạc",
//       onClick: () => navigate("/admin/sheet-music"),
//     },
//     {
//       key: "consultation",
//       icon: <PhoneOutlined />, // Changed icon for better representation
//       label: "Liên hệ tư vấn", // Updated label based on image
//       onClick: () => navigate("/admin/consultation"),
//     },
//     {
//       key: "teacher-attendance",
//       icon: <PhoneOutlined />, // Changed icon for better representation
//       label: "Điểm danh giáo viên", // Updated label based on image
//       onClick: () => navigate("/admin/teacher-attendance"),
//     },
//   ];

//   const bottomItems = [
//     {
//       key: "profile",
//       icon: <PhoneOutlined />,
//       label: "Tài khoản",
//         onClick: () => navigate("/admin/profile"), // Assuming you have a profile page
//     },
//     {
//       key: "logout",
//       icon: <LogoutOutlined />,
//       label: "Đăng xuất",
//       onClick: () => {
//         localStorage.removeItem("user");
//         localStorage.removeItem("token");
//         window.location.href = "/";
//       },
//     },
//   ];

//   return (
//     <Drawer
//       title={null}
//       placement="left"
//       // onClose={onClose}
//       open={visible}
//       mask={false}
//       width={200}
//       styles={{ body: { padding: 0 } }}
//       className="sidebar-drawer no-blur"
//   maskStyle={{ backdropFilter: "none", backgroundColor: "transparent" }}
//   getContainer={false} // Makes drawer render inside its parent, not <body>
//   style={{ position: 'relative' }} // Required when using getContainer={false}
//     >
//       <div className="sidebar-content">
//         <div className="sidebar-main">
//           <Menu mode="vertical" items={menuItems} className="sidebar-menu" selectedKeys={getSelectedKey()} />
//         </div>
//         <div className="sidebar-bottom">
//           <Menu mode="vertical" items={bottomItems} className="sidebar-menu" selectedKeys={getSelectedKey()}/>
//         </div>
//       </div>
//     </Drawer>
//   );
// };

// export default AdminSidebar;





import { Drawer, Menu } from "antd";
import {
  CheckCircleOutlined,
  CalendarOutlined,
  FileTextOutlined,
  ScheduleOutlined,
  UserOutlined,
  PhoneOutlined,
  LogoutOutlined,
  RightOutlined, // Thêm icon mũi tên cho SubMenu
} from "@ant-design/icons";
import "../Sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; // Import useState và useEffect

const AdminSidebar = ({ visible }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // State để quản lý các SubMenu đang mở
  // Khởi tạo openKeys dựa trên location.pathname để đảm bảo SubMenu đúng mở khi tải trang
  const [openKeys, setOpenKeys] = useState([]);

  // Hàm để xác định key của item đang được chọn (active)
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

  // Hàm để xác định các SubMenu nào nên được mở khi tải trang
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

  // useEffect để cập nhật openKeys khi location.pathname thay đổi
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
      icon: <CalendarOutlined />,
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
      icon: <ScheduleOutlined />,
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
      icon: <UserOutlined />,
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
      icon: <PhoneOutlined />,
      label: "Điểm danh giáo viên",
      onClick: () => navigate("/admin/teacher-attendance"),
    },
  ];

  const bottomItems = [
    {
      key: "profile",
      icon: <PhoneOutlined />,
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

  // Handler khi SubMenu được mở/đóng
  const onOpenChange = (keys) => {
    // keys là một mảng chứa tất cả các openKeys hiện tại
    // Nếu chỉ có một SubMenu cấp cao nhất, keys sẽ chỉ có một phần tử
    setOpenKeys(keys);
  };

  return (
    <Drawer
      title={null}
      placement="left"
      open={visible}
      mask={false}
      width={200}
      styles={{ body: { padding: 0 } }}
      className="sidebar-drawer no-blur"
      maskStyle={{ backdropFilter: "none", backgroundColor: "transparent" }}
      getContainer={false}
      style={{ position: 'relative' }}
    >
      <div className="sidebar-content">
        <div className="sidebar-main">
          <Menu
            mode="inline" // Thay đổi mode thành "inline" để submenu hiển thị bên trong
            items={menuItems}
            className="sidebar-menu"
            selectedKeys={getSelectedKey()}
            openKeys={openKeys} // Controlled openKeys
            onOpenChange={onOpenChange} // Handler for open/close submenu
            inlineIndent={16} // Độ thụt lề cho các item con trong submenu
          />
        </div>
        <div className="sidebar-bottom">
          <Menu
            mode="vertical" // Menu dưới thường không có submenu nên giữ vertical
            items={bottomItems}
            className="sidebar-menu"
            selectedKeys={getSelectedKey()}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default AdminSidebar;