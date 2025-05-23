import React from "react";
import { useNavigate } from "react-router-dom";
import "./calendar.css";
import Calendar from 'react-calendar';

const Calender = () => {
    const navigate = useNavigate();
    function MyCalendar() {
        return <Calendar />;
    }
        
  return (
    
        <div className="container">
            <MyCalendar />
        </div>
    );
};

export default Calender;