/**
 * This file defines the routes related to user authentication and password management.
 *
 * Overview:
 * - Authentication Routes:
 *   - /login: Handles user login.
 *   - /signup: Handles user registration.
 *   - /sendotp: Sends an OTP to the user's email for verification.
 *   - /changepassword: Allows authenticated users to change their password.
 *
 * - Reset Password Routes:
 *   - /reset-password-token: Generates a token for resetting the password.
 *   - /reset-password: Resets the user's password after verifying the token.
 *
 * Controllers and middleware functions used:
 * - Controllers: login, signup, sendotp, changePassword, resetPasswordToken, resetPassword
 * - Middleware: auth (for protecting routes that require authentication)
 */

const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions
const {
  login,
  sendotp,
  changePassword,
  signup,
} = require("../controllers/Auth");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

const { auth } = require("../middlewares/auth");

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signup);

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp);

// Route for changing the password
router.post("/changepassword", auth, changePassword);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);

// Export the router for use in the main application
module.exports = router;
