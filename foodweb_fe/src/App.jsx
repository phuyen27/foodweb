
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import RegisterPage from "./features/auth/pages/RegisterPage.jsx";
import LoginPage from "./features/auth/pages/LoginPage.jsx";
import Home from "./pages/Home.jsx";
import ProfilePage from "./features/auth/pages/ProfilePage.jsx";
import MainLayout from "./pages/MainLayout.jsx";

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
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;