import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getMealPlan
} from "../mealSlice";

import MealColumn from "../components/MealColumn";

import "./MealPlanPage.css";

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
    ); };

  return (
    <div className="meal-page">
      <div className="meal-header">
        <h2>
          <span>🍽️</span> Meal Planner
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

      {mealPlan && (
        <div className="meal-columns">
          <MealColumn
            title="🌅 Breakfast"
            mealType="Breakfast"
            items={mealPlan.breakfast || []}
            date={selectedDate}
          />

          <MealColumn
            title="☀️ Lunch"
            mealType="Lunch"
            items={mealPlan.lunch || []}
            date={selectedDate}
          />

          <MealColumn
            title="🌙 Dinner"
            mealType="Dinner"
            items={mealPlan.dinner || []}
            date={selectedDate}
          />
        </div>
      )}
    </div>
  );};

export default MealPlanPage;