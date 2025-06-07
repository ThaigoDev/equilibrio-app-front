import "./Fogo.css";

function Fogo() {
    const Ofensiva = 7;     // Meta de dias da semana(deve ser mudado nas configurações)
    const feito = 5;        // Dias já feitos(deve atualizar sempre que o usuário completar as metas do dia)
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
                <div className="caixa-barra">
                    <div className="barra" style={corBarra}></div>
                    <div
                        className="fogo-imagen"
                        style={{ '--porcentagem': `${valor}%` }}
                    >
                        <img
                            src={imagemFogo}
                            alt="ícone de fogo"
                        />
                    </div>
                </div>
            </div>
            <div className="dias">
                <h3>{feito}/{Ofensiva} dias</h3>
            </div>
        </div>
    );
}

export default Fogo;
