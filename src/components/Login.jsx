// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint for authentication
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      // Assuming the API returns a token upon successful login
      const token = response.data.token;

      // Save the token or perform any necessary actions for successful login
      // For simplicity, let's assume storing the token in localStorage
      localStorage.setItem("token", token);

      // Update authentication status
      login();

      // Redirect to the home page after successful login
      navigate("/home");
    } catch (error) {
      // Handle authentication failure (e.g., show an error message)
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="bg-gray-200 w-full h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form className="p-10">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email:
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
