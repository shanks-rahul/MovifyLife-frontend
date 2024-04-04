import { useNavigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";

function NotFound(){
    const naviagte=useNavigate();
    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <div className=" relative flex flex-col gap-4">
                    <h1 className="font-bold text-4xl">
                        Not Found
                    </h1>
                    <button onClick={()=>naviagte(-1)} className="px-3 py-2 text-md text-black shadow-lg bg-red-500 hover:bg-red-700">
                        Go Back
                    </button>
                </div>
            </div>
        </HomeLayout>
    )
}
export default NotFound;