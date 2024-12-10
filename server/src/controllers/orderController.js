import { Router } from "express";
import orderService from "../services/orderService.js";

const orderController = Router();

// * Create an order from the cart
orderController.post("/createOrder", async (req, res) => {
  const userId = req.user._id;
  console.log("Request Body:", req.body);
  try {
    const order = await orderService.createOrder(
      userId,
      req.body.shippingDetails
    );
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// * Get an order by its ID
orderController.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await orderService.getOrderById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// * Get all orders for a user (only for users)
orderController.get("/userOrders", async (req, res) => {
  const userId = req.user._id;
  try {
    const orders = await orderService.getUserOrders(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// * Get all orders (only for admin/manager)
orderController.get("/admin/orders", async (req, res) => {
  const userRole = req.user.role;

  if (userRole !== "admin" && userRole !== "manager") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// * Approve an order (admin/manager only)
orderController.put("/approve/:id", async (req, res) => {
  const { id } = req.params;
  const userRole = req.user.role;

  if (userRole !== "admin" && userRole !== "manager") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const order = await orderService.approveOrder(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ klikabum: error.message });
  }
});

// * Reject an order (admin/manager only)
orderController.put("/reject/:id", async (req, res) => {
  const { id } = req.params;
  const userRole = req.user.role;

  if (userRole !== "admin" && userRole !== "manager") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const order = await orderService.rejectOrder(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default orderController;
