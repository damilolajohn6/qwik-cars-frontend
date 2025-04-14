/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Order } from "../../../types";
import { RootState } from "../store";

interface OrderState {
    orders: Order[];
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
};

export const createOrder = createAsyncThunk<Order, { items: { carId: string; quantity: number; price: number }[]; totalPrice: number; paymentMethod: string }>(
    "orders/createOrder",
    async (orderData, { getState, rejectWithValue }) => {
        const { auth } = getState() as RootState;
        try {
            const res = await axios.post("/api/orders", orderData, {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            return res.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.error || "Failed to create order"
            );
        }
    }
);

export const fetchOrders = createAsyncThunk<Order[], void>(
    "orders/fetchOrders",
    async (_, { getState, rejectWithValue }) => {
        const { auth } = getState() as RootState;
        try {
            const res = await axios.get("/api/orders", {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Failed to fetch orders");
        }
    }
);

export const updateOrderStatus = createAsyncThunk<Order, { orderId: string; status: string }>(
    "orders/updateOrderStatus",
    async ({ orderId, status }, { getState, rejectWithValue }) => {
        const { auth } = getState() as RootState;
        try {
            const res = await axios.put(
                `/api/orders/${orderId}`,
                { status },
                {
                    headers: { Authorization: `Bearer ${auth.token}` },
                }
            );
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Failed to update order");
        }
    }
);

export const deleteOrder = createAsyncThunk<string, string>(
    "orders/deleteOrder",
    async (orderId, { getState, rejectWithValue }) => {
        const { auth } = getState() as RootState;
        try {
            await axios.delete(`/api/orders/${orderId}`, {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            return orderId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Failed to delete order");
        }
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<Order>) => {
                state.loading = false;
                const index = state.orders.findIndex((o) => o._id === action.payload._id);
                if (index !== -1) state.orders[index] = action.payload;
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.orders = state.orders.filter((o) => o._id !== action.payload);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default orderSlice.reducer;