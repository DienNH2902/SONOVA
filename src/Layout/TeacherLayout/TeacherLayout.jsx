// TeacherLayout.jsx
import { Layout as AntLayout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import "../AdminLayout.css"; // Giữ nguyên import CSS chung
import TeacherSidebar from "../../components/Sidebar/TeacherSidebar/TeacherSidebar.jsx";

const { Content, Sider } = AntLayout; // Import Sider từ AntLayout

const TeacherLayout = () => {
  return (
    <AntLayout className="layout-admin"> {/* Sử dụng class layout-admin chung */}
      <Header /> {/* Header nằm trên cùng, full width */}
      <AntLayout className="layout-admin-content"> {/* Sử dụng class layout-admin-content chung */}
        {/* AntLayout.Sider sẽ thay thế Drawer */}
        <Sider width={200} style={{ paddingTop: "55px" }} className="admin-sider"> {/* Sử dụng class admin-sider chung */}
          <TeacherSidebar /> {/* TeacherSidebar giờ nằm bên trong Sider */}
        </Sider>
        <Content className="main-admin-content" style={{ paddingTop: "55px" }}> {/* Bỏ paddingTop vì Header đã nằm ngoài */}
          <Outlet />
        </Content>
      </AntLayout>
      {/* <Footer /> */}
    </AntLayout>
  );
};

export default TeacherLayout;