import React, { useState } from "react";
// import { useDispatch } from 'react-redux';
import { signupUser } from "../Redux/Slice/UserSlice";
import { Link } from "react-router-dom";
// import { Flex } from "antd";

const Signup: React.FC = () => {
  // const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('User Registered:', formData);
    try {
      const res = await signupUser(formData);
      if (res?.user) {
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(217, 231, 250) 100%)",
        // border:"1px solid red    "
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          width: "100%",
          margin: "0 auto",
          background: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Signup</h2>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Name:
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: "94.5%",
              padding: "0.5rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Email:
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "94.5%",
              padding: "0.5rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Password:
          </label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: "94.5%",
              padding: "0.5rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "5px",
            border: "none",
            background: "#1677ff",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          Register
        </button>
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?
          <Link to="/login" className="text-green-600 ml-1 font-medium">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
