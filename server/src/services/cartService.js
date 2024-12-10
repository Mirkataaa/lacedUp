import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// * Get the user's cart
const getCart = async (userId) => {
  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    return cart;
  } catch (error) {
    throw new Error("Error fetching cart");
  }
};

const updateItemSize = async (userId, productId, size) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find(
    (item) => item.productId.toString() === productId
  );
  if (!item) {
    throw new Error("Item not found in cart");
  }

  item.selectedSize = size;
  await cart.save();
  return item;
};

// * Add item to the cart (or update quantity if it exists)
const addItemToCart = async (userId, productId, quantity) => {
  try {
    // ! Check if product exists
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    // ! Find the user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // ! If no cart exists, create one
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      // ! If cart exists, check if the item already exists in the cart
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingItemIndex > -1) {
        // ! Item exists, update the quantity
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // ! Item doesn't exist, add a new item to the cart
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    return cart;
  } catch (error) {
    throw new Error("Error adding item to cart");
  }
};

// * Remove item from the cart

const removeItemFromCart = async (userId, productId) => {
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) throw new Error("Cart not found");

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    return cart;
  } catch (error) {
    throw new Error("Error removing item from cart");
  }
};

// * Update cart item quantity
const updateCartItem = async (userId, productId, newQuantity) => {
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) throw new Error("Cart not found");

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) throw new Error("Item not found in cart");

    cart.items[itemIndex].quantity = newQuantity;

    await cart.save();
    return cart;
  } catch (error) {
    throw new Error("Error updating cart item");
  }
};

// * Clear cart
const clearCart = async (userId) => {
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) throw new Error("Cart not found");

    cart.items = [];
    await cart.save();
    return cart;
  } catch (error) {
    throw new Error("Error clearing cart");
  }
};

const checkout = async (userId) => {
  try {
    console.log(`Starting checkout for user: ${userId}`);

    //  ! Get the cart for the user
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      console.error("Cart is empty or not found");
      throw new Error("Cart is empty");
    }

    // ! Log the cart details
    console.log("Cart found:", cart);

    // Get the user
    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found");
      throw new Error("User not found");
    }

    // ! Log the user details
    console.log("User found:", user);

    // ! Add cart reference to user's orders
    user.orders.push(cart);
    await user.save();

    // ! After checkout, clear the cart
    cart.items = [];
    await cart.save();

    console.log("Checkout successful, cart cleared");
    return user;
  } catch (error) {
    console.error("Error during checkout:", error);
    throw new Error("Error during checkout");
  }
};

export default {
  getCart,
  updateItemSize,
  addItemToCart,
  removeItemFromCart,
  updateCartItem,
  clearCart,
  checkout,
};
