import { createSlice } from "@reduxjs/toolkit";
import type { IInitialState } from "./types";

const initialState: IInitialState = {
	menuModalVisibility: false,
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		toggleMenuModalVisibility: (state, action) => {
			state.menuModalVisibility = action.payload;
		},
	},
});

export const { toggleMenuModalVisibility } = modalSlice.actions;

export default modalSlice.reducer;
