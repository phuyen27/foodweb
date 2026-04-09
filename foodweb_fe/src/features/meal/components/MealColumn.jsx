import React, { useState } from "react";

import MealItemCard from "./MealItemCard";
import AddMealModal from "./AddMealModal";

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

      <h3>
        {title}
      </h3>


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
        <span>+</span> Add Food
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