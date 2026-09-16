import { Router } from "express";

import { login, logout, getMe } from "../controllers/auth.controller.js";

const router = Router();

// Login
router.post("/login", login);

// Logout
router.post("/logout", logout);

// Get current authenticated user
router.get("/me", getMe);

export default router;
