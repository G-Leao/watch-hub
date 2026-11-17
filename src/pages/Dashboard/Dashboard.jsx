import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../services/hooks/useAppState.jsx";
import DashboardCard from "../../components/DashboardCard/DashboardCard.jsx";
import WatchImage from "../../components/WatchImage/WatchImage.jsx";
import { BRANDS } from "../../data/brands.js";

function Bar({ label, value, max }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div className="dashboardBar" aria-label={`${label}: ${value}`}>
      <div className="dashboardBarTop"><span className="muted">{label}</span><strong>{value}</strong></div>
      <div className="dashboardBarTrack" aria-hidden="true"><div className="dashboardBarFill" style={{ width: `${pct}%` }} /></div>
    </div>
  );
}

export default function Dashboard() {
  const { watches, userWatches, brandCount, favorites } = useContext(AppContext);

  const stats = useMemo(() => {
    const luxo = watches.filter((w) => w.segment === "luxo").length;
    const withSold = watches.filter((w) => w.prices?.sold?.length).length;
    const withRetail = watches.filter((w) => w.prices?.retail).length;
    const unique = watches.filter((w) => w.edition).length;
    return { luxo, withSold, withRetail, unique };
  }, [watches]);

  const bars = useMemo(
    () => BRANDS.map((b) => ({ label: b.name, value: brandCount[b.slug] || 0 })).filter((b) => b.value > 0).sort((a, b) => b.value - a.value),
    [brandCount],
  );
  const max = Math.max(1, ...bars.map((b) => b.value));
  const last = useMemo(() => [...userWatches].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)).slice(0, 6), [userWatches]);

  return (
    <section className="page">
      <h1 className="pageTitle">Painel do acervo</h1>
      <div className="grid4">
        <DashboardCard title="Referências no acervo" value={watches.length} />
        <DashboardCard title="Luxo e colecionismo" value={stats.luxo} />
        <DashboardCard title="Com resultado de leilão" value={stats.withSold} />
        <DashboardCard title="Na sua lista de desejos" value={favorites.length} />
      </div>
      <p className="muted small">Preço oficial de varejo documentado em {stats.withRetail} {stats.withRetail === 1 ? "referência" : "referências"}; peças únicas ou limitadas: {stats.unique}. Não há média de preços: moedas e tipos de preço diferentes não são somados.</p>

      <div className="grid2" style={{ alignItems: "start" }}>
        <div className="card">
          <h2 className="sidebarTitle" style={{ marginTop: 0 }}>Referências por marca</h2>
          <div className="dashboardBars">{bars.map((b) => <Bar key={b.label} {...b} max={max} />)}</div>
        </div>
        <div className="card">
          <h2 className="sidebarTitle" style={{ marginTop: 0 }}>Cadastrados por você</h2>
          <div className="lastList">
            {last.length === 0 ? (
              <p className="muted">Nenhum relógio cadastrado ainda. <Link className="textLink" to="/cadastro">Cadastrar agora</Link></p>
            ) : (
              last.map((w) => (
                <Link key={w.id} to={`/detalhes/${w.id}`} className="lastItem">
                  <div className="lastImg"><WatchImage watch={w} /></div>
                  <div>
                    <strong style={{ fontSize: 14 }}>{w.brand} • {w.model}</strong>
                    <div className="muted" style={{ fontSize: 13 }}>{[w.reference && `Ref: ${w.reference}`, w.year].filter(Boolean).join(" • ")}</div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
