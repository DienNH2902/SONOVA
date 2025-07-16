import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { jwtDecode } from "jwt-decode";
import "./Login.css";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      // Bước 1: Gửi yêu cầu đăng nhập để lấy token
      const loginResponse = await fetch(
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

      if (!loginResponse.ok) {
        // Xử lý lỗi đăng nhập từ server
        const errorBody = await loginResponse.json();
        const errorMessage = errorBody.detail || "Tên đăng nhập hoặc mật khẩu không hợp lệ.";
        throw new Error(errorMessage);
      }

      const loginData = await loginResponse.json();
      const token = loginData.token;

      // Bước 2: Decode token để lấy userId
      const decoded = jwtDecode(token);
      const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

      if (!userId) {
        throw new Error("Không tìm thấy User ID trong token.");
      }

      // Bước 3: Lưu token vào localStorage ngay lập tức để có thể dùng cho các API tiếp theo
      localStorage.setItem("token", token);

      // Bước 4: Gọi API GetAllUser (hoặc GetUserById nếu có) để lấy thông tin chi tiết của user
      const userDetailResponse = await fetch(
        `https://innovus-api-hdhxgcahcdehh8gw.eastasia-01.azurewebsites.net/api/User/${userId}`, // Gọi API lấy chi tiết user theo ID
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Phải gửi token để xác thực
            "Content-Type": "application/json",
          },
        }
      );

      if (!userDetailResponse.ok) {
        // Nếu không lấy được thông tin chi tiết user
        const errorBody = await userDetailResponse.text();
        console.error("Error fetching user details:", errorBody);
        throw new Error(`Không thể lấy thông tin chi tiết người dùng: ${userDetailResponse.statusText}`);
      }

      const userDetails = await userDetailResponse.json();
      console.log("User details from API:", userDetails); // Debugging

      // Bước 5: Map roleId từ userDetails sang roleName của frontend
      const roleMap = {
        1: "admin",
        2: "teacher",
        3: "student",
      };

      const role = roleMap[userDetails.roleId] || "user";

      // Bước 6: Lưu thông tin chi tiết user đầy đủ vào localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: userDetails.email || values.email, // Sử dụng email từ userDetails hoặc từ form nếu userDetails không có
          displayName: userDetails.accountName || userDetails.username || "Name Not Found",
          username: userDetails.username, // Tên đăng nhập
          role: role,
          userId: userDetails.userId, // ID của user
          address: userDetails.address,
          phoneNumber: userDetails.phoneNumber,
          birthday: userDetails.birthday,
          genderId: userDetails.genderId,
          avatarUrl: userDetails.avatarUrl,
          classIds: userDetails.classIds || [], // Đảm bảo luôn là mảng
        })
      );

      const routeMap = {
        admin: "/admin",
        teacher: "/teacher",
        student: "/student",
      };

      // Điều hướng người dùng đến trang phù hợp với vai trò
      navigate(routeMap[role] || "/contact");

      message.success("Login successful!");
    } catch (err) {
      console.error(err);
      message.error(`Đăng nhập thất bại: ${err.message || "Lỗi không xác định"}`);
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