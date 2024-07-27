/**
 * This file defines the routes for user profile management.
 * It includes routes for deleting a user account, updating profile,
 * retrieving all user details, updating display picture, and getting enrolled courses.
 *
 * Overview:
 * - deleteAccount: Route for deleting a user account.
 * - updateProfile: Route for updating the user's profile information.
 * - getAllUserDetails: Route for retrieving all user details.
 * - updateDisplayPicture: Route for updating the user's display picture.
 * - getEnrolledCourses: Route for retrieving the courses a user is enrolled in.
 */

// Import the required modules
const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

// Import the required controllers
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
} = require("../controllers/Profile");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

// Delete User Account
router.delete("/deleteProfile",auth, deleteAccount);

// Update User Profile
router.put("/updateProfile", auth, updateProfile);

// Get All User Details
router.get("/getUserDetails", auth, getAllUserDetails);

// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

// Update Display Picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

// Export the router for use in the main application
module.exports = router;
