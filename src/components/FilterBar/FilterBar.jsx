import React from "react";

export default function FilterBar({
  brand,
  onBrandChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="formRow">
      <label className="label">
        <span>Filtrar por marca</span>
        <select
          className="input"
          value={brand}
          onChange={(e) => onBrandChange(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="Seiko">Seiko</option>
          <option value="Victorinox">Victorinox</option>
          <option value="Rolex">Rolex</option>
        </select>
      </label>

      <label className="label">
        <span>Ordenação</span>
        <select
          className="input"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="priceDesc">Preço (maior)</option>
          <option value="priceAsc">Preço (menor)</option>
          <option value="yearDesc">Ano (mais recente)</option>
          <option value="yearAsc">Ano (mais antigo)</option>
        </select>
      </label>
    </div>
  );
}
