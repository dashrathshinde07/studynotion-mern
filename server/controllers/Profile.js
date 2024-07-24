/**
 * Overview:
 * This module handles operations related to user profiles.
 * - `updateProfile`: Updates a user's profile with new information.
 * - `deleteAccount`: Deletes a user's account and associated profile.
 * - `getAllUserDetails`: Fetches the details of the logged-in user.
 */

const Profile = require("../models/Profile"); // Importing the Profile model
const User = require("../models/User"); // Importing the User model

// Handler function to update a user's profile
exports.updateProfile = async (req, res) => {
  try {
    // Get data from request body
    const { gender, dateOfBirth = "", about = "", contactNumber } = req.body;

    // Get user ID from authenticated user
    const id = req.user.id;

    // Validation
    if (!gender || !contactNumber || !id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find the user details by ID
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    // Update profile details
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.contactNumber = contactNumber;
    profileDetails.about = about;
    profileDetails.gender = gender;

    // Save the updated profile
    await profileDetails.save();

    // Return response
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Handler function to delete a user's account
exports.deleteAccount = async (req, res) => {
  try {
    // Get user ID from authenticated user
    const id = req.user.id;

    // Find the user details by ID
    const userDetails = await User.findById(id);

    // Validation
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete the associated profile
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

    // TODO: Homework - Unenroll user from all enrolled courses

    // Delete the user account
    await User.findByIdAndDelete({ _id: id });

    // Return response
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User cannot be deleted, please try again",
    });
  }
};

// Handler function to get all details of the logged-in user
exports.getAllUserDetails = async (req, res) => {
  try {
    // Get user ID from authenticated user
    const id = req.user.id;

    // Find the user details by ID and populate additional details
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    // Return response
    return res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      userDetails, // Include userDetails in the response
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
