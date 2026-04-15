import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getPreference,
  savePreference
} from "../preferenceSlice";

import "./PreferencePage.css";

const PreferencePage = () => {

  const dispatch = useDispatch();

  const user =
    useSelector(state => state.auth.user);

  const { preference } =
    useSelector(state => state.preference);

  const [dietType, setDietType] =
    useState("normal");

  const [spicyLevel, setSpicyLevel] =
    useState("low");

  useEffect(() => {

    if (user?.id) {

      dispatch(
        getPreference(user.id)
      );

    }

  }, [user]);

  useEffect(() => {

    if (preference) {

      setDietType(
        preference.dietType
      );

      setSpicyLevel(
        preference.spicyLevel
      );

    }

  }, [preference]);

  const handleSave = () => {

    dispatch(
      savePreference({

        userId: user.id,
        dietType,
        spicyLevel

      })
    );

  };

  return (

    <div className="preference-container">

      <h1>

        User Preferences

      </h1>

      {/* DIET */}

      <div className="section">

        <h2>

          Diet Type

        </h2>

        {[
          "normal",
          "vegetarian",
          "vegan",
          "keto"
        ].map(type => (

          <label key={type}>

            <input
              type="radio"
              name="diet"
              value={type}
              checked={
                dietType === type
              }
              onChange={(e) =>
                setDietType(
                  e.target.value
                )
              }
            />

            {type}

          </label>

        ))}

      </div>

      {/* SPICY */}

      <div className="section">

        <h2>

          Spicy Level

        </h2>

        {[
          "low",
          "medium",
          "high"
        ].map(level => (

          <label key={level}>

            <input
              type="radio"
              name="spicy"
              value={level}
              checked={
                spicyLevel === level
              }
              onChange={(e) =>
                setSpicyLevel(
                  e.target.value
                )
              }
            />

            {level}

          </label>

        ))}

      </div>

      {/* BUTTON */}

      <button
        className="save-btn"
        onClick={handleSave}
      >

        Save Preferences

      </button>

    </div>

  );

};

export default PreferencePage;