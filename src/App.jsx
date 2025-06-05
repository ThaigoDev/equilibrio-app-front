// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

// Suas importações de página
import Home from "./pages/Home";
import Settings from "./pages/Settings"; // Import do Settings
import Fogo from "./pages/Fogo";
import PopUp_habitos_saudaveis from "./pages/PopUp_habitos_saudaveis";
import PopUp_Calendario_emocional from "./pages/PopUp_Calendario_emocional";
import TelaLogin from "./pages/tela_login";
import TelaCadastro from "./pages/TelaCadastro";

// --- Componente de Layout Compartilhado (MODIFICADO) ---
const SharedLayout = () => { // Removida a prop onLogout daqui, se não for mais usada pelo layout em si
  console.log("SHAREDLAYOUT: Renderizando.");
  return (
    <div>
      <header style={{ padding: '10px 20px', background: '#f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
        <h2>App Equilibrio (Layout Compartilhado)</h2>
        {/* Botão Sair REMOVIDO daqui */}
      </header>
      <main style={{ padding: '20px' }}>
        <Outlet /> 
      </main>
    </div>
  );
};

// --- Componente de Rota Protegida (permanece o mesmo) ---
const ProtectedRoute = ({ isAuthenticated, children }) => {
  console.log("PROTECTEDROUTE: Verificando autenticação. isAuthenticated:", isAuthenticated);
  if (!isAuthenticated) {
    console.log("PROTECTEDROUTE: Não autenticado, redirecionando para /login");
    return <Navigate to="/home" replace />;
  }
  console.log("PROTECTEDROUTE: Autenticado, renderizando Outlet");
  return <Outlet />;
};

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('equilibrioAuthToken'));
  // ... (console.logs e useEffect como antes) ...
  console.log("APP.JSX: Estado inicial de authToken:", authToken);

  useEffect(() => {
    console.log("APP.JSX useEffect: authToken mudou para:", authToken);
    if (authToken) {
      localStorage.setItem('equilibrioAuthToken', authToken);
    } else {
      localStorage.removeItem('equilibrioAuthToken');
    }
  }, [authToken]);


  const handleLoginSuccess = (token) => {
    console.log("APP.JSX handleLoginSuccess: Recebeu token:", token);
    setAuthToken(token);
  };

  const handleLogout = () => {
    console.log("APP.JSX handleLogout: Saindo...");
    setAuthToken(null);
  };

  return (
    <Router>
      <Routes>
        {/* Rotas públicas (Login, Cadastro, TestHome) como antes */}
        <Route
          path="/login"
          element={ authToken ? (<Navigate to="/" replace />) : (<TelaLogin onLoginSuccess={handleLoginSuccess} />) }
        />
        <Route
          path="/cadastro"
          element={ authToken ? (<Navigate to="/" replace />) : (<TelaCadastro />) }
        />
        <Route path="/home" element={<Home />} /> {/* Se ainda estiver usando para testes */}

        {/* Agrupador de Rotas Protegidas */}
        <Route element={<ProtectedRoute  />}>
          {/* SharedLayout não precisa mais da prop onLogout aqui, se ela não for usada por ele */}
          <Route element={<SharedLayout />}>
            <Route path="/" element={<Home />} />
           
            
            {/* MODIFICADO: Passando handleLogout para o componente Settings */}
            <Route path="/settings" element={<Settings onLogout={handleLogout} />} /> 
            
            <Route path="/fogo" element={<Fogo />} />
            <Route path="/popup-habitos" element={<PopUp_habitos_saudaveis />} />
            <Route path="/popup-calendario" element={<PopUp_Calendario_emocional />} />
            <Route path="/signup" element={<Home />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={<Navigate to={authToken ? "/" : "/login"} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;