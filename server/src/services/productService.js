import Product from '../models/Product.js';

const getAllProducts = async () => {
    try {
        const products = await Product.find()
            .populate('category')   // Populating category details
            .populate('brand')      // Populating brand details
            .populate('owner');     // Populating owner details (if applicable)
        return products;
    } catch (error) {
        throw new Error('Error fetching products: ' + error.message);
    }
};

const getProductById = async (id) => {
    try {
        const product = await Product.findById(id)
            .populate('category')
            .populate('brand')
            .populate('owner');
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        throw new Error('Error fetching product: ' + error.message);
    }
};

const createProduct = async (productData) => {
    try {
        const product = new Product(productData);
        await product.save();
        return product;
    } catch (error) {
        throw new Error('Error creating product: ' + error.message);
    }
};

const updateProduct = async (id, productData) => {
    try {
        const product = await Product.findByIdAndUpdate(id, productData, { new: true });
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        throw new Error('Error updating product: ' + error.message);
    }
};

const deleteProduct = async (id) => {
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        throw new Error('Error deleting product: ' + error.message);
    }
};

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
