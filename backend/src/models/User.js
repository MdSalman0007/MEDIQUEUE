import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{ type: String , required: true , trim: true},
    email:{type: String, required: true, unique: true , lowercase: true},
    password:{type: String, required: true},
    role:{type: String , enum:["patient", "doctor","admin" ], default:"patient"},
    otp:{type: String},
    otp_verified:{type: Boolean, default: false}
},
{timestamps: true}
)

const User = mongoose.model("User", userSchema)
//export {user}  also used
export default User