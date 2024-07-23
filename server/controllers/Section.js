/**
 * Overview:
 * This module handles operations related to sections within a course.
 * - `createSection`: Creates a new section and adds it to the specified course.
 * - `updateSection`: Updates the name of an existing section.
 * - `deleteSection`: Deletes a specified section.
 */

const Section = require("../models/Section"); // Importing the Section model
const Course = require("../models/Course"); // Importing the Course model

// Handler function to create a new section
exports.createSection = async (req, res) => {
  try {
    // Fetch data from request body
    const { sectionName, courseId } = req.body;

    // Validate if required fields are provided
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing properties",
      });
    }

    // Create a new section
    const newSection = await Section.create({ sectionName });

    // Update the course with the new section's ObjectID
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    );

    // TODO: Use populate to replace sections/sub-sections both in the updatedCourseDetails

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Section Created Successfully",
      updatedCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create Section, please try again",
      error: error.message,
    });
  }
};

// Handler function to update a section
exports.updateSection = async (req, res) => {
  try {
    // Fetch data from request body
    const { sectionName, sectionId } = req.body;

    // Validate if required fields are provided
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing properties",
      });
    }

    // Update the section's name
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Section Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update Section, please try again",
      error: error.message,
    });
  }
};

// Handler function to delete a section
exports.deleteSection = async (req, res) => {
  try {
    // Get the section ID from request params
    const { sectionId } = req.params;

    // Delete the section using findByIdAndDelete
    await Section.findByIdAndDelete(sectionId);
    //TODO: do we need to delete the entry from the course schema ?

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Section Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete Section, please try again",
      error: error.message,
    });
  }
};
