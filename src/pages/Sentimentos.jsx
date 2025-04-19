import React from "react";
import "./Sentimentos.css";

const Sentimentos = () => {
  return (
    <div className="sentimentos-container">
      <h2 className="titulo">Como você está se sentindo?</h2>
      <div className="emojis">
        <img className="emoji" src="" alt="Muito feliz" />
        <img className="emoji" src="/emojis/emoji-verde-claro.png" alt="Feliz" />
        <img className="emoji" src="/emojis/emoji-amarelo.png" alt="Neutro" />
        <img className="emoji" src="/emojis/emoji-laranja.png" alt="Triste" />
        <img className="emoji" src="/emojis/emoji-vermelho.png" alt="Muito triste" />
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
