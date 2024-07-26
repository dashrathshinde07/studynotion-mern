/**
 * Overview:
 * This module handles the creation and retrieval of tags.
 * - `createTag`: Creates a new tag in the database.
 * - `showAllTags`: Retrieves all tags from the database.
 */

const Category = require("../models/Category"); // Importing the Tags model

// Handler function to create a new tag
exports.createCategory = async (req, res) => {
  try {
    // Fetch data from request body
    const { name, description } = req.body;

    // Validate if name and description are provided
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create a new tag entry in the database
    const tagDetails = await Tags.create({
      name: name,
      description: description,
    });
    console.log(tagDetails); // Log the created tag details

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Tag created successfully",
    });
  } catch (error) {
    // Return error response if something goes wrong
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Handler function to get all tags
exports.showAllCategory = async (req, res) => {
  try {
    // Fetch all tags from the database, selecting only name and description fields
    const allTags = await Tags.find({}, { name: true, description: true });

    // Return success response with all tags
    res.status(200).json({
      success: true,
      message: "All tags returned successfully",
      allTags,
    });
  } catch (error) {
    // Return error response if something goes wrong
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//categoryPageDetails
exports.categoryPageDetails = async (req, res) => {
  try {
    //get categoryId
    const { categoryId } = req.body;
    //get courses for specified categoryId
    const selectedCategory = await Category.findById(categoryId)
      .populate("courses")
      .exec();
    //validation
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    }

    //get courses for different category
    const differentCatefories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("courses")
      .exec();

    //get top selling courses
    //HW - write it on your homework

    //return
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCatefories,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
