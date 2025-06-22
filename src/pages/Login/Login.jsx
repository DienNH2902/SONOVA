import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const users = {
    "guest@gmail.com": { role: "guest", username: "Guest User", password: "123" },
    "student@gmail.com": { role: "student", username: "Student" , password: "123"},
    "admin@gmail.com": { role: "admin", username: "Admin" , password: "123"},
    "teacher@gmail.com": { role: "teacher", username: "Teacher" , password: "123" },
  };

  const handleLogin = () => {
    if (users[email]) {
      localStorage.setItem("user", JSON.stringify({ email, role: users[email].role }));
      switch (users[email].role) {
        case "admin":
          navigate("/admin");
          break;
        case "teacher":
          navigate("/teacher");
          break;
        case "student":
          navigate("/student");
          break;
        case "guest":
          navigate("/");
          break;
        default:
          navigate("/");
      }
    } else {
      setError("Invalid credentials");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <button onClick={handleLogin} className="login-button">
            Sign In
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <div className="demo-accounts">
          <h4>Demo Accounts</h4>
          {Object.entries(users).map(([email, user]) => (
            <div key={email} className="demo-account">
              <span className="demo-email">{email}</span>
              <span className="demo-role">{user.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;