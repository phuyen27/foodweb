import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./BackButton.css";

const BackButton = ({ label = "Back", to }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button className="back-button" onClick={handleBack}>
      <FaArrowLeft />
      {label}
    </button>
  );
};

export default BackButton;