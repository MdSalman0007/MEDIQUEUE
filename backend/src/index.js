console.log("Starting Mediqueue Backend...");

import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";

dotenv.config();

// Connect to the database
dbConnect();

const app = express();
const port = process.env.PORT || 6969;

// Test route
app.get("/", (req, res) => {
    res.send("Mediqueue Backend Running");
});
// Limit each IP to 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP
  message: {
    success: false,
    message: "Too many requests, please try again later."
  }
});
// Middleware
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(helmet());
app.use(limiter);



// Connect Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 6969;
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});