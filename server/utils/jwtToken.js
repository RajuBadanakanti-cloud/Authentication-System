import jwt from "jsonwebtoken"

export const signAccessToken = (id) => {
    return jwt.sign({id}, process.env.JWT_ACCESS_SECRET_TOKEN, {expiresIn:"15m"})
}


export const signRefreshToken = (id) => {
    return jwt.sign({id}, process.env.JWT_REFRESH_SECRET_TOKEN, {expiresIn:"7d"})
}