import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/UserSlice';
import { useNavigate } from 'react-router-dom';
import { Base_Url } from '../utils/Constant';
import { Link } from 'react-router-dom';




const Login = () => {

  const [error, setError] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


const handleLogin = async()=>{
  try{ const res  = await axios.post(Base_Url + "/login", {
      emailId,
      password,
    },{withCredentials: true}
  );
  // console.log(res.data)
  dispatch(addUser(res.data));
   return navigate("/");
  }
  catch(err){
    setError(err?.response?.data.message || "something went wrong");
    // console.log(err?.response?.data || "something went wrong");
  }
}

  return (
   <div className="flex justify-center  bg-gradient-to-b from-sky-100 to-white  items-center min-h-screen px-4">
  <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8">
    <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600 mb-6">Login</h2>

    {/* Email */}
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-1 text-gray-700">Email Id</label>
      <input
        type="email"
        value={emailId}
        onChange={(e) => setEmailId(e.target.value)}
        className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
        placeholder="Enter your email"
      />
    </div>

    {/* Password */}
    <div className="mb-2">
      <label className="block text-sm font-semibold mb-1 text-gray-700">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
        placeholder="Enter your password"
      />
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
      <span className="hover:underline cursor-pointer">Forgot Password?</span>
      <Link to="/signup" className="hover:underline hover:text-indigo-600">
        Create new user?
      </Link>
    </div>
  </div>
</div>

  )
}

export default Login