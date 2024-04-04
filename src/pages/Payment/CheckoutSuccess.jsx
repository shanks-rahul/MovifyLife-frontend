import { AiFillCheckCircle } from "react-icons/ai";
import HomeLayout from "../../layouts/HomeLayout";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "../../Redux/Slices/AuthSlice";

function CheckOutSuccess() {
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getUserData());
    },[])
    return (

        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <div className="w-80 h-[20rem] flex flex-col shadow-[0_0_10px_black] rounded-lg">
                    <h1 className="bg-green-500 text-white top-0 w-full text-center py-4 text-2xl font-bold ">
                        Payment Successfull
                    </h1>
                    <div className="px-4 space-y-5 text-center mt-8">
                        <p className="text-[17px] text-white">
                            Welcome to Pro Bundle
                        </p>
                        <p className="flex items-center justify-center gap-1 text-2xl font-bold text-green-500">
                            <AiFillCheckCircle />
                        </p>
                    </div>
                    <Link to="/">
                        <button className="text-white flex items-center justify-center mt-8 py-4  bg-green-500 w-1/2 m-auto rounded-lg cursor-pointer hover:bg-green-600 transition-all ease-in-out">
                            Go to dashboard
                        </button>
                    </Link>
                </div>

            </div>
        </HomeLayout>
    )
}

export default CheckOutSuccess;