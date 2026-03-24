import express from "express";
import {
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  getDoctorAppointments,
  markAppointmentCompleted,
  getAllAppointments,
  rescheduleAppointment
} from "../controllers/appointmentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* =========================
   PATIENT ROUTES
========================= */

// Book appointment
router.post(
  "/",
  protect,
  authorizeRoles("patient"),
  bookAppointment
);

// Get my appointments
router.get(
  "/my",
  protect,
  authorizeRoles("patient"),
  getMyAppointments
);

// Cancel appointment
router.put(
  "/:id/cancel",
  protect,
  authorizeRoles("patient"),
  cancelAppointment
);
// Reschedule appointment
router.put(
  "/:id/reschedule",
  protect,
  authorizeRoles("patient"),
  rescheduleAppointment
);

export default router;

/* =========================
   DOCTOR ROUTES
========================= */

// View doctor's appointments
router.get(
  "/doctor",
  protect,
  authorizeRoles("doctor"),
  getDoctorAppointments
);

// Mark appointment completed
router.put(
  "/:id/complete",
  protect,
  authorizeRoles("doctor"),
  markAppointmentCompleted
);
/* =========================
   ADMIN ROUTES
========================= */

router.get(
  "/all",
  protect,
  authorizeRoles("admin"),
  getAllAppointments
);