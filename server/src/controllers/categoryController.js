import { Router } from "express";
import { 
    createCategory, 
    getAllCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory 
} from "../services/categoryService.js";

const categoryController = Router();

// Create a new category
categoryController.post("/", async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const category = await createCategory({ name, description, image });
        res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all categories
categoryController.get("/", async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a category by ID
categoryController.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const category = await getCategoryById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a category by ID
categoryController.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedCategory = await updateCategory(id, updatedData);
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category updated successfully", updatedCategory });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a category by ID
categoryController.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await deleteCategory(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully", deletedCategory });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default categoryController;
