import { configureStore } from "@reduxjs/toolkit";
import { modal, sidebar } from "./slices";

export const store = configureStore({
	reducer: {
		modal,
		sidebar
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
