import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Calendar.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importante para os estilos padrão do react-calendar
import PopUp_Calendario_emocional from "./PopUp_Calendario_emocional";

const CalendarComponent = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [dailyDataForSelectedDate, setDailyDataForSelectedDate] = useState(null);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [errorData, setErrorData] = useState(null);

    // Efeito para controlar a classe no-scroll no body
    useEffect(() => {
        if (showPopup) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [showPopup]);

    // Função para buscar os dados do endpoint para a data selecionada
    const fetchDailyDataByDate = async (date) => {
        setIsLoadingData(true);
        setErrorData(null); // Limpa erros anteriores
        setDailyDataForSelectedDate(null); // Limpa dados anteriores

        const userId = localStorage.getItem('equilibrioAuthToken');
        if (!userId) {
            setErrorData("Usuário não autenticado. Por favor, faça login.");
            setIsLoadingData(false);
            return;
        }

        const formattedDate = date.toISOString().split('T')[0]; // Formata para 'YYYY-MM-DD'

        try {
            const response = await axios.get('https://equilibrio-api-node.onrender.com/api/daily-entry/mydailyEntries', {
                params: {
                    user: userId,
                    startDate: formattedDate,
                    endDate: formattedDate
                }
            });

            if (response.data.data && response.data.data.length > 0) {
                setDailyDataForSelectedDate(response.data.data[0]);
            } else {
                setDailyDataForSelectedDate(null); // Nenhum dado encontrado para a data
            }
        } catch (err) {
            console.error("Erro ao buscar dados diários para a data:", formattedDate, err);
            setErrorData("Não foi possível carregar os dados para esta data. Verifique sua conexão ou tente novamente mais tarde.");
        } finally {
            setIsLoadingData(false);
        }
    };

    // Handler para o clique no dia do calendário
    const handleDateClick = async (date) => {
        setSelectedDate(date);
        await fetchDailyDataByDate(date); // Primeiro, busca os dados
        setShowPopup(true); // Depois, abre o pop-up
    };

    // Handler para fechar o pop-up
    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedDate(null);
        setDailyDataForSelectedDate(null); // Limpa os dados do pop-up ao fechar
        setErrorData(null); // Limpa erros ao fechar
    };

    return (
        <div className="calendar-component-container"> {/* Renomeei o className para evitar conflitos */}
            <h3>Seu Calendário de Progresso</h3>
            <Calendar
                onClickDay={handleDateClick}
                locale="pt-BR"
            />
            {showPopup && (
                <>
                    {/* Overlay para escurecer o fundo e fechar o pop-up ao clicar fora */}
                    <div className="overlay" onClick={handleClosePopup}></div>
                    <PopUp_Calendario_emocional
                        date={selectedDate}
                        dailyData={dailyDataForSelectedDate}
                        isLoading={isLoadingData}
                        error={errorData}
                        onClose={handleClosePopup}
                    />
                </>
            )}
        </div>
    );
};

export default CalendarComponent;