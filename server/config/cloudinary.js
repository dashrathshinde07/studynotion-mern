/**
 * This file configures and exports the Cloudinary connection for image handling.
 *
 * Overview:
 * - cloudinaryConnect: Configures the Cloudinary service with the credentials from the environment variables.
 */

const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Function to configure Cloudinary connection
exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  } catch (error) {
    console.log(error);
  }
};
