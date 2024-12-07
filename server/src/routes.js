import { Router } from "express";

import homeController from "./controllers/homeController.js";
import productController from "./controllers/productController.js";
import userController from "./controllers/userController.js";
import cartController from "./controllers/cartController.js";
import orderController from "./controllers/orderController.js";

const routes = Router();


routes.use('/api/', homeController);
routes.use('/api/user', userController);
routes.use('/api/products', productController);
routes.use('/api/cart' , cartController);
routes.use('/api/order' , orderController)


routes.all('*', (req, res) => {
    res.status(404).json({ message: '404 - Page Not Found' });
});

export default routes;
