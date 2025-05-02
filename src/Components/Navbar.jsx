import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Base_Url } from '../utils/Constant'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeUser } from '../utils/UserSlice'
import Login from "../Components/Login"


const Navbar = () => {
  const user = useSelector((store) => store.user);
  // console.log(user); 
  // ------------>LOGIC for logout  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userData = useSelector((store) => store.user);


  const handleLogout = async () => {

    try {
      const res = await axios.post(Base_Url + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      return navigate("/login");
    }
    catch (err) {
      // Error msg maybe redirect you to the login page
      console.log(err);
    }
  }

  

  return (
    <>
      <div className="navbar fixed top-0 left-0 w-full z-50 bg-white/20 backdrop-blur-md shadow-md border-b border-white/30">
        <div className="flex-1">
        {Login && <Link to="/" className="btn btn-ghost text-xl text-purple-700 font-bold tracking-wide mx-2">DevTalk💻</Link>}
        </div>
        {user && (
          <div className="flex items-center gap-4 mr-6">
            <p className='text-sm font-medium text-gray-700'> Welcome, {user.firstName}</p>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-purple-300 ring-offset-base-100 ring-offset-2">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[60] p-2 shadow-xl rounded-box w-52 bg-white/40 backdrop-blur-md border border-white/20 text-gray-800">
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge badge-accent">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">connections</Link>
                </li>
                <li>
                  <Link to="/request">Requests</Link>
                </li>
                <li>
                  <Link to="/" className="justify-between">
                    feed
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    SignUp
                  </Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  )
};

export default Navbar