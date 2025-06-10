import axios from 'axios';
import React, { useState } from 'react';
import { Base_Url } from '../utils/Constant';
import { addUser } from '../utils/UserSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const SignUpNewuser = () => {
  const dispatch = useDispatch();

  // States for form fields
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [emailId, setemailId] = useState('');
  const [password, setPassword] = useState('');
  const [age, setage] = useState('');
  const [gender, setgender] = useState('');
  const [photoUrl, setphotoUrl] = useState('');
  const [about, setabout] = useState('');

  const [showToast, setShowToast] = useState(false);

  const [newerr, setnewErr] = useState('');

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        Base_Url + "/signup",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
          emailId,
          password
        },
        {
          withCredentials: true
        }
      );

      console.log(res);

      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      setnewErr(err);
    }
  };

  return (
    <>
  <div className="min-h-screen bg-orange-50 overflow-y-auto flex items-center justify-center px-2 py-6 sm:px-6 sm:py-10">
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white shadow-md rounded-xl p-4 sm:p-6 md:p-8">
      <h2 className="text-xl sm:text-1xl font-semibold text-center text-orange-600 mb-4">
        Sign Up New User
      </h2>

      {/* Input Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            className="w-full p-2 text-sm rounded border border-orange-300 bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            className="w-full p-2 text-sm rounded border border-orange-300 bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />
        </div>
      </div>

      {/* Email */}
      <div className="mt-3">
        <label className="block text-sm font-medium mb-1">Email ID</label>
        <input
          type="email"
          className="w-full p-2 text-sm rounded border border-orange-300 bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={emailId}
          onChange={(e) => setemailId(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="mt-3">
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          className="w-full p-2 text-sm rounded border border-orange-300 bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Age & Gender */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="text"
            className="w-full p-2 text-sm rounded border border-orange-300 bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={age}
            onChange={(e) => setage(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <input
            type="text"
            className="w-full p-2 text-sm rounded border border-orange-300 bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={gender}
            onChange={(e) => setgender(e.target.value)}
          />
        </div>
      </div>

      {/* Photo URL */}
      <div className="mt-3">
        <label className="block text-sm font-medium mb-1">Photo URL</label>
        <input
          type="text"
          className="w-full p-2 text-sm rounded border border-orange-300 bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={photoUrl}
          onChange={(e) => setphotoUrl(e.target.value)}
        />
      </div>

      {/* About */}
      <div className="mt-3">
        <label className="block text-sm font-medium mb-1">About</label>
        <textarea
          className="w-full p-2 text-sm rounded border border-orange-300 bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={about}
          onChange={(e) => setabout(e.target.value)}
          rows={3}
        ></textarea>
      </div>

      {/* Error */}
      {newerr && (
        <div className="mt-3 text-sm text-red-600">
          Please enter valid credentials!!
        </div>
      )}

      {/* Sign Up Button */}
      <div className="mt-5 flex justify-center">
        <button
          onClick={handleSignUp}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-sm text-white font-semibold rounded-lg shadow transition duration-200"
        >
          Sign Up
        </button>
      </div>

      {/* Login Link */}
      <div className="mt-4 text-sm text-center sm:text-right">
        <Link to="/login" className="text-blue-600 hover:underline">
          Already have an account? Login
        </Link>
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
