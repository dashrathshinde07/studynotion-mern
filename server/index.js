/**
 * This file sets up the Express server, connects to the database, configures middleware,
 * and defines routes for the application.
 *
 * Overview:
 * - Initializes and configures the Express app.
 * - Connects to the database.
 * - Configures middleware for JSON parsing, cookie handling, CORS, file uploads, and Cloudinary.
 * - Sets up routes for user authentication, profile management, course management, and payments.
 * - Starts the server on a specified port.
 */

const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const paymentsRoutes = require("./routes/Payments");

require("dotenv").config();

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;

// Connect to the database
database.connect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// Cloudinary connection
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentsRoutes);

// Default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running",
  });
});

// Activate the server
app.listen(PORT, () => {
  console.log(`App is running at PORT: ${PORT}`);
});
