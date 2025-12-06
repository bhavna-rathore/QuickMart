import categories from "../data/categories.js";

export const getCategories = (req, res) => {
  res.json({ categories });
};
