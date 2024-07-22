const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

// A function to send emails
async function sendVerificationEmail(email, otp) {
  try {
    // Send the verification email using mailSender function
    const mailResponse = await mailSender(
      email,
      "Verification Email From StudyNotion", // Email subject
      otp // OTP as the email body
    );
    console.log("Email sent Successfully :", mailResponse); // Log success message
  } catch (error) {
    console.log("Error occurred while sending emails:", error); // Log error message
    throw error; // Throw the error to be handled by the caller
  }
}

// Middleware to send verification email before saving OTP document
otpSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp); // Call function to send email
  next(); // Move to the next middleware or save operation
});


module.exports = mongoose.model("Otp", otpSchema);
