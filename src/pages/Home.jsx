// src/pages/Home.jsx
import React from "react";

import Equilibrio from "./Equilibrio";
import Sentimentos from "./Sentimentos";
import HabitosSaudaveis from "./HabitosSaudaveis";
import Fogo from "./Fogo";
import Calendar from "./Calendar"; // Certifique-se que este componente existe e o caminho está correto
import "./Home.css"; // Certifique-se que este arquivo existe

// Remova o import de Settings daqui se a Settings não for renderizada diretamente na Home,
// mas sim acessada via rota. Pela sua descrição, ela será acessada via rota.
// import Settings from "./Settings"; // <--- REMOVA ESTA LINHA SE VOCÊ SÓ QUER REDIRECIONAR

const Home = () => {
    console.log("HOME ORIGINAL SENDO RENDERIZADO"); // Adicione este log



    return (
        <div className="home-container">
            {/* Adicione o botão de configurações aqui.
                Você pode estilizar este botão com CSS em Home.css para posicioná-lo.
                Por exemplo, no canto superior direito. */}
      
            <Equilibrio />
            <Sentimentos />
            <HabitosSaudaveis />
            <Fogo/>
            <Calendar/>
            
        </div>
    );
};

export default Home;