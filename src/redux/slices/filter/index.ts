import { createSlice } from "@reduxjs/toolkit";

interface FilterSliceI {
    filterVisibility: boolean; // Filter modal visibility status
}

const initialState: FilterSliceI = {
    filterVisibility: false,
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        toggleFilterVisibility: (state) => {
            state.filterVisibility =!state.filterVisibility;
        }
}})

export const { toggleFilterVisibility } = filterSlice.actions;

export default filterSlice.reducer;