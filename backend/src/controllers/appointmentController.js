import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

/* =========================
   BOOK APPOINTMENT
========================= */
export const bookAppointment = async (req, res) => {
  const { doctorId, date, time } = req.body;

  if (!doctorId || !date || !time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check if slot already booked
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      date,
      time,
      status: "Confirmed"
    });

    if (existingAppointment) {
      return res.status(400).json({ message: "Time slot already booked" });
    }

    // Create appointment
    const appointment = await Appointment.create({
      patient: req.user.id,
      doctor: doctorId,
      date,
      time
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/* =========================
   GET MY APPOINTMENTS
========================= */
export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user.id
    })
      .populate("doctor", "name specialization");

    res.json(appointments);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/* =========================
   CANCEL APPOINTMENT
========================= */
export const cancelAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Only patient who booked can cancel
    if (appointment.patient.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    appointment.status = "Cancelled";
    await appointment.save();

    res.json({ message: "Appointment cancelled successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   DOCTOR: GET MY APPOINTMENTS
========================= */
export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.user.id
    })
      .populate("patient", "name email")
      .sort({ createdAt: -1 });

    res.json(appointments);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/* =========================
   DOCTOR: MARK COMPLETED
========================= */
export const markAppointmentCompleted = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Only assigned doctor can update
    if (appointment.doctor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    appointment.status = "Completed";
    await appointment.save();

    res.json({ message: "Appointment marked as completed" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
/* =========================
   ADMIN: GET ALL APPOINTMENTS
========================= */
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email role")
      .populate("doctor", "name specialization")
      .sort({ createdAt: -1 });

    res.json(appointments);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
/* =========================
   PATIENT: RESCHEDULE APPOINTMENT
========================= */
export const rescheduleAppointment = async (req, res) => {
  const { id } = req.params;
  const { date, time } = req.body;

  if (!date || !time) {
    return res.status(400).json({ message: "Date and time are required" });
  }

  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Only the patient who booked can reschedule
    if (appointment.patient.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Check if new slot already booked
    const existingAppointment = await Appointment.findOne({
      doctor: appointment.doctor,
      date,
      time,
      status: "Confirmed"
    });

    if (existingAppointment) {
      return res.status(400).json({ message: "Time slot already booked" });
    }

    appointment.date = date;
    appointment.time = time;
    await appointment.save();

    res.json({
      message: "Appointment rescheduled successfully",
      appointment
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};