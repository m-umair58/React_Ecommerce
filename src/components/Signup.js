import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    
    // Basic validation
    if (!username || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // Example API call to handle signup
    try {
      // You can replace this with your API request to the backend
      const response = await fetch("https://nestecommerce-production.up.railway.app/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName:username, email, password }),
      });

      const data = await response.json()
      // console.log(JSON.parse(response))
      // console.log(data.body)
      if (response.ok) {
        const token = data.token;
        localStorage.setItem("accessToken", token);
        // On success, navigate to home or another page
        navigate("/");
      } else {
        // Handle error from API
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Signup for a new Account
        </h2>
        <p className="text-center text-gray-500 mb-8">Signup to continue</p>
        <form onSubmit={handleSignup}>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              UserName
            </label>
            <input
              type="text"
              id="username"
              placeholder="UserName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-gray-800 focus:border-gray-800"
            />
          </div>
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
              placeholder="Email"
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
              placeholder="Enter Password"
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
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-900 transition duration-200"
          >
            Sign up
          </button>
        </form>
        <p className="mt-8 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-gray-800 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
