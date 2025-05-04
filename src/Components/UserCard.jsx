import axios from 'axios';
import React from 'react';
import { Base_Url } from "../utils/Constant";
import { useDispatch } from 'react-redux';
import {removeFeed} from "../utils/FeedSlice"

const UserCard = ({ user }) => {
  // console.log(user);    
  if (!user) return null;

  const { _id, firstName, lastName, age, gender, photoUrl, about } = user;

  const dispatch = useDispatch();


  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(Base_Url + "/request/send/" + status + "/" + _id, {}, { withCredentials: true });
      console.log(res?.data?.data);
      dispatch(removeFeed(_id));

    }
    catch (err) {

    }

  }


  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br">
      <div className="card w-80 lg:w-72 lg:h-96 shadow-2xl rounded-2xl bg-white/30 backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105">
        <figure className="px-10 pt-8">
          <img
            src={photoUrl || null}
            alt="photo"
            className="rounded-full w-24 h-24 object-cover shadow-lg" />
        </figure>
        <div className="card-body items-center text-center text-gray-800">
          <h2 className="card-title text-xl font-semibold">{firstName + " " + lastName}</h2>
          {age && <p className='text-sm font-medium text-gray-700'>{"age " + age}</p>}
          {gender && <p className='text-sm font-medium text-gray-700'>{"Gender " + gender}</p>}

          <p className='text-sm italic text-gray-600 mt-2'>{about}</p>
          <div className="card-actions mt-4 flex justify-center gap-4">
            <button className="btn bg-pink-400 text-white hover:bg-pink-500 transition duration-300 shadow-md rounded-xl px-4" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
            <button className="btn bg-blue-400 text-white hover:bg-blue-500 transition duration-300 shadow-md rounded-xl px-4" onClick={() => handleSendRequest("ignore", _id)}>Ignored</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard;