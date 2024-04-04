import { Link } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";

function HomePage(){
    return(
        <HomeLayout>
            <div className="flex items-center justify-center mx-16 gap-10 h-[90vh]">
                <div className="w-1/2 space-y-6">
                    <h1 className="font-semibold text-5xl text-white">
                        Find Out Best

                        <span className="font-bold text-5xl text-red-500 ml-1">Movie For You</span>
                    </h1>
                    <p className="text-xl text-gray-200">
                        Watch Your Favourite and Latest Movie Of Your Favourite SuperStar.

                    </p>
                    <div className="flex items-center justify-start">
                        <Link to="/movie">
                            <button className="bg-red-500 px-4 py-3 rounded-md text-white font-semibold text-lg hover:bg-red-600 transition:all ">
                                Explore Movies
                            </button>
                        </Link>
                        <Link to="/contact">
                            <button className="ml-4 border border-green-500  text-white px-4 py-3 rounded-md font-semibold text-lg hover:bg-green-600 transition:all ">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </HomeLayout>
    )
}

export default HomePage;