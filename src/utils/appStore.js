import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./UserSlice";
import feedReducer from "./FeedSlice";
import connectionReducer from "./connections"
import requestReducer from "./RequestSlice"

const appStore = configureStore({
    reducer:{
        user: userReducer,
        feed: feedReducer,
        connections : connectionReducer,
        requests: requestReducer,
    },
});


export default appStore;