import React from "react";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <label className="label">
      <span className="muted">{placeholder}</span>
      <input
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}
