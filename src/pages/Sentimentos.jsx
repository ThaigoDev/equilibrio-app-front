// src/pages/Sentimentos.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sentimentos.css";

// Importe as imagens dos emojis
import emojiMuitoTriste from "../images/oie_transparent (17).png";
import emojiTriste from "../images/oie_transparent (16).png";
import emojiNeutro from "../images/oie_transparent (15).png";
import emojiFeliz from "../images/oie_transparent (14).png";
import emojiMuitoFeliz from "../images/oie_transparent (13).png";

const emojis = {
    very_sad: { img: emojiMuitoTriste, alt: "Muito triste" },
    sad: { img: emojiTriste, alt: "Triste" },
    neutral: { img: emojiNeutro, alt: "Neutro" },
    happy: { img: emojiFeliz, alt: "Feliz" },
    very_happy: { img: emojiMuitoFeliz, alt: "Muito feliz" },
};

const Sentimentos = ({ initialData, onUpdate }) => {
    // Estados para controlar os inputs
    const [selectedMood, setSelectedMood] = useState(null);
    const [note, setNote] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Preenche os campos com os dados do dia quando eles chegam
    useEffect(() => {
        if (initialData) {
            setSelectedMood(initialData.mood);
            setNote(initialData.note);
        }
    }, [initialData]);

    const handleSubmit = async () => {
        const userId = localStorage.getItem('equilibrioAuthToken');
        if (!selectedMood) {
            setError("Por favor, selecione um humor.");
            return;
        }
        setError('');
        setSuccess('');

        const dailyEntryData = {
            user: userId,
            date: new Date().toISOString().split('T')[0], // Data de hoje
            mood: selectedMood,
            note: note,
            // Importante: precisamos enviar os hábitos existentes para não zerá-los
            habits: initialData ? initialData.habits : {}
        };

        try {
            // Usando a rota de submissão do backend
            const response = await axios.post('https://equilibrio-api-node.onrender.com/api/daily-entry/create', dailyEntryData);
            
            if (response.data.status === 'success') {
                setSuccess('Seu registro foi salvo!');
                onUpdate(); // Chama a função do componente pai para re-buscar os dados
                setTimeout(() => setSuccess(''), 3000); // Limpa a mensagem após 3s
            }
        } catch (err) {
            console.error("Erro ao enviar sentimento:", err);
            setError(err.response?.data?.errors?.join(', ') || "Erro ao salvar. Tente novamente.");
        }
    };

    return (
        <div className="sentimentos-container">
            <p className="subtitulo">Como você está se sentindo hoje?</p>
            <div className="emojis">
                {Object.entries(emojis).map(([moodKey, { img, alt }]) => (
                    <img
                        key={moodKey}
                        className={`emoji ${selectedMood === moodKey ? 'selected' : ''}`}
                        src={img}
                        alt={alt}
                        onClick={() => setSelectedMood(moodKey)}
                    />
                ))}
            </div>
            <div className="note-wrapper">
                <input
                    type="text"
                    className="nota-input"
                    placeholder="Deixe uma nota sobre seu dia..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
                <button className="enviar-button" onClick={handleSubmit}>Enviar</button>
            </div>
            {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
            {success && <p style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>{success}</p>}
        </div>
    );
};

export default Sentimentos;