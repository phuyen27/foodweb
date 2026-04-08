import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import foodReducer from "../features/food/foodSlide";
import favoriteReducer from "../features/favorite/favoriteSlide";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    food: foodReducer,
    favorite: favoriteReducer
  },
});