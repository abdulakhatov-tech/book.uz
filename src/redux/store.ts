import { configureStore } from "@reduxjs/toolkit";
import { columnCounter, filter, modal, sidebar, wishlist } from "./slices";

export const store = configureStore({
	reducer: {
		modal,
		sidebar,
		filter,
		wishlist,
		columnCounter,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
