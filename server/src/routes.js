import { Router } from "express";

import homeController from "./controllers/homeController.js";
import authController from "./controllers/userController.js";
import productController from "./controllers/productController.js";
import brandController from "./controllers/brandController.js";
import categoryController from "./controllers/categoryController.js";

const routes = Router();

// Mount controllers with base paths
routes.use('/', homeController);
routes.use('/auth', authController);
routes.use('/product', productController);
routes.use('/brand' , brandController);
routes.use('/categories' , categoryController);

// Catch-all 404 route
routes.all('*', (req, res) => {
    res.status(404).json({ message: '404 - Page Not Found' });
});

export default routes;
