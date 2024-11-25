import { Schema, Types, model } from "mongoose";
import Category from './Category.js';  // Correct import statement for Category model

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
    },
    category: {
        type: Types.ObjectId,
        ref: 'Category',
        required: [true, 'Product category is required'],
    },
    brand: {
        type: Types.ObjectId,
        ref: 'Brand',
        required: [true, 'Brand is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    },
    color: {
        type: String,
        required: [true, 'Color field is required!'],
    },
    price: {
        type: Number,
        required: [true , 'Price filed is required'],
        min: [0 , 'Price']
    },
    stock: {
        type: Number,
        required: [true, 'Stock field is required'],
        min: [0, 'Stock cannot be negative'],
    },
    material: {
        type: String,
        required: [true, 'Material field is required'],
    },
    size: {
        type: String, // Could also be an array of sizes for variants
        required: [true, 'Size is required'],
        validate: {
            validator: async function (v) {
                // Logic to validate size based on the category
                if (this.category) {
                    return await validateSizeBasedOnCategory(this.category, v);
                }
                return false; // Fallback logic if category isn't found
            },
            message: 'Invalid size for this category',
        },
    },
    gender: {
        type: String,
        enum: ['Man' , 'Lady' , 'Unisex'],
        required: [true , 'Gender field is required'],
    }
});

// Asynchronous size validation based on category
async function validateSizeBasedOnCategory(categoryId, size) {
    try {
        // Find category from the DB
        const category = await Category.findById(categoryId);

        if (category) {
            // Validate size based on category name
            if (category.name === 'Sneakers') {
                return /^[3-4][0-9]$|^5[0-9]$/.test(size); // e.g., 39-45 for sneakers
            }
            if (category.name === 'Clothes') {
                return ['S', 'M', 'L', 'XL', 'XXL'].includes(size); // e.g., clothes sizes
            }
        }
        return false;  // Fallback if category is invalid or not found
    } catch (error) {
        console.error("Error fetching category: ", error);
        return false;  // Fallback on error
    }
}

const Product = model('Product', productSchema);
export default Product;
