import React from "react";
import "./Equilibrio.css";

const Equilibrio = () => {
  return (
    <div className="equilibrio-container">
      <div className="circle"></div>
      <span className="text">Equilíbrio</span>
      <button
        className="gear-button"
        onClick={() => alert("Configurações clicadas!")}
      ></button>
    </div>
  );
};

export default Equilibrio;
