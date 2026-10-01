import User from "../model/User.js"

import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/AppError.js"
import {signAccessToken, signRefreshToken} from "../utils/jwtToken.js"



export const signUp = catchAsync(async(req, res, next) => {
    const {name, age, gmail, password} = req.body 
    if(!name || !age || !gmail || !password){
        return next(new AppError("all fields are required!", 400 ))
    }

    // checking gmail 
    const gmailExist = await User.findOne({gmail})
    if(gmailExist)return next(new AppError("gmail already exist!", 400))
    
    // checking password
    if(password.length < 6)return next(new AppError("password must be atleast 6 characters", 400))

    const user = await User.create({
        name,
        age,
        gmail, 
        password
    })

    // token generate 
    const accessToken = signAccessToken(user._id)
    const refreshToken = signRefreshToken(user._id)
    res.cookie("refreshToken", refreshToken, {
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite:true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })


    res.status(201).json({
        success:true,
        message:"User successfully registered",
        accessToken,
        user:{
            name:user.name,
            age:user.age,
            gmail:user.gmail
        }
    })
    

})


export const login = catchAsync(async(req, res, next) => {
    const {gmail, password} = req.body 
    if(!gmail || !password){
        return next(new AppError("gmail and password required!", 400))
    }

    // gmail checking >>
    const user = await User.findOne({gmail}).select("+password") // imp
    if(!user)return next(new AppError("invalid gmail or password!", 400))

    // password checking >>
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        return next(new AppError("invalid gmail or password!", 400))
    }

    // token 
    const accessToken = signAccessToken(user._id)
    const refreshToken = signRefreshToken(user._id)

    res.cookie("refreshToken", refreshToken, {
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:true,
        maxAge:7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
        success:true,
        message:"User successfully Logged in",
        accessToken,
        user:{
            name:user.name,
            age:user.age,
            gmail:user.gmail
        }
    })


})


// logout >>>>>>>>>>>.
export const logout = catchAsync(async (req, res, next) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: true,
    });

    res.status(200).json({
        success: true,
        message: "User successfully logged out",
    });
});