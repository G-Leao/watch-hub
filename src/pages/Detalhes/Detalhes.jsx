import React, { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../services/hooks/useAppState.jsx";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";

export default function Detalhes() {
  const { id } = useParams();
  const { watches, actions } = useContext(AppContext);
  const watch = useMemo(
    () => watches.find((w) => String(w.id) === String(id)),
    [watches, id],
  );

  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!watch) {
    return (
      <section className="page">
        <h1 className="pageTitle">Detalhes</h1>
        <div className="card">
          <p className="muted">Relógio não encontrado.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <h1 className="pageTitle">Detalhes do Relógio</h1>

      <div className="grid2">
        <div className="card">
          <img
            src={watch.imageUrl}
            alt={watch.model}
            style={{
              width: "100%",
              borderRadius: 14,
              border: "1px solid var(--border)",
            }}
          />
        </div>

        <div
          className="card"
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            <div>
              <div className="muted">{watch.brand}</div>
              <strong style={{ fontSize: 22 }}>{watch.model}</strong>
              <div className="muted" style={{ marginTop: 6 }}>
                Ref: {watch.reference} • {watch.year}
              </div>
            </div>
            <FavoriteButton id={watch.id} />
          </div>

          <div className="grid2" style={{ gap: 10 }}>
            <div>
              <span className="muted">Material</span>
              <div>{watch.material}</div>
            </div>
            <div>
              <span className="muted">Movimento</span>
              <div>{watch.movement}</div>
            </div>
            <div>
              <span className="muted">Diâmetro</span>
              <div>{watch.diameter}</div>
            </div>
            <div>
              <span className="muted">Resistência à água</span>
              <div>{watch.waterResistance}</div>
            </div>
          </div>

          <div>
            <span className="muted">Preço</span>
            <div style={{ fontSize: 26, letterSpacing: ".2px" }}>
              R$ {Number(watch.price).toFixed(2)}
            </div>
          </div>

          <div>
            <span className="muted">Descrição</span>
            <p style={{ marginTop: 8, lineHeight: 1.5 }}>{watch.description}</p>
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <button
              className="btn"
              type="button"
              onClick={() => actions.selectForComparison(watch.id)}
            >
              Adicionar ao comparador
            </button>
            <button
              className="btn btnDanger"
              type="button"
              onClick={() => setConfirmDelete(true)}
            >
              Excluir
            </button>
          </div>

          {confirmDelete && (
            <div style={{ marginTop: 10 }}>
              <p className="errorText" style={{ marginTop: 0 }}>
                Confirmar exclusão?
              </p>
              <div
                style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}
              >
                <button
                  className="btn"
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btnDanger"
                  type="button"
                  onClick={() => {
                    actions.deleteWatch(watch.id);
                    setConfirmDelete(false);
                  }}
                >
                  Confirmar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
