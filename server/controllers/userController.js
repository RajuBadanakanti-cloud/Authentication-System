import mongoose from "mongoose"
import User from "../model/User.js"
import AppError from "../utils/AppError.js"

export const getAllUsers = async (req, res, next) => {
        try{
        const users = await User.find()
        if(!users)return next(new AppError("no users!", 400))
        return res.status(200).json({
                success:true,
                message:"All Users",
                users
            })
        }catch(err){
            next(err)
        }
}

export const deleteUser = async (req, res, next) => {
    try{
        const id = req.params.id 
        if(!mongoose.isValidObjectId(id)){
            return next(new AppError("Invalid User", 400))
        }

        const user = await User.findByIdAndDelete(id)
        if(!user)return next(new AppError("User Not Found!", 404))
        
        return res.status(200).json({
            success:true,
            message:"User successfully Deleted!",
            user:{
                name:user.name,
                gmail:user.gmail
            }
        })
    }catch(err){
        next(err)
    }
}



