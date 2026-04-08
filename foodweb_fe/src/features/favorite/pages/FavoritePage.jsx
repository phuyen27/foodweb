import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../favoriteSlice";
import FoodCard from "../../food/components/FoodCard";
import "./FavoritePage.css";
import { FaHeart, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FavoritePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favoriteList, loading, error } = useSelector((state) => state.favorite);
  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    if (user) {
      dispatch(getFavorites());
    }
  }, [dispatch, user]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!user) {
    return (
      <div className="favorite-empty-state">
        <FaHeart className="empty-icon" />
        <h2>Please login to see your favorites</h2>
        <button className="back-btn" onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="favorite-page">
      <div className="favorite-header">
        <div className="header-content">
          <h1>My Favorite Recipes</h1>
          <p>
            You have <span className="highlight">{favoriteList?.length || 0}</span> recipes in your favorites
          </p>
        </div>
      </div>

      {loading && favoriteList.length === 0 ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your favorites...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => dispatch(getFavorites())}>Try Again</button>
        </div>
      ) : favoriteList.length === 0 ? (
        <div className="favorite-empty-state">
          <div className="empty-icon-container">
            <FaHeart className="empty-icon" />
          </div>
          <h2>No Favorites Yet</h2>
          <p>Explore our delicious recipes and save your favorites here!</p>
          <button className="explore-btn" onClick={() => navigate("/")}>
            Explore Recipes
          </button>
        </div>
      ) : (
        <div className="food-grid">
          {favoriteList.map((food) => (
            <div key={food.id} className="favorite-card-wrapper animate-up">
              <FoodCard food={food} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
