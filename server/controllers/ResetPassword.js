const User = require("../models/User"); // Importing the User model
const mailSender = require("../utils/mailSender"); // Importing the mail sender utility
const bcrypt = require("bcrypt"); // Importing bcrypt for password hashing
const crypto = require("crypto"); // Importing crypto for generating token

// Function to handle reset password token generation
exports.resetPasswordToken = async (req, res) => {
  try {
    // Get email from request body
    const email = req.body.email;

    // Check if a user with this email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Your email is not registered with us",
      });
    }

    // Generate a token
    const token = crypto.randomUUID();

    // Update user with token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
      { email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000, // Token valid for 5 minutes
      },
      { new: true }
    );

    // Create URL with the token
    const url = `https://localhost:3000/update-password/${token}`;

    // Send email containing the URL
    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset Link: ${url}`
    );

    // Return success response
    return res.json({
      success: true,
      message:
        "Email sent successfully, please check your email to change password",
    });
  } catch (error) {
    console.log(error); // Log any error that occurs
    return res.status(500).json({
      success: false,
      message: "Something went wrong while resetting password",
    });
  }
};

// Function to handle password reset
exports.resetPassword = async (req, res) => {
  try {
    // Fetch data from request body
    const { password, confirmPassword, token } = req.body;

    // Validate if passwords match
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Get user details from the database using the token
    const userDetails = await User.findOne({ token: token });

    // If no user found, return invalid token response
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is invalid",
      });
    }

    // Check if token has expired
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.json({
        success: false,
        message: "Token has expired, please regenerate your token",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password in the database
    await User.findOneAndUpdate(
      { token: token },
      {
        password: hashedPassword,
      },
      { new: true }
    );

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error); // Log any error that occurs
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while resetting password, please try again",
    });
  }
};
