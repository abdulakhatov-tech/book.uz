import { configureStore } from "@reduxjs/toolkit";
import { columnCounter, filter, modal, sidebar } from "./slices";

export const store = configureStore({
	reducer: {
		modal,
		sidebar,
		columnCounter,
		filter
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
