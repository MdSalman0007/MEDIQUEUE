import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

/* =========================
   BOOK APPOINTMENT
========================= */
export const bookAppointment = async (req, res) => {
  const { doctorId, date, time } = req.body;
  const appointmentDateTime = new Date(`${date}T${time}`);

  if (!doctorId || !date || !time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check if slot already booked
    const existing = await Appointment.findOne({
      doctorId,
      date,
      time,
      status: { $in: ["pending", "confirmed"] }
    });

    if (existing) {
      return res.status(400).json({ message: "Time slot already booked" });
    }

    const appointment = await Appointment.create({
      userId:   req.user.id,
      doctorId: doctorId,
      date,
      time,
      appointmentDateTime,
      status:   "confirmed"
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


/* =========================
   PATIENT: GET MY APPOINTMENTS
   Route: GET /api/appointments/my
========================= */
export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id })
      .populate("doctorId", "name specialization")
      .sort({ createdAt: -1 });

    res.json(appointments);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


/* =========================
   DOCTOR: GET MY APPOINTMENTS
   Route: GET /api/appointments/doctor
========================= */
export const getDoctorAppointments = async (req, res) => {
  try {
    // Find doctor record using logged-in user id
    const doctor = await Doctor.findOne({ createdBy: req.user.id });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    const appointments = await Appointment.find({ doctorId: doctor._id })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(appointments);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


/* =========================
   UPDATE APPOINTMENT STATUS
   Route: PUT /api/appointments/:id/status
   Used by: doctor (complete/cancel) + patient (cancel) + admin (cancel)
========================= */
export const updateAppointmentStatus = async (req, res) => {
  const { id }     = req.params;
  const { status } = req.body;

  const allowed = ["pending", "confirmed", "completed", "cancelled"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    res.json({ message: `Appointment marked as ${status}` });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


/* =========================
   ADMIN: GET ALL APPOINTMENTS
   Route: GET /api/admin/appointments
========================= */
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("userId",   "name email")
      .populate("doctorId", "name specialization")
      .sort({ createdAt: -1 });

    res.json(appointments);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


/* =========================
   PATIENT: CANCEL APPOINTMENT
   Route: DELETE /api/appointments/:id
========================= */
export const cancelAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.json({ message: "Appointment cancelled successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//auto complete appointment
export const autoCompleteAppointments = async () => {
  try {
    const now = new Date();

    // Find appointments older than 25 minutes and still pending/confirmed
    const result = await Appointment.updateMany(
      {
        status: { $in: ["pending", "confirmed"] },
        appointmentDateTime: {
          $lte: new Date(now.getTime() - 25 * 60 * 1000)
        }
      },
      {
        $set: { status: "completed" }
      }
    );

    console.log("Auto-completed:", result.modifiedCount);

  } catch (error) {
    console.error("Auto-complete error:", error);
  }
};