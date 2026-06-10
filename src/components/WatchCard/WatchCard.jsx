import React from "react";

export default function WatchCard({ watch }) {
  return (
    <article className="watchCard">
      <img
        className="watchImg"
        src={watch.imageUrl}
        alt={`${watch.brand} ${watch.model}`}
      />
      <div className="watchBody">
        <div className="watchTitle">
          <strong>
            {watch.brand} • {watch.model}
          </strong>
          <span className="pill">R$ {Number(watch.price).toFixed(2)}</span>
        </div>
        <div className="watchMeta">
          <span>Ref: {watch.reference}</span>
          <span>
            {watch.year} • {watch.diameter}
          </span>
        </div>
      </div>
    </article>
  );
}
