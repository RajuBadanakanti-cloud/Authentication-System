import { useAuth } from "../context/UserContextProvider"
import Header from "../components/Header"
import Specifications from "../context/Specification"



const Dashboard = () => {
    const {user} = useAuth()
    console.log("dashboard: ", user)
    const data = Specifications
    return (
        <>
        <Header/>
        <div className='pt-10 md:pt-20 pb-4 md:pb-10 min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-purple-950
        flex flex-col justify-center items-center'>
        <div className="w-[95%] md:w-[80%] flex flex-col justify-center items-center">
        {/* Profile */}
            <div className="min-h-80 md:min-h-100 w-full md:w-[80%] flex flex-col justify-center items-center text-center p-2 md:p-4">
                <h1 className="text-3xl md:text-6xl font-bold text-slate-100 mb-1 md:mb-2">Hello {user?.name || "Unknown"}</h1>
                <p className="text-xs md:text-sm text-slate-500 mb-4">{user?.gmail}</p>
                <p className="text-slate-300 text-sm md:text-lg">
                    Your account is securely authenticated and your session is active.
                    Your information is protected with secure authentication, 
                    encrypted credentials, and token-based session management.
                </p>
            </div>
        {/*  Specifications  */}
        <ul className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 py-2 md:py-4">
            {data.map((each) => { 
                const isActive = each.status &&
                <div className=" w-fit flex items-center bg-green-600/40 px-3 md:px-4 py-2
                shadow rounded-full ml-auto">
                    <div className="h-2 w-2 p-2 mr-2 rounded-full bg-green-600"></div>
                    <span className="text-green-200 text-xs md:text-base font-semibold">{each.status}</span>
                    
                </div> 

                return (
                <li key={each.id} 
                className="bg-indigo-900/20 px-4 py-4
                rounded-lg border border-indigo-400 transition-all transform duration-300 ease-in-out scale-95
                hover:scale-100">
                    <div className="w-fit bg-indigo-800 rounded-full p-2 mb-2">
                    <each.icon className="text-green-100 h-3 w-3 md:h-4 md:w-4"/>
                    </div>
                    {/* title and description */}
                    <div className="text-center">
                    <h2 className="text-purple-100 text-xl md:text-3xl font-bold">{each.title}</h2>
                    <p className="text-slate-400 text-sm md:text-base mt-2">{each.description}</p>
                    </div>
                    {/* technology and status */}
                    <div className="flex justify-center items-center mt-6 md:mt-8">
                    <h3 className="text-xs md:text-base font-semibold backdrop-blur-2xl bg-slate-400/40 px-3 md:px-4 py-2
                     text-indigo-100 rounded-full border border-gray-200 mr-2">{each.technology}</h3>
                    {isActive}
                    </div>
                </li>
            )})}
        </ul>
        
        </div>
        </div>
        </>
    )

}


export default Dashboard