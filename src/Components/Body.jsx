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
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1681400745727-c69f8e47f524?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFjJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww")' }}>
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