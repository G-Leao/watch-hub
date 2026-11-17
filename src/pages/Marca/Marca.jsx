import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../services/hooks/useAppState.jsx";
import WatchCard from "../../components/WatchCard/WatchCard.jsx";
import { BRAND_GROUPS, brandBySlug } from "../../data/brands.js";

export default function Marca() {
  const { slug } = useParams();
  const { watches } = useContext(AppContext);
  const brand = brandBySlug(slug);

  if (!brand) {
    return (
      <section className="page">
        <div className="emptyState">
          <h1>Marca não encontrada</h1>
          <Link className="btn btnPrimary" to="/marcas">Ver todas as manufaturas</Link>
        </div>
      </section>
    );
  }
  const list = watches.filter((w) => w.brandSlug === brand.slug);
  return (
    <section className="page">
      <nav className="crumbs" aria-label="Você está em"><Link to="/marcas">Manufaturas</Link><span aria-hidden="true">/</span><span>{brand.name}</span></nav>
      <header className="brandHead">
        <span className="eyebrow">{BRAND_GROUPS[brand.group]}</span>
        <h1 className="pageTitle">{brand.name}</h1>
        <p className="muted">{[brand.country, `${list.length} ${list.length === 1 ? "referência" : "referências"} no acervo`].filter(Boolean).join(" · ")}</p>
      </header>
      {list.length === 0 ? (
        <div className="emptyState">
          <h2>Sem fichas verificadas ainda</h2>
          <p className="muted">Esta manufatura já está na estrutura do catálogo, mas nenhuma referência foi cadastrada. Não exibimos peças sem dados confiáveis.</p>
          <Link className="btn" to="/cadastro">Cadastrar uma referência</Link>
        </div>
      ) : (
        <div className="watchGrid">{list.map((w) => <WatchCard key={w.id} watch={w} />)}</div>
      )}
    </section>
  );
}
