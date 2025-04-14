import { createSlice } from "@reduxjs/toolkit";


const RequestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequest: (state, action)=>{
            return action.payload
        }
    },
});

export const {addRequest} = RequestSlice.actions;
export default RequestSlice.reducer;