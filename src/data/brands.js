// Registro de marcas. Para incluir uma nova manufatura, basta adicionar uma linha aqui
// e (opcionalmente) referências em catalog.js. Nada mais no app precisa mudar.
export const BRAND_GROUPS = {
  maison: "Grandes maisons de luxo",
  independente: "Alta relojoaria independente e produção limitada",
  contemporanea: "Luxo contemporâneo e peças extraordinárias",
  entrada: "Coleção de entrada (projeto original)",
};

const b = (name, group, country = null) => ({
  name,
  group,
  country,
  slug: name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "e")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
});

export const BRANDS = [
  b("Rolex", "maison", "Suíça"),
  b("Patek Philippe", "maison", "Suíça"),
  b("Audemars Piguet", "maison", "Suíça"),
  b("Richard Mille", "maison", "Suíça"),
  b("Vacheron Constantin", "maison", "Suíça"),
  b("A. Lange & Söhne", "maison", "Alemanha"),
  b("Breguet", "maison", "Suíça"),
  b("Jaeger-LeCoultre", "maison", "Suíça"),
  b("Blancpain", "maison", "Suíça"),
  b("Girard-Perregaux", "maison", "Suíça"),
  b("Piaget", "maison", "Suíça"),
  b("Cartier", "maison", "França"),

  b("F.P. Journe", "independente", "Suíça"),
  b("Greubel Forsey", "independente", "Suíça"),
  b("MB&F", "independente", "Suíça"),
  b("De Bethune", "independente", "Suíça"),
  b("Urwerk", "independente", "Suíça"),
  b("Philippe Dufour", "independente", "Suíça"),
  b("Laurent Ferrier", "independente", "Suíça"),
  b("Romain Gauthier", "independente", "Suíça"),
  b("Kari Voutilainen", "independente", "Suíça"),
  b("H. Moser & Cie.", "independente", "Suíça"),
  b("Parmigiani Fleurier", "independente", "Suíça"),
  b("Roger Dubuis", "independente", "Suíça"),
  b("HYT", "independente", "Suíça"),
  b("Rexhep Rexhepi / Akrivia", "independente", "Suíça"),
  b("Vianney Halter", "independente"),
  b("Daniel Roth", "independente", "Suíça"),

  b("Jacob & Co.", "contemporanea", "Estados Unidos"),
  b("Harry Winston", "contemporanea", "Estados Unidos"),
  b("Franck Muller", "contemporanea", "Suíça"),
  b("Ulysse Nardin", "contemporanea", "Suíça"),
  b("Louis Moinet", "contemporanea", "Suíça"),
  b("Bovet", "contemporanea", "Suíça"),
  b("Arnold & Son", "contemporanea", "Suíça"),
  b("Zenith", "contemporanea", "Suíça"),
  b("Chopard", "contemporanea", "Suíça"),
  b("IWC Schaffhausen", "contemporanea", "Suíça"),

  b("Seiko", "entrada", "Japão"),
  b("Victorinox", "entrada", "Suíça"),
];

export const brandBySlug = (slug) => BRANDS.find((x) => x.slug === slug) || null;
export const brandByName = (name) => BRANDS.find((x) => x.name === name) || null;
// aceita slug ("patek-philippe") ou nome ("Patek Philippe"), sem diferenciar maiúsculas
export const resolveBrand = (v) => {
  if (!v) return null;
  const t = String(v).trim().toLowerCase();
  return BRANDS.find((x) => x.slug === t || x.name.toLowerCase() === t) || null;
};
