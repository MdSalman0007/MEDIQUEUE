import express from "express";
import { sendContactMessage, getAllMessages } from "../controllers/contactController.js";
import { protect }        from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Anyone can send a message — no login required
router.post("/", sendContactMessage);

// Only admin can view all messages
router.get("/", protect, authorizeRoles("admin"), getAllMessages);

export default router;