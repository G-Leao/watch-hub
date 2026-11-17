import { defineWatch } from "./defineWatch.js";
import { resolveBrand } from "./brands.js";
import { LEGACY } from "./legacy.js";
import paulNewman from "../assets/imgs/paul-newman.png";
import CosmographDaytona from "../assets/imgs/rolex-daytona-126500ln.webp";
import grandmasterChime2019 from "../assets/imgs/patek-grandmaster-chime-2019.jfif";
import HenryGravesJr from "../assets/imgs/patek-henryGravesJr.jfif";
import reference57260 from "../assets/imgs/vacheron-constantin57260.jpg";
import RoyalOak5402 from "../assets/imgs/RoyalOak5402.jpeg";
import pateknautilus from "../assets/imgs/patek-nautilus-5711-1a-010.jpg";
import patekaquanaut from "../assets/imgs/patek-aquanaut-5167a.jpg";
import RafaelNadal from "../assets/imgs/RM 027 Tourbillon Rafael Nadal.jpg";
import JUMBOEXTRATHiN from "../assets/imgs/15202ST.webp";
import SplitSeconds from "../assets/imgs/RM 056 Sapphire Tourbillon Split-Seconds Chronograph.jpg";
import flybackChrono from "../assets/imgs/RM 011 Flyback Chronograph.jpg";
import Résonance from "../assets/imgs/F.P. Journe Chronomètre à Résonance.jpg";
import TourbillonSouverain from "../assets/imgs/Tourbillon Souverain.jpg";
import DoubleTourbillon from "../assets/imgs/Double Tourbillon 30°.jpg";
import HorologicalMachine from "../assets/imgs/Horological Machine No.1 (HM1).jpg";
import LegacyMachine from "../assets/imgs/Legacy Machine No.1 (LM1).jpg";
import DeBethune from "../assets/imgs/De Bethune.jpg";
import UrwerkUR from "../assets/imgs/Urwerk.jpg";
import UrwerkurSatel from "../assets/imgs/urwerk-ur-220.jpg";
import Astronomia from "../assets/imgs/jacob & Co.ASTRONOMIA.jpg";
import Zeitwerk from "../assets/imgs/A. Lange & Söhne Zeitwerk.jpg";
// REGRAS DO CATÁLOGO
// - Campo desconhecido = null (a interface mostra "Indisponível"). Nunca preencher por estimativa.
// - Preço de varejo, preço anunciado e preço negociado (leilão) são campos distintos.
// - Resultados de leilão só entram com casa, cidade e data.
// - Esta é uma curadoria inicial: confirme cada ficha na fonte oficial antes de usá-la comercialmente.

export const COMPLICATION_LABELS = {
  tourbillon: "Tourbillon",
  cronografo: "Cronógrafo",
  rattrapante: "Rattrapante (split-seconds)",
  flyback: "Flyback",
  "calendario-perpetuo": "Calendário perpétuo",
  "calendario-anual": "Calendário anual",
  "repeticao-minutos": "Repetição de minutos",
  "grande-sonnerie": "Grande sonnerie",
  ressonancia: "Ressonância",
  "hora-saltante": "Horas saltantes (digital)",
  "hora-satelital": "Exibição satelital",
  "forca-constante": "Força constante",
  gmt: "GMT / segundo fuso",
  data: "Data",
};

const SRC = "Curadoria Watch Hub — confirmar na fonte oficial da marca";
const lux = (brandName, o) => {
  const brand = resolveBrand(brandName);
  return defineWatch({
    brand: brand.name,
    brandSlug: brand.slug,
    sources: [SRC],
    ...o,
  });
};

