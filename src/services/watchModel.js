import { defineWatch } from "../data/defineWatch.js";
import { brandByName } from "../data/brands.js";

export const NA = "Indisponível";

export function fmtMoney(value, currency) {
  try {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
  } catch {
    return `${currency} ${value}`;
  }
}

export const isEmpty = (v) => v === null || v === undefined || v === "" || (Array.isArray(v) && v.length === 0);

// Todas as entradas de preço de uma peça, já rotuladas.
export function priceEntries(w) {
  const p = w.prices || {};
  const out = [];
  if (p.retail) out.push({ kind: "retail", label: "Preço oficial de varejo", ...p.retail });
  if (p.listed) {
    out.push({
      kind: "listed",
      label: p.listed.unverified ? "Valor de referência (não verificado)" : "Preço anunciado no mercado secundário",
      ...p.listed,
    });
  }
  for (const s of p.sold || []) out.push({ kind: "sold", label: "Negociado em leilão", source: s.venue, ...s });
  return out;
}

export function entriesIn(w, currency) {
  return priceEntries(w).filter((e) => e.currency === currency);
}

export function bestValueIn(w, currency) {
  const v = entriesIn(w, currency).map((e) => e.value);
  return v.length ? Math.max(...v) : null;
}

// Preço de destaque para cartões: sempre diz de que tipo de preço se trata.
export function headlinePrice(w) {
  const p = w.prices || {};
  if (p.sold?.length) {
    const top = [...p.sold].sort((a, b) => b.date.localeCompare(a.date))[0];
    return { label: "Negociado em leilão", text: fmtMoney(top.value, top.currency), kind: "sold" };
  }
  if (p.retail) return { label: "Preço oficial", text: fmtMoney(p.retail.value, p.retail.currency), kind: "retail" };
  if (p.listed) {
    return {
      label: p.listed.unverified ? "Referência não verificada" : "Anunciado",
      text: fmtMoney(p.listed.value, p.listed.currency),
      kind: "listed",
    };
  }
  return { label: "Preço", text: NA, kind: "none" };
}

export const watchName = (w) => `${w.brand} ${w.model}`;

// Relógio cadastrado pelo usuário → mesma forma do catálogo.
export function buildUserWatch(values) {
  const brand = brandByName(values.brand);
  const price = Number(values.price);
  return defineWatch({
    ...values,
    source: "usuario",
    brandSlug: brand?.slug || null,
    segment: brand?.group === "entrada" ? "entrada" : "luxo",
    imageUrl: values.imageUrl || null,
    year: values.year ? Number(values.year) : null,
    prices: {
      retail: null,
      listed: price > 0 ? { value: price, currency: values.currency || "BRL", source: "Informado no cadastro", date: null, unverified: true } : null,
      sold: [],
    },
    sources: ["Cadastro manual do usuário"],
  });
}

// Migra relógios cadastrados no formato antigo (price numérico) para o novo.
export function upgradeUserWatch(w) {
  if (w.prices) return { ...defineWatch({}), ...w };
  return { ...buildUserWatch({ ...w, currency: "BRL" }), id: w.id, createdAt: w.createdAt, updatedAt: w.updatedAt };
}
