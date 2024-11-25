import Category from "../models/Category.js";

// Create a new category
export const createCategory = async (data) => {
    const category = new Category(data);
    return category.save();
};

// Get all categories
export const getAllCategories = async () => {
    return Category.find();
};

// Get a category by ID
export const getCategoryById = async (id) => {
    return Category.findById(id);
};

// Update a category by ID
export const updateCategory = async (id, updatedData) => {
    return Category.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
};

// Delete a category by ID
export const deleteCategory = async (id) => {
    return Category.findByIdAndDelete(id);
};
