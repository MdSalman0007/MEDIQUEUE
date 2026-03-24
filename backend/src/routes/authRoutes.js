import express from "express";
import { body } from "express-validator";
import { userRegister, userLogin } from "../controllers/authController.js";
import { validate } from "../middleware/validationMiddleware.js";

const router = express.Router();

/* =========================
           REGISTER
============================ */
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
  ],
  validate,
  userRegister
);

/* =========================
            LOGIN
============================ */
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required")
  ],
  validate,
  userLogin
);

export default router;