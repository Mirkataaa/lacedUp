import { Router } from "express";
import userService from "../services/userService.js";
import { AUTH_COOKIE_NAME } from "../constants.js";
import { getErrorMsg } from "../utils/errorUtils.js";
import { isAuth, isGuest, hasRole } from "../middlewares/authMiddleware.js";
import User from "../models/User.js";

const userController = Router();

// * Registration route
userController.post("/register", isGuest, async (req, res) => {
  const { username, email, password, rePassword } = req.body;

  try {
    const token = await userService.register(
      username,
      email,
      password,
      rePassword
    );
    const user = await User.findOne({ email });
    res.cookie(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
      sameSite: "lax",
    });

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    const errors = getErrorMsg(err);

    res.status(400).json({ message: "Registration failed", errors });
  }
});

// * Login route
userController.post("/login", isGuest, async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await userService.login(email, password);
    const user = await User.findOne({ email });
    res.cookie(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      maxAge: 3600000,
    });
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    const errors = getErrorMsg(err);
    res.status(401).json({ message: "Login failed", errors });
  }
});

// * Logout route
userController.get("/logout", isAuth, (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME);

  res.status(200).json({ message: "Logout successful" });
});

// * Get all users
userController.get("/all", isAuth, hasRole("admin"), async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// * Update role
userController.put('/:id/role', isAuth, async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ message: 'Role updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Error updating user role' });
  }
});

// * Get profile
userController.get("/profile", isAuth, (req, res) => {
  const user = req.user;
  res.status(200).json({
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  });
});

userController.delete("/:id", isAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    return res
      .status(200)
      .json({ message: "User deleted successfully.", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the user.", error });
  }
});

export default userController;
