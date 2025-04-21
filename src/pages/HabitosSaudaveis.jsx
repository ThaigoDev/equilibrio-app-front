// HabitosSaudaveis.jsx
import { useState } from 'react';
import axios from 'axios';
import './HabitosSaudaveis.css';

export default function HabitosSaudaveis() {
  const [formData, setFormData] = useState({
    agua: '',
    sono: '',
    exercicio: '',
    peso: '',
    comentario: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/habitos', formData); // <-- alterar para a rota real do back-end
      alert('Dados enviados com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao enviar os dados.');
    }
  };

  return (
    <div className="habitos-container">
      <h2 className="titulo">Hábitos Saudáveis</h2>
      <form onSubmit={handleSubmit} className="formulario">
        <div className="campo">
          <label>Água (copos)</label>
          <input
            type="number"
            name="agua"
            value={formData.agua}
            onChange={handleChange}
            placeholder="Quantos copos de água?"
          />
        </div>

        <div className="campo">
          <label>Horas de Sono</label>
          <input
            type="number"
            name="sono"
            value={formData.sono}
            onChange={handleChange}
            placeholder="Horas de sono"
          />
        </div>

        <div className="campo">
          <label>Exercício</label>
          <input
            type="text"
            name="exercicio"
            value={formData.exercicio}
            onChange={handleChange}
            placeholder="Tipo de exercício e duração"
          />
        </div>

        <div className="campo">
          <label>Peso (kg)</label>
          <input
            type="number"
            name="peso"
            value={formData.peso}
            onChange={handleChange}
            placeholder="Seu peso de hoje"
          />
        </div>

        <div className="campo">
          <label>Comentário do Dia</label>
          <textarea
            name="comentario"
            value={formData.comentario}
            onChange={handleChange}
            placeholder="Escreva aqui como foi seu dia"
          />
        </div>

        <button type="submit" className="botao-salvar">
          Salvar Dados
        </button>
      </form>
    </div>
  );
}