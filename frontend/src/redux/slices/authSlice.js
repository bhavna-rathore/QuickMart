import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../services/apiClient";

// LOGIN
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/login", { email, password });

      // Mirage returns: { foundUser, encodedToken }
      const { foundUser, encodedToken } = res.data;

      localStorage.setItem("Token", encodedToken);
      localStorage.setItem("userDetail", JSON.stringify(foundUser));

      return { user: foundUser, token: encodedToken };
    } catch (err) {
      return rejectWithValue("Invalid Credentials");
    }
  }
);

// SIGNUP
export const signupThunk = createAsyncThunk(
  "auth/signup",
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/signup", {
        firstName,
        lastName,
        email,
        password
      });

      const { createdUser, encodedToken } = res.data;

      localStorage.setItem("Token", encodedToken);
      localStorage.setItem("userDetail", JSON.stringify(createdUser));

      return { user: createdUser, token: encodedToken };
    } catch (err) {
      return rejectWithValue("Signup Failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: !!localStorage.getItem("Token"),
    user: JSON.parse(localStorage.getItem("userDetail")) || null,
    token: localStorage.getItem("Token") || null,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      state.token = null;
      localStorage.clear();
    }
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SIGNUP
      .addCase(signupThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
