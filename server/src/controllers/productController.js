import { Router } from 'express';
import productService from '../services/productService.js';
import Product from '../models/Product.js';

const productController = Router();

// * Fetch products by category and ready for infinite scrolling
productController.get('/:category', async (req, res) => {
    const { category } = req.params;
    const { offset = 0, limit = 10 } = req.query;

    try {
        const products = await Product.find({ category: category })
            .skip(Number(offset)) 
            .limit(Number(limit));

        const totalProducts = await Product.countDocuments({ category: category });

        res.json({
            products,
            totalProducts,
        });
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).send('Error fetching products');
    }
});


// * Fetch all products
productController.get('/', async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// * Fetch product by ID
productController.get('/:category/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    
    try {
        console.log('hello');
        
        const product = await productService.getProductById(id);
        console.log({product , id});
        
        res.json(product);
    } catch (error) {
        console.log(error.message);
        res.status(404).json({ error: error.message });
    }
});

// * Create a new product
productController.post('/', async (req, res) => {
    console.log('Request Body:', req.body);
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(500).json({ error: error.message });
    }
});


// * Update a product by ID
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

// * Delete a product by ID
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
