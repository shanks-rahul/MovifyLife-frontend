import { Chart as ChartJS ,ArcElement,Tooltip,Legend,CategoryScale,LinearScale,BarElement,Title} from "chart.js";
import HomeLayout from "../../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {FaUsers} from "react-icons/fa"
import { useEffect } from "react";

import { getAllStats } from "../../Redux/Slices/StatSlice";
import { getPaymentRecords } from "../../Redux/Slices/RazorpaySlice";
import axiosInstance from "../../helpers/axiosInstance";
import { Bar, Pie} from "react-chartjs-2";
import { getAllMovies } from "../../Redux/Slices/MovieSlice";

ChartJS.register(ArcElement,Tooltip,Legend,CategoryScale,LinearScale,BarElement,Title);

function AdminDashboard(){
    const dispatch=useDispatch();
    const navigate=useNavigate();

    
    const myMovies=useSelector((state)=>state?.movie?.movieData);
    const {allUserCounts,allsubscribedUserCounts}=useSelector((state)=>state?.stat);
    const {allPayments,finalMonths,monthlySalesRecord}=useSelector((state)=>state?.razorpay);
    
    const userData={
        labels:["registered Users","Subscribed Users"],
        datasets:[
            {
                label:"User Details",
                data:[allUserCounts,allsubscribedUserCounts],
                backgroundColor:["yellow","green"],
                borderWidth:1,
                borderColor:["yellow","green"],
            }
        ]
    }
    const salesData={
        labels:["Jan","Feb","Mar","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        data:monthlySalesRecord,
        backgroundColor:["white"],
        borderColor:["white"],
        borderWidth: 2
    }
    
    useEffect(()=>{
        (async()=>{
            await dispatch(getAllMovies());
            await dispatch(getAllStats());
            await dispatch(getPaymentRecords());
            console.log(myMovies);
        })()
    },[])
    return(
        <HomeLayout>
            <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
                <h1 className="text-center font-semibold text-yellow-500 text-5xl">
                    Admin Dashboard
                </h1>
                <div className="grid grid-cols-2 gap-5 m-auto ">
                    <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                        <div className="w-80 h-80">
                            <Pie data={userData}/>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center justify-between p-5 gap-5 mx-2 shadow-xl ">
                                <div className="flex flex-col space-y-2 text-white items-center ">
                                    <p className="font-semibold">Registered Users</p>
                                    <p className="text-2xl text-center font-bold">{allUserCounts}</p>
                                </div>
                                <div>
                                <FaUsers className="text-yellow-500 text-5xl"/>

                                </div>
                            </div>
                            <div className="flex items-center justify-between p-5 gap-5 mx-2 shadow-xl ">
                                <div className="flex flex-col space-y-2 text-white items-center ">
                                    <p className="font-semibold">Subscribed Users</p>
                                    <p className="text-2xl text-center font-bold">{allsubscribedUserCounts}</p>
                                </div>
                                <div>
                                <FaUsers className="text-green-500 text-5xl"/>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center justify-between p-5 gap-5 mx-2 shadow-xl ">
                                <div className="flex flex-col space-y-2 text-white items-center ">
                                    <p className="font-semibold">Subscription Count</p>
                                    <p className="text-2xl text-center font-bold">{allPayments?.count}</p>
                                </div>
                                <div>
                                <FaUsers className="text-yellow-500 text-5xl"/>

                                </div>
                            </div>
                            <div className="flex items-center justify-between p-5 gap-5 shadow-xl ">
                                <div className="flex flex-col space-y-2 text-white items-center ">
                                    <p className="font-semibold">Revenue Generated</p>
                                    <p className="text-2xl text-center font-bold">{allPayments?.count * 699}</p>
                                </div>
                                <div>
                                <FaUsers className="text-green-500 text-5xl"/>

                                </div>
                            </div>

                    </div>
                    
                </div>
                <div className=" h-20 flex items-center justify-between gap-4 px-4">
                    <h1 className="text-yellow-500 text-2xl font-semibold">Movie Overview</h1>
                    <button
                        onClick={()=>navigate("/movie/create")}
                        className="text-white bg-yellow-500 px-3 py-2 hover:bg-yellow-600 cursor-pointer rounded-md "    
                    >
                        Add Movie
                    </button>
                </div>
                <table className="table overflow-x-scroll w-full">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Movie Title</th>
                            <th>Movie Category</th>
                            <th>Director</th>
                            <th>Number Of Episodes</th>
                            <th>Descriptions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myMovies.map((movie,idx)=>{
                            return(
                                <tr className="font-semibold" key={movie._id}>
                                    <td>{idx+1}</td>
                                    <td>{movie.title}</td>
                                    <td>{movie.category}</td>
                                    <td>{movie.directedBy}</td>
                                    <td>{movie.numberOfEpisodes}</td>
                                    <td className="bg-transparent overflow-hidden whitespace-nowrap">
                                        <textarea className="bg-transparent w-full">
                                            {movie.description}
                                        </textarea>
                                    </td>
                                    <td>
                                        <button className="px-2 py-1 text-white text-sm rounded-md bg-green-500" onClick={()=> navigate("/movie/displayEpisode",{state:{...movie}})}>
                                            Go
                                        </button>
                                        
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </HomeLayout>
    )

}

export default AdminDashboard;
