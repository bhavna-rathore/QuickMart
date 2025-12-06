import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/apiClient";


// GET WISHLIST
export const getWishlistThunk = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/user/wishlist", {
        headers: { authorization: localStorage.getItem("Token") }
      });
      return res.data.wishlist;
    } catch (err) {
      return rejectWithValue("Failed to load wishlist");
    }
  }
);

// ADD TO WISHLIST
export const addToWishlistThunk = createAsyncThunk(
  "wishlist/add",
  async (product, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/api/user/wishlist",
        { product },
        {
          headers: { authorization: localStorage.getItem("Token") }
        }
      );
      return res.data.wishlist;
    } catch (err) {
      return rejectWithValue("Failed to add to wishlist");
    }
  }
);

// REMOVE FROM WISHLIST
export const removeFromWishlistThunk = createAsyncThunk(
  "wishlist/remove",
  async (id, { rejectWithValue }) => {
    try {
      debugger
      const res = await api.delete(`/api/user/wishlist/${id}`, {
        headers: { authorization: localStorage.getItem("Token") }
      });
      return res.data.wishlist;
    } catch (err) {
      return rejectWithValue("Failed to remove from wishlist");
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    myWishlist: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWishlistThunk.fulfilled, (state, action) => {
        state.myWishlist = action.payload;
      })
      .addCase(addToWishlistThunk.fulfilled, (state, action) => {
        state.myWishlist = action.payload;
      })
      .addCase(removeFromWishlistThunk.fulfilled, (state, action) => {
        state.myWishlist = action.payload;
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

export default wishlistSlice.reducer;
