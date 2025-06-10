import React, { useState } from 'react';
import './PopUp_Calendario_emocional.css'; 
import PopUpHabitosSaudaveis from './PopUp_habitos_saudaveis';

const PopUp_Calendario_emocional = ({ date, entryData, onClose, userId }) => {
    const [showHabitsPopup, setShowHabitsPopup] = useState(false);

    // --- CORREÇÃO APLICADA AQUI ---
    // Verificamos se 'date' é um valor válido. Se não for, usamos a data de hoje como padrão.
    const dateToDisplay = date && !isNaN(new Date(date)) ? new Date(date) : new Date();

    const formattedDisplayDate = new Intl.DateTimeFormat('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
    }).format(dateToDisplay);

    // Lendo os dados da estrutura correta da API
    const note = entryData?.note || "Nenhum texto adicionado para este dia.";
    const mood = entryData?.mood || 'neutral';
    const water = entryData?.habits?.waterCups || 0;
    const exercise = entryData?.habits?.exerciseMinutes || 0;
    const sleep = entryData?.habits?.sleepMinutes || 0;
    const weight = entryData?.habits?.weight || 0;
    
    const getMoodEmoji = (mood) => {
        switch (mood) {
            case 'happy': return '😄';
            case 'sad': return '😢';
            default: return '😊';
        }
    }

    const handleUpdate = () => {
        setShowHabitsPopup(false); 
        onClose(true); 
    };

    return (
        <>
            <div className="popup-container"> 
                <div className="popup-header">
                    <span role="img" aria-label="emoji">{getMoodEmoji(mood)}</span>
                    <h3>{formattedDisplayDate}</h3>
                    <button onClick={() => onClose()} className="close-button">&times;</button>
                </div>
                
                <div className="popup-content">
                    <div className="notes-box"><p>{note}</p></div>
                    <div className="stats-list">
                        <div className="stat-item"><span>💧 Água</span><strong>{water} Copos</strong></div>
                        <div className="stat-item"><span>🏃 Exercício</span><strong>{exercise} min</strong></div>
                        <div className="stat-item"><span>🌙 Sono</span><strong>{Math.floor(sleep / 60)}h {sleep % 60}min</strong></div>
                        <div className="stat-item"><span>⚖️ Peso</span><strong>{weight} kg</strong></div>
                    </div>
                    
                    <button className="salvar-button" onClick={() => setShowHabitsPopup(true)}>
                        Editar Hábitos
                    </button>
                </div>
            </div>

            {showHabitsPopup && (
                <PopUpHabitosSaudaveis
                    dateToSave={dateToDisplay} // Passamos a data segura
                    initialData={entryData}
                    onClose={() => setShowHabitsPopup(false)}
                    onUpdate={handleUpdate}
                    userId={userId} 
                />
            )}
        </>
    );
};

export default PopUp_Calendario_emocional;