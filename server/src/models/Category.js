import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
    name: {
        type: String,
        enum: ['Sneakers', 'Clothes', 'Accessories'],
        required: [true, 'Category name is required'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        validate: [/^https?:\/\//, 'Image should be valid and start with http:// or https://'],
    },
});

const Category = model('Category', categorySchema);
export default Category;
