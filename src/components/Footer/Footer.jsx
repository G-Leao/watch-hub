import React from "react";

export default function Footer() {
  return (
    <div className="footerRow">
      <span>© {new Date().getFullYear()} Luxury Watch Hub</span>
      <span className="muted">
        LUXO E ESTILO
      </span>
    </div>
  );
}
