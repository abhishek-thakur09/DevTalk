import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./UserSlice";
import feedReducer from "./FeedSlice";
import connectionReducer from "./connections"


const appStore = configureStore({
    reducer:{
        user: userReducer,
        feed: feedReducer,
        connections : connectionReducer,
    },
});


export default appStore;