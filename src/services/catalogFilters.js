import { COMPLICATION_LABELS } from "../data/catalog.js";
import { resolveBrand } from "../data/brands.js";
import { bestValueIn } from "./watchModel.js";

export const SORTS = {
  destaque: "Destaques",
  yearDesc: "Mais recentes",
  yearAsc: "Mais antigos",
  nome: "Marca A–Z",
  priceDesc: "Maior preço (na moeda escolhida)",
  priceAsc: "Menor preço (na moeda escolhida)",
};
export const CURRENCIES = ["BRL", "CHF", "USD"];

const norm = (s) =>
  String(s ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export function parseFilters(params) {
  const get = (k) => params.get(k) || "";
  const currency = CURRENCIES.includes(get("moeda")) ? get("moeda") : "";
  let sort = SORTS[get("ordem")] ? get("ordem") : "destaque";
  if (!currency && (sort === "priceDesc" || sort === "priceAsc")) sort = "destaque";
  const num = (k) => {
    const n = Number(get(k));
    return get(k) !== "" && Number.isFinite(n) && n >= 0 ? n : null;
  };
  return {
    q: get("q"),
    brand: resolveBrand(get("marca"))?.slug || "",
    segment: ["luxo", "entrada"].includes(get("segmento")) ? get("segmento") : "",
    comps: get("comp").split(",").filter((c) => COMPLICATION_LABELS[c]),
    edition: ["qualquer", "unica"].includes(get("edicao")) ? get("edicao") : "",
    vintage: get("vintage") === "1",
    material: get("material"),
    currency,
    min: num("min"),
    max: num("max"),
    sort,
    page: Math.max(1, Number(get("pagina")) || 1),
  };
}

function searchText(w) {
  const comps = (w.complications || []).map((c) => COMPLICATION_LABELS[c] || c).join(" ");
  return norm([w.brand, w.model, w.reference, w.caliber, w.movement, w.material, w.dialColor, w.year, comps].join(" "));
}

export function applyFilters(watches, f) {
  const terms = norm(f.q).split(/\s+/).filter(Boolean);
  const out = watches.filter((w) => {
    if (f.brand && w.brandSlug !== f.brand) return false;
    if (f.segment && w.segment !== f.segment) return false;
    if (f.comps.length && !f.comps.every((c) => (w.complications || []).includes(c))) return false;
    if (f.edition === "qualquer" && !w.edition) return false;
    if (f.edition === "unica" && w.edition !== "unica") return false;
    if (f.vintage && !w.vintage) return false;
    if (f.material && w.material !== f.material) return false;
    if (f.currency && (f.min !== null || f.max !== null)) {
      const v = bestValueIn(w, f.currency);
      if (v === null) return false;
      if (f.min !== null && v < f.min) return false;
      if (f.max !== null && v > f.max) return false;
    }
    if (terms.length) {
      const hay = searchText(w);
      if (!terms.every((t) => hay.includes(t))) return false;
    }
    return true;
  });

  const cmp = {
    destaque: () => 0,
    yearDesc: (a, b) => (b.year ?? -1) - (a.year ?? -1),
    yearAsc: (a, b) => (a.year ?? 1e9) - (b.year ?? 1e9),
    nome: (a, b) => `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`, "pt-BR"),
    priceDesc: (a, b) => (bestValueIn(b, f.currency) ?? -1) - (bestValueIn(a, f.currency) ?? -1),
    priceAsc: (a, b) => (bestValueIn(a, f.currency) ?? 1e15) - (bestValueIn(b, f.currency) ?? 1e15),
  }[f.sort];
  return [...out].sort(cmp); // sort estável: "destaque" mantém a ordem curada
}

export function availableComplications(watches) {
  const set = new Set(watches.flatMap((w) => w.complications || []));
  return Object.keys(COMPLICATION_LABELS).filter((k) => set.has(k));
}
export function availableMaterials(watches) {
  return [...new Set(watches.map((w) => w.material).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR"));
}
