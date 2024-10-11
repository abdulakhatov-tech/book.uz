import { configureStore } from "@reduxjs/toolkit";
import {
	cart,
	modal,
	filter,
	sidebar,
	wishlist,
	checkout,
	columnCounter,
	search,
} from "./slices";

export const store = configureStore({
	reducer: {
		cart,
		modal,
		filter,
		search,
		sidebar,
		wishlist,
		checkout,
		columnCounter,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
