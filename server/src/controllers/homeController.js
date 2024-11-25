import { Router } from "express";


const homeController = Router();

homeController.get('/' , (req,res) => {
    res.json({message: 'Welcome to Express/Angular resful service'});
});



export default homeController;

