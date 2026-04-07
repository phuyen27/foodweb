import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './FoodDetailPage.css';
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

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!foodDetail) {
    return null;
  }

  return (
    <div className="detail-container">

      <img
        src={foodDetail.imageUrl}
        alt={foodDetail.name}
        className="detail-image"
      />

      <h1>
        {foodDetail.name}
      </h1>

      <p>
        🔥 {foodDetail.calories} kcal
      </p>

      <p>
        ⏱️ {foodDetail.cookingTime} min
      </p>

      <p>
        📊 {foodDetail.difficulty}
      </p>

      <p>
        🏷️ {foodDetail.category}
      </p>

    </div>
  );
};

export default FoodDetailPage;