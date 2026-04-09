import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaFire,
  FaClock,
  FaChartBar
} from "react-icons/fa";


const FoodCard = ({ food ,disabledClick = false}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    if (disabledClick) return;
    navigate(`/foods/${food.id}`);
  };

  return (

    <div
      className="food-card"
      onClick={handleClick}
      style={{
        cursor: disabledClick
          ? "pointer"
          : "pointer"
      }}
    >

      {/* Difficulty badge */}

      <div className={`difficulty-badge ${food.difficulty?.toLowerCase()}`}>
        {food.difficulty}
      </div>

      {/* Food image */}

      <img
        src={food.imageUrl}
        alt={food.name}
        className="food-image"
      />

      {/* Food name */}

      <h3 className="food-name">
        {food.name}
      </h3>

      {/* Info section */}

      <div className="food-info">

        <p>

          <FaFire className="icon fire" />

          {food.calories} kcal

        </p>

        <p>

          <FaClock className="icon" />

          {food.cookingTime} min

        </p>

        <p>

          <FaChartBar className="icon" />

          {food.difficulty}

        </p>

      </div>

    </div>

  );
};

export default FoodCard;