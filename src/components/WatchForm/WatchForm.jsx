import React, { useEffect, useMemo, useState } from "react";

const requiredFields = [
  "brand",
  "model",
  "reference",
  "year",
  "diameter",
  "material",
  "movement",
  "dialColor",
  "waterResistance",
  "price",
  "imageUrl",
  "description",
];

function isValidYear(year) {
  const y = Number(year);
  const current = new Date().getFullYear();
  return y >= 1900 && y <= current;
}

function isValidImageUrl(url) {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export default function ({
  initialValues,
  onSubmit,
  onCancel,
  referenceError,
  existingReferences,
}) {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initialValues);
    setErrors({});
  }, [initialValues]);

  const submitLabel = useMemo(
    () => (initialValues?.id ? "Salvar alterações" : "Cadastrar relógio"),
    [initialValues],
  );

  function validate() {
    const e = {};

    for (const k of requiredFields) {
      if (form[k] === "" || form[k] === null || form[k] === undefined)
        e[k] = "Campo obrigatório.";
    }

    if (form.price !== "" && Number(form.price) <= 0)
      e.price = "O preço deve ser maior que zero.";
    if (form.year !== "" && !isValidYear(form.year))
      e.year = "Ano inválido. Use um ano entre 1900 e o ano atual.";

    if (form.reference) {
      const isDup =
        existingReferences.includes(String(form.reference).trim()) &&
        String(form.reference).trim() !==
          String(initialValues?.reference || "").trim();
      if (isDup)
        e.reference = "A referência já existe. Use uma referência única.";
    }

    if (form.imageUrl && !isValidImageUrl(form.imageUrl))
      e.imageUrl = "Informe uma URL válida (http/https) para a imagem.";

    if (referenceError) e.reference = referenceError;

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleChange(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function submit(e) {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...form,
      price: Number(form.price),
      year: Number(form.year),
    });
  }

  return (
    <form onSubmit={submit} className="card" aria-label="Formulário de relógio">
      <div className="formRow">
        <label className="label">
          <span>Marca</span>
          <select
            className="input"
            value={form.brand}
            onChange={(e) => handleChange("brand", e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="Seiko">Seiko</option>
            <option value="Victorinox">Victorinox</option>
            <option value="Rolex">Rolex</option>
          </select>
          {errors.brand && <div className="errorText">{errors.brand}</div>}
        </label>

        <label className="label">
          <span>Ano</span>
          <input
            className="input"
            value={form.year}
            onChange={(e) => handleChange("year", e.target.value)}
            placeholder="Ex: 2020"
          />
          {errors.year && <div className="errorText">{errors.year}</div>}
        </label>

        <label className="label">
          <span>Modelo</span>
          <input
            className="input"
            value={form.model}
            onChange={(e) => handleChange("model", e.target.value)}
            placeholder="Ex: Submariner"
          />
          {errors.model && <div className="errorText">{errors.model}</div>}
        </label>

        <label className="label">
          <span>Referência</span>
          <input
            className="input"
            value={form.reference}
            onChange={(e) => handleChange("reference", e.target.value)}
            placeholder="Ex: LWH-RO-0001"
          />
          {errors.reference && (
            <div className="errorText">{errors.reference}</div>
          )}
        </label>

        <label className="label">
          <span>Diâmetro da caixa</span>
          <input
            className="input"
            value={form.diameter}
            onChange={(e) => handleChange("diameter", e.target.value)}
            placeholder="Ex: 40mm"
          />
          {errors.diameter && (
            <div className="errorText">{errors.diameter}</div>
          )}
        </label>

        <label className="label">
          <span>Material</span>
          <input
            className="input"
            value={form.material}
            onChange={(e) => handleChange("material", e.target.value)}
            placeholder="Ex: Aço inoxidável"
          />
          {errors.material && (
            <div className="errorText">{errors.material}</div>
          )}
        </label>

        <label className="label">
          <span>Movimento</span>
          <input
            className="input"
            value={form.movement}
            onChange={(e) => handleChange("movement", e.target.value)}
            placeholder="Ex: Automático"
          />
          {errors.movement && (
            <div className="errorText">{errors.movement}</div>
          )}
        </label>

        <label className="label">
          <span>Cor do mostrador</span>
          <input
            className="input"
            value={form.dialColor}
            onChange={(e) => handleChange("dialColor", e.target.value)}
            placeholder="Ex: Preto"
          />
          {errors.dialColor && (
            <div className="errorText">{errors.dialColor}</div>
          )}
        </label>

        <label className="label">
          <span>Resistência à água</span>
          <input
            className="input"
            value={form.waterResistance}
            onChange={(e) => handleChange("waterResistance", e.target.value)}
            placeholder="Ex: 100m"
          />
          {errors.waterResistance && (
            <div className="errorText">{errors.waterResistance}</div>
          )}
        </label>

        <label className="label">
          <span>Preço (R$)</span>
          <input
            className="input"
            type="number"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
            placeholder="Ex: 12500"
          />
          {errors.price && <div className="errorText">{errors.price}</div>}
        </label>

        <label className="label" style={{ gridColumn: "1 / -1" }}>
          <span>Imagem URL</span>
          <input
            className="input"
            value={form.imageUrl}
            onChange={(e) => handleChange("imageUrl", e.target.value)}
            placeholder="https://..."
          />
          {errors.imageUrl && (
            <div className="errorText">{errors.imageUrl}</div>
          )}
        </label>

        <label className="label" style={{ gridColumn: "1 / -1" }}>
          <span>Descrição</span>
          <textarea
            className="input"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
            placeholder="Descreva o relógio..."
          />
          {errors.description && (
            <div className="errorText">{errors.description}</div>
          )}
        </label>
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "flex-end",
          marginTop: 14,
          flexWrap: "wrap",
        }}
      >
        {onCancel && (
          <button type="button" className="btn" onClick={onCancel}>
            Cancelar
          </button>
        )}
        <button type="submit" className="btn btnPrimary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
