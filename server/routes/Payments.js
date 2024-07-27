/**
 * This file defines the routes for handling payments.
 * It includes routes for capturing payments and verifying signatures.
 *
 * Overview:
 * - Payment Routes: Routes related to payment processing and verification.
 */

// Import the required modules
const express = require("express");
const router = express.Router();

const { capturePayment, verifySignature } = require("../controllers/Payments");
const { auth, isStudent } = require("../middlewares/auth");

// Capture payment route, accessible only by students
router.post("/capturePayment", auth, isStudent, capturePayment);

// Verify payment signature route
router.post("/verifySignature", verifySignature);

module.exports = router;
