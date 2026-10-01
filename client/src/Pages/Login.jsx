import {useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import {UserRound, Mail, LockKeyhole, LoaderCircle,
    Eye, EyeOff
} from "lucide-react"
import { useAuth } from "../context/UserContextProvider"




const Login  = () => {
    const [isShowPassword, setShowPassword] = useState(false)
    const {login, isError,setIsError, errorMsg, isLoading} = useAuth() 
    const navigation = useNavigate()

    // form login details
    const [formDetails, setFormDetails] = useState({
        gmail:"",
        password:""
    })


const submitForm = async (event) => {
    event.preventDefault() // for avoiding underseved behaviour
    const success = await login(formDetails) // from provier
    if(success){
        navigation("/dashboard", {replace:true}) // after success navigated 
    } 
}


    return (
        <div className='min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-purple-950
        flex justify-center items-center px-2 md:px-4 py-6'>
            <section className="w-full md:w-[60%] lg:w-[50%]
            bg-slate-800/60  backdrop-blur-2xl
            rounded-lg border border-slate-500
            flex flex-col justify-center items-center p-4 md:p-6">
            {/* Top section  */}
            <div className="bg-indigo-200/60 rounded-full p-4 shadow-xl shadow-indigo-950 mb-2">
                <UserRound className="md:h-5 h-4 w-4 md:w-5 text-slate-900"/>
            </div>
                {/* Heading */}
                <div className="mb-7 text-center">
                    <h1 className="text-xl md:text-3xl font-bold tracking-tight text-indigo-50">
                        Well Come Back
                    </h1>
                    <p className="mt-1 text-xs md:text-sm text-slate-400">
                        Sign in to your account to continue
                    </p>
                </div>

                {/* Form */}
                <form id="login-form" onSubmit={submitForm}
                className="w-full flex flex-col justify-center items-start p-0 md:p-4">

                    {/* Gmail */}
                    <label htmlFor="gmail" className="text-slate-200 text-sm md:text-md font-medium mb-1">Gmail</label>
                    <div className="w-full h-10 bg-slate-600/40 border border-indigo-400/60 rounded-md
                        flex justify-start items-center px-2 md:px-4 py-2 mb-4">
                        <Mail className="h-4 w-4 text-indigo-200/60 mr-2"/>
                        <input id="gmail" value={formDetails.gmail} onChange={(event) => {setFormDetails({
                            ...formDetails,
                            gmail:event.target.value
                        }), setIsError(false)}}
                        type="email" placeholder="Enter your ex: example@gmail.com"
                        required
                        className="w-full text-slate-200 text-md md:text-base px-2 outline-none"/>
                    </div>

                    {/*  Password */}
                    <label htmlFor="password" className="text-slate-200  text-sm md:text-md font-medium mb-1">Password</label>
                    <div className="w-full h-10 bg-slate-600/40 border border-indigo-400/60 rounded-md
                        flex justify-start items-center px-2 md:px-4 py-2 mb-4">
                        <LockKeyhole className="h-4 w-4 text-indigo-200/60 md:mr-2 mr-1"/>
                        <input id="password" value={formDetails.password} onChange={(event) => {setFormDetails({
                            ...formDetails,
                            password: event.target.value
                        }), setIsError(false)}}
                        type={isShowPassword ? "text" : "password"} placeholder="Enter your own password!"
                        minLength={6} maxLength={40} required
                        className="w-full text-slate-200 text-md md:text-base px-2 outline-none"/>
                        <button type="button" onClick={() => setShowPassword(!isShowPassword)} 
                        className="bg-transparent border-none cursor-pointer">
                            {isShowPassword ? 
                            <EyeOff className="md:h-4 h-3 w-3 md:w-4 text-indigo-200/60"/>: 
                            <Eye className="md:h-4 h-3 w-3 md:w-4 text-indigo-200/60"/>}
                        </button>
                    </div>


                    {/*  Submit-Button section */} 
                    <div className="w-full flex flex-col justify-center items-center mt-2 md:mt-4 text-center">
                    {isError && 
                    <p className="h-6 md:h-8 text-red-500 text-xs md:text-sm flex justify-center items-center
                        bg-red-400/10 border border-red-400 backdrop-blur-2xl rounded-md
                         mt-1 px-4">
                        {errorMsg}
                      </p>}

                        <button type="submit" disabled={isLoading}
                        className="w-full md:w-fit bg-indigo-500 text-slate-100 font-bold rounded-md 
                        shadow-2xl shadow-indigo-600 px-6 md:px-10 py-3 cursor-pointer
                        hover:bg-indigo-600 transition-colors duration-300 mt-3 mb-2">
                        {isLoading ?
                            <span className="flex items-center justify-center gap-2">
                                <LoaderCircle className="h-5 w-5 animate-spin" /> 
                                 Signing In...
                            </span> : 
                            "Sign In"
                        }
                        </button>

                        {/* bottom note  */}
                        {isLoading ?
                        <span className="text-slate-300 text-xs md:text-sm">
                            Please wait while we securely authenticate your account.
                        </span>
                        :
                        <span className="text-slate-300 text-xs md:text-sm">
                            Don't you have an account? create Now
                            <Link to="/signup" className="underline text-indigo-400"> Sinup</Link>
                        </span>
                        }

                    </div>

                </form>

            </section>
        </div>
    )
}

export default Login