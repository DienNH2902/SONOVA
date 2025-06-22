import { Layout as AntLayout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "../AdminLayout.css";
import StudentSidebar from "../../components/Sidebar/StudentSidebar/StudentSidebar.jsx";

const { Content } = AntLayout;

const StudentLayout = () => {

  return (
    <AntLayout className="layout-admin">
      <Header/>
      <AntLayout className="layout-admin-content">
        <StudentSidebar visible style={{ height: "500px" }} />
        <Content className="main-admin-content">
          <Outlet />
        </Content>
      </AntLayout>
      <Footer />
    </AntLayout>
  );
};

export default StudentLayout;


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