import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footerRow">
      <strong className="brandText">Watch Hub</strong>
      <nav className="footerNav" aria-label="Rodapé">
        <Link to="/explorar">Acervo</Link>
        <Link to="/marcas">Manufaturas</Link>
        <Link to="/favoritos">Favoritos</Link>
        <Link to="/comparador">Comparar</Link>
        <Link to="/cadastro">Cadastrar</Link>
      </nav>
      <span className="muted">© {new Date().getFullYear()} Watch Hub</span>
    </div>
  );
}
