/**
 * Overview:
 * This module handles course-related operations.
 * - `createCourse`: Creates a new course with details provided in the request.
 * - `showAllCourses`: Retrieves all courses and their details.
 */

const Course = require("../models/Course"); // Importing the Course model
const Tag = require("../models/Tags"); // Importing the Tag model
const User = require("../models/User"); // Importing the User model
const { uploadImageToCloudinary } = require("../utils/imageUploader"); // Importing the image upload utility

// Handler function to create a new course
exports.createCourse = async (req, res) => {
  try {
    // Fetch data from request body
    const { courseName, courseDescription, whatYouWilllearn, price, tag } =
      req.body;

    // Get the thumbnail image from the request files
    const thumbnail = req.files.thumbnailImage;

    // Validate if all required fields are provided
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWilllearn ||
      !price ||
      !tag ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check for instructor details
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    console.log("Instructor Details", instructorDetails);

    // TODO: Verify that userId and instructorDetails._id are the same

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details not found",
      });
    }

    // Check if the given tag is valid
    const tagDetails = await Tag.findById(tag);

    if (!tagDetails) {
      return res.status(404).json({
        success: false,
        message: "Tag Details not found",
      });
    }

    // Upload the thumbnail image to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // Create a new course entry in the database
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWilllearn,
      price: price,
      tag: tagDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    // Add the new course to the instructor's courses list
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    // TODO: Update the tag schema

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Course Created Successfully",
      data: newCourse,
    });
  } catch (error) {
    console.error(error); // Log the error
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

// Handler function to get all courses
exports.showAllCourses = async (req, res) => {
  try {
    // Fetch all courses from the database with selected fields
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor") // Populate instructor details
      .exec();

    // Return success response with all courses
    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    console.log(error); // Log the error
    return res.status(500).json({
      success: false,
      message: "Cannot fetch course data",
      error: error.message,
    });
  }
};
