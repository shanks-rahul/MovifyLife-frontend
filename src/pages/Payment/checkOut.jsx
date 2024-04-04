import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPaymentId, purchaseCourseBundle, verifyPayment } from "../../Redux/Slices/RazorpaySlice";
import { useEffect } from "react";
import {BiRupee} from "react-icons/bi"
import HomeLayout from "../../layouts/HomeLayout";

function CheckOut(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const razorpayApiKey=useSelector((state)=>state.razorpay.key);
    const subscription_id=useSelector((state)=>state.razorpay.subscription_id);
    const isPaymentVerified=useSelector((state)=>state.razorpay.isPaymentVerified);
    const userData=useSelector((state)=>state.auth.data);

    const paymentDetails={
        razorpay_payment_id:"",
        razorpay_subscription_id:"",
        razorpay_signature:""
    }

    async function handleSubscription(e){
        e.preventDefault();
        if(!razorpayApiKey || !subscription_id){
            toast.error("Something went wrong");
            return;
        }
        const options={
            key:razorpayApiKey,
            subscription_id:subscription_id,
            name:"Movify Life",
            description:"Subscription",
            theme:{
                color:'#F3724'
            },
            prefill:{
                email:userData.email,
                name:userData.fullName
            },
            handler:async function(response){
                paymentDetails.razorpay_payment_id=response.razorpay_payment_id;
                paymentDetails.razorpay_subscription_id=response.razorpay_subscription_id;
                paymentDetails.razorpay_signature=response.razorpay_signature;

                toast.success("payment Successfull");
                const res=await dispatch(verifyPayment(paymentDetails));
                if(res?.payload?.success){
                    navigate("/checkout/success")
                }
                else{
                    navigate("/checkout/fail")
                }

            }
        }
        const paymentObject=new window.Razorpay(options);
        paymentObject.open();
    };
    async function load(){
        await dispatch(getPaymentId());
        await dispatch(purchaseCourseBundle());
    }
    useEffect(()=>{
        load();
    },[])

    return(
        <HomeLayout>
            <form 
                onSubmit={handleSubscription}
                className="min-h-[90vh] flex items-center justify-center text-white"    
            >
                <div className="w-80 h-[26rem] flex flex-col shadow-[0_0_10px_black] rounded-lg ">
                    <h1 className="bg-red-500  top-0 w-full text-center py-4 text-2xl font-bold ">
                        Subscription Bundle
                    </h1>
                    <div className="px-4 mt-2 space-y-5 text-center">
                        <p className="text-[17px]">
                            This Purchase will allow you to access all available movie for {" "}
                            <span className="text-red-500 font-semibold text-[19px]">1 year Duration</span>
                        </p>
                        <p className="flex items-center justify-center gap-1 text-2xl font-bold text-red-500">
                            <BiRupee/><span>499</span>only
                        </p>
                    </div>
                    <div className="text-gray-200 text-center mt-4">
                        <p>100% refund on cancellation</p>
                        <p>*Terms and Condition applied</p>
                    </div>
                    <button type="submit" className=" flex items-center justify-center mt-8 py-4  bg-red-500 w-1/2 m-auto rounded-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out">
                        Buy Now
                    </button>
                </div>

            </form>
        </HomeLayout>
    )
}

export default CheckOut;