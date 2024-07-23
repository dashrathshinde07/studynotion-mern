/**
 * Overview:
 * This module provides a function to upload images to Cloudinary.
 * - `uploadImageToCloudinary`: Uploads an image to a specified Cloudinary folder with optional height and quality settings.
 */

const cloudinary = require("cloudinary").v2; // Importing Cloudinary v2

// Function to upload an image to Cloudinary
exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  // Set default options with folder
  const options = { folder };
  
  // Add height option if provided
  if (height) {
    options.height = height;
  }
  
  // Add quality option if provided
  if (quality) {
    options.quality = quality;
  }
  
  // Set resource type to auto (handles different types of files)
  options.resource_type = "auto";

  // Upload the image and return the result
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
