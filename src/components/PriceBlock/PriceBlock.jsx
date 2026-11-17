import React from "react";
import { NA, fmtMoney, priceEntries } from "../../services/watchModel.js";

const GROUPS = [
  ["retail", "Preço oficial de varejo"],
  ["listed", "Preço anunciado"],
  ["sold", "Preço efetivamente negociado"],
];

// Mostra os três tipos de preço separados. Nunca mistura estimativa com valor confirmado.
export default function PriceBlock({ watch }) {
  const entries = priceEntries(watch);
  return (
    <div className="priceBlock">
      {GROUPS.map(([kind, title]) => {
        const items = entries.filter((e) => e.kind === kind);
        return (
          <div key={kind} className="priceRow">
            <span className="priceKind">{title}</span>
            {items.length === 0 ? (
              <span className="na">{NA}</span>
            ) : (
              <ul className="priceList">
                {items.map((e, i) => (
                  <li key={i}>
                    <strong>{fmtMoney(e.value, e.currency)}</strong>
                    <small>
                      {[e.kind === "listed" && e.unverified ? "não verificado" : null, e.source || e.venue, e.date].filter(Boolean).join(" · ")}
                      {e.note ? ` — ${e.note}` : ""}
                    </small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
