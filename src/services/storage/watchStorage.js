// O catálogo agora vem de src/data. O LocalStorage guarda apenas o que é do usuário.
const USER_WATCHES_KEY = "lwh_user_watches_v2";
const OLD_WATCHES_KEY = "lwh_watches_v1";
const FAVORITES_KEY = "lwh_favorites_v1";
const COMPARISON_KEY = "lwh_comparison_v1";
export const MAX_COMPARE = 3;

function readJson(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* armazenamento indisponível: o app segue funcionando sem persistência */
  }
}

// Migração v1 → v2: o v1 guardava o catálogo inteiro (seed incluso). Só o que o usuário cadastrou é preservado.
export function loadUserWatches() {
  const current = readJson(USER_WATCHES_KEY);
  if (Array.isArray(current)) return current;
  const old = readJson(OLD_WATCHES_KEY);
  const migrated = Array.isArray(old) ? old.filter((w) => w && !String(w.id).startsWith("seed-")) : [];
  writeJson(USER_WATCHES_KEY, migrated);
  try {
    localStorage.removeItem(OLD_WATCHES_KEY);
  } catch {
    /* ignora */
  }
  return migrated;
}
export const persistUserWatches = (list) => writeJson(USER_WATCHES_KEY, list);

export const getFavorites = () => (Array.isArray(readJson(FAVORITES_KEY)) ? readJson(FAVORITES_KEY) : []);
export const persistFavorites = (v) => writeJson(FAVORITES_KEY, v);

export const getSelectedComparison = () => {
  const v = readJson(COMPARISON_KEY);
  return Array.isArray(v) ? v.slice(0, MAX_COMPARE) : [];
};
export const persistComparison = (v) => writeJson(COMPARISON_KEY, v);
