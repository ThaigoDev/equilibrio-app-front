import React from "react";
import "./Sentimentos.css";

// Importando as imagens dos emojis
import emojiMuitoFeliz from "../images/Imagem do WhatsApp de 2025-04-18 à(s) 14.22.23_9c9f2168.jpg";
import emojiFeliz from "../images/Imagem do WhatsApp de 2025-04-18 à(s) 14.22.24_4326a1f3.jpg";
import emojiNeutro from "../images/Imagem do WhatsApp de 2025-04-18 à(s) 14.22.25_1d6230cf.jpg";
import emojiTriste from "../images/Imagem do WhatsApp de 2025-04-18 à(s) 14.22.25_c745f949.jpg";
import emojiMuitoTriste from "../images/Imagem do WhatsApp de 2025-04-18 à(s) 14.22.27_81646dac.jpg";

const Sentimentos = () => {
  return (
    <div className="sentimentos-container">
      <h2 className="titulo">Como você está se sentindo?</h2>
      <p className="subtitulo">Como Você está se sentindo?</p>
      <div className="emojis">
        <img className="emoji" src={emojiMuitoFeliz} alt="Muito feliz" />
        <img className="emoji" src={emojiFeliz} alt="Feliz" />
        <img className="emoji" src={emojiNeutro} alt="Neutro" />
        <img className="emoji" src={emojiTriste} alt="Triste" />
        <img className="emoji" src={emojiMuitoTriste} alt="Muito triste" />
      </div>
      <div className="note-wrapper">
        <div className="note-container">
          <input
            type="text"
            className="nota-input"
            placeholder="Deixe uma nota..."
          />
        </div>
        <button className="enviar-button">Enviar</button>
      </div>
    </div>
  );
};

export default Sentimentos;