import React, { useEffect }
  from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  getHistory
} from "../historySlice";

import {
  getFoodList
} from "../../food/foodSlice";

import FoodCard
  from "../../food/components/FoodCard";

import "./HistoryPage.css";

function HistoryPage() {

  const dispatch = useDispatch();

  const {
    history,
    loading
  } = useSelector(
    state => state.history
  );

  const foods =
    useSelector(
      state => state.food.foodList
    );

  useEffect(() => {
dispatch(getFoodList());
    dispatch(getHistory());

  }, [dispatch]);

  if (loading)
    return <p>Loading...</p>;

  return (

    <div className="history-page">

      <h2>
        Your Food History 🍱
      </h2>

      <div className="history-list">

        {history.map(item => {

          const food =
            foods.find(
              f =>
                f.id === item.foodId
            );

          if (!food)
            return null;

          return (

            <div
              key={item.id}
              className="history-item"
            >

              <FoodCard
                food={food}
              />

              <div className="history-meta">

                <p>
                  Action:
                  <b>
                    {item.action}
                  </b>
                </p>

                <p>
                  Time:
                  {new Date(
                    item.createdAt
                  ).toLocaleString()}
                </p>

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}

export default HistoryPage;