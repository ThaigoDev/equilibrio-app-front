import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// A importação de 'Login.module.css' foi removida para resolver o erro de compilação.
// Os estilos visuais são aplicados através da tag <style> e as classes embutidas no código.

// Objeto que simula as classes do CSS module, usado para referenciar os estilos no JSX.
// Em um ambiente de projeto React tradicional, estas viriam do arquivo .module.css.
const styles = {
    loginContainer: 'loginContainer',
    loginBox: 'loginBox',
    title: 'title',
    inputGroup: 'inputGroup',
    label: 'label',
    input: 'input',
    inputError: 'inputError',
    errorMessage: 'errorMessage',
    options: 'options',
    link: 'link',
    loginButton: 'loginButton',
    separator: 'separator',
    socialLogin: 'socialLogin',
    socialButton: 'socialButton',
    googleButton: 'googleButton',
    facebookButton: 'facebookButton',
    signupLink: 'signupLink',
    errorMessageGlobal: 'errorMessageGlobal',
    successMessage: 'successMessage'
};


// Componente principal que irá renderizar o Login
const App = () => {
    const navigate = useNavigate();

    // Função para lidar com o sucesso do login.
    const handleLoginSuccess = () => {
        console.log("Login bem-sucedido. Redirecionando para /home.");
        navigate('/home'); // Redireciona para a página home
    };

    return (
        // A tag <style> com o CSS completo é adicionada aqui para garantir que os estilos sejam aplicados.
        // Isto é necessário para a compilação e visualização no ambiente do Canvas.
        <>
            <style>
                {`
                .loginContainer {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background-color: #f0f2f5; /* Um cinza claro para o fundo */
                    padding: 20px;
                    font-family: 'Arial', sans-serif; /* Fonte genérica, substitua pela do seu app */
                }

                .loginBox {
                    background-color: #fff;
                    padding: 30px 40px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 400px;
                    text-align: center;
                }

                .title {
                    color: #333; /* Cor escura para o título */
                    margin-bottom: 25px;
                    font-size: 24px;
                    font-weight: 600;
                }

                .inputGroup {
                    margin-bottom: 20px;
                    text-align: left;
                }

                .label {
                    display: block;
                    margin-bottom: 8px;
                    color: #555; /* Cor mais suave para labels */
                    font-size: 14px;
                    font-weight: 500;
                }

                .input {
                    width: 100%;
                    padding: 12px 15px;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    box-sizing: border-box; /* Importante para o padding não aumentar o tamanho total */
                    font-size: 16px;
                    transition: border-color 0.2s ease-in-out;
                }

                .input:focus {
                    border-color: #007bff; /* Um azul para indicar foco, ajuste para sua paleta */
                    outline: none;
                    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
                }

                .inputError {
                    border-color: #dc3545; /* Vermelho para erros */
                }

                .inputError:focus {
                    border-color: #dc3545;
                    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
                }

                .errorMessage {
                    color: #dc3545;
                    font-size: 12px;
                    margin-top: 5px;
                }

                .options {
                    text-align: right;
                    margin-bottom: 20px;
                }

                .link {
                    color: #007bff; /* Azul para links */
                    text-decoration: none;
                    font-size: 14px;
                }

                .link:hover {
                    text-decoration: underline;
                }

                .loginButton {
                    width: 100%;
                    padding: 12px 15px;
                    background-color: #28a745; /* Verde para o botão principal - pensando em "equilibrio" */
                    color: #fff;
                    border: none;
                    border-radius: 6px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.2s ease-in-out;
                }

                .loginButton:hover {
                    background-color: #218838; /* Verde mais escuro no hover */
                }

                .loginButton:disabled {
                    background-color: #6c757d;
                    cursor: not-allowed;
                }

                .separator {
                    margin: 25px 0;
                    color: #6c757d;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    text-align: center;
                }

                .separator::before,
                .separator::after {
                    content: '';
                    flex: 1;
                    border-bottom: 1px solid #ddd;
                }

                .separator:not(:empty)::before {
                    margin-right: .25em;
                }

                .separator:not(:empty)::after {
                    margin-left: .25em;
                }

                .socialLogin {
                    display: flex;
                    flex-direction: column; /* Ou 'row' se preferir lado a lado */
                    gap: 10px; /* Espaço entre os botões sociais */
                    margin-bottom: 25px;
                }

                .socialButton {
                    padding: 10px 15px;
                    border: none;
                    border-radius: 6px;
                    font-size: 15px;
                    color: #fff;
                    cursor: pointer;
                    transition: opacity 0.2s ease-in-out;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px; /* Espaço para ícones, se adicionados */
                }

                .socialButton:hover {
                    opacity: 0.9;
                }

                .googleButton {
                    background-color: #db4437; /* Cor do Google */
                }

                .facebookButton {
                    background-color: #3b5998; /* Cor do Facebook */
                }

                .signupLink {
                    margin-top: 20px;
                    font-size: 14px;
                    color: #333;
                }
                `}
            </style>
            <div className={styles.loginContainer}> {/* Usando a classe CSS aqui para o container */}
                {/* O componente Login é renderizado aqui, passando a função de sucesso */}
                <Login onLoginSuccess={handleLoginSuccess} />
            </div>
        </>
    );
};


