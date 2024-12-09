import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    // Example API call to handle login
    try {
      // Replace this with your actual API endpoint
      const response = await fetch("https://nestecommerce-production.up.railway.app/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        // On successful login, navigate to home page or dashboard
        const token = data.data.access_token; // Adjust according to the actual response format
        localStorage.setItem("accessToken", token);
        navigate("/");
      } else {
        // Handle error from API
        alert("Login failed. Invalid email or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Login to Your Account
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Access your dashboard and manage your account
        </p>
        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-gray-800 focus:border-gray-800"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-gray-800 focus:border-gray-800"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-gray-800 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-gray-800 hover:underline font-medium"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-900 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-8 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-gray-800 font-medium hover:underline"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
