import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../services/hooks/useAppState.jsx";
import WatchCard from "../../components/WatchCard/WatchCard";

export default function Favoritos() {
  const { watches, favorites } = useContext(AppContext);
  const favWatches = useMemo(() => {
    const set = new Set(favorites);
    return watches.filter((w) => set.has(w.id));
  }, [watches, favorites]);

  return (
    <section className="page">
      <header className="pageHead">
        <h1 className="pageTitle">Favoritos</h1>
        <p className="muted">{favWatches.length} {favWatches.length === 1 ? "relógio salvo" : "relógios salvos"}</p>
      </header>
      {favWatches.length === 0 ? (
        <div className="emptyState">
          <h2>Sua lista está vazia</h2>
          <p className="muted">Toque em “Favoritar” em qualquer relógio para guardá-lo aqui.</p>
          <Link className="btn btnPrimary" to="/explorar">Explorar relógios</Link>
        </div>
      ) : (
        <div className="watchGrid">{favWatches.map((w) => <WatchCard key={w.id} watch={w} />)}</div>
      )}
    </section>
  );
}
