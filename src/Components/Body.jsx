import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { Base_Url } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/UserSlice'
import { useLocation } from 'react-router-dom'




const Body = () => {

const location = useLocation();
const HideNavAndFooter = location.pathname.startsWith("/chat");

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
 <div className="relative min-h-screen bg-gradient-to-r from-indigo-400 via-blue-100 to-cyan-100 bg-cover bg-center select-none">
  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>

  <div className="relative z-10">
    {!HideNavAndFooter && <Navbar />}
    <Outlet />
    {!HideNavAndFooter && <Footer />}
  </div>
</div>

  )
}

export default Body