const Login = ({ onLoginSuccess }) => {
    // Estados para os campos do formulário e mensagens de erro/sucesso
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [genericError, setGenericError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // Hook para navegação programática

    // Função para validar os campos do formulário antes do envio
    const validateForm = () => {
        let isValid = true;
        // Limpa mensagens de erro e sucesso anteriores
        setEmailError('');
        setPasswordError('');
        setGenericError('');
        setSuccessMessage('');

        // Validação do campo de e-mail
        if (!email) {
            setEmailError('O e-mail é obrigatório.');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Por favor, insira um e-mail válido.');
            isValid = false;
        }

        // Validação do campo de senha
        if (!password) {
            setPasswordError('A senha é obrigatória.');
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError('A senha deve ter pelo menos 6 caracteres.');
            isValid = false;
        }
        return isValid;
    };

    // Função assíncrona para lidar com a submissão do formulário de login
    const handleLoginSubmit = async (event) => {
        event.preventDefault(); // Previne o recarregamento da página

        // Se a validação falhar, não prossegue
        if (!validateForm()) {
            return;
        }

        setIsLoading(true); // Ativa o estado de carregamento
        setGenericError(''); // Limpa erros genéricos anteriores
        setSuccessMessage(''); // Limpa mensagens de sucesso anteriores

        // Dados a serem enviados para a API
        const loginData = {
            email: email,
            password: password,
        };

        try {
            // Requisição POST para o endpoint de login da API
            const response = await axios.post('https://equilibrio-api-node.onrender.com/api/auth/login', loginData);
            console.log('Resposta da API de Login:', response.data);

            const apiStatus = response.data.status;
            const userProfile = response.data.profile;
            const apiErrors = response.data.errors; // Para erros de validação do backend

            // Verifica se o login foi bem-sucedido (status "sucess" e perfil de usuário)
            if (apiStatus === 'sucess' && userProfile) {
                setSuccessMessage('Login realizado com sucesso! Redirecionando...');
                
                // Chama a função onLoginSuccess passada via props.
                if (onLoginSuccess) {
                    onLoginSuccess(userProfile); // userProfile ainda é passado para a prop onLoginSuccess
                }

                // Redireciona para a página home após um pequeno atraso (para exibir a mensagem de sucesso)
                setTimeout(() => {
                    navigate('/home'); 
                }, 1000);

            } else if (apiErrors && apiErrors.length > 0) {
                // Se a API retornar erros de validação (ex: e-mail ou senha incorretos)
                setGenericError(apiErrors.join(', ')); // Concatena os erros para exibição
                setPassword(''); // Limpa a senha para nova tentativa
            } else {
                // Se o status não for "sucess" ou o perfil não for encontrado, exibe mensagem de erro genérica
                const errorMessage = response.data.message || response.data.status || "Resposta inesperada do servidor. Tente novamente.";
                setGenericError(errorMessage);
                setPassword('');
            }

        } catch (error) {
            // Tratamento de erros de rede ou de resposta da API
            console.error('Erro no login:', error);
            if (error.response && error.response.data) {
                // Erros de resposta do servidor (ex: 401 Unauthorized, 404 Not Found)
                if (error.response.data.message) {
                    setGenericError(error.response.data.message);
                } else if (error.response.data.status) {
                    setGenericError(error.response.data.status);
                } else {
                    setGenericError('Ocorreu um erro inesperado do servidor.');
                }
            } else if (error.request) {
                // Erro de rede: servidor não respondeu
                setGenericError('Não foi possível conectar ao servidor. Verifique sua conexão.');
            } else {
                // Outros erros
                setGenericError('Ocorreu um erro ao tentar fazer login. Tente novamente.');
            }
            setPassword(''); // Limpa a senha em caso de erro
        } finally {
            setIsLoading(false); // Desativa o estado de carregamento, independentemente do sucesso ou falha
        }
    };

    // Funções mock para login social (podem ser implementadas futuramente)
    const handleFacebookLogin = () => { console.log("Login com Facebook"); };
    const handleGoogleLogin = () => { console.log("Login com Google"); };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <h2 className={styles.title}>Login Equilibrio</h2>

                {/* Exibição de mensagens de erro ou sucesso */}
                {genericError && (
                    <p className={styles.errorMessageGlobal} style={{ textAlign: 'center', marginBottom: '1rem', color: 'red' }}>
                        {genericError}
                    </p>
                )}
                {successMessage && (
                    <p className={styles.successMessage} style={{ textAlign: 'center', marginBottom: '1rem', color: 'green' }}>
                        {successMessage}
                    </p>
                )}

                {/* Formulário de Login */}
                <form onSubmit={handleLoginSubmit} noValidate>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>E-mail</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="seuemail@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`${styles.input} ${emailError ? styles.inputError : ''}`}
                            required
                        />
                        {emailError && <p id="emailError" className={styles.errorMessage}>{emailError}</p>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>Senha</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
                            required
                        />
                        {passwordError && <p id="passwordError" className={styles.errorMessage}>{passwordError}</p>}
                    </div>

                    <div className={styles.options}>
                        <Link to="/esqueceu-senha" className={styles.link}>Esqueceu sua senha?</Link>
                    </div>

                    <button
                        type="submit"
                        className={styles.loginButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                {/* Separador para opções de login social */}
                <p className={styles.separator}>
                    ou entre com
                </p>

                {/* Botões de Login Social */}
                <div className={styles.socialLogin}>
                    <button
                        onClick={handleGoogleLogin}
                        className={`${styles.socialButton} ${styles.googleButton}`}
                    >
                        Google
                    </button>
                    <button
                        onClick={handleFacebookLogin}
                        className={`${styles.socialButton} ${styles.facebookButton}`}
                    >
                        Facebook
                    </button>
                </div>

                {/* Link para Cadastro */}
                <div className={styles.signupLink}>
                    <p>Não tem uma conta? <Link to="/cadastro" className={styles.link}>Cadastre-se</Link></p>
                </div>
            </div>
        </div>
    );
};

export default App;
