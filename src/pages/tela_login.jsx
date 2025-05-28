// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate pode ser útil após o login
import axios from 'axios'; // Importando o Axios
import styles from './Login.module.css'; // Usaremos um novo CSS module

// Mock para o styles, já que o conteúdo de Login.module.css não foi fornecido
// Em um projeto real, este objeto seria importado do arquivo CSS Module.
const mockStyles = {
  loginContainer: 'loginContainer',
  loginBox: 'loginBox',
  title: 'title',
  inputGroup: 'inputGroup',
  label: 'label',
  input: 'input',
  inputError: 'inputError', // Assumindo que pode haver um inputError também
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
  errorMessageGlobal: 'errorMessageGlobal' // Adicionado para erros genéricos
};

// A prop onLoginSuccess ainda é aceita, mas não será usada no handleLoginSubmit
const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [genericError, setGenericError] = useState(''); // Para erros da API
  const [successMessage, setSuccessMessage] = useState(''); // Para mensagem de sucesso
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Para redirecionar após o login, se necessário

  // Use o styles importado se estiver disponível, senão use o mockStyles
  const currentStyles = (typeof styles !== 'undefined' && Object.keys(styles).length > 0) ? styles : mockStyles;

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setGenericError('');
    setSuccessMessage(''); // Limpa mensagem de sucesso ao validar

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
    console.log('Tentando login com:', email, password);

    const loginData = {
      email: email,
      password: password,
    };

    try {
      // Fazendo a requisição POST com Axios para o endpoint de login
      const response = await axios.post('https://equilibrio-api-node.onrender.com/api/auth/login', loginData);

      console.log('Resposta da API de Login:', response.data);
      // Apenas loga a resposta. Nenhuma manipulação de token ou callback onLoginSuccess.
      // Você pode adicionar uma mensagem de sucesso para o usuário se desejar.
      setSuccessMessage(response.data.message || 'Login realizado com sucesso!'); // Usa a mensagem da API ou uma padrão

      // Limpar campos após sucesso (opcional, dependendo do fluxo desejado)
      // setEmail('');
      // setPassword('');

      // Exemplo: Redirecionar para um dashboard após o login
      // setTimeout(() => navigate('/dashboard'), 2000); // Adiciona um pequeno delay para o usuário ver a mensagem

    } catch (error) {
      console.error('Erro no login:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setGenericError(error.response.data.message);
      } else if (error.request) {
        setGenericError('Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.');
      } else {
        setGenericError('Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.');
      }
      // Limpar apenas o campo de senha em caso de erro pode ser uma boa prática
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = () => {
    console.log('Login via Facebook');
    // Implementação do login via Facebook (requer SDK)
    // Se implementado, também deveria chamar onLoginSuccess (ou lógica similar)
  };

  const handleGoogleLogin = () => {
    console.log('Login via Google');
    // Implementação do login via Google (requer SDK/biblioteca)
    // Se implementado, também deveria chamar onLoginSuccess (ou lógica similar)
  };

  return (
    <div className={currentStyles.loginContainer}>
      <div className={currentStyles.loginBox}>
        <h2 className={currentStyles.title}>Login Equilibrio</h2>

        {genericError && <p className={currentStyles.errorMessageGlobal} style={{textAlign: 'center', marginBottom: '1rem', color: 'red'}}>{genericError}</p>}
        {successMessage && <p className={currentStyles.successMessage} style={{textAlign: 'center', marginBottom: '1rem', color: 'green'}}>{successMessage}</p>}


        <form onSubmit={handleLoginSubmit} noValidate>
          <div className={currentStyles.inputGroup}>
            <label htmlFor="email" className={currentStyles.label}>E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${currentStyles.input} ${emailError ? currentStyles.inputError : ''}`}
              aria-describedby="emailError"
              required
            />
            {emailError && <p id="emailError" className={currentStyles.errorMessage}>{emailError}</p>}
          </div>

          <div className={currentStyles.inputGroup}>
            <label htmlFor="password" className={currentStyles.label}>Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${currentStyles.input} ${passwordError ? currentStyles.inputError : ''}`}
              aria-describedby="passwordError"
              required
            />
            {passwordError && <p id="passwordError" className={currentStyles.errorMessage}>{passwordError}</p>}
          </div>

          <div className={currentStyles.options}>
            <Link to="/esqueceu-senha" className={currentStyles.link}>Esqueceu sua senha?</Link>
          </div>

          <button
            type="submit"
            className={currentStyles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className={currentStyles.separator}>ou entre com</p>

        <div className={currentStyles.socialLogin}>
          <button
            onClick={handleGoogleLogin}
            className={`${currentStyles.socialButton} ${currentStyles.googleButton}`}
            type="button"
            aria-label="Login com Google"
          >
            Google
          </button>
          <button
            onClick={handleFacebookLogin}
            className={`${currentStyles.socialButton} ${currentStyles.facebookButton}`}
            type="button"
            aria-label="Login com Facebook"
          >
            Facebook
          </button>
        </div>

        <div className={currentStyles.signupLink}>
          <p>Não tem uma conta? <Link to="/cadastro" className={currentStyles.link}>Cadastre-se</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
