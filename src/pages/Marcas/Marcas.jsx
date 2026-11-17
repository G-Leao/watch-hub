import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../services/hooks/useAppState.jsx";
import { BRANDS, BRAND_GROUPS } from "../../data/brands.js";

export default function Marcas() {
  const { brandCount } = useContext(AppContext);
  return (
    <section className="page">
      <header className="pageHead">
        <h1 className="pageTitle">Manufaturas</h1>
        <p className="muted">{BRANDS.filter((b) => brandCount[b.slug] > 0).length} de {BRANDS.length} marcas com referências no acervo</p>
      </header>
      <p className="muted lead">Marcas sem referências ainda não têm fichas verificadas. Elas permanecem listadas para o acervo crescer sem refazer a estrutura.</p>
      {Object.entries(BRAND_GROUPS).map(([key, title]) => (
        <section key={key} className="brandGroup" aria-labelledby={`g-${key}`}>
          <h2 id={`g-${key}`} className="groupTitle">{title}</h2>
          <ul className="brandIndex">
            {BRANDS.filter((b) => b.group === key).map((b) => (
              <li key={b.slug}>
                <Link to={`/marcas/${b.slug}`} className={brandCount[b.slug] ? "brandLink" : "brandLink brandEmpty"}>
                  <span>{b.name}</span>
                  <small>{brandCount[b.slug] ? `${brandCount[b.slug]} ${brandCount[b.slug] === 1 ? "referência" : "referências"}` : "sem fichas ainda"}</small>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  );
}
