import { useDispatch } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { createNewMovie } from "../../Redux/Slices/MovieSlice";

function CreateMovie() {

    const dispatch = useDispatch();
    const navigate=useNavigate();

    const [userInput, setUserInput] = useState({
        title: "",
        description: "",
        category: "",
        directedBy: "",
        producedBy: "",
        thumbnail: "",
        previewImage: ""
    });

    function handleInput(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.title || !userInput.description || !userInput.category || !userInput.directedBy || !userInput.producedBy) {
            toast.error("All Fields are required");
            return;
        }
        const res = await dispatch(createNewMovie(userInput));
        if (res?.payload?.success) {
            setUserInput({
                title: "",
                description: "",
                category: "",
                directedBy: "",
                producedBy: "",
                thumbnail: "",
                previewImage: ""
            })
            navigate("/movie");
            
        }
    };

    function handleImageInput(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener('load', function () {
            setUserInput({
                ...userInput,
                previewImage: this.result,
                thumbnail: uploadedImage

            })
        })
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form
                    noValidate
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-lg relative"
                >
                    <h1 className="text-center font-bold text-xl text-yellow-500">
                        Add New Movie
                    </h1>
                    <main className="grid grid-cols-2 gap-x-10">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="image_uploads" className="cursor-pointer">
                                    {userInput.thumbnail ?
                                        (<img className="w-full h-44 m-auto border" src={userInput.previewImage} />) :
                                        (
                                            <div className="w-full h-44 mt-4 flex justify-center items-center m-auto border">
                                                <h1 className="font-bold text-lg text-center text-white">upload your movie thumbnail</h1>
                                            </div>
                                        )
                                    }
                                </label>
                                <input
                                    className="hidden"
                                    type="file"
                                    id="image_uploads"
                                    accept=".jpg, .png,.jpeg"
                                    name="image_uploads"
                                    onChange={handleImageInput}
                                >

                                </input>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="title">
                                    <h1 className="font-semibold text-lg">Movie Title :</h1>
                                </label>
                                <input
                                    required
                                    id="title"
                                    name="title"
                                    type="text"
                                    placeholder="Enter Movie title"
                                    className="bg-transparent space-y-2 px-2 py-1 border"
                                    onChange={handleInput}
                                    value={userInput.title}>
                                </input>
                            </div>
                            

                        </div>
                        <div className="flex flex-col gap-2">
                        <label htmlFor="category">
                                <h1 className="font-semibold text-lg">Category :</h1>
                            </label>
                            <input
                                required
                                id="category"
                                name="category"
                                type="text"
                                placeholder="Enter the Category"
                                className="bg-transparent space-y-2 px-2 py-1 border"
                                onChange={handleInput}
                                value={userInput.category}>
                            </input>
                            <label htmlFor="producedBy">
                                <h1 className="font-semibold text-lg">producer :</h1>
                            </label>
                            <input
                                required
                                id="producedBy"
                                name="producedBy"
                                type="text"
                                placeholder="Enter name of producer..."
                                className="bg-transparent space-y-2 px-2 py-1 border"
                                onChange={handleInput}
                                value={userInput.producedBy}>
                            </input>
                            <label htmlFor="directedBy">
                                <h1 className="font-semibold text-lg">Director :</h1>
                            </label>
                            <input
                                required
                                id="directedBy"
                                name="directedBy"
                                type="text"
                                placeholder="Enter name of director..."
                                className="bg-transparent space-y-2 px-2 py-1 border"
                                onChange={handleInput}
                                value={userInput.directedBy}>
                            </input>
                            
                            <label htmlFor="description">
                                <h1 className="font-semibold text-lg">Description :</h1>
                            </label>
                            <input
                                required
                                id="description"
                                name="description"
                                type="text"
                                placeholder="Enter Description"
                                className="bg-transparent px-2 h-24 border"
                                onChange={handleInput}
                                value={userInput.description}>
                            </input>
                        </div>

                    </main>
                    <div>
                        <button type="submit" className="w-full text-center py-2 px-3 text-lg text-white bg-red-500 cursor-pointer">
                            Add Movie
                        </button>
                    </div>

                </form>
            </div>
        </HomeLayout>
    )
}


export default CreateMovie;