import React from "react";

import {
  FaFire,
  FaClock,
  FaUsers,
  FaChartBar,
  FaTag,
  FaListUl
} from "react-icons/fa";

import "./GeneratedFoodDetail.css";

const GeneratedFoodDetail = ({ food }) => {

  if (!food) return null;

  return (

    <div className="generated-food">

      {/* IMAGE */}

      <div className="generated-image-box">

        <img
          src={food.imageUrl}
          alt={food.name}
        />

        <span className={`difficulty-badge ${food.difficulty}`}>
          {food.difficulty}
        </span>

      </div>

      {/* TITLE */}

      <h2 className="generated-title">
        {food.name}
      </h2>

      {/* INFO */}

      <div className="generated-info">

        <p>
          <FaFire /> {food.calories} kcal
        </p>

        <p>
          <FaClock /> {food.cookingTime} min
        </p>

        <p>
          <FaUsers /> {food.servings} servings
        </p>

        <p>
          <FaChartBar /> {food.difficulty}
        </p>

        <p>
          <FaTag /> {food.category}
        </p>

      </div>

      {/* DESCRIPTION */}

      <p className="generated-description">
        {food.description}
      </p>

      {/* INGREDIENTS */}

      {food.ingredients && (

        <div className="generated-section">

          <h3>
            <FaListUl />
            Ingredients
          </h3>

          <ul>

            {food.ingredients.map((ing, i) => (

              <li key={i}>

                <span>
                  {ing.name}
                </span>

                {ing.quantity && (

                  <span className="qty">
                    {ing.quantity}
                  </span>

                )}

              </li>

            ))}

          </ul>

        </div>

      )}

      {/* STEPS */}

      {food.steps && (

        <div className="generated-section">

          <h3>
            <FaListUl />
            Cooking Steps
          </h3>

          <ol>

            {food.steps
              .split("\n")
              .map((step, i) => (

                <li key={i}>
                  {step}
                </li>

              ))}

          </ol>

        </div>

      )}

    </div>

  );

};

export default GeneratedFoodDetail;