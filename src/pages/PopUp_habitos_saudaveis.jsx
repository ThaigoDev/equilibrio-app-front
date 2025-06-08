// Em PopUp_habitos_saudaveis.jsx
import React, { useState } from "react";
import axios from 'axios';
import "./PopUp_habitos_saudaveis.css";

function PopUpHabitosSaudaveis({ initialData, onClose, onUpdate }) {
    const [agua, setAgua] = useState(initialData?.habits?.waterCups || 0);
    const [exercicio, setExercicio] = useState(initialData?.habits?.exerciseMinutes || 0);
    const [sono, setSono] = useState(initialData?.habits?.sleepMinutes || 0);
    const [peso, setPeso] = useState(initialData?.habits?.weight || 0);
    const [error, setError] = useState('');

    const salvarDados = async () => {
        // ... (a lógica de salvar dados que já fizemos antes continua a mesma)
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
                weight: parseFloat(peso.toFixed(1)), // Garante que o peso seja salvo com uma casa decimal
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
                        <span>💧 Água</span>
                        <div className="counter">
                            <button onClick={() => setAgua(Math.max(0, agua - 1))}>➖</button>
                            <span>{agua}</span>
                            <button onClick={() => setAgua(agua + 1)}>➕</button>
                        </div>
                    </div>

                    {/* --- ITEM EXERCÍCIO (COM ONCLICK CORRIGIDO) --- */}
                    <div className="popup-item">
                        <span>🏃‍♂️ Exercício</span>
                        <div className="counter">
                            <button onClick={() => setExercicio(Math.max(0, exercicio - 1))}>➖</button>
                            <span>{exercicio}</span>
                            <button onClick={() => setExercicio(exercicio + 1)}>➕</button>
                        </div>
                    </div>

                    {/* --- ITEM SONO (COM ONCLICK CORRIGIDO) --- */}
                    <div className="popup-item">
                        <span>🌙 Sono</span>
                        <div className="counter">
                            <button onClick={() => setSono(Math.max(0, sono - 1))}>➖</button>
                            <span>{sono}</span>
                            <button onClick={() => setSono(sono + 1)}>➕</button>
                        </div>
                    </div>

                    {/* --- ITEM PESO (COM ONCLICK CORRIGIDO) --- */}
                    <div className="popup-item">
                        <span>⚖️ Peso</span>
                        <div className="counter">
                             {/* Usamos parseFloat para garantir que a conta com 0.1 funcione bem */}
                            <button onClick={() => setPeso(parseFloat(Math.max(0, peso - 0.1).toFixed(1)))}>➖</button>
                            <span>{peso.toFixed(1)}</span>
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