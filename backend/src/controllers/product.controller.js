import products from "../data/products.js";

export const getAllProducts = (req, res) => {
  let result = [...products];

  const {
    page = 1,
    limit = 12,
    sort,
    rating,
    search,
    category,
  } = req.query;

  if (category) {
    const cats = category.split(",");
    result = result.filter(p => cats.includes(p.categoryName));
  }

  if (rating) {
    result = result.filter(p => p.rating >= Number(rating));
  }

  if (search) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sort === "lowToHigh") result.sort((a, b) => a.price - b.price);
  if (sort === "highToLow") result.sort((a, b) => b.price - a.price);

  const totalItems = result.length;
  const totalPages = Math.ceil(totalItems / limit);
  const start = (page - 1) * limit;

  res.json({
    products: result.slice(start, start + Number(limit)),
    page: Number(page),
    totalPages,
    totalItems,
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
