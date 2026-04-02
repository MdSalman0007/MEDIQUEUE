import express from "express";
import {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  getAllAppointments,
  cancelAppointment
} from "../controllers/appointmentController.js";
import { protect }        from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* =========================
   PATIENT ROUTES
========================= */

// Book appointment
router.post("/",    protect, authorizeRoles("patient"), bookAppointment);

// Get my own appointments
router.get("/my",   protect, authorizeRoles("patient"), getMyAppointments);

// Cancel my appointment
router.delete("/:id", protect, authorizeRoles("patient"), cancelAppointment);

/* =========================
   DOCTOR ROUTES
========================= */

// Get doctor's own appointments
router.get("/doctor", protect, authorizeRoles("doctor"), getDoctorAppointments);

/* =========================
   SHARED ROUTE — doctor + admin + patient
   Update appointment status (complete / cancel / confirm)
========================= */
router.put("/:id/status", protect, updateAppointmentStatus);

export default router;