import { configureStore } from "@reduxjs/toolkit";
import { columnCounter, modal, sidebar } from "./slices";

export const store = configureStore({
	reducer: {
		modal,
		sidebar,
		columnCounter,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
