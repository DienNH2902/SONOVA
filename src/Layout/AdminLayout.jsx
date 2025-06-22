import { Layout as AntLayout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import "./AdminLayout.css";
import AdminSidebar from "../components/Sidebar/AdminSidebar/AdminSidebar.jsx";

const { Content } = AntLayout;

const AdminLayout = () => {

  return (
    <AntLayout className="layout-admin">
      <Header/>
      <AntLayout className="layout-admin-content">
        <AdminSidebar visible style={{ height: "500px" }} />
        <Content className="main-admin-content">
          <Outlet />
        </Content>
      </AntLayout>
      {/* <Footer /> */}
    </AntLayout>
  );
};

export default AdminLayout;


// const AdminLayout = () => {

//   return (
//     <AntLayout className="layout-admin">
//       <Header/>
//       <AntLayout className="layout-admin-content">
//         <Sidebar visible className={sidebarVisible ? "sidebar" : "sidebar hidden"} />
//         <Content className={`main-admin-content ${!sidebarVisible ? "full-width" : ""}`}>
//           <Outlet />
//         </Content>
//       </AntLayout>
//       <Footer />
//     </AntLayout>
//   );
// };