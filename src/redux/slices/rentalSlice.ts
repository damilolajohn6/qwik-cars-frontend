/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Rental } from "../../../types";
import { RootState } from "../store";

interface RentalState {
    rentals: Rental[];
    loading: boolean;
    error: string | null;
}

const initialState: RentalState = {
    rentals: [],
    loading: false,
    error: null,
};

interface CreateRentalData {
    carId: string;
    startDate: string;
    endDate: string;
    paymentMethod: "credit_card" | "bank_transfer" | "cash";
    totalPrice?: number;
    bookedHours?: number;
}

export const createRental = createAsyncThunk<Rental, CreateRentalData>(
    "rentals/createRental",
    async (rentalData, { getState, rejectWithValue }) => {
        const { auth } = getState() as RootState;
        try {
            const res = await axios.post("/api/rentals", rentalData, {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            return res.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.error || "Failed to create rental"
            );
        }
    }
);

export const fetchUserRentals = createAsyncThunk<Rental[], void>(
    "rentals/fetchUserRentals",
    async (_, { getState, rejectWithValue }) => {
        const { auth } = getState() as RootState;
        try {
            const res = await axios.get("/api/rentals/my-rentals", {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            return res.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.error || "Failed to fetch rentals"
            );
        }
    }
);

export const updateRentalStatus = createAsyncThunk<
    Rental,
    { rentalId: string; status: string }
>(
    "rentals/updateRentalStatus",
    async ({ rentalId, status }, { getState, rejectWithValue }) => {
        const { auth } = getState() as RootState;
        try {
            const res = await axios.put(
                `/api/rentals/${rentalId}`,
                { status },
                {
                    headers: { Authorization: `Bearer ${auth.token}` },
                }
            );
            return res.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.error || "Failed to update rental"
            );
        }
    }
);

export const deleteRental = createAsyncThunk<string, string>(
    "rentals/deleteRental",
    async (rentalId, { getState, rejectWithValue }) => {
        const { auth } = getState() as RootState;
        try {
            await axios.delete(`/api/rentals/${rentalId}`, {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            return rentalId;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.error || "Failed to delete rental"
            );
        }
    }
);

const rentalSlice = createSlice({
    name: "rentals",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createRental.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRental.fulfilled, (state, action: PayloadAction<Rental>) => {
                state.loading = false;
                state.rentals.push(action.payload);
            })
            .addCase(createRental.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchUserRentals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserRentals.fulfilled, (state, action: PayloadAction<Rental[]>) => {
                state.loading = false;
                state.rentals = action.payload;
            })
            .addCase(fetchUserRentals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateRentalStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateRentalStatus.fulfilled,
                (state, action: PayloadAction<Rental>) => {
                    state.loading = false;
                    const index = state.rentals.findIndex(
                        (r) => r._id === action.payload._id
                    );
                    if (index !== -1) state.rentals[index] = action.payload;
                }
            )
            .addCase(updateRentalStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteRental.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRental.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.rentals = state.rentals.filter((r) => r._id !== action.payload);
            })
            .addCase(deleteRental.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default rentalSlice.reducer;