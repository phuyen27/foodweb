import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import foodReducer from "../features/food/foodSlice";
import favoriteReducer from "../features/favorite/favoriteSlice";
import mealReducer from "../features/meal/mealSlice";
import preferenceReducer from "../features/preference/preferenceSlice";
import historyReducer  from "../features/history/historySlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    food: foodReducer,
    favorite: favoriteReducer,
    meal: mealReducer,
    preference: preferenceReducer,
    history: historyReducer
  },
});