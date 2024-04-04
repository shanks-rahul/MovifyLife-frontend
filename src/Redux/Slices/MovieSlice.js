import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../helpers/axiosInstance"

const initialState={
    movieData: [],
}

export const getAllMovies=createAsyncThunk("/movie/get",async ()=>{
    try {
        const res=axiosInstance.get("/movies");
        toast.promise(res,{
            loading:"fetching all movies...",
            success:"movies fetched successfully",
            error:(error)=>error?.response?.data?.message
        })
        console.log(res);
        return (await res).data.movies;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});
export const createNewMovie=createAsyncThunk("/movie/create",async(data)=>{
    try {
        let formData=new FormData();
        formData.append("title",data.title);
        formData.append("description",data.description);
        formData.append("category",data.category);
        formData.append("directedBy",data.directedBy);
        formData.append("producedBy",data.producedBy);
        formData.append("thumbnail",data.thumbnail);
        const res=axiosInstance.post('/movies',formData);
        toast.promise(res,{
            loading:"adding the movie...",
            success:"movie successfully added",
            error:(error)=>error?.response?.data?.message
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});


const movieSlice=createSlice({
    name:"movies",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllMovies.fulfilled,(state,action)=>{
            console.log(action);
            if(action.payload){
                state.movieData=[...action.payload];
            }
        })
    }
})

export default movieSlice.reducer;