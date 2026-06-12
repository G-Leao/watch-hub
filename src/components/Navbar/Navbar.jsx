import React, { useId, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const regionId = useId();

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <nav className="navbar" aria-label="Navegação principal">

      <NavLink to="/" className="brandMark">
        <span className="logo" aria-hidden="true" />
        <span className="brandText">
          <strong>WATCH HUB</strong>
          <span>Seiko • Victorinox • Rolex</span>
        </span>
      </NavLink>

      <button
        type="button"
        className="burgerButton"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
        aria-controls={regionId}
        onClick={() => setIsOpen((v) => !v)}
      >
        <span className="burgerIcon" aria-hidden="true" />
      </button>

      <div
        className={isOpen ? "navLinks navLinksOpen" : "navLinks"}
        id={regionId}
        aria-label="Links"
        role="region"
      >
        <NavLink className="navLink" to="/" onClick={closeMenu}>
          Dashboard
        </NavLink>

        <NavLink className="navLink" to="/catalogo" onClick={closeMenu}>
          Catálogo
        </NavLink>
        <NavLink className="navLink" to="/cadastro" onClick={closeMenu}>
          Cadastro
        </NavLink>
        <NavLink className="navLink" to="/comparador" onClick={closeMenu}>
          Comparador
        </NavLink>
        <NavLink className="navLink" to="/favoritos" onClick={closeMenu}>
          Favoritos
        </NavLink>

      </div>
    </nav>
  );
}

