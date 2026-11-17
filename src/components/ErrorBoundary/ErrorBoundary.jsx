import React from "react";

export default class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Watch Hub crashed:", error, info?.componentStack);
  }

  resetData() {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("lwh_"))
      .forEach((k) => localStorage.removeItem(k));
    window.location.href = "/";
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="emptyState" role="alert" style={{ margin: "10vh auto", maxWidth: 640 }}>
        <h1>Algo deu errado ao abrir o Watch Hub</h1>
        <p className="muted">Erro: {String(this.state.error?.message || this.state.error)}</p>
        <button type="button" className="btn btnPrimary" onClick={() => window.location.reload()}>Recarregar</button>
        <button type="button" className="btn" onClick={() => this.resetData()}>Limpar dados locais e recomeçar</button>
      </div>
    );
  }
}
