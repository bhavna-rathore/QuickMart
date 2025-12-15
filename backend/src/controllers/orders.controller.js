
import { v4 as uuid } from "uuid";
import { orders } from "../data/orders.js";
import { formatDate } from "../utils/date.js";

// Place an order - expects req.user (requiresAuth)
export const placeOrder = (req, res) => {
  try {
    const user = req.user;
    const { items, total, address } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ errors: ["No items provided"] });
    }

    const newOrder = {
      _id: uuid(),
      userId: user._id,
      items,            // array of items { _id, name, price, qty, ... }
      total,
      address,
      status: "Placed",
      cancelledAt: null,
      createdAt: formatDate()
    };

    orders.push(newOrder);

    // Optionally clear user's cart after placing order
    user.cart = [];

    return res.status(201).json({ order: newOrder });
  } catch (err) {
    console.error("placeOrder error:", err);
    return res.status(500).json({ errors: ["Could not place order"] });
  }
};

// Get orders for authenticated user
export const getOrders = (req, res) => {
  try {
    const user = req.user;
    const userOrders = orders.filter(o => o.userId === user._id);
    return res.json({ orders: userOrders });
  } catch (err) {
    console.error("getOrders error:", err);
    return res.status(500).json({ errors: ["Could not fetch orders"] });
  }
};
// backend/src/controllers/orders.controller.js
export const getOrderById = (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const order = orders.find(o => o._id === id && o.userId === user._id);
    if (!order) return res.status(404).json({ errors: ["Order not found"] });
    return res.json({ order });
  } catch (err) {
    console.error("getOrderById error:", err);
    return res.status(500).json({ errors: ["Could not fetch order"] });
  }
};

export const cancelOrder = (req, res) => {
  const user = req.user;
  const { id } = req.params;

  const order = orders.find(o => o._id === id && o.userId === user._id);

  if (!order) {
    return res.status(404).json({ errors: ["Order not found"] });
  }

  // Already cancelled?
  if (order.status === "Cancelled") {
    return res.status(400).json({ errors: ["Order already cancelled"] });
  }

  // Check 5-minute cancellation window
  const createdTime = new Date(order.createdAt).getTime();
  const now = Date.now();

  const diffMinutes = (now - createdTime) / (1000 * 60);

  if (diffMinutes > 5) {
    return res.status(400).json({ errors: ["Cancellation window expired"] });
  }

  // Cancel the order
  order.status = "Cancelled";
  order.cancelledAt = new Date().toISOString();

  return res.json({ order });
};
