import React from "react";
import { useNavigate } from "react-router-dom";
import "./Equilibrio.css";
import Logo from "../../src/images/logo-equilibrio.png"
const Equilibrio = () => {
  const navigate = useNavigate();

  return (
    <div className="equilibrio-container">
      <div className="circle"><img src={Logo} alt="" /></div>
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
