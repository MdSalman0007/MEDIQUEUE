import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },

    date: {
      type: String,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["Confirmed", "Cancelled", "Completed"],
      default: "Confirmed"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);