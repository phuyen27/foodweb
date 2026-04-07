import React, { useState } from "react";

import {
  FaUtensils
} from "react-icons/fa";

import {
  GiNoodles,
  GiPizzaSlice,
  GiFruitBowl,
  GiCupcake
} from "react-icons/gi";

/* Category list */

const categories = [
  {
    name: "Vietnamese",
    icon: <GiNoodles />
  },
  {
    name: "Italian",
    icon: <GiPizzaSlice />
  },
  {
    name: "Healthy",
    icon: <GiFruitBowl />
  },
  {
    name: "Dessert",
    icon: <GiCupcake />
  }
];

const CategoryFilter = ({ onSelectCategory }) => {

  const [active, setActive] = useState("");

  const handleClick = (category) => {

    setActive(category);

    onSelectCategory(category);

  };

  return (

    <div className="category-box">

      {/* All */}

      <button
        className={`category-btn ${
          active === "" ? "active" : ""
        }`}
        onClick={() => handleClick("")}
      >

        <FaUtensils />

        All

      </button>

      {/* Categories */}

      {categories.map((cat) => (

        <button
          key={cat.name}
          className={`category-btn ${
            active === cat.name
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleClick(cat.name)
          }
        >

          {cat.icon}

          {cat.name}

        </button>

      ))}

    </div>

  );
};

export default CategoryFilter;