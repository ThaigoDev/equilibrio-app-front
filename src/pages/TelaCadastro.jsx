// src/pages/TelaCadastro.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate para redirecionar após o cadastro
import styles from './TelaCadastro.module.css'; // Usaremos um novo CSS module

const TelaCadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nomeError, setNomeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [genericError, setGenericError] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    setNomeError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setGenericError('');
    setSuccessMessage('');

    if (!nome.trim()) {
      setNomeError('O nome é obrigatório.');
      isValid = false;
    }

    if (!email.trim()) {
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

    if (!confirmPassword) {
      setConfirmPasswordError('A confirmação da senha é obrigatória.');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('As senhas não coincidem.');
      isValid = false;
    }

    return isValid;
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    console.log('Tentando cadastro com:', nome, email, password);

    // Simulação de chamada à API de cadastro
    try {
      // Substitua isso pela sua lógica de chamada à API real
      // Ex: const response = await fetch('/api/register', { method: 'POST', body: JSON.stringify({ nome, email, password }) });
      // const data = await response.json();
      // if (response.ok) {
      //   setSuccessMessage('Cadastro realizado com sucesso! Você será redirecionado para o login.');
      //   setTimeout(() => navigate('/login'), 3000); // Redireciona após 3s
      // } else {
      //   setGenericError(data.message || 'Falha no cadastro. Verifique os dados ou tente novamente.');
      // }
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simula delay da API
      
      // Simulação de sucesso
      setSuccessMessage('Cadastro realizado com sucesso! Você será redirecionado para o login em alguns segundos.');
      setNome('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        navigate('/login'); // Redireciona para a tela de login
      }, 3000); // Atraso para o usuário ler a mensagem

    } catch (error) {
      console.error('Erro no cadastro:', error);
      setGenericError('Ocorreu um erro ao tentar realizar o cadastro. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.cadastroContainer}>
      <div className={styles.cadastroBox}>
        <h2 className={styles.title}>Criar Conta no Equilibrio</h2>

        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        {genericError && <p className={styles.errorMessageGlobal}>{genericError}</p>}

        <form onSubmit={handleSignupSubmit} noValidate>
          <div className={styles.inputGroup}>
            <label htmlFor="nome" className={styles.label}>Nome Completo</label>
            <input
              type="text"
              id="nome"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={`${styles.input} ${nomeError ? styles.inputError : ''}`}
              aria-describedby="nomeError"
              required
            />
            {nomeError && <p id="nomeError" className={styles.errorMessage}>{nomeError}</p>}
          </div>

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
              placeholder="Crie uma senha (mín. 6 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
              aria-describedby="passwordError"
              required
            />
            {passwordError && <p id="passwordError" className={styles.errorMessage}>{passwordError}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirmar Senha</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${styles.input} ${confirmPasswordError ? styles.inputError : ''}`}
              aria-describedby="confirmPasswordError"
              required
            />
            {confirmPasswordError && <p id="confirmPasswordError" className={styles.errorMessage}>{confirmPasswordError}</p>}
          </div>

          <button
            type="submit"
            className={styles.cadastroButton}
            disabled={isLoading}
          >
            {isLoading ? 'Cadastrando...' : 'Criar Conta'}
          </button>
        </form>

        <div className={styles.loginLink}>
          <p>Já tem uma conta? <Link to="/login" className={styles.link}>Faça login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default TelaCadastro;