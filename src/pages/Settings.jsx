import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";
import "./Equilibrio.css"; // Se este CSS for relevante para Settings, mantenha.

// Adicione onLogout como uma prop aqui
function Settings({ onLogout }) {
    const navigate = useNavigate();
    const [ativo, setAtivo] = useState(false);
    const [dados, setDados] = useState({
        horario: "20:00",
        copos: "8 copos",
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
                <div className="corpo-topo">
                    <div className="circle"></div>
                    <span className="text">Equilíbrio</span>
                </div>

                <div className="botao-fechar-container">
                    <div
                        className="botao-fechar"
                        onClick={() => navigate("/")}
                    >
                        X
                    </div>
                </div>

                <div className="configuracoes">
                    <div className="ativar-notificacao">
                        <p className="texto-confg">Ativar notificações</p>
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

                {/* Seção do Botão de Logout */}
               <div className="logout-section" >

                    <button onClick={onLogout} className="botao-sair-settings" > Sair (Logout) </button>

                </div>

                <div className="logout-section" >

                    <button onClick={onLogout} className="botao-sair-settings apagar-conta" > Apagar conta </button>

                </div>

                <div className="desenvolvedores">
                    <h2>Desenvolvido por:</h2>
                    {/* ...lista de desenvolvedores... */}
                    <p>Thiago Duarte - Lider Geral / Lider Dev.back-end.</p>
                    <p>Jairo de Cássio - Lider Dev. Front-End.</p>
                    <p>Cauã Vitor - Dev. Front-End.</p>
                    <p>Lucas Henrique - Dev. Front-End.</p>
                    <p>Timoteo Teixeira - Dev. Front-End.</p>
                    <p>Ygor - Dev. Front-End.</p>
                    <p>Cauan Algusto - Dev.back-end.</p>
                    <p>Luciano Junior - Dev.back-end.</p>
                    <p>Marco túlio - Dev.back-end.</p>
                    <p>Rafael Florindo - Dev.back-end.</p>
                    <p>Matheus Henringer - Documentação.</p>
                    <p>Otávio Herdy - UX/UI / Dev. Front-End.</p>
                </div>
            </div>

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