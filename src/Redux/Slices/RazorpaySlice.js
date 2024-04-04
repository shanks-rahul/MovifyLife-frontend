import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";
import axios from "axios";

const initialState={
    key:"",
    subscription_id:"",
    isPaymentVerified:false,
    allPayments:{},
    finalMonths:{},
    monthlySalesRecords:[]
}

export const getPaymentId=createAsyncThunk("/razorpay/key",async()=>{
    try {
        const res=axiosInstance.get("/payment/razorpay-key");
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});
export const purchaseCourseBundle=createAsyncThunk("/razorpay/purchase",async()=>{
    try {
        const res=axiosInstance.post("/payment/subscribe");
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});
export const verifyPayment=createAsyncThunk("/razorpay/verify",async(data)=>{
    try {
        const res=axiosInstance.post("/payment/verify",{
            razorpay_payment_id:data.razorpay_payment_id,
            razorpay_subscription_id:data.razorpay_subscription_id,
            razorpay_signature:data.razorpay_signature
        })
        toast.promise(res,{
            loading:'Verifying Payment...',
            success:"payment verified Successfully",
            error:"payment not verified",
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});
export const cancelCourseBundle =createAsyncThunk("/razorpay/cancel",async()=>{
    try {
        const res=axiosInstance.post("/payment/unsubscribe");
        toast.promise(res,{
            loading:"unsuscribing....",
            success:"unsubscribed successfully...",
            error:(error)=>{error?.response?.data?.message},
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});
export const getPaymentRecords=createAsyncThunk("/razorpay/getPaymentRecords",async()=>{
    try {
        const res=axiosInstance.get("/payment?count=100");
        toast.promise(res,{
            loading:"fetching all Payments...",
            success:"All Payments Fetched....",
            error:(error)=>{error?.response?.data?.message}
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})


const razorpaySlice=createSlice({
    name:"razorpay",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getPaymentId.fulfilled,(state,action)=>{
            console.log(action);
            state.key=action?.payload?.key
        })
        .addCase(purchaseCourseBundle.fulfilled,(state,action)=>{
            state.subscription_id=action?.payload?.subscription_id;
        })
        .addCase(verifyPayment.fulfilled,(state,action)=>{
            console.log(action);
            toast.success(action?.payload?.message);
            state.isPaymentVerified=action?.payload?.success
        })
        .addCase(verifyPayment.rejected,(state,action)=>{
            toast.error(action?.payload?.message);
            state.isPaymentVerified=action?.payload?.success;
        })
        .addCase(getPaymentRecords.fulfilled,(state,action)=>{
            state.allPayments=action?.payload?.allPayments;
            state.finalMonths=action?.payload?.finalMonths;
            state.monthlySalesRecords=action?.payload?.monthlySalesRecords;
        })
    }
})

export default razorpaySlice.reducer;