import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar" aria-label="Navegação principal">
      <NavLink to="/" className="brandMark">
        <span className="logo" aria-hidden="true" />
        <span className="brandText">
          <strong>WATCH HUB</strong>
          <span>Seiko • Victorinox • Rolex</span>
        </span>
      </NavLink>

      <div className="navLinks" aria-label="Links">
        <NavLink className="navLink" to="/">
          Dashboard
        </NavLink>
        <NavLink className="navLink" to="/catalogo">
          Catálogo
        </NavLink>
        <NavLink className="navLink" to="/cadastro">
          Cadastro
        </NavLink>
        <NavLink className="navLink" to="/comparador">
          Comparador
        </NavLink>
        <NavLink className="navLink" to="/favoritos">
          Favoritos
        </NavLink>
      </div>
    </nav>
  );
}
