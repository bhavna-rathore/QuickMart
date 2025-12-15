import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/apiClient";

// GET CART
export const getCartThunk = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/user/cart", {
        headers: { authorization: localStorage.getItem("Token") }
      });
      return res.data.cart;
    } catch (err) {
      return rejectWithValue("Failed to load cart");
    }
  }
);

// ADD TO CART
export const addToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async (product, { rejectWithValue }) => {
    try {
      
      const res = await api.post(
        "/api/user/cart",
        { product },
        {
          headers: { authorization: localStorage.getItem("Token") }
        }
      );
      return res.data.cart;
    } catch (err) {
      return rejectWithValue("Failed to add to cart");
    }
  }
);

// REMOVE FROM CART
export const removeFromCartThunk = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/api/user/cart/${id}`, {
        headers: { authorization: localStorage.getItem("Token") }
      });
      return res.data.cart;
    } catch (err) {
      return rejectWithValue("Failed to remove item");
    }
  }
);

// UPDATE QUANTITY
export const updateQtyThunk = createAsyncThunk(
  "cart/updateQty",
  async ({ id, actionType }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `/api/user/cart/${id}`,
        { action: { type: actionType } },
        {
          headers: { authorization: localStorage.getItem("Token") }
        }
      );
      return res.data.cart;
    } catch (err) {
      return rejectWithValue("Failed to update quantity");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    myCart: [],
    loading: false,
    error: null
  },
  reducers: {
    clearCart: (state) => {
      state.myCart = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartThunk.fulfilled, (state, action) => {
        state.myCart = action.payload;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.myCart = action.payload;
      })
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        state.myCart = action.payload;
      })
      .addCase(updateQtyThunk.fulfilled, (state, action) => {
        state.myCart = action.payload;
      })
      .addMatcher(
        (a) => a.type.endsWith("/pending"),
        (state) => { state.loading = true; state.error = null; }
      )
      .addMatcher(
        (a) => a.type.endsWith("/fulfilled"),
        (state) => { state.loading = false; }
      )
      .addMatcher(
        (a) => a.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
