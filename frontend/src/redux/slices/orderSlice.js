
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/apiClient";

// Place order
export const placeOrderThunk = createAsyncThunk(
    "orders/placeOrder",
    async ({ items, total, address }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("Token");
            const { data } = await api.post(
                "/api/orders",
                { items, total, address },
                { headers: { authorization: token } }
            );
            return data.order;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Fetch user orders
export const fetchOrdersThunk = createAsyncThunk(
    "orders/fetchOrders",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("Token");
            const { data } = await api.get("/api/orders", { headers: { authorization: token } });
            return data.orders;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);
export const cancelOrderThunk = createAsyncThunk("orders/cancelOrder", async (orderId, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("Token");
        const { data } = await api.post(`/api/orders/${orderId}/cancel`, {},
            { header: { authorization: token } }
        );
        return data.order

    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)

    }
})

const orderSlice = createSlice({
    name: "orders",
    initialState: { orders: [], loading: false, error: null, lastPlaced: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(placeOrderThunk.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(placeOrderThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.lastPlaced = action.payload;
                // optionally push into orders list
                state.orders.unshift(action.payload);
            })
            .addCase(placeOrderThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(fetchOrdersThunk.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchOrdersThunk.fulfilled, (state, action) => { state.loading = false; state.orders = action.payload; })
            .addCase(fetchOrdersThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(cancelOrderThunk.fulfilled,(state,action)=>{
                const updated= action.payload;
                state.orders= state.orders.map(order=>order._id===updated._id?updated:order)

            })
    }
});



export default orderSlice.reducer;
