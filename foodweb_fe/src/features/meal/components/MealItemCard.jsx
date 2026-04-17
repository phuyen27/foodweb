import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  deleteMealItem,
  getMealPlan
} from "../mealSlice";

import {
  FaStickyNote,
  FaTimes
} from "react-icons/fa";

const MealItemCard = ({
  item,
  date
}) => {

  const dispatch = useDispatch();

  // ======================
  // DELETE
  // ======================

  const handleDelete = (e) => {

    // Ngăn click lan sang Link
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      deleteMealItem(item.id)
    ).then(() => {

      dispatch(
        getMealPlan(date)
      );

    });

  };

  return (

    <Link
      to={`/foods/${item.foodId}`}
      className="meal-item-link"
    >

      <div className="meal-item">

        {/* IMAGE */}

        <img
          src={item.imageUrl}
          alt={item.foodName}
          className="meal-item-image"
        />

        {/* INFO */}

        <div className="meal-item-info">

          <p className="meal-food-name">
            {item.foodName}
          </p>

          {/* NOTE (đã bỏ nutrition hoàn toàn) */}

          {item.note && (

            <small className="item-note">

              <FaStickyNote className="note-icon" />

              {item.note}

            </small>

          )}

        </div>

        {/* DELETE BUTTON */}

        <button
          className="delete-btn"
          onClick={handleDelete}
          title="Remove from plan"
        >

          <FaTimes />

        </button>

      </div>

    </Link>

  );

};

export default MealItemCard;