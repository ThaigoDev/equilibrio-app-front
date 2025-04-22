import React from "react";
import "./Sentimentos.css";

// Importando as imagens dos emojis com caminhos relativos
import emojiMuitoFeliz from "../images/oie_transparent (13).png";
import emojiFeliz from "../images/oie_transparent (14).png";
import emojiNeutro from "../images/oie_transparent (15).png";
import emojiTriste from "../images/oie_transparent (16).png";
import emojiMuitoTriste from "../images/oie_transparent (17).png";

const Sentimentos = () => {
  return (
    <div className="sentimentos-container">
      <h2 className="titulo">Como você está se sentindo?</h2>
      <p className="subtitulo">Como você está se sentindo?</p>
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
