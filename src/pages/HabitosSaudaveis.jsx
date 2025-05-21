import React from 'react';
import './HabitosSaudaveis.css';

const HabitosSaudaveis = () => {
  // Dados mockados - ESTES DADOS SERÃO SUBSTITUÍDOS PELO BACKEND
  const habitos = {
    agua: { atual: 0, meta: 8 },
    exercicio: { atual: 0, meta: 60 },
    sono: { atual: 0, meta: 60 },
    peso: { atual: 70.5, meta: 60.5 }
  };

  return (
    <div className="habitos-container">
      <h2 className="habitos-titulo">Hábitos saudáveis</h2>
      
      <div className="habitos-box">
        {/* ÁGUA - Tags para conexão com backend */}
        <div className="habito-item">
          <span className="habito-nome">Água</span>
          <span className="habito-valor" 
                data-agua-atual={habitos.agua.atual} 
                data-agua-meta={habitos.agua.meta}>
            {habitos.agua.atual} / {habitos.agua.meta} copos
          </span>
        </div>
        
        {/* EXERCÍCIO - Tags para conexão com backend */}
        <div className="habito-item">
          <span className="habito-nome">Exercício</span>
          <span className="habito-valor" 
                data-exercicio-atual={habitos.exercicio.atual} 
                data-exercicio-meta={habitos.exercicio.meta}>
            {habitos.exercicio.atual.toString().padStart(2, '0')} / {habitos.exercicio.meta} min
          </span>
        </div>
        
        {/* SONO - Tags para conexão com backend */}
        <div className="habito-item">
          <span className="habito-nome">Sono</span>
          <span className="habito-valor" 
                data-sono-atual={habitos.sono.atual} 
                data-sono-meta={habitos.sono.meta}>
            {habitos.sono.atual.toString().padStart(2, '0')} / {habitos.sono.meta} min
          </span>
        </div>
        
        {/* PESO - Tags para conexão com backend */}
        <div className="habito-item">
          <span className="habito-nome">Peso</span>
          <span className="habito-valor" 
                data-peso-atual={habitos.peso.atual} 
                data-peso-meta={habitos.peso.meta}>
            {habitos.peso.atual} / {habitos.peso.meta} kg
          </span>
        </div>
      </div>
    </div>
  );
};

export default HabitosSaudaveis;