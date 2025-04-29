import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Base_Url } from '../utils/Constant'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeUser } from '../utils/UserSlice'



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
      <div className="navbar flex w-full  bg-orange-200 shadow-sm ">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl mx-1">DevTalk💻</Link>
        </div>
        {user && (
          <div className="flex gap-2 mx-10">
            <p className='my-2'> Welcome, {user.firstName}</p>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-orange-300 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
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