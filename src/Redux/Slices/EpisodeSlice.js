import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helpers/axiosInstance"
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
    episodes: [],
}

export const getMovieEpisodes = createAsyncThunk("/movie/episodes/get", async (cid) => {
    try {
        const res = axiosInstance.get(`/movies/${cid}`);
        toast.promise(res, {
            loading: "Loading episodes...",
            success: "episodes fetched successfully...",
            error: (error) => {
                toast.error(error?.response?.data?.message);
            }
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }


});

export const addMovieEpisodes = createAsyncThunk("/movie/episodes/add", async (data) => {
    try {
        
        let formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("episode", data.episode);
        const res=axiosInstance.post(`/movies/${data.id}`,formData);
        toast.promise(res, {
            loading: "Adding episodes...",
            success: "episodes added successfully...",
            error: (error) => {
                toast.error(error?.response?.data?.message);
            }
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const deleteMovieEpisodes = createAsyncThunk("/movie/episode/delete", async (data) => {
    try {
        const res = axiosInstance.delete(`/movies?movieId=${data.movieId}&episodeId=${data.episodeId}`);
        toast.promise(res, {
            loading: "deleting episodes...",
            success: "episodes deleted successfully...",
            error: (error) => {
                toast.error(error?.res?.data?.message);
            }
        })
    } catch (error) {
        toast.error(error?.res?.data?.message);
    }
})


const episodeSlice =createSlice({
    name: "episodes",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(getMovieEpisodes.fulfilled,(state,action)=>{
           console.log(action);
            state.episodes=action?.payload?.episodes
        })
        // .addCase(addMovieEpisodes.fulfilled,(state,action)=>{
        //     console.log(action);
        //     state.episode=action?.payload?.movie?.episodes
            
        // })

    }
})

export default episodeSlice.reducer;