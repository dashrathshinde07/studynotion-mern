/**
 * This file defines the routes for user authentication and password management.
 * It includes routes for login, signup, sending OTP, changing password,
 * and resetting password.
 *
 * Overview:
 * - login: Route for user login.
 * - signUp: Route for user signup.
 * - sendOTP: Route for sending an OTP to the user's email.
 * - changePassword: Route for changing the user's password.
 * - resetPasswordToken: Route for generating a reset password token.
 * - resetPassword: Route for resetting the user's password after verification.
 */

// Import the required modules
const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions
const {
  login,
  signUp,
  senOTP,
  changePassword,
} = require("../controllers/Auth");

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

// Routes for login, signup, and authentication

// Authentication Routes

// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signUp);

// Route for sending OTP to the user's email
router.post("/sendotp", senOTP);

// Route for changing the password
router.post("/changepassword", changePassword);

// Reset Password

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);

// Export the router for use in the main application
module.exports = router;
