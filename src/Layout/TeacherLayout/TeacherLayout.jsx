import { Layout as AntLayout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import "../AdminLayout.css";
import TeacherSidebar from "../../components/Sidebar/TeacherSidebar/TeacherSidebar.jsx";

const { Content } = AntLayout;

const TeacherLayout = () => {

  return (
    <AntLayout className="layout-admin">
      <Header/>
      <AntLayout className="layout-admin-content">
        <TeacherSidebar visible style={{ height: "500px" }} />
        <Content className="main-admin-content" style={{ paddingTop: "63px" }}>
          <Outlet />
        </Content>
      </AntLayout>
      {/* <Footer /> */}
    </AntLayout>
  );
};

export default TeacherLayout;


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