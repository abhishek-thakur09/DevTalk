import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { Base_Url } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/UserSlice'




const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  

  const fetchUser = async () => {
    if (userData) return;

    try {
      const res = await axios.get(Base_Url + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));

    } catch (err) {
      if(err.status === 404){
        navigate("/login");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="relative min-h-screen bg-cover bg-center select-none" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1508614999368-9260051292e5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>

    <div className="relative z-10">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  </div>
  )
}

export default Body