import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../services/hooks/useAppState.jsx";
import WatchCard from "../../components/WatchCard/WatchCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function Catalogo() {
  const { watches, apiStatus } = useContext(AppContext);

  const [searchModel, setSearchModel] = useState("");
  const [searchRef, setSearchRef] = useState("");
  const [brand, setBrand] = useState("");
  const [sortBy, setSortBy] = useState("priceDesc");

  const [page, setPage] = useState(1);
  const pageSize = 9;

  useEffect(() => {
    setPage(1);
  }, [searchModel, searchRef, brand, sortBy]);

  const filtered = useMemo(() => {
    const qModel = searchModel.trim().toLowerCase();
    const qRef = searchRef.trim().toLowerCase();

    let list = [...watches];

    if (brand) list = list.filter((w) => w.brand === brand);
    if (qModel)
      list = list.filter((w) => String(w.model).toLowerCase().includes(qModel));
    if (qRef)
      list = list.filter((w) =>
        String(w.reference).toLowerCase().includes(qRef),
      );

    list.sort((a, b) => {
      if (sortBy === "priceAsc") return Number(a.price) - Number(b.price);
      if (sortBy === "priceDesc") return Number(b.price) - Number(a.price);
      if (sortBy === "yearAsc") return Number(a.year) - Number(b.year);
      if (sortBy === "yearDesc") return Number(b.year) - Number(a.year);
      return 0;
    });

    return list;
  }, [watches, searchModel, searchRef, brand, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  return (
    <section className="page">
      <h1 className="pageTitle">Catálogo</h1>

      <div className="card">
        <SearchBar
          value={searchModel}
          onChange={setSearchModel}
          placeholder="Buscar por modelo..."
        />
        <div style={{ height: 10 }} />
        <SearchBar
          value={searchRef}
          onChange={setSearchRef}
          placeholder="Buscar por referência..."
        />
        <div style={{ height: 10 }} />
        <FilterBar
          brand={brand}
          onBrandChange={setBrand}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      {apiStatus.loading && (
        <div className="grid3" aria-busy="true">
          <LoadingSpinner />
        </div>
      )}

      <div className="watchGrid" aria-live="polite">
        {!apiStatus.loading && pageItems.length === 0 && (
          <p className="muted">Nenhum relógio encontrado.</p>
        )}
        {pageItems.map((w) => (
          <Link
            key={w.id}
            to={`/detalhes/${w.id}`}
            style={{ textDecoration: "none" }}
          >
            <WatchCard watch={w} />
          </Link>
        ))}
      </div>

      {!apiStatus.loading && filtered.length > 0 && (
        <div
          className="card"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
            alignItems: "center",
          }}
        >
          <button
            className="btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
          >
            Anterior
          </button>
          <span className="muted">
            Página {safePage} de {totalPages}
          </span>
          <button
            className="btn"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
          >
            Próxima
          </button>
        </div>
      )}
    </section>
  );
}
