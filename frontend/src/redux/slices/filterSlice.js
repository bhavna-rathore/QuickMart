import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  priceFilter: "",
  categoryFilter: [],
  ratingFilter: 0,
  searchFilter: ""
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setPriceFilter(state, action) {
      state.priceFilter = action.payload;
    },
    setSearchFilter(state, action) {
      state.searchFilter = action.payload;
    },
    addCategoryFilter(state, action) {
      state.categoryFilter.push(action.payload);
    },
    removeCategoryFilter(state, action) {
      state.categoryFilter = state.categoryFilter.filter(
        cat => cat !== action.payload
      );
    },
    setRatingFilter(state, action) {
      state.ratingFilter = action.payload;
    },
    resetFilters(state) {
      state.priceFilter = "";
      state.categoryFilter = [];
      state.ratingFilter = 0;
      state.searchFilter = "";
    }
  }
});

export const {
  setPriceFilter,
  setSearchFilter,
  addCategoryFilter,
  removeCategoryFilter,
  setRatingFilter,
  resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;
