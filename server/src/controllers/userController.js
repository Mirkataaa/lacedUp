import { Router } from "express";
import authService from "../services/authService.js";
import { AUTH_COOKIE_NAME } from "../constants.js";
import { getErrorMsg } from "../utils/errorUtils.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";

const userController = Router();

// Registration route
userController.post('/register', isGuest, async (req, res) => {
    const { username, email, password, rePass } = req.body;

    try {
        const token = await authService.register(username, email, password, rePass);
        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });

        // Respond with success message
        res.status(201).json({ message: "Registration successful", username });
    } catch (err) {
        const errors = getErrorMsg(err);

        // Respond with error details
        res.status(400).json({ message: "Registration failed", errors });
    }
});

// Login route
userController.post('/login', isGuest, async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await authService.login(username, password);
        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });

        // Respond with success message
        res.status(200).json({ message: "Login successful", username });
    } catch (err) {
        const errors = getErrorMsg(err);

        // Respond with error details
        res.status(401).json({ message: "Login failed", errors });
    }
});

// Logout route
userController.get('/logout', isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);

    // Respond with success message
    res.status(200).json({ message: "Logout successful" });
});

export default userController;
