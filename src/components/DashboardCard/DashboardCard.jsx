import React from "react";

export default function DashboardCard({ title, value }) {
  return (
    <div className="card">
      <div className="dashboardCard">
        <p className="muted" style={{ margin: 0 }}>
          {title}
        </p>
        <strong style={{ fontSize: 26, letterSpacing: ".2px" }}>{value}</strong>
      </div>
    </div>
  );
}
