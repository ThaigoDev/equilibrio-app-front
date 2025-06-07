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

const Login = ({ onLoginSuccess }) => { // onLoginSuccess é recebido via props
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
        } else if (password.length < 6) { // Ajuste conforme a validação do backend (agora 4 caracteres)
            setPasswordError('A senha deve ter pelo menos 6 caracteres.'); // Mantenha ou ajuste a mensagem
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
            console.log('Resposta da API de Login:', response.data); // Mantenha para debug

            const apiStatus = response.data.status;
            const userProfile = response.data.profile;
 HEAD

            const apiErrors = response.data.errors;
 3aaff88ed1990bb84a6d8b262986682cf7e53f30

            if (apiStatus === 'sucess' && userProfile && userProfile.token) { // Adicionei verificação de userProfile.token
                setSuccessMessage('Login realizado com sucesso! Redirecionando...');
 HEAD

                // ***** CORREÇÃO AQUI: CHAME onLoginSuccess com o token recebido *****
                if (onLoginSuccess) {
                    console.log("Login.jsx: Chamando onLoginSuccess com o token:", userProfile.token);
                    onLoginSuccess(userProfile.token); // Passa o token para o App.jsx

                
                // Chama a função onLoginSuccess passada via props.
                if (onLoginSuccess) { 
                
                    onLoginSuccess(userProfile.id);
                     localStorage.setItem('equilibrioAuthToken', userProfile._id) // userProfile ainda é passado para a prop onLoginSuccess
                    3aaff88ed1990bb84a6d8b262986682cf7e53f30
                }

                setEmail('');
                setPassword('');

                // O redirecionamento será tratado pelo App.jsx uma vez que o authToken seja atualizado.
                // Remover o setTimeout aqui para evitar conflito com a navegação do App.jsx
                // setTimeout(() => {
                //   navigate('/'); // Redireciona para a página principal (home)
                // }, 1500);

            } else {
                console.error("Login falhou ou perfil/token não encontrado na resposta da API:", response.data);
                const errorMessage = response.data.message || response.data.status || "Resposta inesperada do servidor. Tente novamente.";
                setGenericError(errorMessage);
                setPassword('');
            }

        } catch (error) {
            console.error('Erro no login:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setGenericError(error.response.data.message);
            } else if (error.response && error.response.data && error.response.data.status) {
                setGenericError(error.response.data.status);
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
