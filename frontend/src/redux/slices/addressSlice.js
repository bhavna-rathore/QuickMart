import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/apiClient";


export const fetchAddressesThunk = createAsyncThunk(
    "address/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("Token");
            const { data } = await api.get("/api/user/address", {
                headers: { authorization: token }
            });
            return data.addresses;
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

export const addAddressThunk = createAsyncThunk(
    "address/add",
    async (address, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("Token");
            const { data } = await api.post("/api/user/address", address, {
                headers: { authorization: token }
            });
            return data.addresses;
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

export const updateAddressThunk = createAsyncThunk(
    "address/update",
    async ({ id, updates }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("Token");
            const { data } = await api.put(`/api/user/address/${id}`, updates, {
                headers: { authorization: token }
            });
            return data.addresses;
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

export const deleteAddressThunk = createAsyncThunk(
    "address/delete",
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("Token");
            const { data } = await api.delete(`/api/user/address/${id._id}`, {
                headers: { authorization: token }
            });
            return data.addresses;
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

const addressSlice = createSlice({
    name: "address",
    initialState: { addresses: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (a) => a.type.startsWith("address") && a.type.endsWith("pending"),
                (state) => { state.loading = true; state.error = null; }
            )
            .addMatcher(
                (a) => a.type.startsWith("address") && a.type.endsWith("fulfilled"),
                (state, action) => {
                    
                    state.loading = false;
                    state.addresses = action.payload;
                }
            )
            .addMatcher(
                (a) => a.type.startsWith("address") && a.type.endsWith("rejected"),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    }
});

export default addressSlice.reducer;
