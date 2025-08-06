import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    // If Empty Return All
    category: null, 
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    clearCategory: (state) => {
      state.category = null;
    },
  },
});

export const { setCategory, clearCategory } = filterSlice.actions;
export default filterSlice.reducer;
