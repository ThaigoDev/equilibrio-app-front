// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

// Suas importações de página
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Fogo from "./pages/Fogo";
import PopUp_habitos_saudaveis from "./pages/PopUp_habitos_saudaveis";
import PopUp_Calendario_emocional from "./pages/PopUp_Calendario_emocional";
import TelaLogin from "./pages/tela_login";
import TelaCadastro from "./pages/TelaCadastro";

// --- Componente de Layout Compartilhado ---
const SharedLayout = ({ title = "App Equilibrio" }) => {
    return (
        <div>
            <header style={{ padding: '10px 20px', background: '#f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
                <h2>{title}</h2>
                {/* Você pode adicionar navegação global aqui se for o caso */}
            </header>
            <main style={{ padding: '20px' }}>
                <Outlet />
            </main>
        </div>
    );
};

// --- Componente de Rota Protegida ---
const ProtectedRoute = ({ isAuthenticated }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

function App() {
    const [authToken, setAuthToken] = useState(localStorage.getItem('equilibrioAuthToken'));

    // Efeito para sincronizar authToken com localStorage
    useEffect(() => {
        if (authToken) {
            localStorage.setItem('equilibrioAuthToken', authToken);
        } else {
            localStorage.removeItem('equilibrioAuthToken');
        }
    }, [authToken]);

    // Função para lidar com o sucesso do login
    const handleLoginSuccess = (token) => {
        setAuthToken(token);
    };

    // Função para lidar com o logout
    const handleLogout = () => {
        setAuthToken(null);
    };

    // Definição das rotas
    const publicRoutes = [
        { path: "/login", element: authToken ? <Navigate to="/" replace /> : <TelaLogin onLoginSuccess={handleLoginSuccess} /> },
        { path: "/cadastro", element: authToken ? <Navigate to="/" replace /> : <TelaCadastro /> },
        { path: "/home", element: <Home /> }, // Rota para testes ou como fallback
    ];

    const privateRoutes = [
        { path: "/", element: <Home /> },
        { path: "/settings", element: <Settings onLogout={handleLogout} /> },
        { path: "/fogo", element: <Fogo /> },
        { path: "/popup-habitos", element: <PopUp_habitos_saudaveis /> },
        { path: "/popup-calendario", element: <PopUp_Calendario_emocional /> },
        { path: "/signup", element: <Home /> }, // Se /signup for uma rota interna protegida
    ];

    return (
        <Router>
            <Routes>
                {/* Rotas públicas */}
                {publicRoutes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}

                {/* Agrupador de Rotas Protegidas */}
                <Route element={<ProtectedRoute isAuthenticated={!!authToken} />}>
                    <Route element={<SharedLayout />}>
                        {privateRoutes.map((route, index) => (
                            <Route key={index} path={route.path} element={route.element} />
                        ))}
                    </Route>
                </Route>

                {/* Catch-all para rotas não encontradas */}
                <Route
                    path="*"
                    element={<Navigate to={authToken ? "/" : "/login"} replace />}
                />
            </Routes>
        </Router>
    );
}

export default App;