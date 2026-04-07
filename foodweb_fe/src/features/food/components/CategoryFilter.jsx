import React from "react";

const categories = [
  "Vietnamese",
  "Italian",
  "Healthy",
  "Dessert"
];

const CategoryFilter = ({ onSelectCategory }) => {

  return (
    <div className="category-box">

      {categories.map((cat) => (

        <button
          key={cat}
          onClick={() =>
            onSelectCategory(cat)
          }
        >
          {cat}
        </button>

      ))}

      <button
        onClick={() =>
          onSelectCategory("")
        }
      >
        All
      </button>

    </div>
  );
};

export default CategoryFilter;