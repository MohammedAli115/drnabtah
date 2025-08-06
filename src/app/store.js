// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
import filterReducer from "../features/filter/filterSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import reviewsReducer from "../features/reviews/reviewsSlice";
import addressReducer from "../features/address/addressSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
    filter: filterReducer,
    categories: categoriesReducer,
    reviews: reviewsReducer,
    address: addressReducer,
    cart: cartReducer,
  },
});
