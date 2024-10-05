import { BookI, CartItemI } from "@/types";
import { loadState, saveState } from "@/utils/localStorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartPropsI {
  cart: CartItemI[];
  error: string | null;
}

const CART_KEY = "cart";

const initialState: CartPropsI = {
  cart: loadState(CART_KEY) || [],
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<BookI>) => {
      const { _id, amount } = action.payload;
      const existingCartItem = state.cart.find((book) => book._id === _id);

      state.error = null;

      if (existingCartItem) {
        const newAmount = existingCartItem.amount + 1;

        // If the new amount exceeds the stock, set an error
        if (newAmount > amount) {
          state.error = "Not enough stock available";
        } else {
          existingCartItem.amount = newAmount;
        }
      } else {
        if (amount > 0) {
          state.cart.push({ ...action.payload, amount: 1, maxAmount: amount });
        }else {
          // Set error if no stock is available to add to the cart
          state.error = "Book is out of stock";
        }
      }

      saveState(CART_KEY, state.cart);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((book) => book._id !== action.payload);
      state.error = null;
      saveState(CART_KEY, state.cart);
    },
    clearCartError: (state) => {
      state.error = null;
    },
    incrementBookAmount: (state, action: PayloadAction<string>) => {
      const cartItem = state.cart.find((book) => book._id === action.payload);
      
      if (!cartItem) return;

      // Ensure not exceeding the available stock
      if (cartItem.amount < cartItem.maxAmount) {
        cartItem.amount += 1;
        state.error = null;
      } else {
        state.error = "Not enough stock available";
      }

      saveState(CART_KEY, state.cart); // Persist cart state
    },
    
    decrementBookAmount: (state, action: PayloadAction<string>) => {
      const cartItem = state.cart.find((book) => book._id === action.payload);
      
      if (!cartItem) return; 

      if (cartItem.amount > 1) {
        cartItem.amount -= 1;
        state.error = null; 
      } else {
        // Optionally handle logic for removing the item if amount reaches 0
        state.cart = state.cart.filter((book) => book._id !== action.payload);
      }

      saveState(CART_KEY, state.cart); // Persist cart state
    },
  },
});

export const { addToCart, removeFromCart, clearCartError, incrementBookAmount, decrementBookAmount } = cartSlice.actions;

export default cartSlice.reducer;
