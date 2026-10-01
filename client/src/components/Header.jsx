import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import { useAuth } from "../context/UserContextProvider"
import { Lock, Menu, X } from "lucide-react"

const Header = () => {
    const [showConformLogout, setShowConformLogout] = useState(false)
    const {userLogin, logout}  = useAuth() // from provider
    const navigation = useNavigate()

    const [showMenu, setShowMenu] = useState(false)

// Logout conformation pupup >>>>>>>>> 
const popup = () => {
    return (
        <div className="absolute z-50 top-14 md:top-20 right-2 md:right-5 min-h-20 min-w-50 px-4 py-2 md:px-6 md:py-4
       bg-purple-200 md:bg-purple-200/60 border border-purple-300 backdrop-blur-xl rounded-md text-center">
            <h3 className="text-slate-800 md:text-slate-100/80 font-medium">Are you sure you want to log out?</h3>
            <div className="flex justify-center items-center flex-wrap mt-4 gap-2">
                <button type="button" onClick={() => setShowConformLogout(false)}
                 className="py-1 px-4 bg-slate-700 text-slate-200 mr-6 rounded-full 
                 hover:bg-slate-600 transition-all duration-300 cursor-pointer">
                    close
                </button>
                <button 
                onClick={() => 
                    {  logout(), 
                        navigation("/", {replace:true});
                        setShowConformLogout(false)
                    }}
                className="py-1 px-4 bg-purple-700 text-slate-200 mr-6 rounded-full 
                hover:bg-purple-600 transition-all duration-300 cursor-pointer">
                    confrim 
                </button>
            </div>
        </div>
    )
}

const menubar = () => {
    return (
        <div className={`w-full min-h-30 absolute bg-slate-50 top-12 right-0 md:hidden flex justify-center items-center
        rounded-bl-2xl rounded-br-2xl transition-all transform duration-300 ease-in-out py-10
        ${showMenu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}>
        {!userLogin &&   
        <nav className="w-[90%] flex flex-col justify-center items-start gap-4 px-10">
                <Link to="/login" className="font-bold text-indigo-600
                transition-all duration-200 hover:text-indigo-500 hover:underline">
                Login
                </Link>

                <Link to="/signup" className="font-bold text-indigo-600
                transition-all duration-200 hover:text-indigo-500 hover:underline">
                SignUp
                </Link>
        </nav>
        }
                 
                {/*  logout  */}
                <div className="w-[90%] flex justify-start items-center">
                { userLogin &&
                <button onClick = {() => setShowConformLogout(true)}
                    className="rounded-full text-purple-800 font-bold cursor-pointer
                    transition-all duration-200 hover:text-purple-700 hover:underline">
                    Logout
                </button>
                }
            
                </div>
           
        </div>
    )
}
    
    return (
        <header 
        className="h-12 md:h-16 w-screen top-0 left-0 fixed z-50 flex flex-col justify-center items-center
        bg-linear-to-r from-slate-900/80 via-indigo-900/80 to-purple-900/80 backdrop-blur-2xl shadow">
        {/* content  */}
        <div className="w-[95%] px-2 py-2 md:px-5 md:py-5 flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex justify-center items-start">
                <div className="bg-slate-100/10 backdrop-blur-2xl shadow-xl shadow-indigo-600/40
                border border-slate-200 p-2 mr-2 rounded-full">
                    <Lock className="text-indigo-500 font-medium h-2 w-2 md:h-4 md:w-4"/>
                </div> 
               <h2 className="text-slate-50 text-sm md:text-xl font-bold">Authentication</h2>
            </Link>

            {/* Desktop Navigations >> */}
            <nav className="md:flex hidden">
                {!userLogin &&
                <div className="flex items-center">
                <Link to="/login"
                className="px-5 py-2 mr-6 shadow-lg shadow-indigo-800
                rounded-full bg-indigo-600/60 text-slate-100
                transition-all duration-300 ease-in-out hover:bg-indigo-600/40">
                 Login
                </Link>

                <Link to="/signup"
                className="px-5 py-2 shadow-lg shadow-indigo-800 
                rounded-full border-2 border-indigo-600 bg-indigo-600/20 text-slate-100
                transition-all duration-300 ease-in-out
                hover:bg-indigo-900/40">
                 create an account
                </Link>
                </div>
                }

                {/*  logout  */}
                { userLogin &&
                <button onClick = {() => setShowConformLogout(true)}
                className="ml-10 px-5 py-2 rounded-full bg-purple-600/40 text-slate-100 
                transition-all duration-300 ease-in-out hover:bg-purple-600/20 cursor-pointer">
                Logout
                </button>
                }
            </nav>

            {/* Mobile View */}
             <nav className="flex md:hidden justify-center items-center">
                <button onClick={() => setShowMenu(!showMenu)}
                className="p-2 bg-indigo-50 rounded-xl text-indigo-800 cursor-pointer
                transition-all duration-300 hover:bg-purple-300 ">
                {showMenu ? <X className="h-4 w-4"/> :<Menu className="h-4 w-4" /> }
                </button>   

            </nav>

        </div>
        {showConformLogout && popup()}
         {menubar()}
        </header> 
    )
}

export default Header