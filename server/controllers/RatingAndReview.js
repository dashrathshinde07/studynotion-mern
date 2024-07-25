/**
 * This file contains functions for managing ratings and reviews for courses.
 * It includes creating a rating and review, calculating the average rating for a course,
 * and retrieving all ratings and reviews.
 *
 * Overview:
 * - createRating: Allows a user to create a rating and review for a course they are enrolled in.
 *   Ensures the user is enrolled in the course and has not already reviewed it.
 * - getAverageRating: Calculates the average rating for a specific course.
 * - getAllRating: Retrieves all ratings and reviews, sorted by rating in descending order,
 *   and populates user and course details.
 */

const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

// Function to create a rating and review
exports.createRating = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id;

    // Fetch data from request body
    const { rating, review, courseId } = req.body;

    // Check if the user is enrolled in the course
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in the course",
      });
    }

    // Check if the user has already reviewed the course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course is already reviewed by the user",
      });
    }

    // Create a new rating and review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    // Update the course with this rating/review
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: ratingReview._id,
        },
      },
      { new: true }
    );
    console.log(updatedCourseDetails);

    // Return response
    return res.status(200).json({
      success: true,
      message: "Rating and review created successfully",
      ratingReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Function to get the average rating for a course
exports.getAverageRating = async (req, res) => {
  try {
    // Get course ID from request body
    const courseId = req.body.courseId;

    // Calculate the average rating
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    // Return rating
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    // If no ratings exist
    return res.status(200).json({
      success: true,
      message: "Average rating is 0, no ratings given till now",
      averageRating: 0,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Function to get all ratings and reviews
exports.getAllRating = async (req, res) => {
  try {
    // Retrieve all ratings and reviews, sorted by rating in descending order
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: allReviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
