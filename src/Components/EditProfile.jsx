import React from 'react'
import { useState } from 'react'
import UserCard from './UserCard';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Base_Url } from '../utils/Constant';
import { addUser } from "../utils/UserSlice"


const EditProfile = ({ user }) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [age, setage] = useState(user.age);
  const [gender, setgender] = useState(user.gender);
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
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data));
      setShowTost(true);
      setTimeout(() => {
        setShowTost(false);
      }, 2000);
    }
    catch (err) {
      setError(err);
    }
  }

  return (
    <>
      <div className='flex justify-center gap-10 sm:gap-3 sm:my-5'>
        <div className='flex justify-center h-auto sm:h-fit'>
          <div className="card w-60 bg-orange-300 card-xl shadow-lg sm:w-72 lg:w-96">
            <div className="card-body">
              <h2 className="card-title flex justify-start -my-1 text-xl sm:-my-3">Update Profile</h2>


              <div className='flex gap-4 sm:flex-col sm:-my-2'>
                {/* FirstName */}
                <div className=' py-2'>
                  <fieldset className="fieldset flex-row">
                    <legend className="fieldset-legend font-bold">FirstName</legend>
                    <input type="text"
                      value={firstName}
                      className="input  bg-orange-100"
                      onChange={(e) => setfirstName(e.target.value)}
                    />
                  </fieldset>
                </div>
                {/* LastName */}
                <div className=' py-2 sm:-my-7'>
                  <fieldset className="fieldset flex-row">
                    <legend className="fieldset-legend font-bold">LastName</legend>
                    <input type="text"
                      value={lastName}
                      className="input  bg-orange-100"
                      onChange={(e) => setlastName(e.target.value)}
                    />
                  </fieldset>
                </div>
              </div>



              {/* Age */}
              <div className='flex gap-4  sm:my-3'>
                <div>
                  <fieldset className="fieldset w-20">
                    <legend className="fieldset-legend font-bold">Age</legend>
                    <input type="text"
                      value={age}
                      className="input  bg-orange-100"
                      onChange={(e) => setage(e.target.value)}
                    />
                  </fieldset>
                </div>
                {/* Gender */}
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend font-bold">Gender</legend>
                    <input type="text"
                      value={gender}
                      className="input  bg-orange-100"
                      onChange={(e) => setgender(e.target.value)}
                    />

                    {/* change popover-1 and --anchor-1 names. Use unique names for each dropdown */}
                    {/* For TSX uncomment the commented types below */}
                    {/* <button className="btn" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}
                    {/* Gender */}
                    {/* </button> */}

                    {/* <ul className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
  popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" } /* as React.CSSProperties */ }
                    {/* <li><a>male</a></li>
  <li><a>female</a></li>
  <li><a>others</a></li> */}

                    {/* </ul>   */}
                  </fieldset>
                </div>
              </div>
              {/* PhotoUrl */}
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-bold">PhotoUrl</legend>
                  {/* <input type="text"
                    value={photoUrl}
                    className="input  bg-orange-100"
                    onChange={(e) => setphotoUrl(e.target.value)}
                  /> */}


                  <input
                    type="file"
                    className="file-input bg-orange-100"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setphotoUrl(URL.createObjectURL(file));
                      }
                    }}
                  />

                </fieldset>
              </div>

              {/* About */}
              <div>
                <fieldset className="fieldset sm:-my-4">
                  <legend className="fieldset-legend font-bold">About</legend>
                  <textarea
                    value={about}
                    className="textarea bg-orange-100"
                    onChange={(e) => setabout(e.target.value)}
                    placeholder="about..."></textarea>
                </fieldset>
              </div>
            </div>
            {/* <p className='text-red-600 text-sm sm:-my-4'>{error}</p> */}
            <div className="flex py-3 card-actions justify-center">
              <button className="btn bg-blue-400 sm:-mx-3" onClick={saveProfile}>Update Profile</button>
            </div>
          </div>
        </div>

        <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
      </div>
      {showTost && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Data Update Successfully😜</span>
        </div>
      </div>
      }

    </>
  )
}

export default EditProfile