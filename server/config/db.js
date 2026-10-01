import mongoose from "mongoose";


const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/auth-system`)
        console.log("mongodb connected sucsessfully!")
    }catch(err){
        console.log('mongodb server error!')
        console.error(err.message)
        process.exit(1)
    }
}

export default connectDB