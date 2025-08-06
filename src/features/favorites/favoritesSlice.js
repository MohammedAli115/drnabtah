import { createSlice } from "@reduxjs/toolkit";

// جلب المفضلة من localStorage أو مصفوفة فاضية
const getInitialFavorites = () => {
  try {
    const favs = localStorage.getItem("favorites");
    return favs ? JSON.parse(favs) : [];
  } catch {
    return [];
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: getInitialFavorites(),
  reducers: {
    toggleFavorite: (state, action) => {
      const exists = state.find((item) => item.id === action.payload.id);
      let newState;
      if (exists) {
        newState = state.filter((item) => item.id !== action.payload.id);
      } else {
        newState = [...state, action.payload];
      }
      // حفظ في localStorage
      localStorage.setItem("favorites", JSON.stringify(newState));
      return newState;
    },
    // لإعادة تحميل المفضلة من localStorage (اختياري)
    loadFavorites: (state, action) => getInitialFavorites(),
  },
});

export const { toggleFavorite, loadFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
