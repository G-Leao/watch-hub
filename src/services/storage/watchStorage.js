const WATCHES_KEY = "lwh_watches_v1";
const FAVORITES_KEY = "lwh_favorites_v1";
const COMPARISON_KEY = "lwh_comparison_v1";

export function createEmptyWatch() {
  return {
    id: String(Date.now()),
    brand: "",
    model: "",
    reference: "",
    year: "",
    diameter: "",
    material: "",
    movement: "",
    dialColor: "",
    waterResistance: "",
    price: "",
    imageUrl: "",
    description: "",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

export function getAllWatches() {
  try {
    const raw = localStorage.getItem(WATCHES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function persistWatches(watches) {
  localStorage.setItem(WATCHES_KEY, JSON.stringify(watches));
}

export function getFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function persistFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function getSelectedComparison() {
  try {
    const raw = localStorage.getItem(COMPARISON_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, 2) : [];
  } catch {
    return [];
  }
}

export function persistComparison(comparison) {
  localStorage.setItem(COMPARISON_KEY, JSON.stringify(comparison));
}

export function hydrateFavorites(setFavorites) {
  // intencionalmente vazio (mantemos compatibilidade com chamadas antigas)
  // eslint-disable-next-line no-unused-vars
}

export function hydrateComparison(setComparison) {
  // eslint-disable-next-line no-unused-vars
}

export function hydrateWatches(watches) {
  // Garantir shape mínima
  return watches.map((w) => ({
    ...w,
    createdAt: w.createdAt || Date.now(),
    updatedAt: w.updatedAt || w.createdAt || Date.now(),
  }));
}
