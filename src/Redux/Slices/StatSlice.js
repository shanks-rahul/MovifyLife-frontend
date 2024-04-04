import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../helpers/axiosInstance"

const initialState={
    allUserCounts:0,
    allsubscribedUserCounts:0
}

export const getAllStats=createAsyncThunk("/stats/get",async()=>{
    try {
        const res=axiosInstance.get("/admin/stats/user");
        toast.promise(res,{
            loading:"Loading All Stats...",
            success:"All Stats",
            error:(error)=>{error?.response?.data?.message}
        })
        return (await res).data;
    } catch (error) {
        toast.error?.response?.data?.message
    }
})

const statSlice=createSlice({
    name:"Stats",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllStats.fulfilled,(state,action)=>{
            console.log(action);
            state.allUserCounts=action?.payload?.UserCounts;
            state.allsubscribedUserCounts=action?.payload?.subscribedUserCounts;
        });
    }
})

export default statSlice.reducer;