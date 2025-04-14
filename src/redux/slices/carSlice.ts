/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Car } from "../../../types";

interface CarState {
    cars: Car[];
    selectedCar: Car | null;
    loading: boolean;
    error: string | null;
}

const initialState: CarState = {
    cars: [],
    selectedCar: null,
    loading: false,
    error: null,
};

interface FetchCarsParams {
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    status?: string;
    limit?: number;
}

export const fetchCars = createAsyncThunk<Car[], FetchCarsParams>(
    "cars/fetchCars",
    async (params = {}, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams();
            if (params.category && params.category !== "both")
                query.append("category", params.category);
            if (params.brand) query.append("brand", params.brand);
            if (params.minPrice !== undefined)
                query.append("minPrice", params.minPrice.toString());
            if (params.maxPrice !== undefined)
                query.append("maxPrice", params.maxPrice.toString());
            if (params.search) query.append("search", params.search);
            if (params.status) query.append("status", params.status);
            if (params.limit) query.append("limit", params.limit.toString());

            const res = await axios.get(`/api/cars?${query.toString()}`);
            return res.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.error || "Failed to fetch cars"
            );
        }
    }
);

export const fetchCarById = createAsyncThunk<Car, string>(
    "cars/fetchCarById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/api/cars/${id}`);
            return res.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.error || "Failed to fetch car"
            );
        }
    }
);

const carSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        setSelectedCar: (state, action: PayloadAction<Car | null>) => {
            state.selectedCar = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCars.fulfilled, (state, action: PayloadAction<Car[]>) => {
                state.loading = false;
                state.cars = action.payload;
            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchCarById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCarById.fulfilled, (state, action: PayloadAction<Car>) => {
                state.loading = false;
                state.selectedCar = action.payload;
            })
            .addCase(fetchCarById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSelectedCar } = carSlice.actions;
export default carSlice.reducer;