import React from "react";
import Equilibrio from "./Equilibrio"; // Ajuste o caminho caso necessário
import Sentimentos from "./Sentimentos"; // Certifique-se de ajustar o caminho
import Fogo from "./Fogo";
import "./Home.css";
import Calender from "./calender";

const Home = () => {
    return (
        <div className="home-container">
            {/* Componentes principais */}
            <Equilibrio />
            <Sentimentos />
            <Fogo/>
            <Calender/>

        </div>
    );
};

export default Home;
