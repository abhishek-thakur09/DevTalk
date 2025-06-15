import axios from 'axios';
import React, { useState } from 'react';
import { Base_Url } from '../utils/Constant';
import { addUser } from '../utils/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Login from './Login';

const SignUpNewuser = () => {
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.user);


  // States for form fields
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [emailId, setemailId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setage] = useState('');
  const [gender, setgender] = useState('');
  const [photoUrl, setphotoUrl] = useState('');
  const [about, setabout] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      <div className="h-screen w-screen bg-blue-50 flex items-center justify-center px-2 py-4">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white shadow-md rounded-xl flex flex-col">

          {/* Header */}
          <div className="px-4 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
            <h2 className="text-xl sm:text-2xl font-semibold text-center text-blue-600">
              Sign Up New User
            </h2>
          </div>


          <div className="overflow-y-auto px-4 sm:px-6 py-4 flex-1 max-h-[calc(100vh-160px)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  className="w-full p-2 text-sm rounded border border-blue-300 bg-blue-100"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  className="w-full p-2 text-sm rounded border border-blue-300 bg-blue-100"
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
                className="w-full p-2 text-sm rounded border border-blue-300 bg-blue-100"
                value={emailId}
                onChange={(e) => setemailId(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mt-3">
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className='relative'>
              <input
                type={showPassword ?"text" : "password"}
                className="w-full p-2 text-sm rounded border border-blue-300 bg-blue-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            <button 
            type='button'
            className='absolute right-0 top-0 border border-blue-300 text-lg text-blue-600 bg-blue-700 rounded p-1 text-white'
            onClick={()=> setShowPassword(!showPassword)}
            >
              {showPassword ? "hide": "show"}
            </button>
            </div>
            </div>

            {/* Confirm password */}
            <div className="mt-3">
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full p-2 text-sm rounded border border-blue-300 bg-blue-100"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Age and Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div>
                <label className="block text-sm font-medium mb-1">Age</label>
                <input
                  type="text"
                  className="w-full p-2 text-sm rounded border border-blue-300 bg-blue-100"
                  value={age}
                  onChange={(e) => setage(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  className="w-full p-2 text-sm rounded border border-blue-300 bg-blue-100"
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                >
                  <option value="">Gender</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              </div>
            </div>

            {/* Photo URL */}
            <div className="mt-3">
              <label className="block text-sm font-medium mb-1">Photo URL</label>
              <input
                type="text"
                className="w-full p-2 text-sm rounded border border-blue-300 bg-blue-100"
                value={photoUrl}
                onChange={(e) => setphotoUrl(e.target.value)}
              />
            </div>

            {/* About */}
            <div className="mt-3">
              <label className="block text-sm font-medium mb-1">About</label>
              <textarea
                className="w-full p-2 text-sm rounded border border-blue-300 bg-blue-100"
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

            {/* Login Link */}
            {!user && (
              <div className="mt-4 text-sm text-center">
                <Link to="/login" className="text-blue-600 hover:underline p-1">
                  Already have an account? Login
                </Link>
              </div>
            )}


            <div className="px-4 py-3 bg-white border-t border-gray-200 mb-10">
              <button
                onClick={handleSignUp}
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-sm text-white font-semibold rounded-lg shadow"
              >
                Sign Up
              </button>
            </div>
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
