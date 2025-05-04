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

  const {newerr, setnewErr} = useState('');

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
  <div className="min-h-screen flex items-center justify-center bg-orange-50 p-4 my-4 relative min-h-screen bg-cover bg-center">
    <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 sm:p-8">
      <h2 className="text-2xl font-semibold text-center text-orange-600 mb-6">
        Sign Up New User
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <label className="block font-semibold text-sm mb-1">First Name</label>
          <input
            type="text"
            className="w-full p-2 rounded border border-orange-300 bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-semibold text-sm mb-1">Last Name</label>
          <input
            type="text"
            className="w-full p-2 rounded border border-orange-300 bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />
        </div>
      </div>

      {/* Email */}
      <div className="mt-4">
        <label className="block font-semibold text-sm mb-1">Email ID</label>
        <input
          type="email"
          className="w-full p-2 rounded border border-orange-300 bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={emailId}
          onChange={(e) => setemailId(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="mt-4">
        <label className="block font-semibold text-sm mb-1">Password</label>
        <input
          type="password"
          className="w-full p-2 rounded border border-orange-300 bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {/* Age */}
        <div>
          <label className="block font-semibold text-sm mb-1">Age</label>
          <input
            type="text"
            className="w-full p-2 rounded border border-orange-300 bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={age}
            onChange={(e) => setage(e.target.value)}
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block font-semibold text-sm mb-1">Gender</label>
          <input
            type="text"
            className="w-full p-2 rounded border border-orange-300 bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={gender}
            onChange={(e) => setgender(e.target.value)}
          />
        </div>
      </div>

      {/* Photo URL */}
      <div className="mt-4">
        <label className="block font-semibold text-sm mb-1">Photo URL</label>
        <input
          type="text"
          className="w-full p-2 rounded border border-orange-300 bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={photoUrl}
          onChange={(e) => setphotoUrl(e.target.value)}
        />
      </div>

      {/* About */}
      <div className="mt-4">
        <label className="block font-semibold text-sm mb-1">About</label>
        <textarea
          className="w-full p-2 rounded border border-orange-300 bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={about}
          onChange={(e) => setabout(e.target.value)}
        ></textarea>
      </div>

      {/* Error */}
      {setnewErr && (
        <div className="mt-3 text-sm text-red-600">
          Please enter valid credentials!!
        </div>
      )}

      {/* Sign Up Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSignUp}
          className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow"
        >
          Sign Up
        </button>
      </div>

      {/* Login Link */}
      <div className="mt-4 text-sm text-right">
        <Link to="/login" className="text-blue-600 hover:underline">
          Already have an account? Login
        </Link>
      </div>
    </div>
  </div>

  {/* Toast */}
  {showToast && (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md z-50">
      SignUp successfully 😊
    </div>
  )}
</>

  );
};

export default SignUpNewuser;
