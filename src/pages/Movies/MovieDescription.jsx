import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";
import { useLocation, useNavigate } from "react-router-dom";

function MovieDescription(){

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {isLoggedIn,role,data}=useSelector((state)=>state.auth);

    const {state}=useLocation();



    return (
        <HomeLayout>
             <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
                <div className="grid grid-cols-2 gap-10 py-10 relative">
                    <div className="space-y-5">
                        <img
                            className="w-full h-64"
                            alt="thumbnail"
                            src={state?.thumbnail?.secure_url}
                        />
                        <div className="space-y-2">
                            <div className="flex flex-col items-center justify-between text-xl">
                                <p className="font-semibold">
                                    <span className="text-red-500 font-bold">
                                        Total Episodes : {" "}
                                    </span>
                                    {state?.numberOfEpisodes}
                                </p>
                                <p className="font-semibold">
                                    <span className="text-red-500 font-bold">
                                       Director: {" "}
                                    </span>
                                    {state?.directedBy}
                                </p>
                                <p className="font-semibold">
                                    <span className="text-red-500 font-bold">
                                       Producer: {" "}
                                    </span>
                                    {state?.producedBy}
                                </p>
                                {role ==="ADMIN" || data?.subscription?.status=="active" ? 
                                    <button
                                    onClick={()=>{navigate("/movie/displayEpisodes",{state:{...state}})}} 
                                    className="w-full mt-2 rounded-md text-white bg-red-500 px-4 py-2 text-sm cursor-pointer hover:bg-red-600">
                                        Watch Episodes
                                    </button> :
                                    <button onClick={()=>{isLoggedIn?navigate("/checkout"):navigate("/login")}} className="w-full mt-2 rounded-md text-white text-sm bg-red-500 px-4 py-2 cursor-pointer hover:bg-red-600">
                                        Subscribe
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="text-xl space-y-2">
                        <h1 className="font-bold text-3xl mb-4 flex items-center justify-center text-white ">
                            {state?.title}
                        </h1>
                        <p className="text-lg font-semibold  text-red-500 ">
                            Description :
                        </p>
                        <p className="text-lg text-white ">
                            {state?.description}
                        </p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )

}

export default MovieDescription;