import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";

import Dashboard from "./pages/Dashboard/Dashboard";
import Catalogo from "./pages/Catalogo/Catalogo";
import Cadastro from "./pages/Cadastro/Cadastro";
import Detalhes from "./pages/Detalhes/Detalhes";
import Comparador from "./pages/Comparador/Comparador";
import Favoritos from "./pages/Favoritos/Favoritos";

import { AppProvider } from "./services/hooks/useAppState.jsx";
import { ToastProvider } from "./services/hooks/useToast.jsx";

export default function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <div className="appShell">
          <a className="skipLink" href="#conteudo">
            Pular para o conteúdo
          </a>

          <header className="appHeader">
            <Navbar />
          </header>

          <div className="appBody">
            <aside className="appSidebar">
              <Sidebar />
            </aside>

            <main id="conteudo" className="appMain">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/detalhes/:id" element={<Detalhes />} />
                <Route path="/comparador" element={<Comparador />} />
                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>

          <footer className="appFooter">
            <Footer />
          </footer>
        </div>
      </AppProvider>
    </ToastProvider>
  );
}
