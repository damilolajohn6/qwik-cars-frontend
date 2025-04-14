/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../../types';

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null,
    token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
    loading: false,
    error: null,
};

// Login thunk: returns structured data
export const login = createAsyncThunk<
    { user: User; token: string },
    { email: string; password: string }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const res = await axios.post('/api/auth/login', { email, password });
        return res.data; // must return { user, token }
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error || 'Login failed');
    }
});

export const register = createAsyncThunk<
    { user: User; token: string },
    { name: string; email: string; phone: string; password: string }
>('auth/register', async ({ name, email, phone, password }, { rejectWithValue }) => {
    try {
        const res = await axios.post('/api/auth/register', { name, email, phone, password });
        return res.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error || 'Registration failed');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
