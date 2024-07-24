/**
 * Overview:
 * This module handles operations related to sub-sections within a section.
 * - `createSubSection`: Creates a new sub-section, uploads the associated video to Cloudinary, and updates the parent section.
 * - `updateSubSection`: Updates an existing sub-section.
 * - `deleteSubSection`: Deletes a specified sub-section.
 */

const SubSection = require("../models/SubSection"); // Importing the SubSection model
const Section = require("../models/Section"); // Importing the Section model
const uploadImageToCloudinary = require("../utils/imageUploader"); // Importing the Cloudinary upload utility
require("dotenv").config(); // Loading environment variables

// Handler function to create a new sub-section
exports.createSubSection = async (req, res) => {
  try {
    // Fetch data from request body
    const { sectionId, title, timeDuration, description } = req.body;
    // Extract the video file from request files
    const video = req.files.videoFile;

    // Validate if required fields are provided
    if (!sectionId || !title || !timeDuration || !description || !video) {
      return res.status(400).json({
        success: true,
        message: "All fields are required",
      });
    }

    // Upload video to Cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    // Create a new sub-section
    const subSectionDetails = await SubSection.create({
      title,
      timeDuration,
      description,
      videoUrl: uploadDetails.secure_url,
    });

    // Update the parent section with the new sub-section's ObjectID
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },
      { new: true }
    );

    // TODO: Log updated section here, after adding populate query

    // Return success response
    return res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Handler function to update a sub-section
exports.updateSubSection = async (req, res) => {
  try {
    // Fetch data from request body
    const { sectionId, title, timeDuration, description, video } = req.body;

    // Validate if required fields are provided
    if (!sectionId || !title || !timeDuration || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Update in DB using method findByIdAndUpdate
    const updatedSubSection = await SubSection.findByIdAndUpdate(
      sectionId, // The ID of the subsection to be updated
      {
        title, // New title for the subsection
        timeDuration, // New time duration for the subsection
        description, // New description for the subsection
        video, // New video URL or ID for the subsection
      },
      { new: true } // Return the updated document
    );

    // Check if the subsection was found and updated
    if (!updatedSubSection) {
      return res.status(404).json({
        success: false,
        message: "Sub-section not found",
      });
    }

    // Return success response with updated subsection data
    return res.status(200).json({
      success: true,
      message: "Sub-section updated successfully",
      data: updatedSubSection,
    });
  } catch (error) {
    // Return error response in case of an exception
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating sub-section",
      error: error.message,
    });
  }
};

// Handler function to delete a sub-section
exports.deleteSubSection = async (req, res) => {
  try {
    // Extract sectionId from request parameters
    const { sectionId } = req.params;

    // Attempt to find and delete the sub-section by its ID
    const deleteSubSection = await SubSection.findByIdAndDelete(sectionId);

    // If the sub-section is not found, return a 404 response
    if (!deleteSubSection) {
      return res.status(404).json({
        success: false,
        message: "Sub-section not found",
      });
    }

    // Return success response if deletion is successful
    return res.status(200).json({
      success: true,
      message: "Sub-section deleted successfully",
    });
  } catch (error) {
    // Return error response in case of an exception
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
