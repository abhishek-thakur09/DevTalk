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
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://www.freepik.com/free-photo/yellow-watercolor-paper_18379749.htm#fromView=keyword&page=1&position=45&uuid=b8e2de1a-f99e-45a4-b9bb-194758ea9bc2&query=Background")' }}>
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