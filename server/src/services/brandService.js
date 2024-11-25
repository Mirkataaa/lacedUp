// services/brandService.js
import Brand from "../models/Brand.js";

// Create a new brand
export const createBrand = async (brandData) => {
    return await Brand.create(brandData);
};

// Get all brands
export const getAllBrands = async () => {
    return await Brand.find();
};

// Get a brand by ID
export const getBrandById = async (id) => {
    return await Brand.findById(id);
};

// Update a brand
export const updateBrand = async (id, updatedData) => {
    return await Brand.findByIdAndUpdate(id, updatedData, { new: true });
};

// Delete a brand
export const deleteBrand = async (id) => {
    return await Brand.findByIdAndDelete(id);
};
