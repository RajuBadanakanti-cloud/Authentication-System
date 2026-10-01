import{MoveRight } from "lucide-react"
import Header from "../components/Header"
import { Link } from "react-router-dom"
import { useAuth } from "../context/UserContextProvider"

const LandingPage = () => {
    const {userLogin} = useAuth()
    return (
        <>
        <Header/>
        <div className='min-h-screen w-screen bg-linear-to-br from-slate-950 via-indigo-950 to-purple-950"
        flex justify-center items-center pt-10'>
            <div className="w-[95%] md:w-[60%] lg:md:w-[50%] border border-slate-400 px-4 py-5 md:px-6 md:py-10 rounded-md text-center
                flex flex-col justify-center items-center bg-indigo-950/20 backdrop-blur-2xl">
                    <h1 className="font-bold text-2xl md:text-4xl text-slate-100 mb-4">
                        Secure Access. Simple Experience.
                    </h1>
                    <p className="text-slate-300/60 text-sm md:text-base">
                        A modern authentication platform built with the MERN stack, 
                        designed to keep your account secure with JWT authentication and protected sessions.
                    </p>
                    {/* buttons */} 
                    {userLogin ?   
                    (
                    <Link to="/dashboard" className="group h-12 px-6 bg-indigo-900 backdrop-blur-2xl
                    shadow-2xl shadow-indigo-600 border border-slate-100
                     text-slate-100 text-sm md:text-lg mt-10 
                        flex justify-center items-center rounded-full transition duration-200 font-semibold
                        hover:shadow-indigo-800">
                            Explore
                            <MoveRight 
                             className="ml-2 h-5 w-5 transition  group-hover:translate-x-1" />
                        </Link>
                    ) :  
                    (<div className="w-full flex justify-center items-center flex-wrap mt-10 gap-4 md:gap-6">
                        <Link to="/signup" className="group w-full sm:w-fit h-12 px-4 bg-indigo-500 text-slate-100 text-sm md:text-base
                        flex justify-center items-center rounded-md shadow transition duration-200
                        hover:bg-indigo-400">
                            create an account 
                            <MoveRight 
                             className="ml-1 md:ml-2 h-5 w-5 transition group-hover:translate-x-1" />
                        </Link>

                        <Link to="/login" className="h-12 w-full sm:w-fit px-4 bg-slate-800/60 text-slate-100 text-sm md:text-base
                        flex flex-col justify-center items-center rounded-md shadow
                        transition duration-200 hover:bg-slate-700">
                            Login
                        </Link>

                    </div> 
                    )
            }
            </div>
        </div>
        </>
    )

}


export default LandingPage