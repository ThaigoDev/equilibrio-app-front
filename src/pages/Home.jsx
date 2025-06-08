// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopUp_habitos_saudaveis from "./PopUp_habitos_saudaveis";

import Equilibrio from "./Equilibrio";
import Sentimentos from "./Sentimentos";
import HabitosSaudaveis from "./HabitosSaudaveis";
import Fogo from "./Fogo";
import CalendarComponent from "./Calendar"; // Importe CalendarComponent
import "./Home.css";

const Home = () => {
    const [dailyData, setDailyData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
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
        fetchDailyData(); // Busca os dados de hoje ao carregar o componente
    }, []);

    const handleDataUpdate = () => {
        fetchDailyData(); // Atualiza os dados de hoje após uma modificação (ex: no pop-up de hábitos)
    };

    if (isLoading) {
        return <div className="loading-message">Carregando seu equilíbrio...</div>;
    }

    if (error) {
        return <div className="error-message" style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div className="home-container">
            <Equilibrio />
            <Sentimentos initialData={dailyData} onUpdate={handleDataUpdate} />

            <div onClick={() => setShowHabitPopup(true)} style={{ cursor: 'pointer' }}>
                <HabitosSaudaveis habitsData={dailyData ? dailyData.habits : null} />
            </div>

            <Fogo streakCount={dailyData ? dailyData.streakCount : 0} />
            
            {/* O CalendarComponent agora é totalmente autônomo para seu próprio pop-up */}
            <CalendarComponent /> 

            {showHabitPopup && (
                <PopUp_habitos_saudaveis
                    initialData={dailyData}
                    onClose={() => setShowHabitPopup(false)}
                    onUpdate={handleDataUpdate}
                />
            )}
            
            {/* REMOVIDO: O PopUp_Calendario_emocional e sua lógica de exibição do Home.jsx,
                pois agora é gerenciado diretamente pelo CalendarComponent.
            */}
        </div>
    );
};

export default Home;