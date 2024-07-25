/**
 * This file sets up the Razorpay instance used for payment processing.
 * It imports the Razorpay library and uses environment variables for configuration.
 */

const Razorpay = require("razorpay");
require("dotenv").config();

/**
 * Razorpay instance
 * - Initializes a new Razorpay instance with the provided key ID and secret.
 * - These values are loaded from environment variables.
 */
exports.instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,     // Razorpay key ID from environment variable
  key_secret: process.env.RAZORPAY_SECRET, // Razorpay secret from environment variable
});
