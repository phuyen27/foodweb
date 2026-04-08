import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getFoodList
} from "../../food/foodSlice";

import FoodCard from "../../food/components/FoodCard";

import {
  addMealItem,
  getMealPlan
} from "../mealSlice";

const AddMealModal = ({
  mealType,
  date,
  onClose
}) => {

  const dispatch = useDispatch();

  const { foodList } =
    useSelector(state => state.food);


  useEffect(() => {

    dispatch(
      getFoodList()
    );

  }, [dispatch]);


  // ======================
  // ADD FOOD
  // ======================

  const handleAddFood = (
    foodId
  ) => {

    const data = {

      foodId,
      mealType,
      date

    };

    dispatch(
      addMealItem(data)
    ).then(() => {

      dispatch(
        getMealPlan(date)
      );

      onClose();

    });

  };


  return (

    <div className="modal">

      <div className="modal-content">

        <h3>
          Select Food
        </h3>

        <div className="food-grid">

          {foodList.map(food => (

            <div
              key={food.id}
              onClick={() =>
                handleAddFood(
                  food.id
                )
              }
            >

              <FoodCard
                food={food}
              />

            </div>

          ))}

        </div>

        <button
          onClick={onClose}
        >
          Close
        </button>

      </div>

    </div>

  );

};

export default AddMealModal;