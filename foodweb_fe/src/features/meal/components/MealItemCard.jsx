import React from "react";
import { useDispatch } from "react-redux";

import {
  deleteMealItem,
  getMealPlan
} from "../mealSlice";

const MealItemCard = ({
  item,
  date
}) => {

  const dispatch = useDispatch();


  // ======================
  // DELETE
  // ======================

  const handleDelete = () => {

    dispatch(
      deleteMealItem(item.id)
    ).then(() => {

      dispatch(
        getMealPlan(date)
      );

    });

  };


  return (

    <div className="meal-item">
      <img
        src={item.imageUrl}
        alt={item.foodName}
      />

      <div className="meal-item-info">
        <p>{item.foodName}</p>
        <small>
          {item.calories ? `${item.calories} kcal` : "No nutrition info"}
        </small>
        {item.note && (
          <small className="item-note">
            📝 {item.note}
          </small>
        )}
      </div>

      <button
        className="delete-btn"
        onClick={handleDelete}
        title="Remove from plan"
      >
        ✕
      </button>
    </div>

  );

};

export default MealItemCard;