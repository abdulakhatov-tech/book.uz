import { createSlice } from "@reduxjs/toolkit";

export interface IColumnCounterState {
  limit: number;
}

const initialState: IColumnCounterState = {
  limit: window.innerWidth < 640 ? 2 : window.innerWidth < 768 ? 3 : 4, // 2 columns for <640px, 3 for <768px, and 4 for >768px
};

const columnCounterSlice = createSlice({
  name: "columnCounter",
  initialState,
  reducers: {
    setColumnLimit: (state, action) => {
      state.limit = action.payload;
    },
    setInitialColumnLimit: (state) => {
      state.limit = window.innerWidth < 640 ? 2 : window.innerWidth < 768 ? 3 : 4;
    },
  },
});

export const { setColumnLimit, setInitialColumnLimit } = columnCounterSlice.actions;

export default columnCounterSlice.reducer;
