// src/pages/HabitosSaudaveis.jsx
import React from 'react';
import './HabitosSaudaveis.css';

import aguaIcon from '../images/agua.png';
import exercicioIcon from '../images/exercicio.png';
import sonoIcon from '../images/sono.png';
import pesoIcon from '../images/peso.png';

// O componente agora recebe 'habitsData' como prop
const HabitosSaudaveis = ({ habitsData }) => {
    // Dados padrão caso não venha nada do backend ainda
    const habitos = {
        waterCups: habitsData?.waterCups ?? 0,
        exerciseMinutes: habitsData?.exerciseMinutes ?? 0,
        sleepMinutes: habitsData?.sleepMinutes ?? 0,
        weight: habitsData?.weight ?? 0,
    };

    // Metas (ainda podem ser estáticas aqui ou vir das configurações no futuro)
    const metas = {
        agua: 8,
        exercicio: 30, // Meta do backend é 30 min
        sono: 420, // Meta do backend é 7h = 420 min
        peso: 70.0 // Exemplo de meta de peso
    };

    return (
        <div className="habitos-container">
            <h2 className="habitos-titulo">Hábitos saudáveis</h2>
            
            <div className="habitos-box">
                {/* --- ESTRUTURA COMPLETA PARA ÁGUA --- */}
                <div className="habito-item">
                    <div className="habito-info">
                        <img src={aguaIcon} alt="Ícone água" className="habito-icon" />
                        <span className="habito-nome">Água</span>
                    </div>
                    <span className="habito-valor">
                        {habitos.waterCups} / {metas.agua} copos
                    </span>
                </div>

                {/* --- ESTRUTURA COMPLETA PARA EXERCÍCIO --- */}
                <div className="habito-item">
                    <div className="habito-info">
                        <img src={exercicioIcon} alt="Ícone exercício" className="habito-icon" />
                        <span className="habito-nome">Exercício</span>
                    </div>
                    <span className="habito-valor">
                        {habitos.exerciseMinutes} / {metas.exercicio} min
                    </span>
                </div>

                {/* --- ESTRUTURA COMPLETA PARA SONO --- */}
                <div className="habito-item">
                    <div className="habito-info">
                        <img src={sonoIcon} alt="Ícone sono" className="habito-icon" />
                        <span className="habito-nome">Sono</span>
                    </div>
                    <span className="habito-valor">
                        {habitos.sleepMinutes} / {metas.sono} min
                    </span>
                </div>

                {/* --- ESTRUTURA COMPLETA PARA PESO --- */}
                <div className="habito-item">
                    <div className="habito-info">
                        <img src={pesoIcon} alt="Ícone peso" className="habito-icon" />
                        <span className="habito-nome">Peso</span>
                    </div>
                    <span className="habito-valor">
                        {habitos.weight} / {metas.peso} kg
                    </span>
                </div>
            </div>
        </div>
    );
};

export default HabitosSaudaveis;