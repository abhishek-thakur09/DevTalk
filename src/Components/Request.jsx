import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Base_Url } from '../utils/Constant';
import { addRequests, removeRequest, } from '/src/utils/RequestSlice';

const Request = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();


    // HAndle Review request
    const handleReviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(
                Base_Url + "/request/review/" + status + "/" + _id,
                {},
                { withCredentials: true }
            );
            dispatch(removeRequest(_id));

        } catch (err) {
            console.error("Failed to review request:", err);
        }
    }


    // Handle connection Requests
    const handleRequest = async () => {
        try {
            const res = await axios.get(Base_Url + "/user/requests/received", { withCredentials: true });

            dispatch(addRequests(res?.data?.data));
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleRequest();
    }, []);

    if (!requests) {
        return;
    }

    if (requests.length === 0) {
        return (
          <div className='flex justify-center items-center min-h-[60vh]'>
            <h1 className='text-3xl font-semibold text-blue-600 bg-gradient-to-br from-blue-100 to-blue-300 backdrop-blur-md px-6 py-4 rounded-2xl shadow-md transition-all duration-300'>No Requests found</h1>
        </div>
        )
    }


    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-6 py-10 overflow-auto'>
            <div className='flex flex-col items-center my-8 px-2'>
                <div className='text-2xl  font-bold text-blue-500 mb-4'>Connection Requests</div>

                {requests.map((request) => {
                    const { _id, firstName, lastName, age, gender, photoUrl, about } = request.fromUserId;

                    return (
                        <div
                            key={request._id}
                            className='flex flex-col sm:flex-row sm:justify-between  items-center w-full sm:w-[90%] md:w-[80%] lg:w-[70%] bg-blue-100 rounded shadow-3xl p-4 my-4 space-y-4 sm:space-y-0 sm:space-x-4'
                        >
                            {/* Image */}
                            <img
                                className='w-20 h-20 border-blue-200 rounded-full object-cover'
                                src={photoUrl || "https://via.placeholder.com/150"}
                                alt='User'
                            />

                            {/* Information */}
                            <div className='text-center sm:text-left'>
                                <div className='font-bold text-xl'>{firstName + " " + lastName}</div>
                                <div className='text-sm'>Age: {age}</div>
                                <div className='text-sm'>Gender: {gender}</div>
                                <div className='text-sm'>{about}</div>
                            </div>

                            {/* Buttons */}
                            <div className='flex space-x-2'>
                                <button
                                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                                    onClick={() => handleReviewRequest("accepted", request._id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                    onClick={() => handleReviewRequest("rejected", request._id)}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    )
}

export default Request