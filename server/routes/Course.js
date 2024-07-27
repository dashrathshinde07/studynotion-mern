/**
 * This file defines the routes for managing courses, categories, sections, sub-sections, and ratings.
 * It includes routes for creating, updating, and deleting various entities as well as retrieving details.
 *
 * Overview:
 * - Course Routes: Routes related to course creation, section management, and retrieving course details.
 * - Category Routes: Routes for managing categories, accessible only by admin.
 * - Rating and Review Routes: Routes for creating ratings, getting average ratings, and fetching all reviews.
 */

// Import the required modules
const express = require("express");
const router = express.Router();

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
} = require("../controllers/Course");

// Categories Controllers Import
const {
  showAllCategory,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category");

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

// Sub-Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/Subsection");

// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");

// Importing Middlewares
const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can only be created by instructors
router.post("/createCourse", auth, isInstructor, createCourse);
// Add a section to a course
router.post("/addSection", auth, isInstructor, createSection);
// Update a section
router.post("/updateSection", auth, isInstructor, updateSection);
// Delete a section
router.post("/deleteSection", auth, isInstructor, deleteSection);
// Edit sub-section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete sub-section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
// Add a sub-section to a section
router.post("/addSubSection", auth, isInstructor, createSubSection);
// Get all registered courses
router.get("/getAllCourses", getAllCourses);
// Get details for a specific course
router.post("/getCourseDetails", getCourseDetails);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************

// Categories can only be created by admin
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategory);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;
