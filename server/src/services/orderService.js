import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// * Create an order from the cart
const createOrder = async (userId, shippingDetails) => {
  try {
    if (
      !shippingDetails ||
      !shippingDetails.firstName ||
      !shippingDetails.lastName ||
      !shippingDetails.email ||
      !shippingDetails.phoneNo ||
      !shippingDetails.address ||
      !shippingDetails.city ||
      !shippingDetails.state ||
      !shippingDetails.zipCode
    ) {
      throw new Error("Missing required shipping details");
    }

    // ! Get the user's cart
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) throw new Error("Cart is empty");

    // ! Create the order with the populated shippingDetails
    const order = new Order({
      userId,
      shippingDetails, 
      items: cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.productId.price, 
        selectedSize: item.selectedSize
      })),
      totalPrice: cart.items.reduce(
        (total, item) => total + item.productId.price * item.quantity,
        0
      ),
      status: "Pending",
    });

    // ! Save the order and update cart
    await order.save();
    cart.items = [];
    await cart.save();
    console.log(order);

    return order;
  } catch (error) {
    console.error("Error creating order:", error.message);
    throw new Error("Error creating order");
  }
};

// * Get an order by its ID
const getOrderById = async (orderId) => {
  try {
    const order = await Order.findById(orderId).populate("items.productId");
    if (!order) throw new Error("Order not found");
    return order;
  } catch (error) {
    throw new Error("Error fetching order");
  }
};

// * Get all orders for a user
const getUserOrders = async (userId) => {
  try {
    const orders = await Order.find({ userId }).populate("items.productId");
    return orders;
  } catch (error) {
    throw new Error("Error fetching user orders");
  }
};

// * Get all orders (for admin/manager)
const getAllOrders = async () => {
  try {
    const orders = await Order.find().populate("items.productId");
    return orders;
  } catch (error) {
    throw new Error("Error fetching all orders");
  }
};

// * Approve an order (change its status to Accepted)
const approveOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId).populate('items.productId');
    if (!order) throw new Error("Order not found");
    for (const orderItem of order.items) {
      const product = orderItem.productId; 
      const size = orderItem.selectedSize; 
      const quantity = orderItem.quantity; 

    
      const productSize = product.sizes.find(s => s.size === size);
      if (!productSize) throw new Error(`Size ${size} not found for product ${product._id}`);

    
      if (productSize.stock < quantity) {
        throw new Error(`Not enough stock for size ${size} of product ${product._id}`);
      }


      productSize.stock -= quantity;


      await product.save();
    }

    order.status = "Accepted";
    await order.save();

    return order;
  } catch (error) {
    throw new Error('Error approving order: ' + error.message);
  }
};



// * Reject an order (change its status to rejected)
const rejectOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");

    order.status = "rejected";
    await order.save();

    return order;
  } catch (error) {
    throw new Error("Error rejecting order");
  }
};

export default {
  createOrder,
  getOrderById,
  getUserOrders,
  getAllOrders,
  approveOrder,
  rejectOrder,
};
