# ⌚ Watch Hub

## Descrição

O Watch Hub é uma aplicação web desenvolvida em React para gerenciamento de relógios de luxo das marcas Seiko, Victorinox e Rolex.

A plataforma permite cadastrar, visualizar, pesquisar, comparar e favoritar relógios, além de apresentar estatísticas em um dashboard interativo. Os dados são persistidos localmente utilizando LocalStorage e a aplicação realiza integração com uma API externa para geração inicial dos dados.

---

## Objetivo do Projeto

Desenvolver uma aplicação SPA (Single Page Application) utilizando React, aplicando conceitos de componentização, gerenciamento de estado, roteamento, consumo de API, armazenamento local e boas práticas de desenvolvimento front-end.

---

## Tecnologias Utilizadas

* React
* React Router DOM
* JavaScript (ES6+)
* HTML5 Semântico
* CSS3
* Flexbox
* CSS Grid Layout
* LocalStorage
* Fetch API
* Git
* GitHub
* Vite

---

## Funcionalidades

### Dashboard

* Exibição de estatísticas gerais
* Quantidade total de relógios cadastrados
* Quantidade por marca
* Valor médio da coleção
* Últimos relógios adicionados

### Catálogo

* Listagem completa dos relógios
* Busca por modelo
* Busca por referência
* Filtro por marca
* Ordenação por preço
* Ordenação por ano
* Paginação dos resultados

### Cadastro de Relógios

Validações implementadas:

* Todos os campos obrigatórios
* Ano válido (1900 até o ano atual)
* Preço maior que zero
* Referência única
* URL da imagem válida

### Detalhes

* Visualização completa das informações do relógio
* Imagem ampliada
* Especificações técnicas
* Descrição detalhada

### Favoritos

* Adicionar relógios aos favoritos
* Remover favoritos
* Persistência no LocalStorage

### Comparador

* Comparação entre dois relógios
* Exibição lado a lado das especificações

### Persistência de Dados

Utilização do LocalStorage para armazenar:

* Relógios cadastrados
* Favoritos
* Comparações

---

## Integração com API Externa

A aplicação utiliza a API:

https://dummyjson.com/products

Os dados retornados são convertidos em relógios fictícios para gerar uma coleção inicial automaticamente quando o sistema é executado pela primeira vez.

---

---

## Como Instalar

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Acesse a pasta:

```bash
cd watch-hub
```

Instale as dependências:

```bash
npm install
```

---

## Como Executar

```bash
npm run dev
```

Após iniciar o projeto, acesse:

```text
http://localhost:5173
```

---

## Responsividade

A aplicação foi desenvolvida utilizando:

* Flexbox
* CSS Grid
* Media Queries

Garantindo compatibilidade com:

* Desktop
* Tablets
* Smartphones

---

## Boas Práticas Aplicadas

* Componentização React
* Separação de responsabilidades
* Reutilização de componentes
* Gerenciamento de estado com Hooks
* Persistência de dados
* Navegação utilizando React Router
* Controle de versão com Git
* Hospedagem do código no GitHub

---

## Capturas de Tela

Inserir imagens das telas:

* Dashboard
* Catálogo
* Cadastro
* Detalhes
* Comparador
* Favoritos

---

## Melhorias Futuras

* Integração com banco de dados
* Sistema de autenticação
* Upload de imagens
* Dashboard com gráficos avançados
* Consumo de API especializada em relógios
* Tema claro/escuro

---

## Autor

Gustavo Leão

Projeto desenvolvido para a disciplina de Desenvolvimento Front-End – Unicesumar.
