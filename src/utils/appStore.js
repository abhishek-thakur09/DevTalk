import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./UserSlice";
import feedReducer from "./FeedSlice";

const appStore = configureStore({
    reducer:{
        user: userReducer,
        feed: feedReducer,
    },
});


export default appStore;