
import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        minlength:1,
        required:true,
    },
    age:{
        type:Number,
        min:5,
        required:true
    },
    gmail:{
        type:String,
        trim:true,
        match: /@gmail\.com$/,
        unique:true,
        required:true

    },
    password:{
        type:String,
        minlength:6,
        select:false,
        required:true
    }
},{timestamps:true, toJSON:{virtuals:true}})


// signup with pre hashing password
userSchema.pre("save", async function() {
    if(!this.isModified("password"))return;
    return this.password = await bcrypt.hash(this.password, 12)
    
})

// login with comparePassword methods compare current password
userSchema.methods.comparePassword = async function(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password)
}


const User = mongoose.model("User", userSchema)
export default User