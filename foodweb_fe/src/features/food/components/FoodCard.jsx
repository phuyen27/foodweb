import React from "react";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ food }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/foods/${food.id}`);
  };

  return (
    <div
      className="food-card"
      onClick={handleClick}
    >

      <img
        src={food.imageUrl}
        alt={food.name}
      />

      <h3>
        {food.name}
      </h3>

      <p>
        🔥 {food.calories} kcal
      </p>

      <p>
        ⏱️ {food.cookingTime} min
      </p>

      <p>
        📊 {food.difficulty}
      </p>

    </div>
  );
};

export default FoodCard;