import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import { createServer } from "vite";
// Verificação: dados, filtros, preços, migração do LocalStorage e renderização de todas as rotas.
// Uso: npm run check
const server = await createServer({ root: process.cwd(), server: { middlewareMode: true }, appType: "custom", logLevel: "error" });

const App = (await server.ssrLoadModule("/src/App.jsx")).default;
const { CATALOG } = await server.ssrLoadModule("/src/data/catalog.js");
const { BRANDS } = await server.ssrLoadModule("/src/data/brands.js");
const F = await server.ssrLoadModule("/src/services/catalogFilters.js");
const M = await server.ssrLoadModule("/src/services/watchModel.js");
let fail = 0;
const ok = (c, m) => { if (!c) { fail++; console.log("FALHA:", m); } else console.log("ok   ", m); };

// --- dados
const ids = CATALOG.map((w) => w.id);
ok(new Set(ids).size === ids.length, `ids únicos (${ids.length} peças)`);
ok(CATALOG.every((w) => w.brandSlug && BRANDS.find((b) => b.slug === w.brandSlug)), "toda peça aponta para marca do registro");
ok(BRANDS.length === 40, `40 marcas no registro (${BRANDS.length})`);
ok(CATALOG.filter((w) => w.id.startsWith("seed-LWH")).length === 15, "15 ids legados preservados (favoritos antigos continuam válidos)");
ok(CATALOG.filter((w) => w.id.startsWith("seed-")).every((w) => w.year === null || w.brand === "Rolex"), "anos fabricados do seed antigo removidos");
ok(CATALOG.every((w) => !w.prices.listed || w.prices.listed.unverified === true || w.prices.listed.source), "preço anunciado sempre rotulado");

// --- filtros
const P = (s) => F.parseFilters(new URLSearchParams(s));
const run = (s) => F.applyFilters(CATALOG, P(s));
ok(run("").length === CATALOG.length, "sem filtro = tudo");
ok(run("comp=tourbillon").every((w) => w.complications.includes("tourbillon")) && run("comp=tourbillon").length >= 4, `filtro tourbillon (${run("comp=tourbillon").length})`);
ok(run("comp=tourbillon,calendario-perpetuo").length >= 1, "filtro combinado tourbillon + perpétuo");
ok(run("edicao=unica").length === 3, "peças únicas = 3");
ok(run("vintage=1").length === 3, "vintage = 3");
ok(run("q=nautilus").length === 1, "busca por modelo");
ok(run("q=5711").length === 1, "busca por referência");
ok(run("q=Söhne").length === 1 && run("q=sohne").length === 1, "busca ignora acentos");
ok(run("q=perpetuo").length >= 2, "busca por complicação");
ok(run("q=oystersteel").length >= 5, "busca por material");
ok(run("marca=patek-philippe").length === 4 && run("marca=Rolex").length === 7, "filtro por marca (slug e nome antigo)");
ok(run("segmento=entrada").length === 10, "segmento entrada = 10");
ok(run("moeda=CHF&min=20000000").length === 2, "faixa de preço CHF ≥ 20 mi = 2");
ok(run("moeda=USD&max=1000000").length === 0, "USD ≤ 1 mi = 0 (sem dado inventado)");
ok(run("moeda=BRL&min=100000").length === 1, "BRL ≥ 100 mil = 1");
ok(P("ordem=priceDesc").sort === "destaque", "ordem por preço sem moeda cai para destaque");
const byPrice = F.applyFilters(CATALOG, P("moeda=CHF&ordem=priceDesc&min=0"));
ok(byPrice[0].id === "patek-6300a-010-grandmaster-chime", "ordenação por preço CHF");
ok(F.availableComplications(CATALOG).includes("tourbillon"), "complicações disponíveis geradas dos dados");

