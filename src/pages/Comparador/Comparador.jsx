import React, { useContext } from "react";
import { AppContext } from "../../services/hooks/useAppState.jsx";
import ComparisonTable from "../../components/ComparisonTable/ComparisonTable";

export default function Comparador() {
  const { selectedComparisonWatches, actions } = useContext(AppContext);

  return (
    <section className="page">
      <h1 className="pageTitle">Comparador</h1>

      <div
        className="card"
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div className="muted">Selecione até 2 relógios.</div>
        <button className="btn" type="button" onClick={actions.clearComparison}>
          Limpar seleção
        </button>
      </div>

      <ComparisonTable watches={selectedComparisonWatches} />
    </section>
  );
}
