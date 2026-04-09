import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getFoodList,
  searchFood,
  getFoodCategory
} from "../../food/foodSlice";

import FoodCard from "../../food/components/FoodCard";
import SearchBar from "../../food/components/SearchBar";
import CategoryFilter from "../../food/components/CategoryFilter";

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

  const {
    foodList,
    searchResults,
    categoryResults,
    status
  } = useSelector(state => state.food);

  const [useSearch, setUseSearch] = useState(false);
  const [useCategory, setUseCategory] = useState(false);

  const [selectedFood, setSelectedFood] = useState(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    dispatch(getFoodList());
  }, [dispatch]);

  // SEARCH
  const handleSearch = (keyword) => {

    if (keyword.trim()) {

      setUseSearch(true);
      setUseCategory(false);

      dispatch(searchFood(keyword));

    } else {

      setUseSearch(false);

    }

  };

  // CATEGORY
  const handleCategorySelect = (category) => {

    if (category) {

      setUseCategory(true);
      setUseSearch(false);

      dispatch(getFoodCategory(category));

    } else {

      setUseCategory(false);

    }

  };

  // ADD FOOD
  const handleAddFood = () => {

    if (!selectedFood) return;

    const data = {
      foodId: selectedFood.id,
      mealType,
      date,
      note
    };

    dispatch(addMealItem(data))
      .unwrap()
      .then(() => {

        dispatch(getMealPlan(date));

        setSelectedFood(null);
        setNote("");

        onClose();

      });

  };

  // DISPLAY LIST
  let displayList = foodList;

  if (useSearch) displayList = searchResults;
  else if (useCategory) displayList = categoryResults;

  return ReactDOM.createPortal(

    <div
      className="modal-overlay"
      onClick={onClose}
    >

      {/* MAIN MODAL */}
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}
        <div className="modal-header">

          <h3>
            Add to {mealType}
          </h3>

          <div className="modal-search-section">

            <SearchBar onSearch={handleSearch} />

            <CategoryFilter
              onSelectCategory={handleCategorySelect}
            />

          </div>

        </div>

        {/* BODY */}
        <div className="modal-body">

          {status ? (

            <div className="loading-state">
              Searching delicious meals...
            </div>

          ) : displayList.length > 0 ? (

            <div className="food-grid">

              {displayList.map(food => (

                <div
                  key={food.id}
                  className="food-item-wrapper"
                  onClick={() =>
                    setSelectedFood(food)
                  }
                >

                  <FoodCard
                    food={food}
                    disabledClick={true}
                  />

                </div>

              ))}

            </div>

          ) : (

            <div className="no-results">

              <p>
                No food items found.
                Try another search! 🥗
              </p>

            </div>

          )}

        </div>

        {/* FOOTER */}
        <div className="modal-footer">

          <button
            className="close-modal-btn"
            onClick={onClose}
          >
            Cancel
          </button>

        </div>

      </div>

      {/* MINI NOTE MODAL */}
      {selectedFood && (

        <div
          className="note-mini-overlay"
          onClick={() => {

            setSelectedFood(null);
            setNote("");

          }}
        >

          <div
            className="note-mini-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <h4>
              Add "{selectedFood.name}"
            </h4>

            <textarea
              placeholder="Add note (optional)..."
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
              className="note-textarea"
            />

            <div className="note-actions">

              <button
                className="cancel-btn"
                onClick={() => {

                  setSelectedFood(null);
                  setNote("");

                }}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={handleAddFood}
              >
                Add to {mealType}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>,

    document.body

  );

};

export default AddMealModal;