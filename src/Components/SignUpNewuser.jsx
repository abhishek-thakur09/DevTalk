import axios from "axios";
import React, { useState } from "react";
import { Base_Url } from "../utils/Constant";
import { addUser } from "../utils/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Login from "./Login";

const SignUpNewuser = () => {
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // States for form fields
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [emailId, setemailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  const [photoUrl, setphotoUrl] = useState("");
  const [about, setabout] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [photo, setPhoto] = useState(null);

  const [showToast, setShowToast] = useState(false);

  const [newerr, setnewErr] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setnewErr("Passwords do not match!");
      setTimeout(() => {
        setnewErr("");
      }, 3000);
      return; // stop signup
    }

    try {
      const res = await axios.post(
        Base_Url + "/signup",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl: photoUrl.trim() || undefined,
          about,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res);

      // dispatch(addUser(res.data));

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      setnewErr(err);
      setTimeout(() => setnewErr(""), 2000);
    }
  };

 return (
  <>
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-6 py-24 overflow-auto">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-10">
        {/* SignUp Form */}
        <div className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl p-6 sm:p-10 overflow-auto">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            Sign Up New User
          </h2>

          {/* Name Fields */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="w-full">
              <label className="text-sm font-semibold mb-1 block">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                className="w-full px-4 py-2 bg-white/50 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="w-full">
              <label className="text-sm font-semibold mb-1 block">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                className="w-full px-4 py-2 bg-white/50 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm font-semibold mb-1 block">Email ID</label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setemailId(e.target.value)}
              className="w-full px-4 py-2 bg-white/50 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="text-sm font-semibold mb-1 block">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white/50 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              className="absolute right-3 top-7"
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

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="text-sm font-semibold mb-1 block">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white/50 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Age and Gender */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="w-full">
              <label className="text-sm font-semibold mb-1 block">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setage(e.target.value)}
                className="w-full px-4 py-2 bg-white/50 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="w-full">
              <label className="text-sm font-semibold mb-1 block">Gender</label>
              <select
                value={gender}
                onChange={(e) => setgender(e.target.value)}
                className="w-full px-4 py-2 bg-white/50 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>
          </div>

          {/* Photo URL */}
          <div className="mb-4">
            <label className="text-sm font-semibold mb-1 block">Photo URL</label>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setphotoUrl(e.target.value)}
              className="w-full px-4 py-2 bg-white/50 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* About */}
          <div className="mb-6">
            <label className="text-sm font-semibold mb-1 block">About</label>
            <textarea
              value={about}
              onChange={(e) => setabout(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-white/50 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Tell us something about yourself..."
            />
          </div>

          {/* Error */}
          {newerr && (
            <div className="text-sm text-red-600 mb-4">
              Please enter valid credentials!!
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleSignUp}
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </div>

          {/* Link to Login */}
          {!user && (
            <div className="mt-4 text-center text-sm">
              <Link to="/login" className="text-blue-700 hover:underline">
                Already have an account? Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md z-50">
          SignUp successfully 😊
        </div>
      )}
    </div>
  </>
);

};

export default SignUpNewuser;
