import express from "express";
import {
  getDashboardStats,
  getAllUsers,
  getAllAppointments,
  deleteUser,
  deleteDoctor
} from "../controllers/adminController.js";
import { protect }         from "../middleware/authMiddleware.js";
import { authorizeRoles }  from "../middleware/roleMiddleware.js";

const router = express.Router();

// Dashboard stats
router.get("/dashboard",     protect, authorizeRoles("admin"), getDashboardStats);

// Users
router.get("/users",         protect, authorizeRoles("admin"), getAllUsers);
router.delete("/users/:id",  protect, authorizeRoles("admin"), deleteUser);

// Appointments
router.get("/appointments",  protect, authorizeRoles("admin"), getAllAppointments);

// Doctors
router.delete("/doctors/:id", protect, authorizeRoles("admin"), deleteDoctor);

export default router;