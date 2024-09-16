import { createSlice } from "@reduxjs/toolkit";
import type { IInitialState } from "./types";

const initialState: IInitialState = {
	menuModalVisibility: false,
	authModalVisibility: {
		authType: "sign-in",
		open: false,
		data: {},
	},
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		toggleMenuModalVisibility: (state, action) => {
			state.menuModalVisibility = action.payload;
		},
		toggleAuthModalVisibility: (state, action) => {
			state.authModalVisibility = {
				...state.authModalVisibility,
				...action.payload,
			};
		},
	},
});

export const { toggleMenuModalVisibility, toggleAuthModalVisibility } =
	modalSlice.actions;

export default modalSlice.reducer;
