import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../services/hooks/useAppState.jsx";
import WatchCard from "../../components/WatchCard/WatchCard.jsx";
import WatchImage from "../../components/WatchImage/WatchImage.jsx";
import { BRANDS, BRAND_GROUPS } from "../../data/brands.js";
import { COMPLICATION_LABELS } from "../../data/catalog.js";
import { fmtMoney } from "../../services/watchModel.js";
import { availableComplications } from "../../services/catalogFilters.js";

export default function Home() {
  const { watches, brandCount } = useContext(AppContext);

  const luxo = useMemo(() => watches.filter((w) => w.segment === "luxo"), [watches]);
  const hero = useMemo(() => luxo.find((w) => w.prices?.sold?.length) || luxo[0], [luxo]);
  const lots = useMemo(
    () => luxo.flatMap((w) => (w.prices?.sold || []).map((s) => ({ w, s }))).sort((a, b) => b.s.date.localeCompare(a.s.date)),
    [luxo],
  );
  const rare = useMemo(() => luxo.filter((w) => w.edition).slice(0, 3), [luxo]);
  const history = useMemo(() => luxo.filter((w) => w.vintage && !w.edition).slice(0, 3), [luxo]);
  const comps = useMemo(() => availableComplications(luxo).filter((c) => !["data", "gmt"].includes(c)), [luxo]);
  const brandsWith = BRANDS.filter((b) => b.group !== "entrada" && brandCount[b.slug] > 0).length;

  return (
    <>
      <section className="hero">
        <div className="heroText">
          <span className="eyebrow">Alta relojoaria e colecionismo</span>
          <h1 className="heroTitle">Peças que raramente aparecem nos catálogos.</h1>
          <p className="heroLead">
            De Rolex históricos a Patek Philippe de complicação extrema e manufaturas independentes. Compare referências, separe preço oficial, anunciado e negociado, e acompanhe só o que é documentado.
          </p>
          <div className="heroActions">
            <Link className="btn btnPrimary" to="/explorar?segmento=luxo">Explorar o acervo</Link>
            <Link className="btn" to="/comparador">Comparar referências</Link>
          </div>
          <dl className="heroFacts">
            <div><dt>Referências de luxo</dt><dd>{luxo.length}</dd></div>
            <div><dt>Manufaturas com fichas</dt><dd>{brandsWith}</dd></div>
            <div><dt>Resultados de leilão</dt><dd>{lots.length}</dd></div>
          </dl>
        </div>
        {hero && (
          <Link to={`/detalhes/${hero.id}`} className="heroWatch" aria-label={`Ver ${hero.brand} ${hero.model}`}>
            <WatchImage watch={hero} className="heroImg" />
            <span className="heroCaption">
              <span>{hero.brand}</span>
              <strong>{hero.model}</strong>
              {hero.prices.sold[0] && <span>Negociado em leilão: {fmtMoney(hero.prices.sold[0].value, hero.prices.sold[0].currency)}</span>}
            </span>
          </Link>
        )}
      </section>

      {lots.length > 0 && (
        <section className="section" aria-labelledby="leiloes">
          <div className="sectionHead">
            <h2 id="leiloes" className="sectionTitle">Resultados de leilão</h2>
            <span className="muted small">Valores negociados, com casa, cidade e data</span>
          </div>
          <ol className="lots">
            {lots.map(({ w, s }) => (
              <li key={`${w.id}-${s.date}`}>
                <Link to={`/detalhes/${w.id}`} className="lot">
                  <span className="lotDate">{s.date.slice(0, 4)}</span>
                  <span className="lotName"><small>{w.brand}</small><strong>{w.model}</strong><em>{s.venue}</em></span>
                  <span className="lotPrice">{fmtMoney(s.value, s.currency)}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      {rare.length > 0 && (
        <section className="section" aria-labelledby="raras">
          <div className="sectionHead">
            <h2 id="raras" className="sectionTitle">Peças únicas e edições limitadas</h2>
            <Link className="textLink" to="/explorar?edicao=qualquer">Ver todas</Link>
          </div>
          <div className="watchGrid watchGrid3">{rare.map((w) => <WatchCard key={w.id} watch={w} />)}</div>
        </section>
      )}

      <section className="section" aria-labelledby="marcas">
        <div className="sectionHead">
          <h2 id="marcas" className="sectionTitle">Manufaturas</h2>
          <Link className="textLink" to="/marcas">Ver todas</Link>
        </div>
        <div className="brandColumns">
          {["maison", "independente", "contemporanea"].map((g) => (
            <div key={g}>
              <h3 className="groupTitle">{BRAND_GROUPS[g]}</h3>
              <ul className="brandMini">
                {BRANDS.filter((b) => b.group === g).map((b) => (
                  <li key={b.slug}>
                    <Link to={`/marcas/${b.slug}`} className={brandCount[b.slug] ? "" : "brandEmpty"}>{b.name}{brandCount[b.slug] ? <small>{brandCount[b.slug]}</small> : null}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {history.length > 0 && (
        <section className="section" aria-labelledby="historicos">
          <div className="sectionHead">
            <h2 id="historicos" className="sectionTitle">Relógios históricos</h2>
            <Link className="textLink" to="/explorar?vintage=1">Ver todos</Link>
          </div>
          <div className="watchGrid watchGrid3">{history.map((w) => <WatchCard key={w.id} watch={w} />)}</div>
        </section>
      )}

      {comps.length > 0 && (
        <section className="section" aria-labelledby="comps">
          <h2 id="comps" className="sectionTitle">Procure por complicação</h2>
          <div className="chips">
            {comps.map((c) => <Link key={c} className="chip chipLink" to={`/explorar?comp=${c}`}>{COMPLICATION_LABELS[c]}</Link>)}
          </div>
        </section>
      )}

      <section className="section dataNote" aria-labelledby="dados">
        <h2 id="dados" className="groupTitle">Sobre os dados</h2>
        <p className="muted">
          O Watch Hub não preenche lacunas com estimativas: o que não é documentado aparece como “Indisponível”. Preço oficial, preço anunciado e preço negociado são sempre mostrados separados. As fichas são uma curadoria inicial e devem ser confirmadas na fonte oficial da marca.
        </p>
      </section>
    </>
  );
}
