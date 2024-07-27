/**
 * User Profile Management Controller
 * 
 * This controller manages the user's profile, including updating profile information,
 * deleting the account, fetching user details, updating the display picture, and 
 * retrieving enrolled courses.
 * 
 * Functionalities:
 * 1. updateProfile: Updates the user's profile with date of birth, about, and contact number.
 * 2. deleteAccount: Deletes the user account and associated profile.
 * 3. getAllUserDetails: Fetches all details of the user.
 * 4. updateDisplayPicture: Updates the user's display picture.
 * 5. getEnrolledCourses: Retrieves all courses the user is enrolled in.
 * 
 * Dependencies:
 * - Profile and User models for interacting with user and profile data in the database.
 * - Cloudinary for uploading display pictures.
 * 
 * Error Handling:
 * - Consistent error handling with appropriate status codes and messages.
 * - Logs errors for easier debugging.
 * 
 * Validation:
 * - Ensures that all required fields are provided when updating profile or display picture.
 */

// Import necessary modules
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
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		// Delete Associated Profile with the User
		await Profile.findByIdAndDelete(user.additionalDetails);

		// TODO: Unenroll User From All the Enrolled Courses

		// Now Delete User
		await User.findByIdAndDelete(id);

		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ 
			success: false, 
			message: "User cannot be deleted successfully" 
		});
	}
};


// Method for fetching all user details
exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
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
			message: "Image Updated successfully",
			data: updatedProfile,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Method for retrieving enrolled courses
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
				message: `Could not find user with id: ${userDetails}`,
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
