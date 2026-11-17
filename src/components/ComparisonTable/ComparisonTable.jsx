import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../services/hooks/useAppState.jsx";
import { COMPLICATION_LABELS } from "../../data/catalog.js";
import { NA, fmtMoney, isEmpty } from "../../services/watchModel.js";
import FavoriteButton from "../FavoriteButton/FavoriteButton.jsx";
import WatchImage from "../WatchImage/WatchImage.jsx";

const money = (e) => (e ? fmtMoney(e.value, e.currency) : null);
const soldLines = (w) => (w.prices?.sold || []).map((s) => `${fmtMoney(s.value, s.currency)} — ${s.venue}, ${s.date}`);
const yesNo = (v) => (v === true ? "Sim" : v === false ? "Não" : null);

const SECTIONS = [
  {
    title: "Identificação",
    rows: [
      ["Marca", (w) => w.brand],
      ["Coleção / modelo", (w) => w.model],
      ["Referência exata", (w) => w.reference],
      ["Ano de lançamento", (w) => w.year],
      ["Tipo", (w) => (w.kind === "bolso" ? "Relógio de bolso" : "Relógio de pulso")],
    ],
  },
  {
    title: "Preços (tipos nunca misturados)",
    rows: [
      ["Preço oficial de varejo", (w) => money(w.prices?.retail)],
      ["Preço anunciado", (w) => (w.prices?.listed ? `${money(w.prices.listed)}${w.prices.listed.unverified ? " (não verificado)" : ""}` : null)],
      ["Negociado em leilão", (w) => soldLines(w)],
    ],
  },
  {
    title: "Técnico",
    rows: [
      ["Calibre", (w) => w.caliber],
      ["Tipo de movimento", (w) => w.movement],
      ["Reserva de marcha", (w) => w.powerReserve],
      ["Complicações", (w) => (w.complications || []).map((c) => COMPLICATION_LABELS[c] || c)],
      ["Material da caixa", (w) => w.material],
      ["Material da pulseira", (w) => w.braceletMaterial],
      ["Diâmetro", (w) => w.diameter],
      ["Espessura", (w) => w.thickness],
      ["Resistência à água", (w) => w.waterResistance],
    ],
  },
  {
    title: "Raridade",
    rows: [
      ["Edição", (w) => (w.edition === "unica" ? "Peça única" : w.edition === "limitada" ? "Edição limitada" : null)],
      ["Quantidade produzida (documentada)", (w) => w.produced],
    ],
  },
  {
    title: "Condição e procedência",
    rows: [
      ["Condição", (w) => w.condition],
      ["Documentação", (w) => w.documentation],
      ["Caixa original", (w) => yesNo(w.originalBox)],
      ["Procedência", (w) => w.provenance],
    ],
  },
];

function Cell({ value }) {
  if (isEmpty(value)) return <span className="na">{NA}</span>;
  if (Array.isArray(value)) return <ul className="cellList">{value.map((v, i) => <li key={i}>{v}</li>)}</ul>;
  return <>{String(value)}</>;
}

export default function ComparisonTable({ watches }) {
  const { actions } = useContext(AppContext);
  if (watches.length === 0) {
    return (
      <div className="emptyState">
        <h2>Nenhuma referência selecionada</h2>
        <p className="muted">Escolha até 3 relógios no seletor acima ou toque em “+ Comparar” em qualquer peça.</p>
        <Link className="btn btnPrimary" to="/explorar">Explorar o acervo</Link>
      </div>
    );
  }
  const cols = `minmax(150px, 0.8fr) repeat(${watches.length}, minmax(180px, 1fr))`;

  return (
    <div className="cmpScroll">
      <div className="cmp" style={{ "--cols": cols }} role="table" aria-label="Comparação de relógios">
        <div className="cmpRow cmpHead" role="row">
          <div className="cmpLabel" role="columnheader" />
          {watches.map((w) => (
            <div key={w.id} className="cmpWatch" role="columnheader">
              <div className="cmpThumb"><WatchImage watch={w} /></div>
              <span className="watchBrand">{w.brand}</span>
              <strong className="cmpName">{w.model}</strong>
              <div className="cmpActions">
                <FavoriteButton id={w.id} />
                <button type="button" className="btn" onClick={() => actions.selectForComparison(w.id)}>Remover</button>
              </div>
            </div>
          ))}
        </div>
        {SECTIONS.map((s) => (
          <React.Fragment key={s.title}>
            <div className="cmpSection" role="row">{s.title}</div>
            {s.rows.map(([label, get]) => (
              <div key={label} className="cmpRow" role="row">
                <div className="cmpLabel" role="rowheader">{label}</div>
                {watches.map((w) => (
                  <div key={w.id} className="cmpCell" role="cell"><Cell value={get(w)} /></div>
                ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
