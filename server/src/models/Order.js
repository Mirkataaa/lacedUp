import { Schema, Types, model } from "mongoose";

const orderItemSchema = new Schema({
  productId: {
    type: Types.ObjectId,
    ref: "Product", 
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = Schema({
    userId: {
      type: Types.ObjectId,
      ref: "User", 
      required: true,
    },
    items: [orderItemSchema], 
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    shippingDetails: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  },
  { timestamps: true });

const Order = model("Order", orderSchema);

export default Order;
