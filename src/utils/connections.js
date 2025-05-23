import { createSlice } from "@reduxjs/toolkit";



const connectionSlice = createSlice({
    name:"connection",
    initialState: null,
    reducers:{
        showConnections: (state, action)=> {
                return action.payload;
        },
        hideConnections: (state, action)=>{
                return null;
        }
    }
})


export const {showConnections, hideConnections} = connectionSlice.actions;
export default connectionSlice.reducer