import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/UserSlice';
import { useNavigate } from 'react-router-dom';
import { Base_Url } from '../utils/Constant';
import { Link } from 'react-router-dom';




const Login = () => {

  const [error, setError] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


const handleLogin = async()=>{
  try{ const res  = await axios.post(Base_Url + "/login", {
      emailId,
      password,
    },{withCredentials: true}
  );
  // console.log(res.data)
  dispatch(addUser(res.data));
   return navigate("/");
  }
  catch(err){
    setError(err?.response?.data.message || "something went wrong");
    // console.log(err?.response?.data || "something went wrong");
  }
}

  return (
    <div className='flex justify-center my-4'>
      <div className="card w-80 bg-orange-300 card-xl shadow-lg">
        <div className="card-body">
          <h2 className="card-title flex justify-center text-3xl">Login</h2>
          {/* Email */}
          <div className=' py-4'>
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-bold">Email Id</legend>
              <input type="text"
              value={emailId}
              className="input  bg-orange-100"
              onChange={(e)=> setEmailId(e.target.value)}
              />
            </fieldset>
          </div>
          {/* Password */}
          <div className=' py-1'>
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-bold">Password</legend>
              <input type="text" 
              value={password}
              className="input  bg-orange-100"
              onChange={(e)=> setPassword(e.target.value)}
              />
            </fieldset>
          </div>
            <p className='text-red-600 text-sm'>{error}</p>
          <div className="justify-end card-actions flex justify-center">
            <button className="btn bg-green-200 hover:bg-green-500" onClick={handleLogin}>Login</button>
          </div>
          <div className='flex text-sm justify-between my-2'>
          <div >forgot Password</div>
          <div ><Link to="/signup" className='hover:text-blue-900'>create new user?</Link></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login