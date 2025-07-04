// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Login.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const users = {
//     "guest@gmail.com": { role: "guest", username: "Guest User", password: "123" },
//     "student@gmail.com": { role: "student", username: "Student" , password: "123"},
//     "admin1@gmail.com": { role: "admin", username: "Admin 1" , password: "123"},
//     "admin2@gmail.com": { role: "admin", username: "Admin 2" , password: "123"},
//     "teacher@gmail.com": { role: "teacher", username: "Teacher" , password: "123" },
//   };

//   const handleLogin = () => {
//     if (users[email]) {
//       localStorage.setItem("user", JSON.stringify({
//   email,
//   username: users[email].username,
//   role: users[email].role,
// }));

//       switch (users[email].role) {
//         case "admin":
//           navigate("/admin");
//           break;
//         case "teacher":
//           navigate("/teacher");
//           break;
//         case "student":
//           navigate("/student");
//           break;
//         case "guest":
//           navigate("/");
//           break;
//         default:
//           navigate("/");
//       }
//     } else {
//       setError("Invalid credentials");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleLogin();
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2 className="login-title">Welcome Back</h2>
        
//         <div className="form-group">
//           <input
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             onKeyPress={handleKeyPress}
//             className="form-input"
//           />
//         </div>

//         <div className="form-group">
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             onKeyPress={handleKeyPress}
//             className="form-input"
//           />
//         </div>

//         <div className="form-group">
//           <button onClick={handleLogin} className="login-button">
//             Sign In
//           </button>
//         </div>

//         {error && <div className="error-message">{error}</div>}

//         <p className="auth-switch">
//           Don't have an account? <Link to="/register">Register</Link>
//         </p>

//         <div className="demo-accounts">
//           <h4>Demo Accounts</h4>
//           {Object.entries(users).map(([email, user]) => (
//             <div key={email} className="demo-account">
//               <span className="demo-email">{email}</span>
//               <span className="demo-role">{user.role}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;




import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { jwtDecode } from "jwt-decode";
import "./Login.css";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
  try {
    const response = await fetch(
      "https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/User/Login",
      {
        method: "POST",
        body: JSON.stringify({
          userName: values.email,
          password: values.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    const token = data.token;

    // ✅ Decode JWT to get role
    const decoded = jwtDecode(token);

    const roleMap = {
  1: "admin",
  2: "teacher",
  3: "student",
};


    
   const role = roleMap[decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]] || "user";
   const displayName = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "Name Not Found";

    localStorage.setItem("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: values.email,
        displayName: displayName,
        username: values.email.split("@")[0],
        role,
      })
    );
    const routeMap = {
  admin: "/admin",
  teacher: "/teacher",
  student: "/student",
};

navigate(routeMap[role] || "/contact");


    message.success("Login successful!");
    // navigate("/");
  } catch (err) {
    console.error(err);
    message.error("Invalid username or password");
  }
};

  return (
    <div className="login-container">
      <div className="login-card">

      <button className="back-home-button" onClick={() => navigate("/")}>
          <ArrowLeftOutlined style={{ fontSize: "16px" }} />
          <span>Back to Home</span>
        </button>

        <h2 className="login-title">Welcome Back</h2>

        <Form
          layout="vertical"
          onFinish={onFinish}
          className="login-form"
          autoComplete="off"
        >
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
          >
            <Input placeholder="Email Address" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block className="login-button">
              Sign In
            </Button>
          </Form.Item>
        </Form>


        <p className="auth-switch">
          Don't have an account? <a href="/contact">Đăng ký để nhận tư vấn miễn phí!</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

