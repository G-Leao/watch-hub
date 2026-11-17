// Forma única de um relógio. Todo campo desconhecido é null — a interface mostra "Indisponível".
// prices.retail  = preço de varejo oficial       { value, currency, source, date }
// prices.listed  = preço anunciado (mercado)     { value, currency, source, date, unverified? }
// prices.sold    = resultados negociados (leilão) [{ value, currency, venue, date, note }]
export function defineWatch(o) {
  return {
    segment: "luxo", // "luxo" | "entrada"
    source: "catalogo", // "catalogo" | "usuario"
    kind: "pulso", // "pulso" | "bolso"
    brandSlug: null,
    brand: "",
    model: "",
    reference: null,
    year: null,
    diameter: null,
    thickness: null,
    material: null,
    braceletMaterial: null,
    dialColor: null,
    movement: null,
    caliber: null,
    powerReserve: null,
    waterResistance: null,
    complications: [],
    edition: null, // "unica" | "limitada" | null (desconhecido)
    produced: null, // quantidade documentada
    vintage: false,
    condition: null,
    documentation: null,
    originalBox: null,
    provenance: null,
    imageUrl: null,
    imageCredit: null,
    description: "",
    prices: { retail: null, listed: null, sold: [] },
    sources: [],
    ...o,
  };
}
