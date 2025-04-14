import axios from 'axios'
import React, { useEffect } from 'react'
import { Base_Url } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/FeedSlice'
import UserCard from './UserCard'

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

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
        return <h1 className='flex justify-center my-10'>No new users founds</h1>

    return (
        <div className='flex justify-center'>
            <UserCard  user = {feed[1]}/>
        </div>
    );
};

export default Feed;