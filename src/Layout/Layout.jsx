import { Layout as AntLayout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import "./Layout.css";

const { Content } = AntLayout;

const Layout = () => {

  return (
    <AntLayout className="layout">
      <Header  />
      <AntLayout className="layout-content">
        <Sidebar />
        <Content className="main-content">
          <Outlet />
        </Content>
      </AntLayout>
      <Footer />
    </AntLayout>
  );
};

export default Layout;
