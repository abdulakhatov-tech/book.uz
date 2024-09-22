import { createSlice } from "@reduxjs/toolkit";

interface SidebarSlicePropsI {
	isOpen: boolean;
}

const initialState: SidebarSlicePropsI = {
	isOpen: false,
};

const sidebarSlice = createSlice({
	name: "sidebar",
	initialState,
	reducers: {
		toggleSidebar: (state) => {
			state.isOpen = !state.isOpen;
		},
	},
});

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
