import express from "express";
import { getDoctors, addDoctor, searchDoctors } from "../controllers/doctorController.js";
import { protect }        from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/",        getDoctors);
router.post("/",       protect, authorizeRoles("admin"), addDoctor);
router.get("/search",  searchDoctors);

export default router;