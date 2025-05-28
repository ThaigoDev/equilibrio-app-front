// src/pages/TelaCadastro.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate para redirecionar após o cadastro
import axios from 'axios'; // Importando o Axios
import styles from './TelaCadastro.module.css'; // Usaremos um novo CSS module

// Mock para o styles, já que o conteúdo de TelaCadastro.module.css não foi fornecido
// Em um projeto real, este objeto seria importado do arquivo CSS Module.
const mockStyles = {
  cadastroContainer: 'cadastroContainer',
  cadastroBox: 'cadastroBox',
  title: 'title',
  successMessage: 'successMessage',
  errorMessageGlobal: 'errorMessageGlobal',
  inputGroup: 'inputGroup',
  label: 'label',
  input: 'input',
  inputError: 'inputError',
  errorMessage: 'errorMessage',
  cadastroButton: 'cadastroButton',
  loginLink: 'loginLink',
  link: 'link',
};

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

  // Use o styles importado se estiver disponível, senão use o mockStyles
  // A verificação 'styles && Object.keys(styles).length > 0' garante que 'styles' não é undefined e não é um objeto vazio.
  // Se o import falhar ou o CSS module estiver vazio, mockStyles será usado.
  const currentStyles = (typeof styles !== 'undefined' && Object.keys(styles).length > 0) ? styles : mockStyles;


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
    setGenericError('');
    setSuccessMessage('');

    const userData = {
      name: nome,
      email: email,
      password: password,
      passwordConfirmed: confirmPassword,
    };

    console.log('Tentando cadastro com:', userData);

    try {
      const response = await axios.post('https://equilibrio-api-node.onrender.com/api/auth/register', userData);
      console.log('Resposta da API:', response.data);

      setSuccessMessage(response.data.message || 'Cadastro realizado com sucesso! Você será redirecionado para o login.');
      setNome('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (error) {
      console.error('Erro no cadastro:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setGenericError(error.response.data.message);
      } else if (error.request) {
        setGenericError('Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.');
      } else {
        setGenericError('Ocorreu um erro ao tentar realizar o cadastro. Tente novamente mais tarde.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={currentStyles.cadastroContainer}>
      <div className={currentStyles.cadastroBox}>
        <h2 className={currentStyles.title}>Criar Conta no Equilibrio</h2>

        {successMessage && <p className={currentStyles.successMessage}>{successMessage}</p>}
        {genericError && <p className={currentStyles.errorMessageGlobal}>{genericError}</p>}

        <form onSubmit={handleSignupSubmit} noValidate>
          <div className={currentStyles.inputGroup}>
            <label htmlFor="nome" className={currentStyles.label}>Nome Completo</label>
            <input
              type="text"
              id="nome"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={`${currentStyles.input} ${nomeError ? currentStyles.inputError : ''}`}
              aria-describedby="nomeError"
              required
            />
            {nomeError && <p id="nomeError" className={currentStyles.errorMessage}>{nomeError}</p>}
          </div>

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
              placeholder="Crie uma senha (mín. 6 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${currentStyles.input} ${passwordError ? currentStyles.inputError : ''}`}
              aria-describedby="passwordError"
              required
            />
            {passwordError && <p id="passwordError" className={currentStyles.errorMessage}>{passwordError}</p>}
          </div>

          <div className={currentStyles.inputGroup}>
            <label htmlFor="confirmPassword" className={currentStyles.label}>Confirmar Senha</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${currentStyles.input} ${confirmPasswordError ? currentStyles.inputError : ''}`}
              aria-describedby="confirmPasswordError"
              required
            />
            {confirmPasswordError && <p id="confirmPasswordError" className={currentStyles.errorMessage}>{confirmPasswordError}</p>}
          </div>

          <button
            type="submit"
            className={currentStyles.cadastroButton}
            disabled={isLoading}
          >
            {isLoading ? 'Cadastrando...' : 'Criar Conta'}
          </button>
        </form>

        <div className={currentStyles.loginLink}>
          <p>Já tem uma conta? <Link to="/login" className={currentStyles.link}>Faça login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default TelaCadastro;
