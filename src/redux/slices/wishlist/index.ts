import { BookI } from "@/types";
import { loadState, saveState } from "@/utils/localStorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistPropsI {
  bookmark: BookI[];
}

const WISHLIST_KEY = "wishlist";

const initialState: WishlistPropsI = loadState(WISHLIST_KEY) || {
  bookmark: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addBookToWishlist: (state, action: PayloadAction<BookI>) => {
      state.bookmark = [...state.bookmark, action.payload];
      saveState(WISHLIST_KEY, state);
    },
    removeBookFromWishlist: (state, action: PayloadAction<BookI>) => {
      state.bookmark = state.bookmark.filter(
        (book) => book._id !== action.payload._id
      );
      saveState(WISHLIST_KEY, state);
    },
    clearWishlist: (state) => {
      state.bookmark = [];
      saveState(WISHLIST_KEY, state);
    },
  },
});

export const { addBookToWishlist, removeBookFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
