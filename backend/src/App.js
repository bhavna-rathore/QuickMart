import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import addressRoutes from "./routes/address.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

app.use("/api/user/wishlist", wishlistRoutes);
app.use("/api/user/cart", cartRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/user/address", addressRoutes);


app.get("/", (req, res) => {
  res.send("Backend running (no DB yet)");
});

export default app;
