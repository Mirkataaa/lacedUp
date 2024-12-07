import Product from '../models/Product.js';

// * Fetch all products
// TODO - Check if getAllProduct is needed 
const getAllProducts = async () => {
    try {
        const products = await Product.find()    
        return products;
    } catch (error) {
        throw new Error('Error fetching products: ' + error.message);
    }
};

// * Fetch product by ID
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

// * Create a new product with size and stock logic
const createProduct = async (productData) => {
  try {
    // ! Handle case when sizes are not provided, e.g., for Accessories
    if (productData.category === 'Accessories' && !productData.sizes) {
      productData.sizes = []; //  ! Ensure sizes is an empty array for Accessories
    }

    if (productData.sizes && Array.isArray(productData.sizes)) {
      productData.sizes = productData.sizes.map(size => {
        if (!size.size || !size.stock) {
          throw new Error('Each size must include size and stock');
        }
        if (size.stock < 0) {
          throw new Error('Stock must be greater than or equal to 0');
        }
        return size;
      });
    }

    const product = new Product(productData);
    await product.save();
    return product;
  } catch (error) {
    throw new Error('Error creating product: ' + error.message);
  }
};


// * Update product by ID with size and stock logic
const updateProduct = async (id, productData) => {
    try {
        // ! Highlighted change: Ensure sizes array is validated before updating
        if (productData.sizes && Array.isArray(productData.sizes)) {
            productData.sizes = productData.sizes.map(size => {
                if (!size.size || !size.stock) {
                    throw new Error('Each size must include size and stock');
                }
                if (size.stock < 0) {
                    throw new Error('Stock must be greater than or equal to 0');
                }
                return size;
            });
        }

        const product = await Product.findByIdAndUpdate(id, productData, { new: true });
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        throw new Error('Error updating product: ' + error.message);
    }
};

// * Delete a product by ID
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

