import mongoose from "mongoose";

const userAdd = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
})