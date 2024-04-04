import { useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
import toast from "react-hot-toast";
import axiosInstance from "../helpers/axiosInstance";

function ContactPage(){

    const [userInput,setUserInput]=useState({
        name:"",
        email:"",
        message:""
    })


    function handleInputChange(e){
        e.preventDefault();
        const {name,value}=e.target;
        setUserInput({
            ...userInput,
            [name]:value
        })

    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.name || !userInput.email || !userInput.message){
            toast.error("Enter All Fields");
            return;
        }
        try {
            const res=axiosInstance.post("/contact",userInput);
            toast.promise(res,{
                loading: "Sending Message...",
                success:"message sent successfully...",
                error:(err)=> `Oops there was an Error ${err}`
            });
            const contactResponse=await res;
        
            if(contactResponse?.data?.success){
                setUserInput({
                    name:"",
                    email:"",
                    message:"",
                })
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }

    }

    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form
                noValidate
                onSubmit={onFormSubmit} 
                className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-lg">
                    <h1 className="text-3xl font-semibold">
                        Contact Form
                    </h1>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="name" className="text-xl font-semibold">
                            Name
                        </label>
                        <input 
                            className="bg-transparent border px-2 py-1 rounded-sm"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={userInput.name}
                            onChange={handleInputChange}
                            
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="email" className="text-xl font-semibold">
                            Email
                        </label>
                        <input 
                            className="bg-transparent border px-2 py-1 rounded-sm"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your name"
                            value={userInput.email}
                            onChange={handleInputChange}
                            
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="message" className="text-xl font-semibold">
                            Message
                        </label>
                        <input 
                            className="bg-transparent border px-2 py-1 rounded-sm"
                            id="message"
                            type="textArea"
                            name="message"
                            placeholder="Enter your Message"
                            value={userInput.message}
                            onChange={handleInputChange}
                            
                        />
                    </div>
                    <button type="submit"
                    className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-lg" >
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    )    

}
export default ContactPage;