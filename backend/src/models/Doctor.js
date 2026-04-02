import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    specialization: {
      type: String,
      required: true
    },

    experience: {
      type: Number
    },
    country: {
      type: String, default: "India"
    },
    state: {
      type: String
    },
    city: {
      type: String
    },

    availableSlots: [
      {
        date: String,
        times: [String]
      }
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);