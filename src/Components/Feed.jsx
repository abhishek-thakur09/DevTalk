import axios from 'axios'
import React, { useEffect } from 'react'
import { Base_Url } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/FeedSlice'
import UserCard from './UserCard'
import { useNavigate } from 'react-router-dom'

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const getFeed = async () => {
        if (feed) return;

        try {
            const res = await axios.get(Base_Url + "/user/feed", { withCredentials: true });

            dispatch(addFeed(res?.data));
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getFeed();
    }, []);


    if (!feed) return;

    if (feed.length <= 0)
        return <div className='flex justify-center items-center min-h-[60vh]'>
            <h1 className='text-3xl font-semibold text-orange-600 bg-white/30 backdrop-blur-md px-6 py-4 rounded-2xl shadow-md transition-all duration-300'>No new users found</h1>
        </div>
    return (
        <div className='flex justify-center items-center min-h-[60vh] transition-all duration-300'>
            <div className='w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%]'>
                <UserCard user={feed[0]} />
            </div>
        </div>
    );
};

export default Feed;