const LUXO = [
  lux("Rolex", {
    id: "rolex-daytona-6239-paul-newman",
    model: "Cosmograph Daytona “Paul Newman”",
    reference: "6239",
    imageUrl: paulNewman,
    year: 1963,
    diameter: "37mm",
    movement: "Cronógrafo de corda manual (base Valjoux)",
    complications: ["cronografo"],
    vintage: true,
    provenance:
      "O exemplar vendido em 2017 pertenceu a Paul Newman; presente de Joanne Woodward, com a inscrição “Drive Carefully Me”.",
    description:
      "Apelido dado aos Daytona de mostrador “exótico”, hoje entre os relógios mais disputados do colecionismo. A referência 6239 é a primeira geração do Cosmograph.",
    prices: {
      retail: null,
      listed: null,
      sold: [
        {
          value: 17752500,
          currency: "USD",
          venue: "Phillips, Nova York (Winning Icons)",
          date: "2017-10-26",
          note: "Exemplar que pertenceu a Paul Newman",
        },
      ],
    },
  }),
  lux("Rolex", {
    id: "rolex-daytona-126500ln",
    model: "Cosmograph Daytona",
    reference: "126500LN",
    imageUrl: CosmographDaytona,
    year: 2023,
    diameter: "40mm",
    material: "Oystersteel",
    movement: "Automático, calibre 4131",
    caliber: "4131",
    waterResistance: "100m",
    complications: ["cronografo"],
    description:
      "Daytona contemporâneo em aço, com cronógrafo e calibre próprio da Rolex.",
  }),
  lux("Patek Philippe", {
    id: "patek-6300a-010-grandmaster-chime",
    model: "Grandmaster Chime (Only Watch 2019)",
    reference: "6300A-010",
    imageUrl: grandmasterChime2019,
    year: 2019,
    material: "Aço",
    complications: [
      "grande-sonnerie",
      "repeticao-minutos",
      "calendario-perpetuo",
    ],
    edition: "unica",
    produced: 1,
    description:
      "Versão única em aço da Grandmaster Chime, criada para o leilão beneficente Only Watch. Reúne grande sonnerie, repetição de minutos e calendário perpétuo.",
    prices: {
      retail: null,
      listed: null,
      sold: [
        {
          value: 31000000,
          currency: "CHF",
          venue: "Christie’s, Genebra (Only Watch)",
          date: "2019-11-09",
          note: "Peça única",
        },
      ],
    },
  }),
  lux("Patek Philippe", {
    id: "patek-graves-supercomplication",
    model: "Henry Graves Jr. Supercomplication",
    imageUrl: HenryGravesJr,
    kind: "bolso",
    year: 1933,
    complications: [
      "calendario-perpetuo",
      "repeticao-minutos",
      "cronografo",
      "rattrapante",
      "grande-sonnerie",
    ],
    edition: "unica",
    produced: 1,
    vintage: true,
    provenance: "Encomendado pelo banqueiro americano Henry Graves Jr.",
    description:
      "Relógio de bolso com 24 complicações, entregue em 1933. Referência histórica da alta complicação.",
    prices: {
      retail: null,
      listed: null,
      sold: [
        {
          value: 23237000,
          currency: "CHF",
          venue: "Sotheby’s, Genebra",
          date: "2014-11-11",
          note: "Peça única",
        },
      ],
    },
  }),
  lux("Patek Philippe", {
    id: "patek-nautilus-5711-1a-010",
    model: "Nautilus",
    reference: "5711/1A-010",
    imageUrl: pateknautilus,
    year: 2006,
    diameter: "40mm",
    thickness: "8.3mm",
    material: "Aço",
    caliber: "26-330 S C",
    movement: "Automático, calibre 26-330 S C",
    powerReserve: "35–45 h",
    waterResistance: "120m",
    complications: ["data"],
    description:
      "Nautilus em aço com mostrador azul. A Patek Philippe encerrou a produção da referência em 2021.",
  }),
  lux("Patek Philippe", {
    id: "patek-aquanaut-5167a",
    model: "Aquanaut",
    reference: "5167A",
    imageUrl: patekaquanaut,
    year: 2007,
    diameter: "40.8mm",
    material: "Aço",
    braceletMaterial: "Borracha composta",
    caliber: "324 S C",
    movement: "Automático, calibre 324 S C",
    powerReserve: "35–45 h",
    waterResistance: "120m",
    complications: ["data"],
    description:
      "Aquanaut em aço com pulseira de borracha composta e mostrador com padrão “tropical”.",
  }),
  lux("Audemars Piguet", {
    id: "ap-royal-oak-5402-jumbo",
    model: "Royal Oak “Jumbo”",
    reference: "5402",
    imageUrl: RoyalOak5402,
    year: 1972,
    diameter: "39mm",
    thickness: "7mm",
    material: "Aço",
    caliber: "2121",
    movement: "Automático ultrafino, calibre 2121",
    waterResistance: "50m",
    complications: ["data"],
    vintage: true,
    description:
      "O primeiro Royal Oak, desenhado por Gérald Genta e apresentado em 1972. O apelido “Jumbo” vem das dimensões, grandes para a época.",
  }),
  lux("Audemars Piguet", {
    id: "ap-royal-oak-15202st-jumbo-extra-thin",
    model: "Royal Oak “Jumbo” Extra-Thin",
    reference: "15202ST",
    imageUrl: JUMBOEXTRATHiN,
    year: 2012,
    diameter: "39mm",
    thickness: "8.1mm",
    material: "Aço",
    caliber: "2121",
    movement: "Automático ultrafino, calibre 2121",
    waterResistance: "50m",
    complications: ["data"],
    description:
      "Releitura do Jumbo apresentada em 2012. Foi substituída em 2022 pela referência 16202.",
  }),
  lux("Richard Mille", {
    id: "rm-027-tourbillon-nadal",
    model: "RM 027 Tourbillon Rafael Nadal",
    imageUrl: RafaelNadal,
    reference: "RM 027",
    year: 2010,
    complications: ["tourbillon"],
    description:
      "Tourbillon desenvolvido com o tenista Rafael Nadal para ser usado em quadra, com foco em leveza e resistência a impacto.",
  }),
  lux("Richard Mille", {
    id: "rm-056-sapphire",
    model: "RM 056 Sapphire Tourbillon Split-Seconds Chronograph",
    imageUrl: SplitSeconds,
    reference: "RM 056",
    material: "Safira",
    complications: ["tourbillon", "cronografo", "rattrapante"],
    description:
      "Caixa inteira em safira com tourbillon e cronógrafo rattrapante.",
  }),
  lux("Richard Mille", {
    id: "rm-011-flyback",
    model: "RM 011 Flyback Chronograph",
    imageUrl: flybackChrono,
    reference: "RM 011",
    year: 2007,
    complications: ["cronografo", "flyback", "calendario-anual"],
    description:
      "Cronógrafo flyback automático com calendário anual, associado ao piloto Felipe Massa.",
  }),
  lux("Vacheron Constantin", {
    id: "vacheron-57260",
    model: "Reference 57260",
    imageUrl: reference57260,
    reference: "57260",
    kind: "bolso",
    year: 2015,
    complications: ["tourbillon", "calendario-perpetuo", "repeticao-minutos"],
    edition: "unica",
    produced: 1,
    description:
      "Relógio de bolso de peça única, criado sob encomenda e apresentado em 2015, com 57 complicações e 2.826 componentes. Não está à venda.",
  }),
  lux("F.P. Journe", {
    id: "fpj-chronometre-a-resonance",
    model: "Chronomètre à Résonance",
    imageUrl: Résonance,
    complications: ["ressonancia"],
    description:
      "Dois mecanismos independentes na mesma caixa, que se sincronizam por ressonância. Uma das assinaturas técnicas de F.P. Journe.",
  }),
  lux("F.P. Journe", {
    id: "fpj-tourbillon-souverain",
    model: "Tourbillon Souverain",
    imageUrl: TourbillonSouverain,
    year: 1999,
    complications: ["tourbillon", "forca-constante"],
    description:
      "Tourbillon com mecanismo de força constante, entre as primeiras criações de F.P. Journe.",
  }),
  lux("Greubel Forsey", {
    id: "gf-double-tourbillon-30",
    model: "Double Tourbillon 30°",
    imageUrl: DoubleTourbillon,
    year: 2004,
    complications: ["tourbillon"],
    description:
      "Dois tourbillons, um inclinado a 30° dentro do outro. Peça fundadora da Greubel Forsey.",
  }),
  lux("MB&F", {
    id: "mbf-hm1",
    model: "Horological Machine No.1 (HM1)",
    imageUrl: HorologicalMachine,
    year: 2007,
    description:
      "Primeira das Horological Machines, os relógios-escultura da MB&F.",
  }),
  lux("MB&F", {
    id: "mbf-lm1",
    model: "Legacy Machine No.1 (LM1)",
    imageUrl: LegacyMachine,
    year: 2011,
    description:
      "Primeira da linha Legacy Machines, que reinterpreta a relojoaria clássica com a linguagem da MB&F.",
  }),
  lux("De Bethune", {
    id: "de-bethune-db28",
    imageUrl: DeBethune,
    model: "DB28",
    description:
      "Referência da linha DB28 da De Bethune. Ficha técnica pendente de verificação na fonte oficial.",
  }),
  lux("Urwerk", {
    id: "urwerk-ur-100",
    imageUrl: UrwerkUR,
    model: "UR-100",
    complications: ["hora-satelital"],
    description:
      "Referência de exibição satelital das horas, assinatura da Urwerk. Ficha técnica pendente de verificação.",
  }),
  lux("Urwerk", {
    id: "urwerk-ur-220",
    imageUrl: UrwerkurSatel,
    model: "UR-220",
    complications: ["hora-satelital"],
    description:
      "Referência de exibição satelital das horas, assinatura da Urwerk. Ficha técnica pendente de verificação.",
  }),
  lux("Jacob & Co.", {
    id: "jacob-astronomia",
    model: "Astronomia",
    imageUrl: Astronomia,
    complications: ["tourbillon"],
    description:
      "Linha de alta complicação da Jacob & Co. com tourbillon e mecanismos astronômicos. Ficha técnica pendente de verificação.",
  }),
  lux("A. Lange & Söhne", {
    id: "lange-zeitwerk",
    model: "Zeitwerk",
    imageUrl: Zeitwerk,
    year: 2009,
    diameter: "41.9mm",
    caliber: "L043.1",
    movement: "Corda manual, calibre L043.1",
    powerReserve: "36 h",
    complications: ["hora-saltante", "forca-constante"],
    description:
      "Exibição digital mecânica das horas e minutos, com números saltantes. Existe em diferentes metais.",
  }),
];

// Relógios do projeto original: mantidos, agora com preço rotulado como não verificado.
const LEGADO = LEGACY.map(({ legacyPrice, ...w }) =>
  defineWatch({
    ...w,
    sources: ["Dados do projeto original — não verificados"],
    prices: {
      retail: null,
      listed: {
        value: legacyPrice,
        currency: "BRL",
        source: "Valor de referência do projeto original (não verificado)",
        date: null,
        unverified: true,
      },
      sold: [],
    },
  }),
);

export const CATALOG = [...LUXO, ...LEGADO];
