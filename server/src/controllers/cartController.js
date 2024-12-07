import { Router } from 'express';
import cartService from '../services/cartService.js';

const cartController = Router();


// * Get the user's cart
cartController.get('/' , async (req, res) => {
    console.log(req.user);
    
  try {
    const userId = req.user._id; 
    const cart = await cartService.getCart(userId);
    console.log('hello');
    console.log(cart);
    console.log(userId);
    
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// * Add an item to the cart
cartController.post('/'  , async (req, res) => {
    console.log(req.params);
    
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    const cart = await cartService.addItemToCart(userId, productId, quantity);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// * Remove an item from the cart
cartController.delete('/:productId',  async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const cart = await cartService.removeItemFromCart(userId, productId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// * Update the quantity of an item in the cart
cartController.patch('/', async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    const cart = await cartService.updateCartItem(userId, productId, quantity);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// * Clear the cart
cartController.delete('/', async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await cartService.clearCart(userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// * Checkout the cart
cartController.post('/checkout', async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await cartService.checkout(userId);
    res.status(200).json({ message: 'Checkout successful', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default cartController;
