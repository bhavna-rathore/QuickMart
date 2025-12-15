import express from "express";
import { requiresAuth } from "../middleware/auth.middleware.js";
import { getAddresses, addAddress, updateAddress, deleteAddress } from "../controllers/address.controller.js";

const router = express.Router();

router.get("/", requiresAuth, getAddresses);
router.post("/", requiresAuth, addAddress);
router.put("/:id", requiresAuth, updateAddress);
router.delete("/:id", requiresAuth, deleteAddress);

export default router;
