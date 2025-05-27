// src/pages/Home.jsx
// src/pages/Home.jsx (VERSÃO ORIGINAL)
import React from "react";
import Equilibrio from "./Equilibrio";
import Sentimentos from "./Sentimentos";
import HabitosSaudaveis from "./HabitosSaudaveis";
import Fogo from "./Fogo";
import Calendar from "./Calendar"; // Certifique-se que este componente existe e o caminho está correto
import "./Home.css"; // Certifique-se que este arquivo existe

const Home = () => {
    console.log("HOME ORIGINAL SENDO RENDERIZADO"); // Adicione este log
    return (
        <div className="home-container">
            <Equilibrio />
            <Sentimentos />
            <HabitosSaudaveis />
            <Fogo/>
            <Calendar/>
        </div>
    );
};

export default Home;