import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// ---------- Register user ------------

export const userRegister = async(req , res) =>{
    console.log("REGISTER BODY :", req.body)
    const { name , email , password , role } = req.body
    if( !name  || !email || !password ){
        return res.status(400).json({ message : "Please fill all the fields"})
    }
    try{ 
        const userExists = await User.findOne({email})
        if (userExists){
            return res.status(400).json({message: "User already exists"})
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)
        
        // Only allow patient or doctor from public registration
        let assignedRole = "patient"
        if (role === "doctor"){
            assignedRole = "doctor"
        }

        // Create new user
        const newUser = await User.create({name , email, password: hashedPassword , role: assignedRole})

        // If doctor — also save to Doctor collection
        if (assignedRole === "doctor") {
            await Doctor.create({
                name:           newUser.name,
                specialization: req.body.specialization || "General",
                experience:     req.body.experience || 0,
                createdBy:      newUser._id
            })
        }

        res.status(201).json({
            message:"User registered successfully",
            user:{
                id:    newUser._id,
                name:  newUser.name,
                email: newUser.email,
                role:  newUser.role
            }
        })
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already registered" });
        }
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

// ---------- Login user ------------

export const userLogin = async(req , res) =>{
    const { email , password} =req.body
    if( !email || !password){
        return res.status(400).json({ message : "Please provide email and password"})
    }
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({ message : "Invalid credentials"})
        }
        // Compare password
        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch){
            return res.status(400).json({ message : "Invalid credentials"})
        }
        // Generate JWT token
        const token =jwt.sign({
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h"}
        )
        res.status(200).json({
            message: "Login successfully",
            token,
            user:{
                id:user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch(error){
        res.status(500).json({message: "Server error"})
    }
}