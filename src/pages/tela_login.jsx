// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css'; // Ou o nome correto do seu CSS module

// Mock styles (como antes)
const mockStyles = {
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

const Login = () => { // onLoginSuccess removido
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [genericError, setGenericError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const currentStyles = (typeof styles !== 'undefined' && Object.keys(styles).length > 0) ? styles : mockStyles;

    const validateForm = () => {
        let isValid = true;
        setEmailError('');
        setPasswordError('');
        setGenericError('');
        setSuccessMessage('');
        if (!email) {
            setEmailError('O e-mail é obrigatório.');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Por favor, insira um e-mail válido.');
            isValid = false;
        }
        if (!password) {
            setPasswordError('A senha é obrigatória.');
            isValid = false;
        } else if (password.length < 6) { // Ajuste conforme a validação do backend (agora 4 caracteres)
            setPasswordError('A senha deve ter pelo menos 6 caracteres.'); // Mantenha ou ajuste a mensagem
            isValid = false;
        }
        return isValid;
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setGenericError('');
        setSuccessMessage('');

        const loginData = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post('https://equilibrio-api-node.onrender.com/api/auth/login', loginData);
            console.log('Resposta COMPLETA da API de Login:', response);
            console.log('Dados da Resposta da API de Login:', response.data);

            const apiStatus = response.data.status;
            // const userProfile = response.data.profile; // Mantido para depuração, mas não usado na condição

            // ***** Lógica para redirecionar SEM TOKEN *****
            // Verifica se o status é 'success' (correto) OU 'sucess' (com erro de digitação)
            if (apiStatus === 'success' || apiStatus === 'sucess') {
                setSuccessMessage('Login realizado com sucesso! Redirecionando...');

                setEmail('');
                setPassword('');

                // Redireciona diretamente para a página principal (home) após um pequeno atraso
                setTimeout(() => {
                    navigate('/'); 
                }, 1500); // 1.5 segundos de atraso para exibir a mensagem de sucesso

            } else {
                // Caso a API retorne um status que não seja 'success'/'sucess'
                console.error("Login falhou ou status inesperado na resposta da API:", response.data);
                const errorMessage = response.data.message || response.data.status || "Resposta inesperada do servidor. Tente novamente.";
                setGenericError(errorMessage);
                setPassword('');
            }

        } catch (error) {
            console.error('Erro no login (catch block):', error);
            if (error.response && error.response.data && error.response.data.message) {
                setGenericError(error.response.data.message);
            } else if (error.response && error.response.data && error.response.data.status) {
                setGenericError(error.response.data.status);
            } else if (error.request) {
                setGenericError('Não foi possível conectar ao servidor. Verifique sua conexão.');
            } else {
                setGenericError('Ocorreu um erro ao tentar fazer login. Tente novamente.');
            }
            setPassword('');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFacebookLogin = () => { /* Lógica para login com Facebook */ };
    const handleGoogleLogin = () => { /* Lógica para login com Google */ };

    return (
        <div className={currentStyles.loginContainer}>
            <div className={currentStyles.loginBox}>
                <h2 className={currentStyles.title}>Login Equilibrio</h2>

                {genericError && <p className={currentStyles.errorMessageGlobal} style={{ textAlign: 'center', marginBottom: '1rem', color: 'red' }}>{genericError}</p>}
                {successMessage && <p className={currentStyles.successMessage} style={{ textAlign: 'center', marginBottom: '1rem', color: 'green' }}>{successMessage}</p>}

                <form onSubmit={handleLoginSubmit} noValidate>
                    <div className={currentStyles.inputGroup}>
                        <label htmlFor="email" className={currentStyles.label}>E-mail</label>
                        <input
                            type="email" id="email" placeholder="seuemail@exemplo.com" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`${currentStyles.input} ${emailError ? currentStyles.inputError : ''}`}
                            required
                        />
                        {emailError && <p id="emailError" className={currentStyles.errorMessage}>{emailError}</p>}
                    </div>
                    <div className={currentStyles.inputGroup}>
                        <label htmlFor="password" className={currentStyles.label}>Senha</label>
                        <input
                            type="password" id="password" placeholder="Sua senha" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`${currentStyles.input} ${passwordError ? currentStyles.inputError : ''}`}
                            required
                        />
                        {passwordError && <p id="passwordError" className={currentStyles.errorMessage}>{passwordError}</p>}
                    </div>
                    <div className={currentStyles.options}>
                        <Link to="/esqueceu-senha" className={currentStyles.link}>Esqueceu sua senha?</Link>
                    </div>
                    <button type="submit" className={currentStyles.loginButton} disabled={isLoading}>
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <p className={currentStyles.separator}>ou entre com</p>
                <div className={currentStyles.socialLogin}>
                    <button onClick={handleGoogleLogin} className={`${currentStyles.socialButton} ${currentStyles.googleButton}`}>Google</button>
                    <button onClick={handleFacebookLogin} className={`${currentStyles.socialButton} ${currentStyles.facebookButton}`}>Facebook</button>
                </div>
                <div className={currentStyles.signupLink}>
                    <p>Não tem uma conta? <Link to="/cadastro" className={currentStyles.link}>Cadastre-se</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;