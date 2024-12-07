import { Schema, Types, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  category: {
    type: String,
    enum: ["Sneakers", "Clothing", "Accessories"],
    required: [true, "Product category is required"],
  },
  brand: {
    type: String,
    enum: ["Nike", "Adidas", "New Balance", "Asics", "Puma"],
    required: [true, "Brand is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    validate: [/^https?:\/\//, "Image should start with http:// or https://"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: Types.ObjectId,
    ref: "User",
    default: null,
  },
  color: {
    type: String,
    required: [true, "Color field is required!"],
  },
  price: {
    type: Number,
    required: [true, "Price field is required"],
    min: [0, "Price cannot be negative"],
  },
  sizes: [
    {
      size: { type: String, required: true },
      stock: { type: Number, required: true, min: [0, "Stock cannot be negative"] },
    },
  ],
  material: {
    type: String,
    required: [true, "Material field is required"],
  },
  gender: {
    type: String,
    enum: ["Man", "Lady", "Unisex"],
    required: [true, "Gender field is required"],
  },
});

const Product = model("Product", productSchema);
export default Product;
