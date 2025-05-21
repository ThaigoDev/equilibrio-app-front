import "./PopUp_Calendario_emocional.css"
import { useNavigate } from 'react-router-dom';


function PopUp_Calendario_emocional() {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/');
    };

    return (
        <div className="popup-container">

            <div className="popup-header">

                <div className="header-left">

                    <div className="emoji">😊</div>
                    <h3>  08 maio, 2025</h3>

                </div>

                <button className="fechar-button" onClick={handleClose}> ✕ </button>

            </div>
            <br />


            <div className="popup-note">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque nulla facere maxime architecto illo debitis ea, 
                fuga nostrum saepe consequatur quos eius, officiis quidem laborum tempora omnis. Voluptas, quidem nihil.
            </div>

            <br />

            <div className="popup-info">

                <div className="popup-item">
                    <span>💧 Água </span>
                    <strong>08 Copos</strong>
                </div>

                <div className="popup-item">
                    <span>🏃‍♂️ Exercicio </span>
                    <strong>60 min</strong>
                </div>

                <div className="popup-item">
                    <span>🌙 Sono </span>
                    <strong>60 min</strong>
                </div>

                <div className="popup-item">
                    <span>⚖️ Peso </span>
                    <strong>70,5 kg</strong>
                </div>
            </div>
        </div >
    );
}

export default PopUp_Calendario_emocional;
