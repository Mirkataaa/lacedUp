import express from "express";
import cookieParser from "cookie-parser";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import routes from "../routes.js";

export default function expressInit(app) {

    app.use(cookieParser());
    app.use(express.json());
    app.use(authMiddleware); 
    app.use(routes);
};
