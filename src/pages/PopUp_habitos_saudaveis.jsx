import "./PopUp_habitos_saudaveis.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PopUpHabitosSaudaveis() {
    const navigate = useNavigate();

    const [agua, setAgua] = useState(0);
    const [exercicio, setExercicio] = useState(0);
    const [sono, setSono] = useState(0);
    const [peso, setPeso] = useState(0);

    const handleClose = () => {
        navigate("/");
    };

    const salvarDados = () => {
        const dados = { agua, exercicio, sono, peso };
        console.log("Dados salvos:", dados);
        handleClose();
    };

    return (
        <div className="popup-container" role="dialog" aria-modal="true">
            <div className="popup-header">
                <h4>HÁBITOS SAUDÁVEIS</h4>
                <button
                    className="fechar-button"
                    onClick={handleClose}
                    aria-label="Fechar popup"
                >
                    ✕
                </button>
            </div>

            <div className="popup-info">
                <div className="popup-item">
                    <span>💧 Água</span>
                    <div className="counter">
                        <button onClick={() => setAgua(Math.max(0, agua - 1))}>➖</button>
                        <span>{agua}</span>
                        <button onClick={() => setAgua(agua + 1)}>➕</button>
                    </div>
                </div>

                <div className="popup-item">
                    <span>🏃‍♂️ Exercício</span>
                    <div className="counter">
                        <button onClick={() => setExercicio(Math.max(0, exercicio - 1))}>➖</button>
                        <span>{exercicio}</span>
                        <button onClick={() => setExercicio(exercicio + 1)}>➕</button>
                    </div>
                </div>

                <div className="popup-item">
                    <span>🌙 Sono</span>
                    <div className="counter">
                        <button onClick={() => setSono(Math.max(0, sono - 1))}>➖</button>
                        <span>{sono}</span>
                        <button onClick={() => setSono(sono + 1)}>➕</button>
                    </div>
                </div>

                <div className="popup-item">
                    <span>⚖️ Peso</span>
                    <div className="counter">
                        <button onClick={() => setPeso(Math.max(0, peso - 0.1))}>➖</button>
                        <span>{peso.toFixed(1)}</span>
                        <button onClick={() => setPeso(peso + 0.1)}>➕</button>
                    </div>
                </div>

                <button className="salvar-button" onClick={salvarDados}>
                    Salvar
                </button>
            </div>
        </div>
    );
}

export default PopUpHabitosSaudaveis;
