import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../images/create a circular image of the same image to fit into the circle as a PNG.png';

// Objeto que simula as classes do CSS module, usado para referenciar os estilos no JSX.
// Em um ambiente de projeto React tradicional, estas viriam do arquivo .module.css.
const styles = {
    loginContainer: 'loginContainer',
    loginBox: 'loginBox',
    logo: 'logo',
    title: 'title',
    inputGroup: 'inputGroup',
    label: 'label',
    input: 'input',
    inputError: 'inputError',
    errorMessage: 'errorMessage',
    options: 'options', // Mantido para o CSS, mas não usado no JSX para "Esqueceu a senha?"
    link: 'link',
    loginButton: 'loginButton',
    separator: 'separator', // Mantido para o CSS, mas não usado no JSX
    socialLogin: 'socialLogin', // Mantido para o CSS, mas não usado no JSX
    socialButton: 'socialButton', // Mantido para o CSS, mas não usado no JSX
    googleButton: 'googleButton', // Mantido para o CSS, mas não usado no JSX
    facebookButton: 'facebookButton', // Mantido para o CSS, mas não usado no JSX
    signupLink: 'signupLink',
    errorMessageGlobal: 'errorMessageGlobal',
    successMessage: 'successMessage'
};

// Componente principal que irá renderizar o Login
const App = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        console.log("Login bem-sucedido. Redirecionando para /home.");
        navigate('/home');
    };

    return (
        <>
            <style>
                {`
                .loginContainer {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background-color: #f0f2f5;
                    padding: 20px;
                    font-family: 'Arial', sans-serif;
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

                .logo {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 20px;
                }

                .title {
                    color: #333;
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
                    color: #555;
                    font-size: 14px;
                    font-weight: 500;
                }

                .input {
                    width: 100%;
                    padding: 12px 15px;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    box-sizing: border-box;
                    font-size: 16px;
                    transition: border-color 0.2s ease-in-out;
                }

                .input:focus {
                    border-color: #007bff;
                    outline: none;
                    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
                }

                .inputError {
                    border-color: #dc3545;
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

                .errorMessageGlobal {
                    color: red;
                    font-size: 14px;
                    margin-bottom: 1rem;
                }

                .successMessage {
                    color: green;
                    font-size: 14px;
                    margin-bottom: 1rem;
                }

                .loginButton {
                    width: 100%;
                    padding: 12px 15px;
                    background-color: #28a745;
                    color: #fff;
                    border: none;
                    border-radius: 6px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.2s ease-in-out;
                }

                .loginButton:hover {
                    background-color: #218838;
                }

                .loginButton:disabled {
                    background-color: #6c757d;
                    cursor: not-allowed;
                }

                .signupLink {
                    margin-top: 20px;
                    font-size: 14px;
                    color: #333;
                }
                .link {
                    color: #007bff;
                    text-decoration: none;
                    font-size: 14px;
                }

                .link:hover {
                    text-decoration: underline;
                }
                `}
            </style>
            <div className={styles.loginContainer}>
                <Login onLoginSuccess={handleLoginSuccess} />
            </div>
        </>
    );
};

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [genericError, setGenericError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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
        } else if (password.length < 6) {
            setPasswordError('A senha deve ter pelo menos 6 caracteres.');
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
            console.log('Resposta da API de Login:', response.data);

            const apiStatus = response.data.status;
            const userProfile = response.data.profile;
            const apiErrors = response.data.errors;

            if (apiStatus === 'sucess' && userProfile) {
                setSuccessMessage('Login realizado com sucesso! Redirecionando...');

                if (onLoginSuccess) {
                    onLoginSuccess(userProfile.id);
                    localStorage.setItem('equilibrioAuthToken', userProfile._id)
                }

                setTimeout(() => {
                    navigate('/home');
                }, 1000);

            } else if (apiErrors && apiErrors.length > 0) {
                setGenericError(apiErrors.join(', '));
                setPassword('');
            } else {
                const errorMessage = response.data.message || response.data.status || "Resposta inesperada do servidor. Tente novamente.";
                setGenericError(errorMessage);
                setPassword('');
            }

        } catch (error) {
            console.error('Erro no login:', error);
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    setGenericError(error.response.data.message);
                } else if (error.response.data.status) {
                    setGenericError(error.response.data.status);
                } else {
                    setGenericError('Ocorreu um erro inesperado do servidor.');
                }
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

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <img src={Logo} alt ="Logo Equilibrio" className={styles.logo}/>
                <h2 className={styles.title}>Login Equilibrio</h2>

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

                    <button
                        type="submit"
                        className={styles.loginButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <div className={styles.signupLink}>
                    <p>Não tem uma conta? <Link to="/cadastro" className={styles.link}>Cadastre-se</Link></p>
                </div>
            </div>
        </div>
    );
};

export default App;