import React from "react";
import Equilibrio from "./Equilibrio"; // Ajuste o caminho caso necessário
import Sentimentos from "./Sentimentos"; // Certifique-se de ajustar o caminho
import Fogo from "./Fogo";
import "./Home.css";

const Home = () => {
    return (
        <div className="home-container">
            {/* Componentes principais */}
            <Equilibrio />
            <Sentimentos />
            <Fogo/>
            
         

        </div>
    );
};

export default Home;
