import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Objeto que simula as classes de um CSS module.
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

        const loginData = { email, password };

        try {
            const response = await axios.post('https://equilibrio-api-node.onrender.com/api/auth/login', loginData);

            const apiStatus = response.data.status;
            const userProfile = response.data.profile;

            if (apiStatus === 'success' && userProfile && userProfile.token) {
                setSuccessMessage('Login realizado com sucesso! Redirecionando...');

                if (onLoginSuccess) {
                    localStorage.setItem('equilibrioAuthToken', userProfile.token);
                    localStorage.setItem('userId', userProfile.id);
                    onLoginSuccess(userProfile.token);
                }

                setEmail('');
                setPassword('');

            } else {
                const errorMessage = response.data.message || "Resposta inesperada do servidor.";
                setGenericError(errorMessage);
            }

        } catch (error) {
            console.error('Erro no login:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setGenericError(error.response.data.message);
            } else {
                setGenericError('Não foi possível conectar ao servidor. Verifique sua conexão.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleFacebookLogin = () => { console.log("Login com Facebook"); };
    const handleGoogleLogin = () => { console.log("Login com Google"); };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <h2 className={styles.title}>Login Equilibrio</h2>

                {genericError && <p className={styles.errorMessageGlobal} style={{color: 'red'}}>{genericError}</p>}
                {successMessage && <p className={styles.successMessage} style={{color: 'green'}}>{successMessage}</p>}

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
                        {emailError && <p className={styles.errorMessage}>{emailError}</p>}
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
                    <button type="submit" className={styles.loginButton} disabled={isLoading}>
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <p className={styles.separator}>ou entre com</p>

                <div className={styles.socialLogin}>
                    <button onClick={handleGoogleLogin} className={`${styles.socialButton} ${styles.googleButton}`}>Google</button>
                    <button onClick={handleFacebookLogin} className={`${styles.socialButton} ${styles.facebookButton}`}>Facebook</button>
                </div>
                <div className={styles.signupLink}>
                    <p>Não tem uma conta? <Link to="/cadastro" className={styles.link}>Cadastre-se</Link></p>
                </div>
            </div>
        </div>
    );
};

// Verifique se o nome do arquivo é Login.jsx e não App.jsx
export default Login;