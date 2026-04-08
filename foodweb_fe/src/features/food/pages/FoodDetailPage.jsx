import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  FaFire,
  FaClock,
  FaChartBar,
  FaTag,
  FaSpinner,
  FaUsers,
  FaStar,
  FaListUl
} from "react-icons/fa";

import "./FoodDetailPage.css";
import FavoriteButton from "../../favorite/components/FavoriteButton";
import {
  getFoodDetail,
  clearFoodDetail
} from "../foodSlide";

const FoodDetailPage = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    foodDetail,
    status,
    error
  } = useSelector((state) => state.food);

  useEffect(() => {

    dispatch(getFoodDetail(id));

    return () => {
      dispatch(clearFoodDetail());
    };

  }, [dispatch, id]);

  /* Loading */

  if (status === "loading") {

    return (
      <div className="loading-page">

        <FaSpinner className="spin" />

        Loading food detail...

      </div>
    );

  }

  /* Error */

  if (error) {

    return (
      <p className="error">
        {error}
      </p>
    );

  }

  if (!foodDetail) {
    return null;
  }

  return (

    <div className="detail-container">
<FavoriteButton foodId={foodDetail.id} />
      {/* IMAGE */}

      <div className="image-box">

        <img
          src={foodDetail.imageUrl}
          alt={foodDetail.name}
          className="detail-image"
        />

        {/* Difficulty Badge */}

        <div className={`difficulty-badge ${foodDetail.difficulty?.toLowerCase()}`}>
          {foodDetail.difficulty}
        </div>

      </div>

      {/* INFO */}

      <div className="detail-info">

        <h1 className="food-title">
          {foodDetail.name}
        </h1>

        {/* Description */}

        <p className="description">
          {foodDetail.description}
        </p>

        {/* INFO LIST */}

        <div className="info-list">

          <p>

            <FaFire className="icon fire" />

            {foodDetail.calories} kcal

          </p>

          <p>

            <FaClock className="icon" />

            {foodDetail.cookingTime} min

          </p>

          <p>

            <FaUsers className="icon" />

            {foodDetail.servings} servings

          </p>

          <p>

            <FaChartBar className="icon" />

            {foodDetail.difficulty}

          </p>

          <p className="category-tag">

            <FaTag className="icon" />

            {foodDetail.category}

          </p>

          {/* Rating */}

          <p className="rating">

            <FaStar className="icon star" />

            {foodDetail.rating || "N/A"}

          </p>

        </div>

        {/* INGREDIENTS */}

        {foodDetail.ingredients && (

          <div className="ingredients-box">

            <h2>

              <FaListUl /> Ingredients

            </h2>

            <ul>

              {foodDetail.ingredients.map((ing) => (

                <li key={ing.id}>
                  {ing.name}
                </li>

              ))}

            </ul>

          </div>

        )}

        {/* STEPS */}

        {foodDetail.steps && (

          <div className="steps-box">

            <h2>

              <FaListUl /> Cooking Steps

            </h2>

            <ol>

              {foodDetail.steps
                .split("\n")
                .map((step, index) => (

                  <li key={index}>
                    {step}
                  </li>

              ))}

            </ol>

          </div>

        )}

      </div>

    </div>

  );

};

export default FoodDetailPage;