import { Schema, model } from "mongoose";

const brandSchema = new Schema({
    name: {
        type: String,
        enum: ['Nike' , 'Adidas' , 'New Balance' , 'Asics' , 'Puma'],
        required: [true , 'Brand field is required'],
        unique: true,
        trim: true
    },
    logo: {
        type: String,
        required: [true, "Brand logo URL is required"],
        validate: [/^https?:\/\//, "Logo URL must start with http:// or https://"]
    },
    description: {
        type: String,
        required: [true, "Brand description is required"]
    },
});

brandSchema.pre('save', function(next) {
    console.log(this); // Logs the brand object before saving
    next();
});


const Brand = model("Brand", brandSchema);
export default Brand;
