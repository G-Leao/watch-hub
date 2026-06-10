import React, { useContext, useMemo } from "react";
import { AppContext } from "../../services/hooks/useAppState.jsx";
import DashboardCard from "../../components/DashboardCard/DashboardCard";

function Bar({ label, value, max }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div className="dashboardBar" aria-label={`${label}: ${value}`}>
      <div className="dashboardBarTop">
        <span className="muted">{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="dashboardBarTrack" aria-hidden="true">
        <div className="dashboardBarFill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { totalWatches, brandCount, avgPrice, watches } =
    useContext(AppContext);

  const brandMax = useMemo(() => {
    return Math.max(
      brandCount.RoleX ?? brandCount.Rolex ?? 0,
      brandCount.Seiko,
      brandCount.Victorinox,
      1,
    );
  }, [brandCount]);

  const last = useMemo(() => {
    return [...watches]
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
      .slice(0, 6);
  }, [watches]);

  return (
    <section className="page">
      <h1 className="pageTitle">Dashboard</h1>

      <div className="grid3">
        <DashboardCard title="Total de relógios" value={totalWatches} />
        <DashboardCard title="Relógios Rolex" value={brandCount.Rolex} />
        <DashboardCard
          title="Valor médio"
          value={`R$ ${avgPrice.toFixed(2)}`}
        />
      </div>

      <div className="grid2" style={{ alignItems: "start" }}>
        <div className="card">
          <h2 className="sidebarTitle" style={{ marginTop: 0 }}>
            Estatísticas por marca
          </h2>
          <div className="dashboardBars">
            <Bar label="Rolex" value={brandCount.Rolex} max={brandMax} />
            <Bar label="Seiko" value={brandCount.Seiko} max={brandMax} />
            <Bar
              label="Victorinox"
              value={brandCount.Victorinox}
              max={brandMax}
            />
          </div>
        </div>

        <div className="card">
          <h2 className="sidebarTitle" style={{ marginTop: 0 }}>
            Últimos cadastrados
          </h2>
          <div className="lastList">
            {last.length === 0 ? (
              <p className="muted">Nenhum relógio cadastrado ainda.</p>
            ) : (
              last.map((w) => (
                <div key={w.id} className="lastItem">
                  <img className="lastImg" src={w.imageUrl} alt={w.model} />
                  <div>
                    <strong style={{ fontSize: 14 }}>
                      {w.brand} • {w.model}
                    </strong>
                    <div className="muted" style={{ fontSize: 13 }}>
                      Ref: {w.reference} • {w.year}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
