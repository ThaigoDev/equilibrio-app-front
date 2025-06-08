// src/pages/Fogo.jsx
import React from "react"; // Adicione o import do React, embora não seja estritamente necessário para este componente funcional simples, é uma boa prática.
import "./Fogo.css";

// Importe as imagens
import fogoForte from "../images/fogo forte.png";
import fogoAcesso from "../images/fogo acesso.png";
import fogoApagado from "../images/fogo apagado.png";

function Fogo({ streakCount }) {
    const Ofensiva = 7;
    const feito = streakCount || 0;
    const valor = (feito / Ofensiva) * 100;

    let imagemFogo;
    let corBarra;

    if (valor >= 100) {
        imagemFogo = fogoForte; // Use a variável importada
        corBarra = { backgroundColor: '#FF6347' }; // Cor para 100% (vermelho/laranja forte)
    } else if (valor > 0) { // Alterado para > 0 para pegar qualquer streak maior que zero,
                          // se 10% for a intenção mínima de "acesso" (streak de 1 dia), manter valor >= 10.
                          // Se a intenção for acender o fogo para qualquer streak > 0, esta é mais explícita.
        imagemFogo = fogoAcesso; // Use a variável importada
        corBarra = { backgroundColor: '#FF8C00' }; // Cor para streak ativo (laranja)
    } else { // Se o streak for 0
        imagemFogo = fogoApagado; // Use a variável importada
        corBarra = { backgroundColor: '#A9A9A9' }; // Cor para streak apagado (cinza)
    }

    return (
        <div className="fogo-corpo">
            <h1>Ofensiva</h1>
            <div className="fogo-caixa">
                <div className="fogo-imagen" style={{ '--porcentagem': `${valor}%` }}>
                    <img src={imagemFogo} alt="Ícone de Fogo" />
                </div>
                <div className="caixa-barra">
                    <div className="barra" style={{ ...corBarra, width: `${valor}%` }}></div>
                </div>
            </div>
            <div className="dias">
                <h3>{feito}/{Ofensiva} dias</h3>
            </div>
        </div>
    );
}

export default Fogo;