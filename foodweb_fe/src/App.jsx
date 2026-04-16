
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import RegisterPage from "./features/auth/pages/RegisterPage.jsx";
import LoginPage from "./features/auth/pages/LoginPage.jsx";
import Home from "./pages/Home.jsx";
import ProfilePage from "./features/auth/pages/ProfilePage.jsx";
import MainLayout from "./pages/MainLayout.jsx";
import FoodListPage from "./features/food/pages/FoodListPage.jsx";
import FoodDetailPage from "./features/food/pages/FoodDetailPage.jsx"
import FavoritePage from "./features/favorite/pages/FavoritePage.jsx";
import MealPlanPage from "./features/meal/pages/MealPlanPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PreferencePage from "./features/preference/pages/PreferencePage.jsx";
import HistoryPage from "./features/history/pages/HistoryPage.jsx";
import FoodRecommendPage from "./features/food/pages/FoodRecommendPage.jsx";
import FoodPreferencePage from "./features/food/pages/FoodPreferencePage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
     <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      <Routes>
        {/* redirect */}
        <Route path="/" element={<Navigate to="/home" />} />

       
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/foods" element={<FoodListPage />} />
          <Route path="/foods/:id" element={<FoodDetailPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/meal-plan" element={<MealPlanPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="/preferences" element={<PreferencePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/recommendations" element={<FoodPreferencePage />} />
          </Route>
        </Route>

        
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;