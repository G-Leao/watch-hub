import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar" aria-label="Menu lateral">
      <p className="sidebarTitle">Navegação</p>
      <nav className="sidebarNav">
        <NavLink className="sidebarItem" to="/">
          Dashboard
        </NavLink>
        <NavLink className="sidebarItem" to="/catalogo">
          Catálogo
        </NavLink>
        <NavLink className="sidebarItem" to="/cadastro">
          Cadastro
        </NavLink>
        <NavLink className="sidebarItem" to="/comparador">
          Comparador
        </NavLink>
        <NavLink className="sidebarItem" to="/favoritos">
          Favoritos
        </NavLink>
      </nav>
    </div>
  );
}
