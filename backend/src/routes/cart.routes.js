import express from "express";
import { requiresAuth } from "../middleware/auth.middleware.js";
import { getCart, addToCart, removeFromCart, updateQty } from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", requiresAuth, getCart);
router.post("/", requiresAuth, addToCart);
router.delete("/:id", requiresAuth, removeFromCart);
router.post("/:id", requiresAuth, updateQty);

export default router;
