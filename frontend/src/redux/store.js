import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import productReducer from "./slices/productSlice";

import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    products: productReducer,
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer
  },
});



