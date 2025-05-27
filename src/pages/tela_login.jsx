import React, { useState } from 'react';
import styles from './Login.module.css';

// 1. Adicione onLoginSuccess como uma prop aqui
const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

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
    console.log('Tentando login com:', email, password);

    try {
      // Simulação de chamada à API
      await new Promise(resolve => setTimeout(resolve, 1500));
      const fakeToken = "seu-token-jwt-aqui"; // Simula um token recebido da API
      console.log('Login simulado bem-sucedido!');

      // 2. Chame onLoginSuccess com o token (ou dados do usuário)
      if (onLoginSuccess) {
        onLoginSuccess(fakeToken);
      }

    } catch (error) {
      console.error('Erro no login:', error);
      setPasswordError('Ocorreu um erro. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = () => {
    console.log('Login via Facebook');
    // Implementação do login via Facebook (requer SDK)
    // Se implementado, também deveria chamar onLoginSuccess
  };

  const handleGoogleLogin = () => {
    console.log('Login via Google');
    // Implementação do login via Google (requer SDK/biblioteca)
    // Se implementado, também deveria chamar onLoginSuccess
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Login Equilibrio</h2>
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
              aria-describedby="emailError"
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
              aria-describedby="passwordError"
              required
            />
            {passwordError && <p id="passwordError" className={styles.errorMessage}>{passwordError}</p>}
          </div>

          <div className={styles.options}>
            <a href="/esqueceu-senha" className={styles.link}>Esqueceu sua senha?</a>
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className={styles.separator}>ou entre com</p>

        <div className={styles.socialLogin}>
          <button
            onClick={handleGoogleLogin}
            className={`${styles.socialButton} ${styles.googleButton}`}
            type="button"
            aria-label="Login com Google"
          >
            Google
          </button>
          <button
            onClick={handleFacebookLogin}
            className={`${styles.socialButton} ${styles.facebookButton}`}
            type="button"
            aria-label="Login com Facebook"
          >
            Facebook
          </button>
        </div>

        <div className={styles.signupLink}>
          <p>Não tem uma conta? <a href="/cadastro" className={styles.link}>Cadastre-se</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;