// ============================================================
//  create_admin.js
//  Run this file ONCE to create the admin user in MongoDB
//  Command: node src/create_admin.js
// ============================================================

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/User.js";
import dotenv from "dotenv";

// Load .env file to get MONGO_URI
dotenv.config();

console.log("Connecting to MongoDB...");

// Connect to MongoDB
await mongoose.connect(process.env.MONGO_URI);
console.log("Connected to MongoDB ✅");

// Check if admin already exists
const existing = await User.findOne({ email: "admin@mediqueue.com" });

if (existing) {
    console.log("⚠️  Admin already exists!");
    console.log("Email:    admin@mediqueue.com");
    console.log("Password: admin123");
} else {
    // Hash the password — never store plain text
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create admin user matching your User schema exactly
    const admin = new User({
        name:         "Admin",
        email:        "admin@mediqueue.com",
        password:     hashedPassword,
        role:         "admin",       // matches enum: ["patient","doctor","admin"]
        otp_verified: true           // matches your schema field
    });

    await admin.save();

    console.log("✅ Admin created successfully!");
    console.log("----------------------------");
    console.log("Email:    admin@mediqueue.com");
    console.log("Password: admin123");
    console.log("----------------------------");
    console.log("You can now login at login.html");
}

// Close MongoDB connection
await mongoose.disconnect();
console.log("Done!");