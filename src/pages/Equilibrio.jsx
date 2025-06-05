// src/pages/Equilibrio.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // TEM QUE ESTAR AQUI
import "./Settings"

import "./Equilibrio.css";

const Equilibrio = () => {
    const navigate = useNavigate(); // TEM QUE ESTAR AQUI

    const handleSettingsClick = () => {
        console.log("CLICADO NA ENGRENAGEM DO EQUILIBRIO! Tentando navegar para /Settings"); // ESTE LOG
        navigate("/Settings"); // COM 'S' MAIÚSCULO
    };

    console.log("Componente Equilibrio sendo renderizado."); // ESTE LOG

    return (
        <div className="equilibrio-container">
            <div className="circle"></div>
            <span className="text">Equilíbrio</span>
            <button
                className="gear-button"
                onClick={handleSettingsClick} // <--- ESTE ONCLICK É AQUI!
                title="Configurações"
            >
                {/* Conteúdo do botão (vazio ou <img>/SVG se houver) */}
            </button>
        </div>
    );
};

export default Equilibrio;