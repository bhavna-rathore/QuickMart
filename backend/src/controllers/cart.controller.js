// backend/src/controllers/cart.controller.js
// Expects requiresAuth middleware to have set req.user
export const getCart = (req, res) => {
  const user = req.user;
  return res.json({ cart: user.cart || [] });
};

// Add to cart (product object in body)
export const addToCart = (req, res) => {
  const user = req.user;
  const { product } = req.body;
  if (!product) return res.status(400).json({ errors: ["Missing product"] });

  const existing = user.cart.find((p) => p._id === product._id);
  if (existing) {
    // if product exists, increase qty by 1
    existing.qty = (existing.qty || 1) + 1;
  } else {
    // default qty 1
    user.cart.push({ ...product, qty: 1 });
  }

  return res.json({ cart: user.cart });
};

// Remove item from cart by id (DELETE /api/user/cart/:id)
export const removeFromCart = (req, res) => {
  const user = req.user;
  const { id } = req.params;
  user.cart = user.cart.filter((p) => p._id !== id);
  return res.json({ cart: user.cart });
};

// Update quantity (POST /api/user/cart/:id) with body { action: { type: "increment" | "decrement" } }
export const updateQty = (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const action = req.body.action;

  const item = user.cart.find((p) => p._id === id);
  if (!item) return res.status(404).json({ errors: ["Cart item not found"] });

  if (action?.type === "increment") {
    item.qty = (item.qty || 1) + 1;
  } else if (action?.type === "decrement") {
    item.qty = (item.qty || 1) - 1;
    if (item.qty <= 0) {
      user.cart = user.cart.filter((p) => p._id !== id);
    }
  } else {
    return res.status(400).json({ errors: ["Invalid action"] });
  }

  return res.json({ cart: user.cart });
};
