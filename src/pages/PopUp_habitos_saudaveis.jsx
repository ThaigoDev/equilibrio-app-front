// Em PopUp_habitos_saudaveis.jsx
import React, { useState } from "react";
import axios from 'axios';
import "./PopUp_habitos_saudaveis.css";

// Importar as imagens dos hábitos
import aguaIcon from '../images/agua.png';
import exercicioIcon from '../images/exercicio.png';
import sonoIcon from '../images/sono.png';
import pesoIcon from '../images/peso.png';

function PopUpHabitosSaudaveis({ initialData, onClose, onUpdate }) {
    const [agua, setAgua] = useState(initialData?.habits?.waterCups || 0);
    const [exercicio, setExercicio] = useState(initialData?.habits?.exerciseMinutes || 0);
    const [sono, setSono] = useState(initialData?.habits?.sleepMinutes || 0);
    const [peso, setPeso] = useState(initialData?.habits?.weight || 0);
    const [error, setError] = useState('');

    const handleAguaChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setAgua(isNaN(value) ? 0 : Math.max(0, value));
    };

    const handleExercicioChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setExercicio(isNaN(value) ? 0 : Math.max(0, value));
    };

    const handleSonoChange = (e) => { // Corrigido para sono
        const value = parseInt(e.target.value, 10);
        setSono(isNaN(value) ? 0 : Math.max(0, value));
    };

    const handlePesoChange = (e) => {
        const value = parseFloat(e.target.value);
        setPeso(isNaN(value) ? 0 : parseFloat(Math.max(0, value).toFixed(1)));
    };

    const salvarDados = async () => {
        const userId = localStorage.getItem('equilibrioAuthToken');
        setError('');
        const dailyEntryData = {
            user: userId,
            date: new Date().toISOString().split('T')[0],
            mood: initialData?.mood || 'neutral',
            note: initialData?.note || '',
            habits: {
                waterCups: agua,
                exerciseMinutes: exercicio,
                sleepMinutes: sono,
                weight: parseFloat(peso.toFixed(1)),
            },
        };
        try {
            await axios.post('https://equilibrio-api-node.onrender.com/api/daily-entry/create', dailyEntryData);
            onUpdate();
            onClose();
        } catch (err) {
            console.error("Erro ao salvar hábitos:", err);
            setError("Não foi possível salvar. Tente novamente.");
        }
    };

    return (
        <div className="overlay-popup" onClick={onClose}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                <div className="popup-header">
                    <h4>HÁBITOS SAUDÁVEIS</h4>
                    <button className="fechar-button" onClick={onClose} aria-label="Fechar popup">✕</button>
                </div>

                <div className="popup-info">
                    {/* --- ITEM ÁGUA --- */}
                    <div className="popup-item">
                        {/* Substituído o emoji pela imagem */}
                        <div className="popup-item-label">
                            <img src={aguaIcon} alt="Ícone água" className="popup-habit-icon" />
                            <span>Água</span>
                        </div>
                        <div className="counter">
                            <button onClick={() => setAgua(Math.max(0, agua - 1))}>➖</button>
                            <input
                                type="number"
                                value={agua}
                                onChange={handleAguaChange}
                                min="0"
                            />
                            <button onClick={() => setAgua(agua + 1)}>➕</button>
                        </div>
                    </div>

                    {/* --- ITEM EXERCÍCIO --- */}
                    <div className="popup-item">
                        {/* Substituído o emoji pela imagem */}
                        <div className="popup-item-label">
                            <img src={exercicioIcon} alt="Ícone exercício" className="popup-habit-icon" />
                            <span>Exercício</span>
                        </div>
                        <div className="counter">
                            <button onClick={() => setExercicio(Math.max(0, exercicio - 1))}>➖</button>
                            <input
                                type="number"
                                value={exercicio}
                                onChange={handleExercicioChange}
                                min="0"
                            />
                            <button onClick={() => setExercicio(exercicio + 1)}>➕</button>
                        </div>
                    </div>

                    {/* --- ITEM SONO --- */}
                    <div className="popup-item">
                        {/* Substituído o emoji pela imagem */}
                        <div className="popup-item-label">
                            <img src={sonoIcon} alt="Ícone sono" className="popup-habit-icon" />
                            <span>Sono</span>
                        </div>
                        <div className="counter">
                            <button onClick={() => setSono(Math.max(0, sono - 1))}>➖</button>
                            <input
                                type="number"
                                value={sono}
                                onChange={handleSonoChange} // Corrigido para handleSonoChange
                                min="0"
                            />
                            <button onClick={() => setSono(sono + 1)}>➕</button>
                        </div>
                    </div>

                    {/* --- ITEM PESO --- */}
                    <div className="popup-item">
                        {/* Substituído o emoji pela imagem */}
                        <div className="popup-item-label">
                            <img src={pesoIcon} alt="Ícone peso" className="popup-habit-icon" />
                            <span>Peso</span>
                        </div>
                        <div className="counter">
                            <button onClick={() => setPeso(parseFloat(Math.max(0, peso - 0.1).toFixed(1)))}>➖</button>
                            <input
                                type="number"
                                step="0.1"
                                value={peso.toFixed(1)}
                                onChange={handlePesoChange}
                                min="0"
                            />
                            <button onClick={() => setPeso(parseFloat((peso + 0.1).toFixed(1)))}>➕</button>
                        </div>
                    </div>

                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    <button className="salvar-button" onClick={salvarDados}>Salvar</button>
                </div>
            </div>
        </div>
    );
}

export default PopUpHabitosSaudaveis;