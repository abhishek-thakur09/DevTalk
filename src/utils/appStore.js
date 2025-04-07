import { configureStore } from "@reduxjs/toolkit";
import useReducer  from "./UserSlice";

const appStore = configureStore({
    reducer:{
        user: useReducer,
    },
})


export default appStore;