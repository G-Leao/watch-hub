import React, { useContext, useMemo } from "react";
import { AppContext } from "../../services/hooks/useAppState.jsx";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

const rows = [
  { key: "brand", label: "Marca" },
  { key: "model", label: "Modelo" },
  { key: "movement", label: "Movimento" },
  { key: "material", label: "Material" },
  { key: "diameter", label: "Tamanho" },
  { key: "waterResistance", label: "Resistência à água" },
  { key: "price", label: "Preço" },
];

export default function ComparisonTable({ watches }) {
  const { favorites } = useContext(AppContext);

  const left = watches[0];
  const right = watches[1];

  const favLeft = left ? favorites.includes(left.id) : false;
  const favRight = right ? favorites.includes(right.id) : false;

  const col = (w, idx) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {w ? (
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <img
            src={w.imageUrl}
            alt={w.model}
            style={{
              width: 70,
              height: 70,
              borderRadius: 14,
              objectFit: "cover",
              border: "1px solid var(--border)",
            }}
          />
          <div>
            <strong>
              {w.brand} • {w.model}
            </strong>
            <div className="muted" style={{ marginTop: 4 }}>
              Ref: {w.reference}
            </div>
          </div>
        </div>
      ) : (
        <div className="muted">Selecione um relógio</div>
      )}

      {w ? (
        <div>
          <span className="muted">Favorito</span>
          <div style={{ marginTop: 6 }}>
            <FavoriteButton id={w.id} />
          </div>
        </div>
      ) : (
        <div />
      )}

      <div className="muted">
        {idx === 0 ? "Primeira seleção" : "Segunda seleção"}
      </div>
    </div>
  );

  return (
    <div className="card">
      <div className="grid2" style={{ gap: 18 }}>
        {col(left, 0)}
        {col(right, 1)}
      </div>

      <div style={{ height: 14 }} />

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: 0,
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: 10,
                  borderBottom: "1px solid var(--border)",
                  color: "var(--muted)",
                }}
              >
                Item
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: 10,
                  borderBottom: "1px solid var(--border)",
                  color: "var(--muted)",
                }}
              >
                Relógio A
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: 10,
                  borderBottom: "1px solid var(--border)",
                  color: "var(--muted)",
                }}
              >
                Relógio B
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key}>
                <td
                  style={{
                    padding: 10,
                    borderBottom: "1px solid rgba(255,255,255,.06)",
                  }}
                >
                  {r.label}
                </td>
                <td
                  style={{
                    padding: 10,
                    borderBottom: "1px solid rgba(255,255,255,.06)",
                  }}
                >
                  {left ? (
                    r.key === "price" ? (
                      `R$ ${Number(left.price).toFixed(2)}`
                    ) : (
                      left[r.key]
                    )
                  ) : (
                    <span className="muted">—</span>
                  )}
                </td>
                <td
                  style={{
                    padding: 10,
                    borderBottom: "1px solid rgba(255,255,255,.06)",
                  }}
                >
                  {right ? (
                    r.key === "price" ? (
                      `R$ ${Number(right.price).toFixed(2)}`
                    ) : (
                      right[r.key]
                    )
                  ) : (
                    <span className="muted">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
