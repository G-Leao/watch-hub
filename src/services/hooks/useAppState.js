import { createContext, useEffect, useMemo, useState } from "react";
import { useToast } from "./useToast";
import { fetchSeedProducts } from "../api/watchSeed";

import {
  createEmptyWatch,
  getAllWatches,
  getFavorites,
  getSelectedComparison,
  hydrateFavorites,
  hydrateComparison,
  hydrateWatches,
  persistFavorites,
  persistComparison,
  persistWatches,
} from "../storage/watchStorage";

export const AppContext = createContext(null);

const BRAND_OPTIONS = ["Seiko", "Victorinox", "Rolex"];

export function AppProvider({ children }) {
  const toast = useToast();

  const [watches, setWatches] = useState([]);
  const [favorites, setFavorites] = useState(getFavorites());
  const [comparison, setComparison] = useState(getSelectedComparison());

  const [apiStatus, setApiStatus] = useState({
    loading: false,
    error: null,
    lastUpdatedAt: null,
  });

  // 1) Hydrate from localStorage on mount
  useEffect(() => {
    const hydrated = hydrateWatches(getAllWatches());
    hydrateFavorites(setFavorites, favorites);
    hydrateComparison(setComparison, comparison);
    setWatches(hydrated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) Seed from API if localStorage is empty
  useEffect(() => {
    let ignore = false;

    async function run() {
      if (watches.length > 0) return;

      setApiStatus({ loading: true, error: null, lastUpdatedAt: null });
      try {
        const seed = await fetchSeedProducts({ brandOptions: BRAND_OPTIONS });
        if (ignore) return;
        setWatches(seed);
        persistWatches(seed);
        setApiStatus({
          loading: false,
          error: null,
          lastUpdatedAt: Date.now(),
        });
      } catch (err) {
        if (ignore) return;
        setApiStatus({
          loading: false,
          error: err?.message || "Falha ao carregar seed da API",
          lastUpdatedAt: null,
        });
      }
    }

    run();
    return () => {
      ignore = true;
    };
  }, [watches.length]);

  // Persist favorites & comparison
  useEffect(() => {
    persistFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    persistComparison(comparison);
  }, [comparison]);

  const totalWatches = watches.length;

  const brandCount = useMemo(() => {
    const counts = { Rolex: 0, Seiko: 0, Victorinox: 0 };
    for (const w of watches) {
      if (counts[w.brand] !== undefined) counts[w.brand] += 1;
    }
    return counts;
  }, [watches]);

  const avgPrice = useMemo(() => {
    if (watches.length === 0) return 0;
    const sum = watches.reduce((acc, w) => acc + Number(w.price || 0), 0);
    return sum / watches.length;
  }, [watches]);

  function addWatch(watch) {
    const next = [watch, ...watches];
    setWatches(next);
    persistWatches(next);
    toast.push({ type: "success", message: "Relógio cadastrado com sucesso!" });
  }

  function updateWatch(id, patch) {
    const next = watches.map((w) => (w.id === id ? { ...w, ...patch } : w));
    setWatches(next);
    persistWatches(next);
    toast.push({ type: "success", message: "Relógio atualizado!" });
  }

  function deleteWatch(id) {
    const next = watches.filter((w) => w.id !== id);
    setWatches(next);

    // remove from favorites/comparison
    setFavorites((prev) => prev.filter((fid) => fid !== id));
    setComparison((prev) => prev.filter((cid) => cid !== id));

    persistWatches(next);
    toast.push({ type: "success", message: "Relógio excluído!" });
  }

  function toggleFavorite(id) {
    setFavorites((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      return [...prev, id];
    });
  }

  function selectForComparison(id) {
    setComparison((prev) => {
      const existingIndex = prev.indexOf(id);
      if (existingIndex !== -1) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  }

  function clearComparison() {
    setComparison([]);
  }

  const selectedComparisonWatches = useMemo(() => {
    const map = new Map(watches.map((w) => [w.id, w]));
    return comparison.map((id) => map.get(id)).filter(Boolean);
  }, [comparison, watches]);

  const value = {
    watches,
    totalWatches,
    brandCount,
    avgPrice,
    favorites,
    comparison,
    selectedComparisonWatches,
    apiStatus,
    actions: {
      addWatch,
      updateWatch,
      deleteWatch,
      toggleFavorite,
      selectForComparison,
      clearComparison,
    },
    helpers: {
      createEmptyWatch,
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
