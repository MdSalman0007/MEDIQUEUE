import Doctor from "../models/Doctor.js";

/* =========================
   ADD DOCTOR (Admin Only)
========================= */
export const addDoctor = async (req, res) => {
  const { name, specialization, experience } = req.body;

  if (!name || !specialization) {
    return res.status(400).json({ message: "Name and specialization are required" });
  }

  try {
    const doctor = await Doctor.create({
      name,
      specialization,
      experience,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Doctor added successfully",
      doctor
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/* =========================
   GET ALL DOCTORS
========================= */
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();

    res.json(doctors);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/* =========================
   SEARCH DOCTOR BY SPECIALIZATION
========================= */
export const searchDoctors = async (req, res) => {
  const { specialization } = req.query;

  try {
    const doctors = await Doctor.find({
      specialization: { $regex: specialization, $options: "i" }
    });

    res.json(doctors);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};