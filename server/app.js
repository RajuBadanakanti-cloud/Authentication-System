import express from "express"
import dotenv from 'dotenv'
dotenv.config()
import helmet from 'helmet'
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"

import connectDB from "./config/db.js"
import errorMid from './middleware/errorMiddleware.js'
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())
app.use(helmet())

app.use(cors({
    origin:[process.env.FRONTEND_URL ,"http://localhost:5173"],
    credentials:true
})) // frontend connection

app.use(cookieParser()) // << for refresh token

connectDB() // db connction
app.use('/auth', authRoutes) // signup/login/logout
app.use("/user", userRoutes) // users content


app.get("/", (req, res, next) => {
    res.send('<h1>Authentication-System</h1>')
})


app.use(errorMid) // error middleware


export default app