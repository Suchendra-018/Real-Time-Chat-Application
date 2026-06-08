import "../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { loginUser } from "../services/authService";
import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  useEffect(() => {
    setFormData({
      username: "",
      password: "",
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      localStorage.setItem(
        "token",
        data.token
      );
      localStorage.setItem(
        "username",
        data.username
      );
      localStorage.setItem(
        "userId",
        data.userId
      );

      navigate("/chat");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>GhostChat</h1>
        <p>Privacy First Messaging</p>

        <form
  onSubmit={handleSubmit}
  autoComplete="off"
>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <div
  style={{
    position: "relative",
    width: "100%",
  }}
>
  <input
    type={
      showPassword
        ? "text"
        : "password"
    }
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    style={{
      width: "100%",
      paddingRight: "45px",
    }}
  />

  <span
    onClick={() =>
      setShowPassword(
        !showPassword
      )
    }
    style={{
      position: "absolute",
      right: "15px",
      top: "50%",
      transform:
        "translateY(-50%)",
      cursor: "pointer",
      color: "#6b7280",
    }}
  >
    {showPassword ? (
      <FaEyeSlash />
    ) : (
      <FaEye />
    )}
  </span>
</div>

          <button type="submit">
            Login
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;