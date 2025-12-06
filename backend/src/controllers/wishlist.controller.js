// backend/src/controllers/wishlist.controller.js
export const getWishlist = (req, res) => {
  const user = req.user;
  return res.json({ wishlist: user.wishlist || [] });
};

export const addToWishlist = (req, res) => {
  const user = req.user;
  const { product } = req.body;
  if (!product) return res.status(400).json({ errors: ["Missing product"] });

  const exists = user.wishlist.find((p) => p._id === product._id);
  if (!exists) user.wishlist.push(product);

  return res.json({ wishlist: user.wishlist });
};

export const removeFromWishlist = (req, res) => {
  const user = req.user;
  const { id } = req.params;
  user.wishlist = user.wishlist.filter((p) => p._id !== id);
  return res.json({ wishlist: user.wishlist });
};
