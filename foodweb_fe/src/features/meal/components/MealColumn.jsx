import React, { useState } from "react";

import MealItemCard from "./MealItemCard";
import AddMealModal from "./AddMealModal";

import { FaPlus } from "react-icons/fa";

const MealColumn = ({
  title,
  mealType,
  items,
  date
}) => {

  const [openModal, setOpenModal] =
    useState(false);

  return (

    <div className="meal-column">

      {/* TITLE */}

      <h3 className="meal-column-title">
        {title}
      </h3>

      {/* EMPTY STATE */}

      {items.length === 0 && (

        <div className="empty-meal">

          <FaPlus className="empty-icon" />

          <p>No meals added</p>

        </div>

      )}

      {/* ITEMS */}

      {items.map(item => (

        <MealItemCard
          key={item.id}
          item={item}
          date={date}
        />

      ))}

      {/* ADD BUTTON */}

      <button
        className="add-meal-btn"
        onClick={() => setOpenModal(true)}
      >
        <FaPlus />
        Add Food
      </button>

      {/* MODAL */}

      {openModal && (

        <AddMealModal
          mealType={mealType}
          date={date}
          onClose={() =>
            setOpenModal(false)
          }
        />

      )}

    </div>

  );

};

export default MealColumn;