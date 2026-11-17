import React, { useContext, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../services/hooks/useAppState.jsx";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton.jsx";
import WatchCard from "../../components/WatchCard/WatchCard.jsx";
import WatchImage from "../../components/WatchImage/WatchImage.jsx";
import PriceBlock from "../../components/PriceBlock/PriceBlock.jsx";
import { COMPLICATION_LABELS } from "../../data/catalog.js";
import { NA, isEmpty } from "../../services/watchModel.js";

export default function Detalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { watches, comparison, maxCompare, actions } = useContext(AppContext);
  const watch = useMemo(() => watches.find((w) => String(w.id) === String(id)), [watches, id]);
  const related = useMemo(() => watches.filter((w) => watch && w.brandSlug === watch.brandSlug && w.id !== watch.id).slice(0, 4), [watches, watch]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!watch) {
    return (
      <section className="page">
        <div className="emptyState">
          <h1>Relógio não encontrado</h1>
          <p className="muted">Ele pode ter sido excluído ou o link está incorreto.</p>
          <Link className="btn btnPrimary" to="/explorar">Voltar ao acervo</Link>
        </div>
      </section>
    );
  }

  const inCmp = comparison.includes(watch.id);
  const specs = [
    ["Referência", watch.reference],
    ["Ano de lançamento", watch.year],
    ["Tipo", watch.kind === "bolso" ? "Relógio de bolso" : "Relógio de pulso"],
    ["Material da caixa", watch.material],
    ["Material da pulseira", watch.braceletMaterial],
    ["Calibre", watch.caliber],
    ["Movimento", watch.movement],
    ["Reserva de marcha", watch.powerReserve],
    ["Complicações", (watch.complications || []).map((c) => COMPLICATION_LABELS[c] || c).join(", ")],
    ["Diâmetro", watch.diameter],
    ["Espessura", watch.thickness],
    ["Cor do mostrador", watch.dialColor],
    ["Resistência à água", watch.waterResistance],
    ["Edição", watch.edition === "unica" ? "Peça única" : watch.edition === "limitada" ? "Edição limitada" : null],
    ["Quantidade produzida", watch.produced],
    ["Condição", watch.condition],
    ["Documentação", watch.documentation],
    ["Caixa original", watch.originalBox === true ? "Sim" : watch.originalBox === false ? "Não" : null],
    ["Procedência", watch.provenance],
  ];

  return (
    <section className="page">
      <nav className="crumbs" aria-label="Você está em">
        <Link to="/explorar">Acervo</Link>
        <span aria-hidden="true">/</span>
        {watch.brandSlug ? <Link to={`/marcas/${watch.brandSlug}`}>{watch.brand}</Link> : <span>{watch.brand}</span>}
      </nav>

      <div className="detail">
        <div className="detailImage"><WatchImage watch={watch} className="detailImg" /></div>
        <div className="detailInfo">
          <span className="watchBrand">{watch.brand}</span>
          <h1 className="detailTitle">{watch.model}</h1>
          <p className="detailDesc">{watch.description || "Descrição indisponível."}</p>

          <PriceBlock watch={watch} />

          <div className="detailActions">
            <FavoriteButton id={watch.id} />
            <button className="btn" type="button" onClick={() => actions.selectForComparison(watch.id)}>{inCmp ? "Remover do comparador" : "Adicionar ao comparador"}</button>
            {comparison.length >= 2 && inCmp && <Link className="btn btnPrimary" to="/comparador">Ver comparação ({comparison.length}/{maxCompare})</Link>}
          </div>

          <dl className="specs">
            {specs.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{isEmpty(v) ? <span className="na">{NA}</span> : String(v)}</dd></div>
            ))}
          </dl>

          <div className="sourceNote">
            <strong>Fontes desta ficha</strong>
            <ul>{(watch.sources?.length ? watch.sources : [NA]).map((s, i) => <li key={i}>{s}</li>)}</ul>
            {watch.imageUrl && watch.source !== "usuario" && <small>Imagem de fonte externa; direitos de uso ainda não confirmados.</small>}
          </div>

          {watch.source === "usuario" &&
            (!confirmDelete ? (
              <button className="textLink dangerLink" type="button" onClick={() => setConfirmDelete(true)}>Excluir este relógio</button>
            ) : (
              <div className="confirmBox" role="alertdialog" aria-label="Confirmar exclusão">
                <p className="errorText">Excluir {watch.model}? Essa ação não pode ser desfeita.</p>
                <div className="detailActions">
                  <button className="btn" type="button" onClick={() => setConfirmDelete(false)}>Cancelar</button>
                  <button className="btn btnDanger" type="button" onClick={() => { actions.deleteWatch(watch.id); navigate("/explorar"); }}>Excluir</button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {related.length > 0 && (
        <section className="section" aria-labelledby="rel">
          <h2 id="rel" className="sectionTitle">Mais de {watch.brand}</h2>
          <div className="watchGrid">{related.map((w) => <WatchCard key={w.id} watch={w} />)}</div>
        </section>
      )}
    </section>
  );
}
