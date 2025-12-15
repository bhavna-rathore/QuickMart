
import express from "express";
import { requiresAuth } from "../middleware/auth.middleware.js";
import { placeOrder, getOrders, getOrderById, cancelOrder } from "../controllers/orders.controller.js";

const router = express.Router();

router.post("/", requiresAuth, placeOrder);   // POST /api/orders
router.get("/", requiresAuth, getOrders);     // GET  /api/orders
// backend/src/routes/orders.routes.js
router.get("/:id", requiresAuth, getOrderById);
router.post("/:id/cancel", requiresAuth, cancelOrder);



export default router;
