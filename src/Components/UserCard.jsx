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
    <>
      <div className="card bg-base-100 bg-green-100 w-80 shadow-xl flex mt-5 sm:m-3 sm:h-fit lg:w-72 lg:h-96 lg:mt-1">
        <figure className="px-10 pt-10">
          <img
            src={photoUrl || null}
            alt="photo"
            className="rounded-lg flex sm:-my-3" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title ml-0 m-1">{firstName + " " + lastName}</h2>
          {age && <p className='font-medium -mt-1 mb-2'>{"age " + age}</p>}
          {gender && <p className='font-medium -m-5 mb-2'>{"Gender " + gender}</p>}

          <p>{about}</p>
          <div className="card-actions flex justify-center gap-4">
            <button className="btn bg-pink-300" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
            <button className="btn bg-blue-400" onClick={() => handleSendRequest("ignore", _id)}>Ignored</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserCard;