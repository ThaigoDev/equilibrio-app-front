// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopUp_habitos_saudaveis from "./PopUp_habitos_saudaveis"; // Verifique se o import está aqui

import Equilibrio from "./Equilibrio";
import Sentimentos from "./Sentimentos";
import HabitosSaudaveis from "./HabitosSaudaveis";
import Fogo from "./Fogo";
import Calendar from "./Calendar";
import "./Home.css"

const Home = () => {
    const [dailyData, setDailyData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showHabitPopup, setShowHabitPopup] = useState(false);

    // Tentamos pegar o ID do usuário de ambos os lugares para garantir
    const userId = localStorage.getItem('userId') || localStorage.getItem('equilibrioAuthToken');

    const fetchDailyData = async () => {
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
        // Adicionamos userId como dependência para re-executar se ele mudar (ex: após login)
    }, [userId]);

    const handleDataUpdate = () => {
        fetchDailyData(); 
    };

    if (isLoading) {
        return <div>Carregando seu equilíbrio...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div className="home-container">
            <Equilibrio />
            <Sentimentos initialData={dailyData} onUpdate={handleDataUpdate} />
            
            <div onClick={() => setShowHabitPopup(true)} style={{ cursor: 'pointer' }}>
                <HabitosSaudaveis habitsData={dailyData ? dailyData.habits : null} />
            </div>

            <Fogo streakCount={dailyData ? dailyData.streakCount : 0} />
            <Calendar />

            {showHabitPopup && (
                <PopUp_habitos_saudaveis 
                    initialData={dailyData}
                    onClose={() => setShowHabitPopup(false)}
                    onUpdate={handleDataUpdate}
                    dateToSave={new Date()} // Sempre salva para o dia de hoje a partir da Home
                    
                    // --- CORREÇÃO APLICADA AQUI ---
                    // Passamos o userId que pegamos no início do componente
                    userId={userId} 
                />
            )}
        </div>
    );
};

export default Home;