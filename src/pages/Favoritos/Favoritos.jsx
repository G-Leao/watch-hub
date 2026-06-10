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
      <h1 className="pageTitle">Favoritos</h1>

      <div className="watchGrid">
        {favWatches.length === 0 ? (
          <p className="muted">
            Nenhum favorito ainda. Clique em “Favoritar” nos detalhes.
          </p>
        ) : (
          favWatches.map((w) => (
            <Link
              key={w.id}
              to={`/detalhes/${w.id}`}
              style={{ textDecoration: "none" }}
            >
              <WatchCard watch={w} />
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
