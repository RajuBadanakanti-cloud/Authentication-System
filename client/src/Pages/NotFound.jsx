
// 

const NotFound = () => {
    return (
        <div className="w-screen h-screen bg-slate-600
        flex flex-col justify-center items-center">
            <section className="w-[80%] md:w-[60%] text-center flex flex-col justify-center items-center">
                <h1 className="text-slate-300 text-xl md:text-4xl font-bold mb-2">Page Not Found</h1>
                <p className="text-slate-400 text-sm md:text-base">
                    404: Sorry! The page you are looking for doesn't exist or has been moved.
                </p>
                <button type="button" onClick={() => window.history.back()} 
                className="bg-indigo-950/80 text-sm md:text-base px-4 py-2 text-slate-200 border shadow
                rounded-full mt-5 md:mt-10">
                go back
                </button>

            </section>

        </div>
    )
}

export default NotFound