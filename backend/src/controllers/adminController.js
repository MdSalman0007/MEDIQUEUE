import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";

// Get all users (excluding passwords)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all appointments with patient and doctor names
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("userId",   "name")
      .populate("doctorId", "name");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a doctor by ID
export const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDoctors = await User.countDocuments({ role: "doctor" });
    const totalAppointments = await Appointment.countDocuments();

    const confirmedAppointments = await Appointment.countDocuments({ status: "Confirmed" });
    const completedAppointments = await Appointment.countDocuments({ status: "Completed" });
    const cancelledAppointments = await Appointment.countDocuments({ status: "Cancelled" });

    res.json({
      totalUsers,
      totalDoctors,
      totalAppointments,
      confirmedAppointments,
      completedAppointments,
      cancelledAppointments
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};