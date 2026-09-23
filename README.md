# Vitrine · Catálogo de Produtos

Catálogo de produtos em **React + Vite + TypeScript**, com busca, filtro por categoria,
paginação e página de detalhe. Consome a API pública [DummyJSON](https://dummyjson.com).

**Demo:** https://vitrine.viniciusribeiro.dev.br

Projeto de portfólio focado em **React** e nas boas práticas de frontend: componentes
reutilizáveis, camada de API tipada, estados de carregamento/vazio/erro, tema claro/escuro
e testes.

## Funcionalidades

- **Busca com debounce** (400 ms) por nome do produto.
- **Filtro por categoria** carregado da própria API.
- **Paginação** com contagem de itens.
- **Página de detalhe** por rota (`/produto/:id`) com galeria de imagens, especificações e avaliações.
- **Tema claro/escuro** com persistência e preferência do sistema.
- **Estados de UI**: esqueleto de carregamento, vazio e erro com "tentar novamente".
- **Responsivo** do mobile ao desktop.

## Stack

- **React 19** + **TypeScript**
- **Vite**
- **React Router**
- **Tailwind CSS v4**
- **Vitest** + **Testing Library**

## Como rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de produção em dist/
npm test         # testes unitários
npm run lint     # oxlint
```

## Arquitetura

```
src
├── components/   # Layout, Header, ProductCard, SearchBar, Pagination, Rating, States...
├── context/      # ThemeContext (tema claro/escuro)
├── hooks/        # useProducts, useProduct, useCategories, useDebounce
├── lib/          # api.ts (camada tipada) e format.ts
├── pages/        # CatalogPage, ProductDetailPage, NotFoundPage
└── types/        # tipos de domínio
```

A camada de API (`src/lib/api.ts`) centraliza as chamadas `fetch`, o tratamento de erro
(`ApiError`) e o cancelamento de requisições via `AbortController` — usado pelos hooks para
descartar respostas antigas quando o usuário digita ou troca de filtro.

## Testes

- `src/lib/api.test.ts`: montagem da URL (busca/categoria/paginação) e tratamento de erro.
- `src/components/ProductCard.test.tsx`: renderização de título, preço, desconto e link.

## Deploy

Publicado em **https://vitrine.viniciusribeiro.dev.br**.

O build gera arquivos estáticos em `dist/`. Como o app usa rotas do React Router, configure
o servidor para servir `index.html` em rotas desconhecidas (SPA fallback). Exemplos:

- **Nginx**: `try_files $uri $uri/ /index.html;`
- **Apache**: regra de rewrite para `index.html`.

## Autor

**Vinicius Santos Ribeiro** — Desenvolvedor Frontend
[Portfólio](https://viniciusribeiro.dev.br) · [GitHub](https://github.com/vihribeiro)
