// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopUp_habitos_saudaveis from "./PopUp_habitos_saudaveis"; // Verifique se o import está aqui

import Equilibrio from "./Equilibrio";
import Sentimentos from "./Sentimentos";
import HabitosSaudaveis from "./HabitosSaudaveis";
import Fogo from "./Fogo";
import Calendar from "./Calendar";
import "./Home.css";

// --- ESTE É O ÚNICO COMPONENTE HOME ---
const Home = () => {
    const [dailyData, setDailyData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // ADICIONADO: Estado para controlar a visibilidade do pop-up de hábitos
    const [showHabitPopup, setShowHabitPopup] = useState(false);

    const fetchDailyData = async () => {
        const userId = localStorage.getItem('equilibrioAuthToken');
        if (!userId) {
            setError("Usuário não autenticado.");
            setIsLoading(false);
            return;
        }

        const today = new Date().toISOString().split('T')[0];

        try {
            const response = await axios.get('https://equilibrio-api-node.onrender.com/api/daily-entry/mydailyEntries', {
                params: {
                    user: userId,
                    startDate: today,
                    endDate: today
                }
            });

            if (response.data.data && response.data.data.length > 0) {
                setDailyData(response.data.data[0]);
            } else {
                setDailyData(null); 
            }
        } catch (err) {
            console.error("Erro ao buscar dados diários:", err);
            setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDailyData();
    }, []);

    const handleDataUpdate = () => {
        fetchDailyData(); 
    };

    if (isLoading) {
        return <div>Carregando seu equilíbrio...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    // --- O RETURN FOI MODIFICADO PARA INCLUIR A LÓGICA DO POP-UP ---
    return (
        <div className="home-container">
            <Equilibrio />
            <Sentimentos initialData={dailyData} onUpdate={handleDataUpdate} />
            
            {/* MODIFICADO: Envolvemos o HabitosSaudaveis em uma div clicável */}
            <div onClick={() => setShowHabitPopup(true)} style={{ cursor: 'pointer' }}>
                <HabitosSaudaveis habitsData={dailyData ? dailyData.habits : null} />
            </div>

            <Fogo streakCount={dailyData ? dailyData.streakCount : 0} />
            <Calendar />

            {/* ADICIONADO: Renderização condicional do Pop-up de hábitos */}
            {showHabitPopup && (
                <PopUp_habitos_saudaveis 
                    initialData={dailyData}
                    onClose={() => setShowHabitPopup(false)}
                    onUpdate={handleDataUpdate}
                />
            )}
        </div>
    );
};

export default Home;