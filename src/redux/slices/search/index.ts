import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
	name: "search",
	initialState: {
		open: true,
	},
	reducers: {
		toggleSearch: (state) => {
			state.open = !state.open;
		},
	},
});

export const { toggleSearch } = searchSlice.actions;

export default searchSlice.reducer;
