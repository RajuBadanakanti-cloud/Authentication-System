const errorMid = (err, req, res, next) => {
    console.log(err.message)
    const statusCode = err.statusCode || 500 
    res.status(statusCode).json({
        status:"failed!",
        message:err.message || "Internal Server Error"
    })
}

export default errorMid