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
            const res = axios.post(
                Base_Url + "/request/review/" + status + "/" + _id,
                {},
                { withCredentials: true }
            );
            dispatch(removeRequest(_id));
        } catch (err) { }
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
        return <h1 className="flex justify-center my-10 font-semibold text-orange-600 text-2xl">No connections Found</h1>
    }


    return (
        <>
            <div className='flex-col justify-center text-center my-8'>
                <div className='text-2xl font-bold text-orange-500'>Connection Requests</div>

                {
                    requests.map((request) => {
                        const { _id, firstName, lastName, age, gender, photoUrl, about } = request.fromUserId;
                        return (
                            <div key={_id} className='flex justify-between items-center w-1/2 m-4 py-7 h-38 bg-orange-300 rounded shadow-2xl'>
                                {/* Image */}
                                <div> <img className='w-20 h-20 m-2 rounded-full object-contain' src={photoUrl || null}></img></div>
                                {/* INformation */}
                                <div>
                                    <div className='font-bold text-xl'>{firstName + " " + lastName}</div>
                                    <div className='text-sm'> {"Age : " + age}</div>
                                    <div className='text-sm'>{"Gender : " + gender}</div>
                                    <div className='text-sm '>{about}</div>
                                </div>
                                <div className='m-5'>
                                    <button className="btn w-16 m-2 btn-success shadow-1xl" onClick={() => handleReviewRequest("accepted", request.fromUserId)}>Accept</button>
                                    <button className="btn w-16 btn-error shadow-1xl" onClick={() => handleReviewRequest("rejected", request._id)}>Reject</button>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </>
    )
}

export default Request