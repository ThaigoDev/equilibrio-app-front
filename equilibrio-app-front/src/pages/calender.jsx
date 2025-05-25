import React from "react";
import { useNavigate } from "react-router-dom";
import "./calender.css";
import Calendar from 'react-calendar';

const Calender = () => {
        
  return (

        <div className="container">
            <MyCalendar />
        </div>
    );
};

export default Calender;