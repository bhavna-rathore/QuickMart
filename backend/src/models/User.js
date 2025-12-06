import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    cart: Array,
    wishlist: Array,
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
