import { useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { Link, useLocation } from "react-router-dom";

function Profile(){
    const dispatch=useDispatch();
    const state =useLocation();
    const userData=useSelector((state)=>state?.auth?.data);
    async function handleCancellation(){
        toast("initiating the cancellation...");
        await dispatch(cancelCourseBundle());
        await dispatch(getUserData());
        toast.success("Subscription cancelled successfully...");
    }

    return(
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <div className="flex flex-col gap-4 p-4 text-white  shadow-[0_0_10px_black] rounded-lg my-10 ">
                    <img
                        src={userData.avatar.secure_url}
                        className="w-40 m-auto rounded-full border border-black"
                    >
                    </img>
                    <h3 className="text-lg font-semibold text-center capitalize">
                        {userData?.fullName}
                    </h3>
                    <div className="grid grid-cols-2 ">
                        <p className="">Email :</p><p className="text-center mr-2">{userData?.email}</p>
                        <p>Role :</p><p>{userData?.role}</p>
                        <p>Subscription :</p><p>{userData?.subscription?.status==="active"?"Action" :"Inactive"}</p>
                        
                    </div>
                    <div className="flex items-center justify-between">
                        <Link
                            to="/changepassword"
                            className=" mx-1 rounded-md text-center w-1/2 bg-yellow-500 hover:bg-yellow-600 cursor-pointer py-2 text-sm transition-all ease-in-out"
                        >
                            <button>Change Password</button>
                        
                        </Link>
                        <Link
                            to="/user/editprofile"
                            className=" rounded-md text-center w-1/2 bg-yellow-500 hover:bg-yellow-600 cursor-pointer py-2 text-sm transition-all ease-in-out"
                        >
                            <button>Edit Profile</button>
                        
                        </Link>
                    </div>
                    {userData?.subscription?.status==="active" || userData?.role==="ADMIN" ?(
                        
                        <button onClick={handleCancellation} className=" rounded-md text-center w-full bg-red-500 hover:bg-red-600 cursor-pointer py-2 text-sm transition-all ease-in-out">Cancel Subscription</button>
                    
                 
                    ):""}
                </div>

            </div>
        </HomeLayout>
    )

}

export default Profile;