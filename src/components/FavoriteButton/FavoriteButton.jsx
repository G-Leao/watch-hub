import React, { useContext } from "react";
import { AppContext } from "../../services/hooks/useAppState.jsx";

export default function FavoriteButton({ id }) {
  const { favorites, actions } = useContext(AppContext);
  const isFav = favorites.includes(id);

  return (
    <button
      className={`btn ${isFav ? "btnPrimary" : ""}`}
      type="button"
      onClick={() => actions.toggleFavorite(id)}
      aria-pressed={isFav}
      title={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      {isFav ? "★ Favorito" : "☆ Favoritar"}
    </button>
  );
}
