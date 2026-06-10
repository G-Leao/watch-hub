function pick(arr, idx) {
  if (!arr.length) return "";
  return arr[idx % arr.length];
}

function isValidYear(year) {
  const y = Number(year);
  return y >= 1900 && y <= new Date().getFullYear();
}

export async function fetchSeedProducts({ brandOptions }) {
  const res = await fetch("https://dummyjson.com/products");
  if (!res.ok) throw new Error("Falha ao consumir API externa");
  const data = await res.json();

  const products = Array.isArray(data?.products) ? data.products : [];
  // Requisito: exatamente 5 relógios de cada marca.
  const targetPerBrand = 5;
  const max = Math.min(products.length, targetPerBrand * brandOptions.length);

  const dialColors = ["Preto", "Azul", "Prata", "Verde", "Champagne"];

  const watchSpecs = {
    "Alpinist SPB121": {
      reference: "SPB121J1",
      diameter: "39.5mm",
      material: "Aço inoxidável",
      movement: "Seiko 6R35 Automático",
      dialColor: "Verde",
      waterResistance: "200m",
      price: 6100,
    },

    "Prospex Turtle SRPE93": {
      reference: "SRPE93K1",
      diameter: "45mm",
      material: "Aço inoxidável",
      movement: "Seiko 4R36 Automático",
      dialColor: "Preto",
      waterResistance: "200m",
      price: 4800,
    },

    "Prospex Samurai SRPB51": {
      reference: "SRPB51K1",
      diameter: "43.8mm",
      material: "Aço inoxidável",
      movement: "Seiko 4R35 Automático",
      dialColor: "Preto",
      waterResistance: "200m",
      price: 5900,
    },

    "Presage Cocktail Time": {
      reference: "SRPB43J1",
      diameter: "40.5mm",
      material: "Aço inoxidável",
      movement: "Seiko 4R35 Automático",
      dialColor: "Azul",
      waterResistance: "50m",
      price: 5900,
    },

    "King Seiko SPB281": {
      reference: "SPB281J1",
      diameter: "37mm",
      material: "Aço inoxidável",
      movement: "Seiko 6R31 Automático",
      dialColor: "Prata",
      waterResistance: "100m",
      price: 9800,
    },

    "I.N.O.X Automatic": {
      reference: "241835",
      diameter: "41mm",
      material: "Aço inoxidável",
      movement: "Sellita SW200-1 Automático",
      dialColor: "Preto",
      waterResistance: "200m",
      price: 7200,
    },

    "Journey 1884": {
      reference: "241978",
      diameter: "43mm",
      material: "Aço inoxidável",
      movement: "Quartz",
      dialColor: "Azul",
      waterResistance: "200m",
      price: 5100,
    },

    "Maverick Chronograph": {
      reference: "241951",
      diameter: "43mm",
      material: "Aço inoxidável",
      movement: "Quartz Cronógrafo",
      dialColor: "Preto",
      waterResistance: "100m",
      price: 5900,
    },

    "FieldForce Sport": {
      reference: "241926",
      diameter: "42mm",
      material: "Aço inoxidável com revestimento PVD Preto",
      movement: "Quartz",
      dialColor: "Preto",
      waterResistance: "100m",
      price: 6500,
    },

    "Alliance XS": {
      reference: "241877",
      diameter: "35mm",
      material: "Aço inoxidável",
      movement: "Quartz",
      dialColor: "Prata",
      waterResistance: "100m",
      price: 4200,
    },

    "Submariner Date": {
      reference: "126610LN",
      diameter: "41mm",
      material: "Oystersteel",
      movement: "Rolex Calibre 3235",
      dialColor: "Preto",
      waterResistance: "300m",
      price: 85000,
    },

    "GMT-Master II": {
      reference: "126710BLNR",
      diameter: "40mm",
      material: "Oystersteel",
      movement: "Rolex Calibre 3285",
      dialColor: "Preto",
      waterResistance: "100m",
      price: 98000,
    },

    "Datejust 41": {
      reference: "126334",
      diameter: "41mm",
      material: "Oystersteel e Ouro Branco",
      movement: "Rolex Calibre 3235",
      dialColor: "Wimbledon",
      waterResistance: "100m",
      price: 76000,
    },

    "Explorer I": {
      reference: "124270",
      diameter: "36mm",
      material: "Oystersteel",
      movement: "Rolex Calibre 3230",
      dialColor: "Preto",
      waterResistance: "100m",
      price: 69000,
    },

    "Daytona Cosmograph": {
      reference: "126500LN",
      diameter: "40mm",
      material: "Oystersteel",
      movement: "Rolex Calibre 4131",
      dialColor: "Preto",
      waterResistance: "100m",
      price: 125000,
    },
  };

  // transforma produtos em relógios fictícios (seed)
  // Garantia de distribuição: 5 itens para Seiko, 5 para Victorinox e 5 para Rolex.
  return Array.from({ length: max }).map((_, i) => {
    const p = products[i];

    const brandIdx = Math.floor(i / targetPerBrand);
    const brand = brandOptions[Math.min(brandIdx, brandOptions.length - 1)];

    const year = (() => {
      const y = 2010 + (i % 14);
      return isValidYear(y) ? y : new Date().getFullYear();
    })();

    const seikoModels = [
      "Alpinist SPB121",
      "Prospex Turtle SRPE93",
      "Prospex Samurai SRPB51",
      "Presage Cocktail Time",
      "King Seiko SPB281",
    ];

    const victorinoxModels = [
      "I.N.O.X Automatic",
      "Journey 1884",
      "Maverick Chronograph",
      "FieldForce Sport",
      "Alliance XS",
    ];

    const rolexModels = [
      "Submariner Date",
      "GMT-Master II",
      "Datejust 41",
      "Explorer I",
      "Daytona Cosmograph",
    ];

    let model = "";

    if (brand === "Seiko") {
      model = seikoModels[i % 5];
    }

    if (brand === "Victorinox") {
      model = victorinoxModels[i % 5];
    }

    if (brand === "Rolex") {
      model = rolexModels[i % 5];
    }

    const reference = `LWH-${brand.toUpperCase().slice(0, 2)}-${String(p?.id ?? i).padStart(4, "0")}`;

    // Requisito: imagens condizentes com as marcas.
    const watchImages = {
      "Alpinist SPB121":
        "https://corvusbrasil.com/wp-content/uploads/2021/01/219_5372-2000x1333px-s_rectangle-e1592393011614.jpg",

      "Prospex Turtle SRPE93":
        "https://cdn.awsli.com.br/2500x2500/568/568258/produto/114378384/relojoaria_impala_seiko_prospex_srpe93b1_02-sqkx21uet4.png",

      "Prospex Samurai SRPB51":
        "https://i0.wp.com/diveintowatches.com/wp-content/uploads/2025/01/Seiko_Prospex_Diver_200M_Slim_Samurai_SRPL13K1_Wrist_ZRH_2025.jpg?resize=1024%2C624&ssl=1",

      "Presage Cocktail Time":
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQx5-oSy42L-X4pXs_G9kOkb98aohLVaDMXK_pjTbTfjNUscU98PIrHCIt7_OPFaZPItiW4E4MdTnYqWNW1p8vgqnj-qGHxPstVHWUliuI2zvihkMVcIiqn",

      "King Seiko SPB281":
        "https://www.belmontwatches.com/cdn/shop/files/KingSeikoSPB281.jpg?v=1691600639",

      "I.N.O.X Automatic":
        "https://www.relogios.pt/pictures/victorinox-swiss-army-242020-inox-mechanical-17280803.jpg",

      "Journey 1884":
        "https://diveintowatches.com/wp-content/uploads/2022/10/Victorinox_Journey_1884_Frontal_1_NYC_2022-840x525.jpg",

      "Maverick Chronograph":
        "https://img.chrono24.com/images/uhren/46549578-v82xvyz6mco49tsjzdcu3a6t-ExtraLarge.jpg",

      "FieldForce Sport":
        "https://cdn.newlooktime.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/2/4/241926.1-04.jpg",

      "Alliance XS":
        "https://imageengine.victorinox.com/transform/f65ccab7-39f2-4b1a-95d9-4a1b5ff52db3/WAT_241877_FR?io=transform%3Abackground%2Ccolor%3AF0F0F0&io=transform%3Afit%2Cwidth%3A900%2Cheight%3A650&quality=100",

      "Submariner Date":
        "https://cdn.awsli.com.br/2500x2500/520/520410/produto/249910430/img_3257-cx7zrwzp0t.jpeg",

      "GMT-Master II":
        "https://img.chrono24.com/images/uhren/46268559-n8eer1d445k6oe4spyywpmrk-ExtraLarge.jpg",

      "Datejust 41":
        "https://www.everestbands.com/cdn/shop/articles/Rolex-datejust-41-wimbeldon-3_b7a6d4e8-1581-48be-9ab3-825cf184f0dd.jpg?v=1758166319",

      "Explorer I":
        "https://img.chrono24.com/images/uhren/46090068-glo6jgeksjpow55mu1nhbpyo-ExtraLarge.jpg",

      "Daytona Cosmograph":
        "https://img.chrono24.com/images/uhren/46670062-h1h3lmtx5i3d3xnlks3enkc8-ExtraLarge.jpg",
    };

    //descriçoesssss
    const watchDescriptions = {
      "Alpinist SPB121":
        "Relógio automático de aventura da linha Prospex, caixa de 39,5mm em aço inoxidável, mostrador verde sunburst e resistência à água de 200m.",

      "Prospex Turtle SRPE93":
        "Ícone dos relógios de mergulho Seiko, equipado com calibre automático, caixa robusta e resistência à água de 200m.",

      "Prospex Samurai SRPB51":
        "Modelo esportivo com design angular inspirado em armaduras samurai, movimento automático e excelente legibilidade.",

      "Presage Cocktail Time":
        "Relógio elegante da linha Presage, famoso pelo mostrador texturizado inspirado em coquetéis japoneses.",

      "King Seiko SPB281":
        "Modelo sofisticado da linha King Seiko, combinando tradição relojoeira japonesa e acabamento refinado.",

      "I.N.O.X Automatic":
        "Relógio suíço extremamente resistente, desenvolvido para suportar condições extremas sem abrir mão da elegância.",

      "Journey 1884":
        "Modelo premium da Victorinox com design contemporâneo e excelente versatilidade para uso diário.",

      "Maverick Chronograph":
        "Cronógrafo esportivo suíço com visual robusto, ideal para quem busca precisão e estilo.",

      "FieldForce Sport":
        "Inspirado nos relógios militares, combina resistência, legibilidade e visual esportivo.",

      "Alliance XS":
        "Modelo elegante e compacto da Victorinox, com acabamento refinado e design atemporal.",

      "Submariner Date":
        "Um dos relógios mais famosos do mundo, referência entre mergulhadores e colecionadores.",

      "GMT-Master II":
        "Projetado para viajantes, permite acompanhar múltiplos fusos horários simultaneamente.",

      "Datejust 41":
        "Clássico da Rolex, reconhecido pelo design versátil e elegante para qualquer ocasião.",

      "Explorer I":
        "Inspirado nas expedições ao Everest, combina robustez, simplicidade e excelente legibilidade.",

      "Daytona Cosmograph":
        "Cronógrafo lendário criado para o automobilismo, símbolo de desempenho e exclusividade.",
    };

    //especificaçoessss

    const watchSpecs = {
      "Daytona Cosmograph": {
        diameter: "40mm",
        material: "Oystersteel",
        movement: "Automático Rolex Calibre 4131",
        waterResistance: "100m",
        price: 125000,
        reference: "126500LN",
      },

      "GMT-Master II": {
        diameter: "40mm",
        material: "Oystersteel",
        movement: "Automático Rolex Calibre 3285",
        waterResistance: "100m",
        price: 98000,
        reference: "126710BLNR",
      },

      "Submariner Date": {
        diameter: "41mm",
        material: "Oystersteel",
        movement: "Automático Rolex Calibre 3235",
        waterResistance: "300m",
        price: 85000,
        reference: "126610LN",
      },

      "Datejust 41": {
        diameter: "41mm",
        material: "Oystersteel",
        movement: "Automático Rolex Calibre 3235",
        waterResistance: "100m",
        price: 76000,
        reference: "126300",
      },

      "Explorer I": {
        diameter: "40mm",
        material: "Oystersteel",
        movement: "Automático Rolex Calibre 3230",
        waterResistance: "100m",
        price: 69000,
        reference: "224270",
      },

      "King Seiko SPB281": {
        diameter: "37mm",
        material: "Aço inoxidável",
        movement: "Automático Seiko 6R31",
        waterResistance: "100m",
        price: 9800,
        reference: "SPB281J1",
      },

      "Presage Cocktail Time": {
        diameter: "40.5mm",
        material: "Aço inoxidável",
        movement: "Automático Seiko 4R35",
        waterResistance: "50m",
        price: 7500,
        reference: "SRPB43J1",
      },

      "Prospex Samurai SRPB51": {
        diameter: "43.8mm",
        material: "Aço inoxidável",
        movement: "Automático Seiko 4R35",
        waterResistance: "200m",
        price: 6800,
        reference: "SRPB51K1",
      },

      "Prospex Turtle SRPE93": {
        diameter: "45mm",
        material: "Aço inoxidável",
        movement: "Automático Seiko 4R36",
        waterResistance: "200m",
        price: 6200,
        reference: "SRPE93K1",
      },

      "Alpinist SPB121": {
        diameter: "39.5mm",
        material: "Aço inoxidável",
        movement: "Automático Seiko 6R35",
        waterResistance: "200m",
        price: 5500,
        reference: "SPB121J1",
      },

      "I.N.O.X Automatic": {
        diameter: "41mm",
        material: "Aço inoxidável",
        movement: "Automático Sellita SW200",
        waterResistance: "200m",
        price: 7200,
        reference: "241835",
      },

      "Journey 1884": {
        diameter: "43mm",
        material: "Aço inoxidável",
        movement: "Quartz Suíço",
        waterResistance: "200m",
        price: 5100,
        reference: "241978",
      },

      "Maverick Chronograph": {
        diameter: "43mm",
        material: "Aço inoxidável",
        movement: "Quartz Suíço",
        waterResistance: "100m",
        price: 5900,
        reference: "241951",
      },

      "FieldForce Sport": {
        diameter: "42mm",
        material: "Aço inoxidável PVD Preto",
        movement: "Quartz Suíço",
        waterResistance: "100m",
        price: 6500,
        reference: "241892",
      },

      "Alliance XS": {
        diameter: "35mm",
        material: "Aço inoxidável",
        movement: "Quartz Suíço",
        waterResistance: "100m",
        price: 4200,
        reference: "241879",
      },
    };

    const imageUrl = watchImages[model];

    return {
      id: `seed-${reference}`,
      brand,
      model,
      year,
      reference: watchSpecs[model].reference,
      diameter: watchSpecs[model].diameter,
      material: watchSpecs[model].material,
      movement: watchSpecs[model].movement,
      dialColor: watchSpecs[model].dialColor,
      waterResistance: watchSpecs[model].waterResistance,
      price: watchSpecs[model].price,
      imageUrl,
      description:
        watchDescriptions[model] || `Relógio premium da marca ${brand}.`,
      createdAt: Date.now() - i * 1000 * 60,
      updatedAt: Date.now() - i * 1000 * 60,
    };
  });
}
