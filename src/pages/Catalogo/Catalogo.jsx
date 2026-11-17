import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AppContext } from "../../services/hooks/useAppState.jsx";
import WatchCard from "../../components/WatchCard/WatchCard.jsx";
import { BRANDS } from "../../data/brands.js";
import { COMPLICATION_LABELS } from "../../data/catalog.js";
import {
  CURRENCIES,
  SORTS,
  applyFilters,
  availableComplications,
  availableMaterials,
  parseFilters,
} from "../../services/catalogFilters.js";

const PAGE_SIZE = 12;

export default function Catalogo() {
  const { watches, brandCount } = useContext(AppContext);
  const [params, setParams] = useSearchParams();
  const f = useMemo(() => parseFilters(params), [params]);
  const [panelOpen, setPanelOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!panelOpen) return;
    const onDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setPanelOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setPanelOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [panelOpen]);

  const comps = useMemo(() => availableComplications(watches), [watches]);
  const materials = useMemo(() => availableMaterials(watches), [watches]);
  const brandsWithWatches = useMemo(
    () => BRANDS.filter((b) => brandCount[b.slug] > 0),
    [brandCount],
  );

  function update(patch) {
    const next = new URLSearchParams(params);
    Object.entries({ pagina: "", ...patch }).forEach(([k, v]) =>
      v ? next.set(k, v) : next.delete(k),
    );
    setParams(next, { replace: true });
  }
  function toggleComp(key) {
    const set = new Set(f.comps);
    set.has(key) ? set.delete(key) : set.add(key);
    update({ comp: [...set].join(",") });
  }

  const filtered = useMemo(() => applyFilters(watches, f), [watches, f]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(f.page, totalPages);
  const items = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeCount = [
    f.q,
    f.brand,
    f.segment,
    f.comps.length,
    f.edition,
    f.vintage,
    f.material,
    f.currency,
    f.min !== null,
    f.max !== null,
  ].filter(Boolean).length;

  return (
    <section className="page">
      <header className="pageHead">
        <h1 className="pageTitle">Acervo</h1>
        <p className="muted">
          {filtered.length} de {watches.length} referências
        </p>
      </header>

      <div className="toolbar">
        <label className="searchField">
          <span className="srOnly">
            Buscar por marca, modelo, referência, complicação ou material
          </span>
          <input
            className="input"
            type="search"
            value={f.q}
            onChange={(e) => update({ q: e.target.value })}
            placeholder="Buscar marca, modelo, referência, complicação, material…"
          />
        </label>
        <div className="filterMenu" ref={menuRef}>
          <button
            type="button"
            className="btn"
            aria-expanded={panelOpen}
            aria-haspopup="dialog"
            aria-controls="filterPanel"
            onClick={() => setPanelOpen((v) => !v)}
          >
            Filtros
            {activeCount > 0 && (
              <span className="filterBadge">{activeCount}</span>
            )}
          </button>
          {panelOpen && (
            <div
              id="filterPanel"
              className="filterPanel card"
              role="dialog"
              aria-label="Filtros do acervo"
            >
              <div className="filterGroup">
                <span className="filterTitle">Marca</span>
                <select
                  className="input"
                  value={f.brand}
                  onChange={(e) => update({ marca: e.target.value })}
                >
                  <option value="">Todas as marcas</option>
                  {brandsWithWatches.map((b) => (
                    <option key={b.slug} value={b.slug}>
                      {b.name} ({brandCount[b.slug]})
                    </option>
                  ))}
                </select>
              </div>

              <div className="filterGroup">
                <span className="filterTitle">Segmento</span>
                <div className="chips" role="group" aria-label="Segmento">
                  <button
                    type="button"
                    className="chip"
                    aria-pressed={!f.segment}
                    onClick={() => update({ segmento: "" })}
                  >
                    Todos
                  </button>
                  <button
                    type="button"
                    className="chip"
                    aria-pressed={f.segment === "luxo"}
                    onClick={() => update({ segmento: "luxo" })}
                  >
                    Luxo e colecionismo
                  </button>
                  <button
                    type="button"
                    className="chip"
                    aria-pressed={f.segment === "entrada"}
                    onClick={() => update({ segmento: "entrada" })}
                  >
                    Entrada
                  </button>
                </div>
              </div>

              <div className="filterGroup filterWide">
                <span className="filterTitle">
                  Complicações (todas as marcadas)
                </span>
                <div className="chips" role="group" aria-label="Complicações">
                  {comps.map((k) => (
                    <button
                      key={k}
                      type="button"
                      className="chip"
                      aria-pressed={f.comps.includes(k)}
                      onClick={() => toggleComp(k)}
                    >
                      {COMPLICATION_LABELS[k]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filterGroup">
                <span className="filterTitle">Raridade e época</span>
                <div
                  className="chips"
                  role="group"
                  aria-label="Raridade e época"
                >
                  <button
                    type="button"
                    className="chip"
                    aria-pressed={f.edition === "qualquer"}
                    onClick={() =>
                      update({
                        edicao: f.edition === "qualquer" ? "" : "qualquer",
                      })
                    }
                  >
                    Limitadas ou únicas
                  </button>
                  <button
                    type="button"
                    className="chip"
                    aria-pressed={f.edition === "unica"}
                    onClick={() =>
                      update({ edicao: f.edition === "unica" ? "" : "unica" })
                    }
                  >
                    Peças únicas
                  </button>
                  <button
                    type="button"
                    className="chip"
                    aria-pressed={f.vintage}
                    onClick={() => update({ vintage: f.vintage ? "" : "1" })}
                  >
                    Vintage / histórico
                  </button>
                </div>
              </div>

              <div className="filterGroup">
                <span className="filterTitle">Material da caixa</span>
                <select
                  className="input"
                  value={f.material}
                  onChange={(e) => update({ material: e.target.value })}
                >
                  <option value="">Qualquer material</option>
                  {materials.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filterGroup filterWide">
                <span className="filterTitle">Faixa de preço</span>
                <div className="priceFilter">
                  <select
                    className="input"
                    aria-label="Moeda"
                    value={f.currency}
                    onChange={(e) =>
                      update({ moeda: e.target.value, min: "", max: "" })
                    }
                  >
                    <option value="">Escolha a moeda</option>
                    {CURRENCIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <input
                    className="input"
                    type="number"
                    min="0"
                    inputMode="numeric"
                    aria-label="Preço mínimo"
                    placeholder="Mínimo"
                    disabled={!f.currency}
                    value={f.min ?? ""}
                    onChange={(e) => update({ min: e.target.value })}
                  />
                  <input
                    className="input"
                    type="number"
                    min="0"
                    inputMode="numeric"
                    aria-label="Preço máximo"
                    placeholder="Máximo"
                    disabled={!f.currency}
                    value={f.max ?? ""}
                    onChange={(e) => update({ max: e.target.value })}
                  />
                </div>
                <small className="muted">
                  Sem conversão cambial: o filtro considera apenas valores
                  informados na moeda escolhida (oficial, anunciado ou de
                  leilão).
                </small>
              </div>

              <div className="filterFooter filterWide">
                <button
                  type="button"
                  className="textLink"
                  onClick={() => setParams({}, { replace: true })}
                  disabled={activeCount === 0}
                >
                  Limpar filtros
                </button>
                <button
                  type="button"
                  className="btn btnPrimary"
                  onClick={() => setPanelOpen(false)}
                >
                  Ver {filtered.length} resultado
                  {filtered.length === 1 ? "" : "s"}
                </button>
              </div>
            </div>
          )}
        </div>
        <label className="sortField">
          <span className="srOnly">Ordenar por</span>
          <select
            className="input"
            value={f.sort}
            onChange={(e) => update({ ordem: e.target.value })}
          >
            {Object.entries(SORTS).map(([k, label]) => (
              <option
                key={k}
                value={k}
                disabled={
                  (k === "priceDesc" || k === "priceAsc") && !f.currency
                }
              >
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {items.length === 0 ? (
        <div className="emptyState">
          <h2>Nenhuma referência encontrada</h2>
          <p className="muted">
            Ajuste a busca ou remova filtros. Marcas sem fichas verificadas
            ainda não têm peças no acervo.
          </p>
          {activeCount > 0 && (
            <button
              type="button"
              className="btn"
              onClick={() => setParams({}, { replace: true })}
            >
              Limpar filtros
            </button>
          )}
        </div>
      ) : (
        <div className="watchGrid" aria-live="polite">
          {items.map((w) => (
            <WatchCard key={w.id} watch={w} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav className="pager" aria-label="Paginação">
          <button
            type="button"
            className="btn"
            disabled={page === 1}
            onClick={() => update({ pagina: String(page - 1) })}
          >
            Anterior
          </button>
          <span className="muted">
            Página {page} de {totalPages}
          </span>
          <button
            type="button"
            className="btn"
            disabled={page === totalPages}
            onClick={() => update({ pagina: String(page + 1) })}
          >
            Próxima
          </button>
        </nav>
      )}
    </section>
  );
}
