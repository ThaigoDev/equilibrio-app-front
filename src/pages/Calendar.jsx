import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Calendar.css";
import Calendar from 'react-calendar';
import PopUp_Calendario_emocional from "./PopUp_Calendario_emocional";

const CalendarComponent = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        console.log("showPopup state:", showPopup); 
        if (showPopup) {
            document.body.classList.add('no-scroll');
            console.log("Class 'no-scroll' ADDED to body."); 
        } else {
            document.body.classList.remove('no-scroll');
            console.log("Class 'no-scroll' REMOVED from body."); 
        }
        return () => {
            
            document.body.classList.remove('no-scroll');
            console.log("Cleanup: 'no-scroll' class removed."); 
        };
    }, [showPopup]); 

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedDate(null);
    };

    return (
        <div className="container">
            <Calendar
                onClickDay={handleDateClick}
                locale="pt-BR"
            />
            {showPopup && (
                <>
                    <div className="overlay" onClick={handleClosePopup}></div>
                    <PopUp_Calendario_emocional
                        date={selectedDate}
                        onClose={handleClosePopup}
                    />
                </>
            )}
        </div>
    );
};

export default CalendarComponent;