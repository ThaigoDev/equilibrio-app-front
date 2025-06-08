import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import "./Calendar.css";
import Calendar from 'react-calendar';
import PopUp_Calendario_emocional from "./PopUp_Calendario_emocional";

// Função robusta para formatar a data, evitando problemas de fuso horário
const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = ('0' + (d.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + d.getUTCDate()).slice(-2);
    return `${year}-${month}-${day}`;
};

const CalendarComponent = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [activeStartDate, setActiveStartDate] = useState(new Date());
    const [monthlyEntries, setMonthlyEntries] = useState([]); 

    // Pega o ID do usuário do localStorage para ser usado em todo o componente
    const userId = localStorage.getItem('userId') || localStorage.getItem('equilibrioAuthToken');

    const fetchMonthlyEntries = useCallback(async (date) => {
        if (!userId) {
            console.error("ID do usuário não encontrado para buscar entradas.");
            return;
        }
        try {
            const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
            const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            const response = await axios.get('https://equilibrio-api-node.onrender.com/api/daily-entry/mydailyEntries', {
                params: {
                    user: userId,
                    startDate: formatDate(startDate),
                    endDate: formatDate(endDate)
                }
            });

            if (response.data && response.data.status === 'success' && Array.isArray(response.data.data)) {
                setMonthlyEntries(response.data.data);
            } else {
                setMonthlyEntries([]);
            }
        } catch (error) {
            console.error("Erro ao buscar as entradas no calendário:", error);
            setMonthlyEntries([]);
        }
    }, [userId]); // Adicionado userId como dependência

    useEffect(() => {
        fetchMonthlyEntries(activeStartDate);
    }, [activeStartDate, fetchMonthlyEntries]);

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setShowPopup(true);
    };

    // Função para fechar o popup, com opção de recarregar os dados
    const handleClosePopup = (needsRefresh = false) => {
        setShowPopup(false);
        setSelectedDate(null);
        if (needsRefresh) {
            fetchMonthlyEntries(activeStartDate);
        }
    };

    const handleActiveStartDateChange = ({ activeStartDate }) => {
        setActiveStartDate(activeStartDate);
    };
    
    // Adiciona o ponto visual nos dias que têm entrada
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const formattedCurrentDate = formatDate(date);
            const hasEntry = monthlyEntries.some(entry => formatDate(entry.date) === formattedCurrentDate);
            if (hasEntry) {
                return <div className="entry-indicator"></div>;
            }
        }
        return null;
    };
    
    // Lógica principal: encontra a entrada correspondente ao dia clicado
    const selectedEntryData = selectedDate ? monthlyEntries.find(entry => 
        formatDate(entry.date) === formatDate(selectedDate)
    ) : null;
    
    return (
        <div className="container">
            <Calendar
                onClickDay={handleDateClick}
                locale="pt-BR"
                tileContent={tileContent}
                onActiveStartDateChange={handleActiveStartDateChange}
                activeStartDate={activeStartDate}
            />
            {showPopup && (
                <>
                    <div className="overlay" onClick={() => handleClosePopup()}></div>
                    <PopUp_Calendario_emocional
                        date={selectedDate}
                        entryData={selectedEntryData} 
                        onClose={handleClosePopup}
                        userId={userId} // Passa o userId para o próximo componente
                    />
                </>
            )}
        </div>
    );
};

export default CalendarComponent;