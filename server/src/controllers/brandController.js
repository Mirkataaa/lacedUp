import { Router } from "express";
import { createBrand , getAllBrands , getBrandById , updateBrand , deleteBrand } from "../services/brandService.js";
const brandController = Router();

// Create a new brand
brandController.post("/", async (req, res) => {
    try {
        const { name, logo, description } = req.body; // Ensure all required fields are passed
        const brand = await createBrand({ name, logo, description });
        res.status(201).json({ message: "Brand created successfully", brand });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Get all brands
brandController.get("/", async (req, res) => {
    try {
        const brands = await getAllBrands();
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single brand by ID
brandController.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await getBrandById(id);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        res.status(200).json(brand);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a brand
brandController.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedBrand = await updateBrand(id, updatedData);
        if (!updatedBrand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        res.status(200).json({ message: "Brand updated successfully", updatedBrand });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a brand
brandController.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBrand = await deleteBrand(id);
        if (!deletedBrand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        res.status(200).json({ message: "Brand deleted successfully", deletedBrand });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default brandController;
