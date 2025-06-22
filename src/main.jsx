import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import { ConfigProvider, App as AntdApp } from "antd"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ffa940",
          colorLink: "#1e3a5f",
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        },
      }}
    >
      <AntdApp>
        <App />
      </AntdApp>
    </ConfigProvider>
  </StrictMode>
)
