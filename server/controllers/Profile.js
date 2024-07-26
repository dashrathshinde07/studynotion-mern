/**
 * This file contains functions for managing user profiles.
 * It includes updating the profile, deleting the account, retrieving user details,
 * updating the display picture, and getting enrolled courses.
 *
 * Overview:
 * - updateProfile: Updates the profile fields such as date of birth, about, and contact number.
 * - deleteAccount: Deletes the user account and associated profile.
 * - getAllUserDetails: Retrieves all details of the user.
 * - updateDisplayPicture: Updates the user's display picture.
 * - getEnrolledCourses: Retrieves the courses a user is enrolled in.
 */

const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Method for updating a profile
exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth = "", about = "", contactNumber } = req.body;
    const id = req.user.id;

    // Find the profile by id
    const userDetails = await User.findById(id);
    const profile = await Profile.findById(userDetails.additionalDetails);

    // Update the profile fields
    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;

    // Save the updated profile
    await profile.save();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Method for deleting an account
exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Delete associated profile with the user
    await Profile.findByIdAndDelete({ _id: user.userDetails });
    // Now delete user
    await User.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "User cannot be deleted successfully",
    });
  }
};

// Method for getting all user details
exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    console.log(userDetails);
    res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Method for updating display picture
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log(image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: "Image updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Method for getting enrolled courses
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate("courses")
      .exec();
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userId}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
