import React from "react";

export default function Modal({ open, title, onClose, children }) {
  if (!open) return null;

  return (
    <div
      className="modalOverlay"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="modalBox">
        <div className="modalHeader">
          <strong>{title}</strong>
          <button className="btn" type="button" onClick={onClose}>
            Fechar
          </button>
        </div>
        <div className="modalBody">{children}</div>
      </div>
    </div>
  );
}
