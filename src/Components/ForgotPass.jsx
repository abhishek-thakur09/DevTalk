import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Base_Url } from '../utils/Constant';

const ForgotPass = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showTost, setShowTost] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handlepass = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post(Base_Url + '/forgot-password', {
                emailId,
                password,
            }, { withCredentials: true });

            console.log(res);
            setShowTost(true);
            setTimeout(() => {
                setShowTost(false);
            }, 2000);

            if (res.status === 200) {
                console.log("Password updated successfully! ");
                setErrorMsg("");
            }

            console.log(res);
        } catch (error) {
            if (error.response?.data?.includes("shame")) {
                setErrorMsg("New password cannot be same as old password.");
            }
            else {
                setErrorMsg("Something wet wrong. Try again.");
            }
            console.error(error);
        }
    }


    return (
        <>
            <div className="flex justify-center items-center min-h-screen  bg-gradient-to-b from-sky-100 to-white  ">
                <form className="sm:w-80 max-w-xl bg-white p-10 rounded-xl shadow-md">
                    <h1 className='flex flex-wrap justify-between items-center text-blue-600 text-2xl font-bold p-6'>Forgot Password</h1>
                    <label className="block text-gray-700 text-sm font-semibold m-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                        placeholder="Enter your email...."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  border-blue-300 bg-blue-100"
                        required
                    />
                    <div className="mt-3">
                        <label className="block text-sm font-medium mb-1">New Password</label>
                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full p-2 text-sm rounded border border-blue-300 bg-blue-100"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter your new password..'
                            />
                            <button
                                type='button'
                                className='absolute right-0 top-0 border border-blue-300 text-lg text-blue-600 bg-blue-700 rounded p-1 text-white'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "hide" : "show"}
                            </button>
                        </div>
                    </div>
                    <div>
                        {errorMsg && (
                            <p className="text-red-600 text-sm mb-4 text-center">{errorMsg}</p>
                        )}
                    </div>

                    <div className='flex justify-center p-6 item-center'>
                        <button onClick={handlepass} className='border p-2 rounded-lg bg-blue-600 text-white'>New password</button>
                    </div>

                    <Link to="/login">
                        <h2 className='hover:underline hover:text-indigo-600'>login, again</h2>
                    </Link>
                </form>
            </div>

            {showTost && (
                <div className="toast toast-top toast-center z-50">
                    <div className="alert alert-success shadow-md">
                        <span>Password Updated Successfully 🎉</span>
                    </div>
                </div>
            )}

        </>
    )
}

export default ForgotPass;