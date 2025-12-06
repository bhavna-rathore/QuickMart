import products from "../data/products.js";

export const getAllProducts = (req, res) => {
  res.json({ products });
};

export const getSingleProduct = (req, res) => {
  const { id } = req.params;

  const product = products.find(p => p._id === id);

  if (!product) {
    return res.status(404).json({ errors: ["Product not found"] });
  }

  res.json({ product });
};
