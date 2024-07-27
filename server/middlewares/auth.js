const jwt = require("jsonwebtoken"); // Importing jsonwebtoken module for token handling
require("dotenv").config(); // Importing and configuring dotenv to load environment variables from .env file
const User = require("../models/User"); // Importing the User model

// Middleware to authenticate user
exports.auth = async (req, res, next) => {
  try {
    // Extract token from cookies, request body, or authorization header
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer", "");

    // If token is missing, return a response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // Verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET); // Verify token using JWT_SECRET
      console.log(decode); // Log decoded token
      req.user = decode; // Attach decoded token to request object
    } catch (error) {
      // If token verification fails, return a response
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // If any error occurs, return a response
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating ",
    });
  }
};

// Middleware to check if user is a student
exports.isStudent = async (req, res, next) => {
  try {
    // Check if the user's account type is not 'Student'
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for students only",
      });
    }
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // If any error occurs, return a response
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

// Middleware to check if user is an instructor
exports.isInstructor = async (req, res, next) => {
  try {
    // Check if the user's account type is not 'Instructor'
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for instructors only",
      });
    }
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // If any error occurs, return a response
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

// Middleware to check if user is an admin
exports.isAdmin = async (req, res, next) => {

  try {
    // Check if the user's account type is not 'Admin'
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for admins only",
      });
    }
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // If any error occurs, return a response
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};
