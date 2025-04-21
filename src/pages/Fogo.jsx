import "./Fogo.css";

function Fogo() {
    const numero = 10;

    let imagemFogo;
    let classeFogo;

    if (numero >= 30) {
        imagemFogo = "src/images/fogo forte.png";
        classeFogo = "fogo-forte";
    } else if (numero >= 10) {
        imagemFogo = "src/images/fogo acesso.png";
        classeFogo = "fogo-acesso";
    } else {
        imagemFogo = "src/images/fogo apagado.png";
        classeFogo = "fogo-apagado";
    }

    return (
        <div className="fogo-corpo">
            <h1>ofensiva</h1>
            <div className="fogo-caixa">
                <h1>Dias Consecutivos {numero}</h1>
                <img
                    src={imagemFogo}
                    alt="ícone de fogo"
                    className={`fogo-imagen ${classeFogo}`}
                />
            </div>
        </div>
    );
}

export default Fogo;
