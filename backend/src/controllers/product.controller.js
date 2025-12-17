import products from "../data/products.js";

export const getAllProducts = (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / limit);

  if (page > totalPages && totalPages !== 0) {
    return res.status(400).json({ errors: ["Invalid page number"] });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedProducts = products.slice(startIndex, endIndex);

  res.json({
    products: paginatedProducts,
    page,
    limit,
    totalItems,
    totalPages
  });
};

export const getSingleProduct = (req, res) => {
  const { id } = req.params;

  const product = products.find(p => p._id === id);

  if (!product) {
    return res.status(404).json({ errors: ["Product not found"] });
  }

  res.json({ product });
};
