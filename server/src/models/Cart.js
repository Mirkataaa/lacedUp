import { Schema, Types, model } from "mongoose";

const cartItemSchema = new Schema(
  {
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
  },
  { _id: false }
);

const cartSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User", 
      required: true,
    },
    items: [cartItemSchema], 
  },
  { timestamps: true }
);


const Cart = model("Cart", cartSchema);

export default Cart;
