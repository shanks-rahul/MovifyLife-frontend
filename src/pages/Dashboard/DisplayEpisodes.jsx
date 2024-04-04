import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteMovieEpisodes, getMovieEpisodes } from "../../Redux/Slices/EpisodeSlice";
import HomeLayout from "../../layouts/HomeLayout";
import { useEffect, useState } from "react";

function DisplayEpisodes(){

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const role=useSelector((state)=>state.auth.role);
    const {state}=useLocation();
    const {episodes}=useSelector((state)=>state.episode);
    async function onEpisodeDelete(movieId,episodeId){
        await dispatch(deleteMovieEpisodes({movieId:movieId,episodeId:episodeId}));
        await getMovieEpisodes(movieId);
    }
    useEffect(()=>{
       console.log(state);
        if(!state) navigate("/movie");
        
        dispatch(getMovieEpisodes(state._id));
        
        
    },[])


    const [currentVideo,setCurrentVideo]=useState(0);

    return(
        <HomeLayout>
           <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white  ">
                <div className="text-center text-2xl font-semibold text-red-500">
                    Movie Name:{state.title}
                </div>
                <div className="flex justify-center gap-10 w-full">
                    <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                        <video src={episodes && episodes[currentVideo]?.episode?.secure_url}
                            className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                            controls
                            disablePictureInPicture
                            muted
                            controlsList="nodownload"
                        >      
                        </video>
                        <div>
                            <h1>
                                <span className="text-red-500 font-semibold">Title: {" "} </span>
                                {episodes && episodes[currentVideo]?.title}
                            </h1>
                            <p>
                                <span className="text-red-500 font-semibold">Description : {" "}
                                </span>
                                {episodes && episodes[currentVideo]?.description}
                            </p>
                        </div>
                    </div>
                    <ul className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                        <li className="text-red-500 font-semibold flex items-center justify-between ">
                            <p>
                                Epiodes List
                                
                            </p>
                            {role==="ADMIN" &&(
                                    <button onClick={()=> navigate("/movie/addEpisode",{state:{...state}})} className="border text-white bg-red-500 px-2 py-1 rounded-md font-semibold text-sm">
                                        Add New Lecture
                                    </button>
                            )}
                        </li>
                        {episodes && 
                            episodes.map((episode,idx)=>{
                                return(
                                    <li className="space-y-2" key={episode._id}>
                                        <p className="cursor-pointer" onClick={()=>setCurrentVideo(idx)}>
                                            <span>
                                                {" "} episode {idx+1} : {" "}
                                            </span>
                                            {episode?.title}
                                        </p>
                                        {role==="ADMIN" &&(
                                            <button onClick={()=> onEpisodeDelete(state?._id,episode._id)} className="bg-cyan-500 px-2 py-1 rounded-md font-semibold text-sm">
                                                Delete Lecture
                                            </button>
                                )}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </HomeLayout>
    )

}

export default DisplayEpisodes;