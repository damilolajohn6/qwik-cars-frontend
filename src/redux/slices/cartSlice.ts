import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Car } from "../../../types";

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Car>) => {
            const car = action.payload;
            const existingItem = state.items.find((item) => item.carId === car._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    carId: car._id,
                    quantity: 1,
                    price: car.price,
                    car, // Store full car object
                });
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.carId !== action.payload);
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ carId: string; quantity: number }>
        ) => {
            const item = state.items.find(
                (item) => item.carId === action.payload.carId
            );
            if (item && action.payload.quantity >= 1) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;