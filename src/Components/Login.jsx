import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";
import { useNavigate } from "react-router-dom";
import { Base_Url } from "../utils/Constant";
import { Link } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        Base_Url + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      // console.log(res.data)
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data.message || "something went wrong");
      // console.log(err?.response?.data || "something went wrong");
    }
  };

  return (
    <div className="flex justify-center  bg-gradient-to-br from-blue-100 to-blue-300  items-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600 mb-6">
          Login
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Email Id
          </label>
          <input
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400border-blue-300 bg-blue-100"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        {/* <div className="mb-2">
          <label className="block text-sm font-semibold mb-1 text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
            placeholder="Enter your password"
          />
        </div> */}

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 text-sm rounded border border-blue-300 bg-blue-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <p className="m-4 text-xs text-gray-500">
              Must include uppercase (A-Z), lowercase (a-z), number (0-9), and a
              special character (!@#$%^&*).
            </p>
            <button
              type="button"
              className="absolute right-2 top-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <img
                  src="/CloseEye.png"
                  alt="show"
                  className="w-5 h-5 inline-block"
                />
              ) : (
                <img
                  src="/OpenEye.png"
                  alt="show"
                  className="w-5 h-5 inline-block"
                />
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        {/* Login Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-1 text-sm text-gray-600">
          <Link to="/forgot-password">
            <span className="hover:underline hover:text-indigo-600">
              Forgot Password?
            </span>
          </Link>
          <Link to="/signup" className="hover:underline hover:text-indigo-600">
            Create new user?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
