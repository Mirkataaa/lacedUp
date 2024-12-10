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
  selectedSize: {
    type: String
  }
});

const shippingDetailsSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  }, 
})

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
    shippingDetails: [shippingDetailsSchema],
  },
  { timestamps: true });

const Order = model("Order", orderSchema);

export default Order;
