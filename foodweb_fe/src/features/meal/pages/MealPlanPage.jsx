import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getMealPlan
} from "../mealSlice";

import MealColumn from "../components/MealColumn";

import "./MealPlanPage.css";

// import icon từ react-icons
import {
  FaUtensils,
  FaSun,
  FaCloudSun,
  FaMoon
} from "react-icons/fa";

const MealPlanPage = () => {

  const dispatch = useDispatch();

  const { mealPlan, loading } =
    useSelector(state => state.meal);

  const [selectedDate, setSelectedDate] =
    useState(() => {
      return new Date()
        .toISOString()
        .split("T")[0];
    });

  useEffect(() => {
    dispatch(
      getMealPlan(selectedDate)
    );
  }, [dispatch, selectedDate]); 

  const handleDateChange = (e) => {
    setSelectedDate(
      e.target.value
    );
  };

  return (
    <div className="meal-page">
      <div className="meal-header">
        <h2>
          <FaUtensils className="meal-icon" /> 
          Meal Planner
        </h2>

        <div className="date-selector">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      </div>

      {loading && (
        <div className="loading-state">
          <p>Cooking up your plan...</p>
        </div>
      )}

      <p className="recommend-link">
        Still don't know what to order?
        <Link to="/recommendations">
          Recommended Meals
        </Link>
      </p>

      {mealPlan && (
        <div className="meal-columns">

          <MealColumn
            title={
              <>
                <FaCloudSun /> Breakfast
              </>
            }
            mealType="Breakfast"
            items={mealPlan.breakfast || []}
            date={selectedDate}
          />

          <MealColumn
            title={
              <>
                <FaSun /> Lunch
              </>
            }
            mealType="Lunch"
            items={mealPlan.lunch || []}
            date={selectedDate}
          />

          <MealColumn
            title={
              <>
                <FaMoon /> Dinner
              </>
            }
            mealType="Dinner"
            items={mealPlan.dinner || []}
            date={selectedDate}
          />

        </div>
      )}
    </div>
  );
};

export default MealPlanPage;