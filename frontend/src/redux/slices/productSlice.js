import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/apiClient";

// Fetch paginated products
export const fetchProductsThunk = createAsyncThunk(
  "products/fetch",
  async ({ page = 1, limit = 12 }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/api/products?page=${page}&limit=${limit}`
      );
      return data; // { products, page, totalPages, totalItems }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch categories
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/categories");
      return data.categories;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",

  initialState: {
    products: [],        // ✅ correct naming
    categories: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
    totalItems: 0,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // Products (Pagination)
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
