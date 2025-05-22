// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Fogo from "./pages/Fogo";
import PopUp_habitos_saudaveis from "./pages/PopUp_habitos_saudaveis";
import PopUp_Calendario_emocional from "./pages/PopUp_Calendario_emocional";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/popup-habitos" element={<PopUp_habitos_saudaveis />} />
        <Route path="/popup-calendario" element={<PopUp_Calendario_emocional />} />
      </Routes>
    </Router>
  );
}
//
export default App;
