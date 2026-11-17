import React, { useContext, useState } from "react";
import { AppContext } from "../../services/hooks/useAppState.jsx";
import ComparisonTable from "../../components/ComparisonTable/ComparisonTable.jsx";

export default function Comparador() {
  const { watches, comparison, selectedComparisonWatches, maxCompare, actions } = useContext(AppContext);
  const [pick, setPick] = useState("");
  const available = watches.filter((w) => !comparison.includes(w.id));

  function add() {
    if (!pick) return;
    if (comparison.length >= maxCompare) return;
    actions.selectForComparison(pick);
    setPick("");
  }

  return (
    <section className="page">
      <header className="pageHead">
        <h1 className="pageTitle">Comparador</h1>
        <p className="muted">{selectedComparisonWatches.length} de {maxCompare} referências</p>
      </header>

      <div className="card cmpPicker">
        <label className="label cmpPickerField">
          <span>Adicionar referência</span>
          <select className="input" value={pick} onChange={(e) => setPick(e.target.value)} disabled={comparison.length >= maxCompare}>
            <option value="">{comparison.length >= maxCompare ? "Limite atingido — remova uma referência" : "Selecione um relógio"}</option>
            {available.map((w) => (
              <option key={w.id} value={w.id}>{w.brand} — {w.model}{w.reference ? ` (${w.reference})` : ""}</option>
            ))}
          </select>
        </label>
        <button className="btn btnPrimary" type="button" onClick={add} disabled={!pick || comparison.length >= maxCompare}>Adicionar</button>
        <button className="btn" type="button" onClick={actions.clearComparison} disabled={comparison.length === 0}>Limpar seleção</button>
      </div>

      <ComparisonTable watches={selectedComparisonWatches} />
      <p className="muted small">Estimativas nunca são tratadas como valores confirmados. Onde não há dado confiável, o campo aparece como indisponível.</p>
    </section>
  );
}
