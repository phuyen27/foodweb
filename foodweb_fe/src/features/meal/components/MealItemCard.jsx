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

      <p>
        {item.foodName}
      </p>

      {item.note && (
        <small>
          {item.note}
        </small>
      )}

      <button
        className="delete-btn"
        onClick={handleDelete}
      >
        ❌
      </button>

    </div>

  );

};

export default MealItemCard;