import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/AuthSlice';
import movieSliceReducer from './Slices/MovieSlice';
import episopdeSliceReucer from './Slices/EpisodeSlice';
import razorpaySliceReducer from './Slices/RazorpaySlice';
import statSliceReducer from './Slices/StatSlice';
const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        movie:movieSliceReducer,
        episode:episopdeSliceReucer,
        razorpay:razorpaySliceReducer,
        stat:statSliceReducer,
    },
    devTools:true,
})
export default store;