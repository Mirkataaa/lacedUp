import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

  // * Create an order from the cart
  const createOrder = async (userId, shippingDetails) => {
    try {
      if (!shippingDetails || !shippingDetails.address || !shippingDetails.city || !shippingDetails.zipCode || !shippingDetails.country) {
        throw new Error('Missing required shipping details');
      }
  
      // ! Get the user's cart
      const cart = await Cart.findOne({ userId }).populate('items.productId');
      if (!cart || cart.items.length === 0) throw new Error('Cart is empty');
      
      // ! Create the order with the populated shippingDetails
      const order = new Order({
        userId,
        shippingDetails,  // Ensure shippingDetails are passed correctly
        items: cart.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.productId.price,  // Ensure price is included
        })),
        totalPrice: cart.items.reduce((total, item) => total + item.productId.price * item.quantity, 0),
        status: 'Pending',
      });
    
      // ! Save the order and update cart
      await order.save();
      cart.items = [];
      await cart.save();
      console.log(order);
      
      return order;
    } catch (error) {
      console.error('Error creating order:', error.message);
      throw new Error('Error creating order');
    }
  };
  
  
  

  // * Get an order by its ID
  const getOrderById = async (orderId) => {
    try {
      const order = await Order.findById(orderId).populate('items.productId');
      if (!order) throw new Error('Order not found');
      return order;
    } catch (error) {
      throw new Error('Error fetching order');
    }
  }

  // * Get all orders for a user
  const getUserOrders = async (userId) => {
    try {
      const orders = await Order.find({ userId }).populate('items.productId');
      return orders;
    } catch (error) {
      throw new Error('Error fetching user orders');
    }
  }

  // * Get all orders (for admin/manager)
  const getAllOrders = async() => {
    try {
      const orders = await Order.find().populate('items.productId');
      return orders;
    } catch (error) {
      throw new Error('Error fetching all orders');
    }
  }

  // * Approve an order (change its status to approved)
  const approveOrder = async (orderId) => {
    try {
      const order = await Order.findById(orderId);
      if (!order) throw new Error('Order not found');

      order.status = 'approved';
      await order.save();

      return order;
    } catch (error) {
      throw new Error('Error approving order');
    }
  }

  // * Reject an order (change its status to rejected)
  const rejectOrder = async (orderId) => {
    try {
      const order = await Order.findById(orderId);
      if (!order) throw new Error('Order not found');

      order.status = 'rejected';
      await order.save();

      return order;
    } catch (error) {
      throw new Error('Error rejecting order');
    }
  }


export default {
    createOrder,
    getOrderById,
    getUserOrders,
    getAllOrders,
    approveOrder,
    rejectOrder,
}
