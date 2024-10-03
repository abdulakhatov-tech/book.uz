import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthModalState, IInitialState, ReviewDropdownState } from "./types";

const initialState: IInitialState = {
	menuModalVisibility: false,
	authModalVisibility: {
		authType: "sign-in",
		open: false,
		data: {},
	},
	categoryDropdownVisibility: false,
	reviewsDropdownVisibility: {
		open: false,
		bookId: '',
		review: {},
		reviewType: "create",
	},
};

// Modal slice
const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		toggleMenuModalVisibility: (
			state,
			{ payload }: PayloadAction<boolean>
		) => {
			state.menuModalVisibility = payload;
		},
		toggleAuthModalVisibility: (
			state,
			{ payload }: PayloadAction<Partial<AuthModalState>>
		) => {
			state.authModalVisibility = { ...state.authModalVisibility, ...payload };
		},
		toggleCategoryDropdownVisibility: (
			state,
			{ payload }: PayloadAction<boolean | undefined>
		) => {
			state.categoryDropdownVisibility =
				payload !== undefined ? payload : !state.categoryDropdownVisibility;
		},
		toggleReviewDropdownVisibility: (
			state,
			{ payload }: PayloadAction<Partial<ReviewDropdownState>>
		) => {
			state.reviewsDropdownVisibility = { ...state.reviewsDropdownVisibility, ...payload };
		},
	},
});

// Exporting actions
export const {
	toggleMenuModalVisibility,
	toggleAuthModalVisibility,
	toggleCategoryDropdownVisibility,
	toggleReviewDropdownVisibility,
} = modalSlice.actions;

// Exporting reducer
export default modalSlice.reducer;