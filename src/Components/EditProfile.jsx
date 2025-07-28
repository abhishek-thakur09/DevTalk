import React, { useEffect } from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Base_Url } from "../utils/Constant";
import { addUser } from "../utils/UserSlice";

const EditProfile = ({ user }) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [age, setage] = useState(user.age);
  const [gender, setgender] = useState(user.gender || "");
  const [about, setabout] = useState(user.about);
  const [photoUrl, setphotoUrl] = useState(user.photoUrl);

  const dispatch = useDispatch();

  const [showTost, setShowTost] = useState(false);

  const [error, setError] = useState("");

  // For saving the Profile

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        Base_Url + "/profile/update",
        {
          firstName,
          lastName,
          age,
          photoUrl,
          gender,
          about,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data));
      setShowTost(true);

        if (res.status === 200) {
      window.location.reload();
    }
      setTimeout(() => {
        setShowTost(false);
      }, 2000);
    } catch (err) {
      setError(err);
    }
  };



  return (
    <>
<div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-6 py-10 overflow-auto">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-10">
          {/* Profile Form */}
          <div className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl p-6 sm:p-10 mt-12 overflow-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Update Profile
            </h2>

            {/* Name Fields */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                  className="w-full px-4 py-2 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                  className="w-full px-4 py-2 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>

            {/* Age & Gender */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="w-full sm:w-1/3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setage(e.target.value)}
                  className="w-full px-4 py-2 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                />
              </div>
              {/* Gender Dropdown */}
              <div className="w-full sm:w-1/3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                  className="w-full px-4 py-2 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                >
                  <option value="">Gender</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              </div>
            </div>

            {/* Photo URL */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Photo URL
              </label>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setphotoUrl(e.target.value)}
                className="w-full px-4 py-2 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
              />
            </div>
            
            {/* About */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                About
              </label>
              <textarea
                value={about}
                onChange={(e) => setabout(e.target.value)}
                className="w-full px-4 py-2 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                rows="3"
                placeholder="Tell us something about yourself..."
              />
            </div>

            {/* Update Button */}
            <div className="text-center">
              <button
                onClick={saveProfile}
                className="px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg shadow hover:bg-purple-600 transition"
              >
                Update Profile
              </button>
            </div>
          </div>

          {/* UserCard */}
          <div className="flex-1 flex items-center justify-center">
            <UserCard
              user={{ firstName, lastName, photoUrl, age, gender, about }}
            />
          </div>
        </div>

        {/* Toast */}
        {showTost && (
          <div className="toast toast-top toast-center z-50">
            <div className="alert bg-blue-300 text-white shadow-md">
              <span>Data Updated Successfully 🎉</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditProfile;
