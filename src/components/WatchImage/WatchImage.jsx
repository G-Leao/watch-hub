import React, { useState } from "react";

// Imagem real quando existe; caso contrário, um mostrador ilustrativo (nunca uma foto de outro relógio).
export default function WatchImage({ watch, className = "" }) {
  const [failed, setFailed] = useState(false);
  const name = `${watch.brand} ${watch.model}`;

  if (watch.imageUrl && !failed) {
    return <img className={className || "watchImg"} src={watch.imageUrl} alt={name} loading="lazy" onError={() => setFailed(true)} />;
  }

  const ticks = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div className={`dialPlaceholder ${className}`} role="img" aria-label={`${name}: imagem indisponível`}>
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r="86" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
        <circle cx="100" cy="100" r="74" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
        {ticks.map((i) => (
          <line key={i} x1="100" y1="30" x2="100" y2={i % 3 === 0 ? 40 : 36} stroke="currentColor" strokeWidth={i % 3 === 0 ? 1.6 : 0.8} transform={`rotate(${i * 30} 100 100)`} opacity="0.8" />
        ))}
        <line x1="100" y1="100" x2="100" y2="58" stroke="currentColor" strokeWidth="2" strokeLinecap="round" transform="rotate(300 100 100)" />
        <line x1="100" y1="100" x2="100" y2="44" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" transform="rotate(60 100 100)" />
        <circle cx="100" cy="100" r="3" fill="currentColor" />
      </svg>
      <span className="dialLabel">Imagem indisponível</span>
    </div>
  );
}
