import React from "react";
import { useNavigate } from "react-router-dom";
import "./Equilibrio.css";

const Equilibrio = () => {
  const navigate = useNavigate();

  return (
    <div className="equilibrio-container">
      <div className="circle"></div>
      <span className="text">Equilíbrio</span>
      <button
        className="gear-button"
        onClick={() => navigate("/settings")}
      >
      </button>
    </div>
  );
};

export default Equilibrio;
