import React from "react";
import Equilibrio from "./Equilibrio"; // Ajuste o caminho caso necessário
import Sentimentos from "./Sentimentos"; // Certifique-se de ajustar o caminho
import HabitosSaudaveis from "./HabitosSaudaveis"; // Componente de hábitos saudáveis
import "./Home.css";

const Home = () => {
    return (
        <div className="home-container">
            {/* Componentes principais */}
            <Equilibrio />
            <Sentimentos />
            
            {/* Componente de Hábitos Saudáveis */}
            <HabitosSaudaveis />
        </div>
    );
};

export default Home;
