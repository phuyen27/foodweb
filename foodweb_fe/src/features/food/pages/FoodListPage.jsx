import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getFoodList,
  searchFood,
  getFoodCategory
} from "../foodSlide";

import FoodCard from "../components/FoodCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

import "./FoodListPage.css";

const FoodListPage = () => {

  const dispatch = useDispatch();

  const {
    foodList,
    searchResults,
    categoryResults,
    status,
    error
  } = useSelector((state) => state.food);

  // load all food khi mở page
  useEffect(() => {
    dispatch(getFoodList());
  }, [dispatch]);

  // search
  const handleSearch = (keyword) => {

    if (!keyword.trim()) {
      dispatch(getFoodList());
    } else {
      dispatch(searchFood(keyword));
    }

  };

  // filter category
  const handleCategory = (category) => {

    if (!category) {
      dispatch(getFoodList());
    } else {
      dispatch(getFoodCategory(category));
    }

  };

  // chọn list để hiển thị
  let foodsToShow = foodList;

  if (searchResults.length > 0) {
    foodsToShow = searchResults;
  }

  if (categoryResults.length > 0) {
    foodsToShow = categoryResults;
  }

  return (
    <div className="container">

      <h1 className="title">
        🍽️ Food List
      </h1>

      <SearchBar
        onSearch={handleSearch}
      />

      <CategoryFilter
        onSelectCategory={handleCategory}
      />

      {status === "loading" && (
        <p>Loading...</p>
      )}

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      <div className="food-grid">

        {foodsToShow.map((food) => (

          <FoodCard
            key={food.id}
            food={food}
          />

        ))}

      </div>

    </div>
  );
};

export default FoodListPage;