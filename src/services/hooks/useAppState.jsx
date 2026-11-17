import { createContext, useEffect, useMemo, useState } from "react";
import { useToast } from "./useToast.jsx";
import { CATALOG } from "../../data/catalog.js";
import { BRANDS } from "../../data/brands.js";
import { buildUserWatch, upgradeUserWatch } from "../watchModel.js";
import {
  MAX_COMPARE,
  getFavorites,
  getSelectedComparison,
  loadUserWatches,
  persistComparison,
  persistFavorites,
  persistUserWatches,
} from "../storage/watchStorage.js";

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const toast = useToast();
  const [userWatches, setUserWatches] = useState(() => loadUserWatches().map(upgradeUserWatch));
  const [favorites, setFavorites] = useState(getFavorites);
  const [comparison, setComparison] = useState(getSelectedComparison);

  const watches = useMemo(() => [...CATALOG, ...userWatches], [userWatches]);

  // limpa favoritos/comparação que apontam para peças que não existem mais
  useEffect(() => {
    const ids = new Set(watches.map((w) => w.id));
    setFavorites((p) => (p.every((i) => ids.has(i)) ? p : p.filter((i) => ids.has(i))));
    setComparison((p) => (p.every((i) => ids.has(i)) ? p : p.filter((i) => ids.has(i))));
  }, [watches]);

  useEffect(() => persistFavorites(favorites), [favorites]);
  useEffect(() => persistComparison(comparison), [comparison]);

  const brandCount = useMemo(() => {
    const counts = Object.fromEntries(BRANDS.map((b) => [b.slug, 0]));
    for (const w of watches) if (counts[w.brandSlug] !== undefined) counts[w.brandSlug] += 1;
    return counts;
  }, [watches]);

  function addWatch(values) {
    const now = Date.now();
    const w = { ...buildUserWatch(values), id: `user-${now}`, createdAt: now, updatedAt: now };
    const next = [w, ...userWatches];
    setUserWatches(next);
    persistUserWatches(next);
    toast.push({ type: "success", message: "Relógio cadastrado com sucesso!" });
  }

  function deleteWatch(id) {
    const next = userWatches.filter((w) => w.id !== id);
    setUserWatches(next);
    persistUserWatches(next);
    toast.push({ type: "success", message: "Relógio excluído!" });
  }

  function toggleFavorite(id) {
    setFavorites((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  }

  function selectForComparison(id) {
    setComparison((p) => {
      if (p.includes(id)) return p.filter((x) => x !== id);
      if (p.length >= MAX_COMPARE) return [...p.slice(1), id];
      return [...p, id];
    });
  }

  const selectedComparisonWatches = useMemo(() => {
    const map = new Map(watches.map((w) => [w.id, w]));
    return comparison.map((id) => map.get(id)).filter(Boolean);
  }, [comparison, watches]);

  const value = {
    watches,
    userWatches,
    totalWatches: watches.length,
    brandCount,
    favorites,
    comparison,
    selectedComparisonWatches,
    maxCompare: MAX_COMPARE,
    actions: { addWatch, deleteWatch, toggleFavorite, selectForComparison, clearComparison: () => setComparison([]) },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
