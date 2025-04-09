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
      if(!userData){
        navigate("/login");
      }

      console.log(err);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Outlet></Outlet>
      <Footer />
    </>
  )
}

export default Body