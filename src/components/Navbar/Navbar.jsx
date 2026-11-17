import React, { useContext, useEffect, useId, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AppContext } from "../../services/hooks/useAppState.jsx";
import logo from "../../assets/logoWATCH.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const regionId = useId();
  const { favorites, comparison } = useContext(AppContext);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="navbar" aria-label="Navegação principal">
      <NavLink to="/" className="brandMark">
        <img className="logo" src={logo} alt="" width="44" height="44" />
        <span className="brandText">Watch Hub</span>
      </NavLink>

      <button type="button" className="burgerButton" aria-expanded={isOpen} aria-controls={regionId} onClick={() => setIsOpen((v) => !v)}>
        {isOpen ? "Fechar" : "Menu"}
      </button>

      <div className={isOpen ? "navLinks navLinksOpen" : "navLinks"} id={regionId}>
        <NavLink className="navLink" to="/" end>Início</NavLink>
        <NavLink className="navLink" to="/explorar">Acervo</NavLink>
        <NavLink className="navLink" to="/marcas">Manufaturas</NavLink>
        <NavLink className="navLink" to="/favoritos">
          Favoritos{favorites.length > 0 && <span className="navCount">{favorites.length}</span>}
        </NavLink>
        <NavLink className="navLink" to="/comparador">
          Comparar{comparison.length > 0 && <span className="navCount">{comparison.length}</span>}
        </NavLink>
        <NavLink className="navLink" to="/painel">Painel</NavLink>
        <NavLink className="navCta" to="/cadastro">Cadastrar relógio</NavLink>
      </div>
    </nav>
  );
}
