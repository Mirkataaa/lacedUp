import { Router } from 'express';
import productService from '../services/productService.js';

const productController = Router();

// Fetch all products
productController.get('/', async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch product by ID
productController.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productService.getProductById(id);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Create a new product
productController.post('/', async (req, res) => {
    const productData = req.body;
    try {
        const newProduct = await productService.createProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a product by ID
productController.put('/:id', async (req, res) => {
    const { id } = req.params;
    const productData = req.body;
    try {
        const updatedProduct = await productService.updateProduct(id, productData);
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a product by ID
productController.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await productService.deleteProduct(id);
        res.json(deletedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default productController;
