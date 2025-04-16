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

  const {err, setErr} = useState('');

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

      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      setErr(err);
    }
  };

  return (
    <>
      <div className="flex justify-center gap-10 sm:gap-3 sm:my-5">
        <div className="card w-60 bg-orange-300 card-xl shadow-lg sm:w-72 lg:w-96">
          <div className="card-body">
            <h2 className="card-title text-xl">Sign Up New User</h2>

            {/* First & Last Name */}
            <div className="flex gap-4 sm:flex-col">
              <fieldset className="fieldset flex-row">
                <legend className="fieldset-legend font-bold">First Name</legend>
                <input
                  type="text"
                  className="input bg-orange-100"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset flex-row">
                <legend className="fieldset-legend font-bold">Last Name</legend>
                <input
                  type="text"
                  className="input bg-orange-100"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </fieldset>
            </div>

            {/* Email ID */}
            <fieldset className="fieldset flex-row mt-3">
              <legend className="fieldset-legend font-bold">Email ID</legend>
              <input
                type="email"
                className="input bg-orange-100"
                value={emailId}
                onChange={(e) => setemailId(e.target.value)}
              />
            </fieldset>

            {/* Password */}
            <fieldset className="fieldset flex-row mt-3">
              <legend className="fieldset-legend font-bold">Password</legend>
              <input
                type="text"
                className="input bg-orange-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>

            {/* Age & Gender */}
            <div className="flex gap-4 sm:flex-col mt-3">
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend font-bold">Age</legend>
                <input
                  type="text"
                  className="input bg-orange-100"
                  value={age}
                  onChange={(e) => setage(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend font-bold">Gender</legend>
                <input
                  type="text"
                  className="input bg-orange-100"
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                />
              </fieldset>
            </div>

            {/* PhotoUrl */}
            <fieldset className="fieldset mt-3">
              <legend className="fieldset-legend font-bold">Photo URL</legend>
              <input
                type="text"
                className="input bg-orange-100"
                value={photoUrl}
                onChange={(e) => setphotoUrl(e.target.value)}
              />
            </fieldset>

            {/* About */}
            <fieldset className="fieldset mt-3">
              <legend className="fieldset-legend font-bold">About</legend>
              <textarea
                className="textarea bg-orange-100"
                value={about}
                onChange={(e) => setabout(e.target.value)}
              />
            </fieldset>

          <div>
            <a className='text-red-700 text-sm'> Please enter valid credentials!!</a>
          </div>

            <div className="flex justify-center mt-5">
              <button className="btn bg-blue-400" onClick={handleSignUp}>
                Sign Up
              </button>
            </div>

            <div>
              <Link to="/login" className='text-sm flex justify-end hover:text-blue-700 '>login?</Link>
            </div>
          </div>


        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>SignUp successfully 😊</span>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpNewuser;
