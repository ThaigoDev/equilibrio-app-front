// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // <--- Importe useNavigate

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
    const navigate = useNavigate(); // <--- Inicialize useNavigate

    const handleSettingsRedirect = () => {
        console.log("Botão de Configurações da Home clicado! Redirecionando para /Settings");
        navigate("/Settings"); // <--- Redireciona para a rota /Settings (com S maiúsculo)
    };

    return (
        <div className="home-container">
            {/* Adicione o botão de configurações aqui.
                Você pode estilizar este botão com CSS em Home.css para posicioná-lo.
                Por exemplo, no canto superior direito. */}
            <button
                onClick={handleSettingsRedirect}
                style={{
                    position: 'absolute', // Exemplo de estilo para posicionar
                    top: '20px',
                    right: '20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '28px', // Ajuste o tamanho do ícone
                    color: '#333',
                    zIndex: 10 // Garante que esteja acima de outros elementos se necessário
                }}
                title="Configurações"
            >
                ⚙️ {/* Ícone de engrenagem Unicode. Se tiver uma biblioteca de ícones (Font Awesome, Material-UI), use o ícone dela aqui. */}
            </button>

            <Equilibrio />
            <Sentimentos />
            <HabitosSaudaveis />
            <Fogo/>
            <Calendar/>
            
        </div>
    );
};

export default Home;