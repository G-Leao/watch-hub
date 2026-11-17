import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Catalogo from "./pages/Catalogo/Catalogo";
import Cadastro from "./pages/Cadastro/Cadastro";
import Detalhes from "./pages/Detalhes/Detalhes";
import Comparador from "./pages/Comparador/Comparador";
import Favoritos from "./pages/Favoritos/Favoritos";
import Marcas from "./pages/Marcas/Marcas";
import Marca from "./pages/Marca/Marca";
import { AppProvider } from "./services/hooks/useAppState.jsx";
import { ToastProvider } from "./services/hooks/useToast.jsx";

function ScrollTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <div className="appShell">
          <a className="skipLink" href="#conteudo">Pular para o conteúdo</a>
          <ScrollTop />
          <header className="appHeader"><Navbar /></header>
          <main id="conteudo" className="appMain">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explorar" element={<Catalogo />} />
              <Route path="/catalogo" element={<Navigate to="/explorar" replace />} />
              <Route path="/marcas" element={<Marcas />} />
              <Route path="/marcas/:slug" element={<Marca />} />
              <Route path="/painel" element={<Dashboard />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/detalhes/:id" element={<Detalhes />} />
              <Route path="/comparador" element={<Comparador />} />
              <Route path="/favoritos" element={<Favoritos />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <footer className="appFooter"><Footer /></footer>
        </div>
      </AppProvider>
    </ToastProvider>
  );
}
