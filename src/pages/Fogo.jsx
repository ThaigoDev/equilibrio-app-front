import "./Fogo.css";

// 1. Importe as imagens aqui no topo
import fogoForte from "../../src/images/fogo-forte.png";
import fogoAcesso from "../../src/images/fogo-acesso.png";
import fogoApagado from "../../src/images/fogo-apagado.png";

function Fogo({ streakCount }) {
    const Ofensiva = 7;
    const feito = streakCount || 4;
    const valor = (feito / Ofensiva) * 100;

    let imagemFogo;
    let corBarra;

    // 2. Use as variáveis importadas ao invés de strings de texto
    if (valor >= 100) {
        imagemFogo = fogoForte; // Use a variável importada
        corBarra = { backgroundColor: '#FF6347' };
    } else if (valor >= 10) {
        imagemFogo = fogoAcesso; // Use a variável importada
        corBarra = { backgroundColor: '#FF8C00' };
    } else {
        imagemFogo = fogoApagado; // Use a variável importada
        corBarra = { backgroundColor: '#A9A9A9' };
    }

    return (
        <div className="fogo-corpo">
            <h1>Ofensiva</h1>
            <div className="fogo-caixa">
                <div className="fogo-imagen" style={{ '--porcentagem': `${valor}%` }}>
                    {/* O React usará o caminho correto que foi gerado no build */}
                    <img src={imagemFogo} alt="Ícone de Fogo" />
                </div>
                <div className="caixa-barra">
                    <div className="barra" style={{ ...corBarra, width: `${valor}%` }}></div>
                </div>
            </div>
            <div className="dias">
                <h3><span className="dia-completo">{feito}</span>/{Ofensiva} dias</h3>
            </div>
        </div>
    );
}

export default Fogo;