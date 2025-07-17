// AdminLayout.jsx
import { Layout as AntLayout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import "./AdminLayout.css";
import AdminSidebar from "../components/Sidebar/AdminSidebar/AdminSidebar.jsx"; // Vẫn import AdminSidebar

const { Content, Sider } = AntLayout; // Import Sider

const AdminLayout = () => {
  return (
    <AntLayout className="layout-admin">
      <Header /> {/* Header nằm trên cùng, full width */}
      <AntLayout className="layout-admin-content">
        {/* AntLayout.Sider sẽ thay thế Drawer */}
        <Sider width={200} style={{paddingTop: "55px"}} className="admin-sider"> 
          <AdminSidebar /> {/* AdminSidebar giờ nằm bên trong Sider */}
        </Sider>
        <Content className="main-admin-content" style={{ paddingTop: "55px" }}> {/* Bỏ paddingTop vì Header đã nằm ngoài */}
          <Outlet />
        </Content>
      </AntLayout>
      {/* <Footer /> */}
    </AntLayout>
  );
};

export default AdminLayout;