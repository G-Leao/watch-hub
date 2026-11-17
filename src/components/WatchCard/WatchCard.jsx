import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../services/hooks/useAppState.jsx";
import { headlinePrice, watchName } from "../../services/watchModel.js";
import WatchImage from "../WatchImage/WatchImage.jsx";

export default function WatchCard({ watch, featured = false }) {
  const { favorites, comparison, actions } = useContext(AppContext);
  const isFav = favorites.includes(watch.id);
  const inCmp = comparison.includes(watch.id);
  const name = watchName(watch);
  const price = headlinePrice(watch);
  const badge = watch.edition === "unica" ? "Peça única" : watch.edition === "limitada" ? "Edição limitada" : watch.vintage ? "Histórico" : null;

  return (
    <article className={featured ? "watchCard watchCardFeatured" : "watchCard"}>
      <Link to={`/detalhes/${watch.id}`} className="watchLink" aria-label={`Ver detalhes: ${name}`}>
        <div className="watchFrame">
          <WatchImage watch={watch} />
          {badge && <span className="watchBadge">{badge}</span>}
        </div>
        <div className="watchBody">
          <span className="watchBrand">{watch.brand}</span>
          <h3 className="watchModel">{watch.model}</h3>
          <div className="watchMeta">
            <span>{[watch.reference, watch.year].filter(Boolean).join(" · ") || "Ficha em curadoria"}</span>
            <span className="watchPriceBox">
              <small>{price.label}</small>
              <strong className={price.kind === "none" ? "watchPrice na" : "watchPrice"}>{price.text}</strong>
            </span>
          </div>
        </div>
      </Link>
      <div className="watchActions">
        <button type="button" className="iconBtn" aria-pressed={isFav} onClick={() => actions.toggleFavorite(watch.id)}>
          {isFav ? "★ Favorito" : "☆ Favoritar"}
        </button>
        <button type="button" className="iconBtn" aria-pressed={inCmp} onClick={() => actions.selectForComparison(watch.id)}>
          {inCmp ? "✓ Na comparação" : "+ Comparar"}
        </button>
      </div>
    </article>
  );
}
