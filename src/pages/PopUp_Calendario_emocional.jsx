import React from 'react';
import "./PopUp_Calendario_emocional.css";

function PopUp_Calendario_emocional({ date, dailyData, isLoading, error, onClose }) {

    const handleClose = () => {
        onClose();
    };

    const formattedDate = date
        ? new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
        : 'Data não disponível';

    return (
        <div className="popup-container">
            <div className="popup-content">
                <div className="popup-header">
                    <div className="header-left">
                        {/* Emoji dinâmico baseado no sentimentoPrincipal */}
                        <div className="emoji">
                            {dailyData && dailyData.sentimentoPrincipal === "Feliz" ? "😊" :
                             dailyData && dailyData.sentimentoPrincipal === "Triste" ? "😔" :
                             dailyData && dailyData.sentimentoPrincipal === "Ansioso" ? "😟" :
                             dailyData && dailyData.sentimentoPrincipal === "Irritado" ? "😠" :
                             "❓"}
                        </div>
                        <h3>{formattedDate}</h3>
                    </div>
                    <button className="fechar-button" onClick={handleClose}> ✕ </button>
                </div>
                <br />

                {/* Renderização condicional do conteúdo */}
                {isLoading ? (
                    <div className="popup-message">Carregando dados...</div>
                ) : error ? (
                    <div className="popup-message error-message">Erro: {error}</div>
                ) : dailyData ? (
                    <>
                        {/* Observação/Nota do dia */}
                        <div className="popup-note">
                            <p><strong>Observação:</strong> {dailyData.observacao || 'Nenhuma observação registrada.'}</p>
                        </div>

                        <br />

                        <div className="popup-info">
                            {/* Sentimento Principal e Nível de Equilíbrio */}
                            <div className="popup-item">
                                <span>Sentimento Principal:</span>
                                <strong>{dailyData.sentimentoPrincipal || 'Não registrado'}</strong>
                            </div>
                            <div className="popup-item">
                                <span>Nível de Equilíbrio:</span>
                                <strong>{dailyData.equilibrio || 'Não registrado'}</strong>
                            </div>

                            {/* Hábitos Saudáveis */}
                            <h3>Hábitos Saudáveis:</h3>
                            {dailyData.habits && dailyData.habits.length > 0 ? (
                                dailyData.habits.map((habit, index) => (
                                    <div className="popup-item" key={index}>
                                        <span>{habit.name}:</span>
                                        <strong>{habit.completed ? 'Concluído ✅' : 'Não Concluído ❌'}</strong>
                                    </div>
                                ))
                            ) : (
                                <div className="popup-item">
                                    <span>Hábitos:</span>
                                    <strong>Nenhum hábito registrado.</strong>
                                </div>
                            )}

                            {/* Contagem de Dias em Sequência (Streak) */}
                            <div className="popup-item">
                                <span>Dias em Sequência (Streak):</span>
                                <strong>{dailyData.streakCount || 0} dias 🔥</strong>
                            </div>

                            {/* Campos extras, se existirem na sua API */}
                            {dailyData.waterIntake && (
                                <div className="popup-item">
                                    <span>💧 Água:</span>
                                    <strong>{dailyData.waterIntake} Copos</strong>
                                </div>
                            )}
                            {dailyData.exerciseDuration && (
                                <div className="popup-item">
                                    <span>🏃‍♂️ Exercício:</span>
                                    <strong>{dailyData.exerciseDuration} min</strong>
                                </div>
                            )}
                            {dailyData.sleepHours && (
                                <div className="popup-item">
                                    <span>🌙 Sono:</span>
                                    <strong>{dailyData.sleepHours} horas</strong>
                                </div>
                            )}
                            {dailyData.weight && (
                                <div className="popup-item">
                                    <span>⚖️ Peso:</span>
                                    <strong>{dailyData.weight} kg</strong>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="popup-message">Nenhum registro encontrado para esta data.</div>
                )}
            </div>
        </div>
    );
}

export default PopUp_Calendario_emocional;