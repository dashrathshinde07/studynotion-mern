/**
 * Category Management Controller
 * 
 * This controller handles the creation, retrieval, and detailed view of categories.
 * It includes the following functionalities:
 * 1. createCategory: Creates a new category with the provided name and description.
 * 2. showAllCategories: Fetches and returns all categories with their names and descriptions.
 * 3. categoryPageDetails: Retrieves the details of a specific category along with other categories excluding the selected one.
 * 
 * Dependencies:
 * - Category model for interacting with the category data in the database.
 * - Express for handling HTTP requests and responses.
 * 
 * Error Handling:
 * - Consistent error handling with appropriate status codes and messages.
 * - Logs errors for easier debugging.
 * 
 * Validation:
 * - Ensures that the name field is provided when creating a category.
 */

const Category = require("../models/Category");

// Method for creating a category
exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;

		// Validate request body
		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "Name is required" });
		}

		// Create a new category
		const categoryDetails = await Category.create({
			name: name,
			description: description,
		});
		console.log(categoryDetails);

		return res.status(200).json({
			success: true,
			message: "Category created successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Method for showing all categories
exports.showAllCategories = async (req, res) => {
	try {
		// Fetch all categories with name and description fields
		const allCategories = await Category.find({}, { name: true, description: true });

		return res.status(200).json({
			success: true,
			data: allCategories,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Method for getting category page details
exports.categoryPageDetails = async (req, res) => {
	try {
		// Get categoryId from request body
		const { categoryId } = req.body;

		// Fetch the selected category by ID and populate courses
		const selectedCategory = await Category.findById(categoryId)
			.populate("courses")
			.exec();

		// Validate if the category exists
		if (!selectedCategory) {
			return res.status(404).json({
				success: false,
				message: "Category not found",
			});
		}

		// Fetch categories excluding the selected category and populate courses
		const differentCategories = await Category.find({
			_id: { $ne: categoryId },
		})
			.populate("courses")
			.exec();

		// TODO: Fetch top 10 selling courses
		// Implement the logic to fetch top 10 selling courses here

		// Return response with selected and different categories
		return res.status(200).json({
			success: true,
			data: {
				selectedCategory,
				differentCategories,
				// topSellingCourses: topSellingCourses, // Include this once implemented
			},
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
