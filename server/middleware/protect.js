import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/AppError.js"
import jwt from "jsonwebtoken"
import User from "../model/User.js"

export const protect = catchAsync(async(req, res, next) => {
        // token >> 
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
            token = req.headers.authorization.split(" ")[1] // important >> 
        }

        if(!token)return next(new AppError("User not logged in, Please login!", 401));

        let decode;
        try{
            decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET_TOKEN) // imp >>
        }catch(err){
            return next(new AppError("Login token invalid or expired!", 401))
        }

        const currentUser = await User.findById(decode.id) // important
        if(!currentUser)return next(new AppError("User no longer exist!", 401))

        req.user = currentUser // imp
        next()
})