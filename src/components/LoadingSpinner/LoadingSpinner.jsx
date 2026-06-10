import React from "react";

export default function LoadingSpinner() {
  return (
    <div
      className="card"
      style={{
        padding: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        aria-label="Carregando"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          alignItems: "center",
        }}
      >
        <div
          className="spinner"
          aria-hidden="true"
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            border: "3px solid rgba(214,180,90,.25)",
            borderTopColor: "rgba(214,180,90,.85)",
            animation: "spin 1s linear infinite",
          }}
        />
        <span className="muted">Carregando...</span>
      </div>
      <style>{"@keyframes spin{to{transform:rotate(360deg)}}"}</style>
    </div>
  );
}
