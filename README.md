# ⌚ Watch Hub — alta relojoaria e colecionismo

Catálogo de relógios de luxo, peças raras e referências de colecionador, com comparador, filtros por complicação e lista de desejos. Mantém a identidade original do projeto: React + Vite + React Router, preto e dourado, Cormorant Garamond + Inter, LocalStorage.

## Princípios de dados
- **Nada é inventado.** Campo desconhecido é `null` e aparece como “Indisponível”.
- **Três preços, nunca misturados:** oficial de varejo, anunciado (mercado secundário) e negociado (leilão, com casa, cidade e data).
- **Sem média de preços** entre moedas/tipos diferentes; o filtro de faixa de preço não converte câmbio.
- **Curadoria inicial:** confirme cada ficha na fonte oficial antes de uso comercial. Fichas incompletas (De Bethune DB28, Urwerk UR-100/UR-220, Jacob & Co. Astronomia, F.P. Journe Résonance) estão marcadas como pendentes.

## Funcionalidades
| Recurso | Situação |
|---|---|
| Home com peça em destaque, resultados de leilão, únicas/limitadas, históricos, manufaturas, complicações | dados do catálogo local |
| Acervo: busca (marca, modelo, referência, complicação, material, ano), filtros de marca, segmento, complicações, única/limitada, vintage, material, faixa de preço por moeda, ordenação, paginação, filtros na URL | funcional |
| Manufaturas (`/marcas`, `/marcas/:slug`) com 40 marcas | funcional; marcas sem fichas mostram estado vazio |
| Detalhes com preços separados, especificações, fontes | funcional |
| Comparador de até 3 referências, seletor direto, “Indisponível” onde não há dado | funcional |
| Favoritos / lista de desejos, Painel, Cadastro manual | funcional (LocalStorage) |

## Como adicionar dados
- **Nova marca:** uma linha em `src/data/brands.js`.
- **Nova referência:** um bloco `lux("Marca", { ... })` em `src/data/catalog.js`. Preencha só o que for documentado.
- **Resultado de leilão:** `prices.sold: [{ value, currency, venue, date, note }]`.
- **Imagem:** `imageUrl` (e `imageCredit`). Sem imagem, o app mostra um mostrador ilustrativo, nunca a foto de outro relógio.

## O que mudou em relação à versão anterior
- O seed por `dummyjson.com` foi removido: ele só servia para contar 15 itens. O catálogo agora é local e versionado.
- Removido o bloco `watchSpecs` duplicado e conflitante do seed (valia a versão interna).
- Anos fabricados por fórmula (`2010 + i % 14`) foram descartados; só os 5 Rolex têm ano verificável.
- Os 15 relógios originais continuam, com os mesmos ids (favoritos antigos seguem válidos). Seiko e Victorinox ficam no segmento “Entrada”.
- **Os valores em BRL dos 15 itens originais não são verificados** e aparecem rotulados assim. As imagens deles são links externos, sem direito de uso confirmado.
- LocalStorage v1 → v2: só os relógios cadastrados pelo usuário são migrados; favoritos e comparação são preservados.
- Comparador de 2 para 3 referências; tabela por seções em vez de estilos inline.
- Hooks duplicados (`.js`/`.jsx`) e componentes órfãos removidos.

## Rodando
```bash
npm install
npm run dev      # desenvolvimento
npm run build    # produção
npm run check    # testes de dados, filtros, migração e render de todas as rotas
```
