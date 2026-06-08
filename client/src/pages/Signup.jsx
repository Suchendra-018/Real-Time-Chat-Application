import "../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signupUser } from "../services/authService";
import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Signup() {
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
      await signupUser(formData);

      alert(
        "Account created successfully"
      );

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Signup Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p>Join GhostChat</p>

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
            Sign Up
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;