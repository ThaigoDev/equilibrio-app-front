import React from "react";
import "./Sentimentos.css";

import emojiMuitoTriste from "../images/oie_transparent (17).png";
import emojiTriste from "../images/oie_transparent (16).png";
import emojiNeutro from "../images/oie_transparent (15).png";
import emojiFeliz from "../images/oie_transparent (14).png";
import emojiMuitoFeliz from "../images/oie_transparent (13).png";

const Sentimentos = () => {
  return (
    <div className="sentimentos-container">
  
    
    <p className="subtitulo">Como você está se sentindo ?</p>
  
  <div className="emojis">
    <img className="emoji" src={emojiMuitoTriste} alt="Muito triste" />
    <img className="emoji" src={emojiTriste} alt="Triste" />
    <img className="emoji" src={emojiNeutro} alt="Neutro" />
    <img className="emoji" src={emojiFeliz} alt="Feliz" />
    <img className="emoji" src={emojiMuitoFeliz} alt="Muito feliz" />
  </div>
  <div className="note-wrapper">
    <input type="text" className="nota-input" placeholder="Deixe uma nota..." />
    <button className="enviar-button">Enviar</button>
  </div>
</div>

    
  );
};

export default Sentimentos;