// --- preços
const nautilus = CATALOG.find((w) => w.id === "patek-nautilus-5711-1a-010");
ok(M.headlinePrice(nautilus).text === "Indisponível", "sem dado de preço = Indisponível");
const newman = CATALOG.find((w) => w.id.includes("paul-newman"));
ok(M.headlinePrice(newman).label === "Negociado em leilão", "preço de leilão rotulado");
ok(M.priceEntries(CATALOG.find((w) => w.id === "seed-LWH-RO-0011")).every((e) => e.label.includes("não verificado")), "preço legado marcado como não verificado");

// --- migração do storage
const mem = {};
globalThis.localStorage = { getItem: (k) => (k in mem ? mem[k] : null), setItem: (k, v) => (mem[k] = String(v)), removeItem: (k) => delete mem[k] };
mem.lwh_watches_v1 = JSON.stringify([
  { id: "seed-LWH-RO-0011", brand: "Rolex", model: "x", price: 1 },
  { id: "1700000000000", brand: "Seiko", model: "Meu", reference: "ZZ1", year: 2020, price: 3000, imageUrl: "", createdAt: 1, updatedAt: 1 },
]);
const S = await server.ssrLoadModule("/src/services/storage/watchStorage.js");
const migrated = S.loadUserWatches().map(M.upgradeUserWatch);
ok(migrated.length === 1 && migrated[0].model === "Meu", "migração mantém só relógios do usuário");
ok(migrated[0].prices.listed.value === 3000 && migrated[0].prices.listed.currency === "BRL" && migrated[0].id === "1700000000000", "preço antigo vira 'anunciado' BRL e id é preservado");
ok(!("lwh_watches_v1" in mem) && "lwh_user_watches_v2" in mem, "chave v1 removida, v2 criada");
const nw = M.buildUserWatch({ brand: "Patek Philippe", model: "T", reference: "R", year: "", price: "", currency: "CHF", imageUrl: "" });
ok(nw.prices.listed === null && nw.year === null && nw.brandSlug === "patek-philippe", "cadastro sem preço/ano fica indisponível");
S.persistComparison(["a", "b", "c", "d"]);
ok(S.getSelectedComparison().length === 3, "comparação limitada a 3");
delete globalThis.localStorage;

// --- render de todas as rotas
const routes = ["/", "/explorar", "/explorar?comp=tourbillon", "/explorar?q=xyzxyz", "/explorar?moeda=CHF&min=1", "/catalogo", "/marcas", "/marcas/patek-philippe", "/marcas/hyt", "/marcas/nao-existe",
  "/detalhes/patek-nautilus-5711-1a-010", "/detalhes/rolex-daytona-6239-paul-newman", "/detalhes/seed-LWH-SE-0001", "/detalhes/xxx", "/comparador", "/favoritos", "/painel", "/cadastro"];
for (const r of routes) {
  try {
    const html = renderToString(React.createElement(StaticRouter, { location: r }, React.createElement(App)));
    ok(html.length > 800, `render ${r} (${html.length} bytes)`);
    if (r === "/") { ok(html.includes("Resultados de leilão") && html.includes("31.000.000"), "home mostra leilões com valor"); ok(!html.includes("undefined") && !html.includes("NaN") && !html.includes("[object"), "home sem undefined/NaN"); }
    if (r === "/detalhes/patek-nautilus-5711-1a-010") ok(html.includes("Indisponível") && html.includes("Preço oficial de varejo"), "detalhes mostra indisponível e tipos de preço");
    if (r === "/marcas/hyt") ok(html.includes("Sem fichas verificadas ainda"), "marca sem peças mostra estado vazio honesto");
    if (r === "/explorar?q=xyzxyz") ok(html.includes("Nenhuma referência encontrada"), "busca sem resultado mostra estado vazio");
    if (/undefined|NaN|\[object/.test(html.replace(/dataset|undefined-/g, ""))) ok(false, `${r} contém undefined/NaN/[object]`);
  } catch (e) { ok(false, `render ${r}: ${e.message}`); }
}
await server.close();
console.log(fail ? `\n${fail} FALHA(S)` : "\nTUDO OK");
process.exit(fail ? 1 : 0);
