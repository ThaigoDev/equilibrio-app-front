// src/pages/Fogo.jsx
import "./Fogo.css";

// O componente agora recebe 'streakCount' como prop
function Fogo({ streakCount }) {
    const Ofensiva = 7; // Meta da semana (pode vir das configurações no futuro)
    const feito = streakCount || 0;
    const valor = (feito / Ofensiva) * 100;

    let imagemFogo;
    let corBarra;

    if (valor >= 100) {
        imagemFogo = "src/images/fogo forte.png";
        corBarra = { backgroundColor: '#FF6347' };
    } else if (valor >= 10) {
        imagemFogo = "src/images/fogo acesso.png";
        corBarra = { backgroundColor: '#FF8C00' };
    } else {
        imagemFogo = "src/images/fogo apagado.png";
        corBarra = { backgroundColor: '#A9A9A9' };
    }

    return (
        <div className="fogo-corpo">
            <h1>Ofensiva</h1>
            <div className="fogo-caixa">
                {/* O restante do seu JSX permanece o mesmo */}
                <div className="caixa-barra">
                    <div className="barra" style={{...corBarra, width: `${valor}%`}}></div>
                    {/* ... resto do JSX ... */}
                </div>
            </div>
            <div className="dias">
                <h3>{feito}/{Ofensiva} dias</h3>
            </div>
        </div>
    );
}

export default Fogo;