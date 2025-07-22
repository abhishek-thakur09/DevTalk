import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Base_Url } from "../utils/Constant";

const ForgotPass = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showTost, setShowTost] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlepass = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        Base_Url + "/forgot-password",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      console.log(res);
      setShowTost(true);
      setTimeout(() => {
        setShowTost(false);
      }, 2000);

      if (res.status === 200) {
        console.log("Password updated successfully! ");
        setErrorMsg("");
      }

      console.log(res);
    } catch (error) {
      if (error.response?.data?.includes("shame")) {
        setErrorMsg("New password cannot be same as old password.");
      } else {
        setErrorMsg("Something wet wrong. Try again.");
      }
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen  bg-gradient-to-br from-blue-100 to-blue-300 ">
        <form className="sm:w-80 max-w-80 max-h-96 bg-white p-6 rounded-xl shadow-md">
          <h1 className="flex flex-wrap justify-between items-center text-blue-600 text-2xl font-bold">
            Forgot Password
          </h1>
          <div className="mt-3">
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter your email...."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  border-blue-200 bg-blue-100"
              required
            />
          </div>
          <div className="mt-3">
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 text-sm rounded border border-blue-300 bg-blue-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password.."
              />
              <button
                type="button"
                className="absolute  right-2 top-1"
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
            <p className="mt-4 text-xs text-gray-500">
              Must include uppercase (A-Z), lowercase (a-z), number (0-9), and a
              special character (!@#$%^&*).
            </p>
          </div>
          <div>
            {errorMsg && (
              <p className="text-red-600 text-sm mb-4 text-center">
                {errorMsg}
              </p>
            )}
          </div>

          <div className="flex justify-center p-6 item-center">
            <button
              onClick={handlepass}
              className="w-full border p-2 rounded-lg bg-indigo-600 text-white font-semibold "
            >
              New password
            </button>
          </div>

          <Link to="/login">
            <h2 className="hover:underline hover:text-indigo-600">
              Login, Again
            </h2>
          </Link>
        </form>
      </div>

      {showTost && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success shadow-md">
            <span>Password Updated Successfully 🎉</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPass;
