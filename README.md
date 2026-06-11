# Watch Hub

## Descrição

Aplicação web responsiva e moderna para cadastro, consulta e gerenciamento de relógios de luxo (Seiko, Victorinox e Rolex). Inclui dashboard com estatísticas, catálogo com busca/filtros/ordenação/paginação, detalhes do relógio, comparador de dois relógios e favoritos.

## Tecnologias utilizadas

- React
- React Router DOM
- JavaScript
- HTML5 Semântico
- CSS3 (Dark Luxury Theme)
- LocalStorage
- Fetch API
- Git e GitHub

## Funcionalidades

- Cadastro de relógios com validações:
  - Todos os campos obrigatórios
  - Preço > 0
  - Ano válido
  - Referência não duplicada
  - URL da imagem válida
- CRUD completo (visualizar, editar, excluir)
- Catálogo com:
  - Busca por modelo
  - Busca por referência
  - Filtro por marca
  - Ordenação por preço e por ano
  - Paginação
- Detalhes do relógio
- Comparador de relógios (2 selecionados)
- Favoritos (persistidos no LocalStorage)
- Integração com API externa:
  - `https://dummyjson.com/products`
  - Conversão de produtos em relógios fictícios (seed inicial)
  - Loading, Skeleton e tratamento de erros
- Dashboard com cards e gráficos simples (últimos cadastrados e estatísticas)

## Como instalar

1. `npm install`

## Como executar

- `npm run dev`

## Estrutura de pastas

```txt
src/
  components/
    Navbar/
    Footer/
    Sidebar/
    WatchCard/
    WatchForm/
    DashboardCard/
    FilterBar/
    SearchBar/
    ComparisonTable/
    FavoriteButton/
    Modal/
    LoadingSpinner/
    Toast/
  pages/
    Dashboard/
    Catalogo/
    Cadastro/
    Detalhes/
    Comparador/
    Favoritos/
  services/
    hooks/
    routes/
    api/
    storage/
    validation/
  styles/
    theme.css
    layout.css
    components.css
```

## Capturas de tela

- (placeholder) Captura do Dashboard
- (placeholder) Captura do Catálogo
- (placeholder) Captura do Cadastro
- (placeholder) Captura dos Detalhes
- (placeholder) Captura do Comparador
- (placeholder) Captura dos Favoritos

## Autor

(Seu nome)

## Diferencial para Nota Máxima

- Tema Dark Luxury
- Animações suaves
- Skeleton Loading
- Toast Notifications
- Estatísticas no Dashboard
- Busca em tempo real
- Persistência completa no LocalStorage
- Integração com API externa com seed inicial
