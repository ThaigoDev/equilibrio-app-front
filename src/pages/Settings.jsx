import { useState } from "react";
import "./Settings.css"

function Settings() {

    const [ativo, setAtivo] = useState(false);

    const [dados, setDados] = useState({
        horario: "20:00",
        copos: 8,
        exercicios: "60min",
        peso: "70,5kg",
        ofensiva: "7 dias"
    });

    const [campoSelecionado, setCampoSelecionado] = useState(null);
    const [novoValor, setNovoValor] = useState("");

    const abrirModal = (campo) => {
        setCampoSelecionado(campo);
        setNovoValor(dados[campo]);
    };

    const confirmarAlteracao = () => {
        setDados({ ...dados, [campoSelecionado]: novoValor });
        setCampoSelecionado(null);
    };

    const nomeDoCampo = (campo) => {
        const nomes = {
            horario: "Horário de notificação",
            copos: "Meta de copos de água",
            exercicios: "Meta de exercícios",
            peso: "Meta de peso",
            ofensiva: "Meta ofensiva"
        };
        return nomes[campo] || campo;
    };

    return (
        <>
            <div className="setting-corpo">

                {/* topo com a log (acho que pode ser retirada)*/}

                <div className="topo-setting">
                    <div className="logo-settings">
                        <div className="logo-circulo"></div>
                        <div className="logo-texto">Equilíbrio</div>
                    </div>
                </div>

                {/*botao fechar*/}

                <div className="botao-fechar-container">
                    <div className="botao-fechar">X</div>
                </div>

                {/*todas as configuraçoes*/}

                <div className="configuracoes">
                    <div className="ativar-notificacao">
                        <p className="texto-confg">ativar configuracoes</p>
                        <button className={`ativar ${ativo ? "ativo" : ""}`} onClick={() => setAtivo(!ativo)}>
                            <div className="bola"></div>
                        </button>
                    </div>

                    {Object.entries(dados).map(([campo, valor]) => (
                        <div className="dados" key={campo}>
                            <p>{nomeDoCampo(campo)}</p>
                            <p className="valor-clique" onClick={() => abrirModal(campo)}>{valor}</p>
                        </div>
                    ))}
                </div>

                {/* footer com os nomes dos desenvolvedores*/}

                <div className="desenvolvedores">
                    <h2>desenvolvedores</h2>
                    <p style={{ marginBottom: '40px' }}>Thiago Duarte -Lider Geral</p>
                    <p>Jairo de Cássio -Lider Dev. Front-End</p>
                    <p>Cauã Vitor -Dev. Front-End</p>
                    <p>Lucas Henrique -Dev. Front-End</p>
                    <p>Timoteo Teixeira -Dev. Front-End</p>
                    <p style={{ marginBottom: '40px' }}>Ygor -Dev. Front-End</p>
                    <p>Thiago Duarte -Lider Dev.back-end</p>
                    <p>Cauam Algusto -Dev.back-end</p>
                    <p>Luciano Junior -Dev.back-end</p>
                    <p>Marco túlio-Dev.back-end</p>
                    <p style={{ marginBottom: '40px' }}>Rafael Florindo -Dev.back-end</p>
                    <p style={{ marginBottom: '40px' }}>Matheus Henringer -Documentação</p>
                    <p>Otávio Henringer -UX/UI</p>
                </div>
            </div>

            {/* caixa para alterar as configurações*/}

            {campoSelecionado && (
                <div className="mudanca-fundo">
                    <div className="caixa-mudanca">
                        <p className="titulo-modal">Valor atual: {dados[campoSelecionado]}</p>
                        <div className="novo-valor">
                            <p>Novo Valor:</p>
                            <input
                                value={novoValor}
                                onChange={(e) => setNovoValor(e.target.value)}
                                className="input-modal"
                            />
                        </div>
                        <button onClick={confirmarAlteracao} className="botao-confirmar">
                            Confirmar
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Settings;