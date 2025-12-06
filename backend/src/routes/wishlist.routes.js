import express from "express";
import { requiresAuth } from "../middleware/auth.middleware.js";
import { getWishlist, addToWishlist, removeFromWishlist } from "../controllers/wishlist.controller.js";

const router = express.Router();

router.get("/", requiresAuth, getWishlist);
router.post("/", requiresAuth, addToWishlist);
router.delete("/:id", requiresAuth, removeFromWishlist);

export default router;
