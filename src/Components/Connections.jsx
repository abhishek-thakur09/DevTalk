import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Base_Url } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux';
import { showConnections } from '../utils/connections';

const Connections = () => {
  const connections = useSelector((store) => store.connections);
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
    return <h1>No connections Found</h1>
  }


  return (
    <>
      <div className='flex-col justify-center text-center my-8'>
        <div className='text-2xl font-bold text-orange-500'>Connections</div>

        {connections.map((connection, key) => {
          const { _id, firstName, lastName, age, gender, photoUrl, about } = connection;
          return (
              <div key={_id} className=' flex w-1/2 m-4 py-7 bg-orange-300 rounded shadow-2xl'>
                {/* Image */}
                <div> <img className='w-20 h-20 p-2  ml-6 rounded-full' src={photoUrl}></img></div>
               {/* INformation */}
                <div>
                <div className='font-bold text-xl'>{firstName + " " + lastName}</div>
                <div className='text-sm'> {"Age : "+age}</div>
                <div className='text-sm'>{"Gender : "+gender}</div>
                <div className='text-sm '>{about}</div>
                </div>
              </div>
          )
        })}
      </div>
    </>
  )
}

export default Connections