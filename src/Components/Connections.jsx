import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Base_Url } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux';
import { showConnections } from '../utils/connections';
import { Link } from 'react-router-dom';

const Connections = () => {
  const connections = useSelector((store) => store.connections);

  console.log(connections)

  const [error, setError] = useState("");
  const dispatch = useDispatch();


  const fetchConnections = async () => {

    try {
      const res = await axios.get(Base_Url + "/user/connections", { withCredentials: true });

      dispatch(showConnections(res?.data?.data));

    } catch (err) {
      setError(err);
    }
  };


  useEffect(() => {
    fetchConnections();
  }, [])

  if (!connections) {
    return;
  }

  if (connections.length === 0) {
    return (
      <div className='flex justify-center items-center min-h-[60vh]'>
            <h1 className='text-3xl font-semibold text-blue-600 bg-white/30 backdrop-blur-md px-6 py-4 rounded-2xl shadow-md transition-all duration-300'>No connections found</h1>
        </div>
    )
  }


  return (
    <div className='py-10 min-h-screen w-full bg-gradient-to-br from-[#fdfbfb] via-[#ebedee] to-[#d1c4e9]'>
      <div className='flex-col justify-center text-center p-8'>
        <div className='flex justify-center text-center text-2xl font-bold text-blue-500'>Connections</div>

        <div className='flex flex-wrap justify-center mt-8'>
          {connections.map((connection, key) => {
            const { _id, firstName, lastName, age, gender, photoUrl, about } = connection;
            return (
              <div key={_id} className='w-3/4 sm:w-1/2 md:w-1/3 xl:w-1/4 p-4'>

                <div className="flex flex-col bg-white/60 backdrop-blur-md rounded-2xl shadow-xl">
                {/* Image */}
                <div className='mx-auto mt-4'> <img className='w-24 h-24 rounded-full border-4 border-blue-300' src={photoUrl}></img></div>
                {/* INformation */}
                <div className='text-center py-4 px-6'>
                  <div className='font-bold text-xl text-gray-800'>{firstName + " " + lastName}</div>
                  <div className='text-sm text-gray-600'> {"Age : " + age}</div>
                  <div className='text-sm text-gray-600'>{"Gender : " + gender}</div>
                  <div className='text-sm text-gray-600'>{about}</div>
                </div>
                <div className='text-center pb-4'>
                <Link to={"/chat/" + _id} state={{connections}}><button className="w-[80%] bg-blue-700 text-white font-bold py-2 rounded-xl transition-all duration-300 hover:bg-blue-500 hover:scale-100 shadow-md">Chat</button> </Link>
                </div>
              </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default Connections