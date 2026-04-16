import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendedFoods } from "../foodSlice";
import FoodCard from "../components/FoodCard";
import { FaLightbulb } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "./FoodListPage.css";

const FoodRecommendPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    recommendedFoods = [],
    status,
    error
  } = useSelector((state) => state.food);

  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    if (user) {
      dispatch(getRecommendedFoods()); // ✅ không cần userId
    }
  }, [dispatch, user]);

  return (
    <div className="container">

      {/* HEADER */}
      <div className="favorite-header">
        <div className="header-content">
          <h1>
            <FaLightbulb className="title-icon" />
            Recommended For You
          </h1>
          <p>
            Personalized meals based on your preferences 🍽️
          </p>
        </div>
      </div>

      {/* LOADING */}
      {status === "loading" && recommendedFoods.length === 0 ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading recommendations...</p>
        </div>
      ) : error ? (
        /* ERROR */
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => dispatch(getRecommendedFoods())}>
            Try Again
          </button>
        </div>
      ) : recommendedFoods.length === 0 ? (
        /* EMPTY */
        <div className="favorite-empty-state">
          <h2>No Recommendations Yet</h2>
          <p>
            Try adding favorites or updating your preferences to get better suggestions.
          </p>
          <button
            className="explore-btn"
            onClick={() => navigate("/foods")}
          >
            Explore Foods
          </button>
        </div>
      ) : (
        /* GRID */
        <div className="food-grid">
          {recommendedFoods.map((food) => (
            <div key={food.id} className="favorite-card-wrapper animate-up">
              <FoodCard food={food} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodRecommendPage;