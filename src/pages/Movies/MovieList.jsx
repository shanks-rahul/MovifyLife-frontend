import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";
import { useNavigate } from "react-router-dom";
import { getAllMovies } from "../../Redux/Slices/MovieSlice";
import { useEffect } from "react";
import MovieCard from "../../components/MovieCard";

function MovieList(){

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {movieData}=useSelector((state)=>state.movie);

    async function loadAllCourse(){
        await dispatch(getAllMovies());
    }
    useEffect(()=>{
        loadAllCourse();
    },[])

    
    
    return(
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
                <h1>
                    Explore the Series Made by
                    <span className="font-bold text-red-500">
                        Industry Experts
                    </span>
                    
                </h1>
                <div className="mb-10 flex flex-wrap gap-14">
                        {movieData.map((element)=>{
                            return <MovieCard key={element._id}  data={element} />;
                        })}
                    </div>
            </div>
        </HomeLayout>
    )

}

export default MovieList;