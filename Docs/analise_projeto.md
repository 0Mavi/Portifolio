# Documentação do Projeto: LandingPage-Base

Esta documentação fornece uma visão geral completa do projeto "LandingPage-Base", detalhando sua arquitetura, tecnologias, páginas, componentes, funcionalidades e regras de apresentação.

---

## 1. Visão Geral do Projeto

O projeto é uma **Landing Page / Portfólio Pessoal** desenvolvido para um profissional multitarefa (Charles Bruyerre, também conhecido como "Sharlee"), focado nas áreas de Graphic Design, UX/UI Design e Front-End Web Development.

O objetivo do site é apresentar o profissional, exibir uma vitrine interativa com seus trabalhos (projetos) e fornecer uma área sobre sua biografia, além do currículo.

---

## 2. Stack Tecnológica

O projeto é um **Single Page Application (SPA)** construído com o ecossistema moderno do React:

- **Framework Core**: React 19 com TypeScript.
- **Bundler**: Vite (extremamente rápido para build e HMR).
- **Roteamento**: `react-router-dom` v7 (configurado via `createBrowserRouter`).
- **Estilização**:
  - Tailwind CSS v4 para utilitários de estilo.
  - Shadcn/ui para base de componentes e design system acessível (integrado utilizando `clsx`, `tailwind-merge` e `class-variance-authority`).
- **Animações e Interatividade**:
  - **Framer Motion**: Utilizado massivamente para transições de página, *fade-ups*, *staggers* e animações baseadas em estado (ex: mudança de projetos na vitrine).
  - **GSAP**: Incluído na stack para animações complexas.
- **Componentes Específicos**:
  - `embla-carousel-react`: Motor do carrossel interativo presente na página de projetos.
  - `lucide-react`: Biblioteca de ícones (usado, por exemplo, o ícone `FileText` no botão do CV).
  - Efeito máquina de escrever (Typewriter customizado).

---

## 3. Estrutura de Rotas e Layout

A arquitetura de navegação foi definida em `src/routes.tsx` e divide a aplicação nas seguintes rotas:

- `/` **Home**: Página inicial com introdução.
- `/projects` **Projetos**: Vitrine dinâmica e interativa com os trabalhos do portfólio.
- `/about` **Sobre Mim**: Página contendo foto, biografia e link para *resume* (CV).
- `*` **404 / ErrorElement**: Rota de captura para páginas não encontradas.

### Layout Global (`src/pages/layout/_layout.tsx`)
Todas as páginas (exceto rotas de erro específicas se estiverem fora desse escopo) são renderizadas dentro do `<AppLayout />`. O comportamento é o seguinte:
- Possui um **Header** (`<Header />`) fixo superior que fica visível em todas as telas.
- Possui um espaço dinâmico (`<Outlet />`) no meio onde a rota ativa (Home, Projects, About) é injetada.
- Possui um **Footer** (`<Footer />`) na base, que no momento é apenas um contêiner esqueleto.

---

## 4. Análise de Funcionalidades e Telas

### 4.1. Header (`src/components/Header/index.tsx`)
- Fixo (`fixed`) no topo com índice de profundidade alto (`z-50`).
- Apresenta um logotipo/avatar arredondado com link para a rota inicial (`/`).
- Oculta interações desnecessárias do contêiner (`pointer-events-none`), mas reativa nas áreas clicáveis.
- Contém um botão iconográfico decorativo (matriz 3x3 de pontos) que sofre efeito `-hover` e animação. No momento, o botão não aciona funções adicionais de menu aberto/fechado, servindo para apelo estilístico.

### 4.2. Página Inicial (Home) - `/`
**Componente**: `src/pages/Home/app.tsx`
- **Responsabilidade**: Abordar o usuário com um impacto visual e direcional rápido.
- **Funcionalidades**:
  - Título com efeito progressivo de letras (`<Typewriter />`), com delay para intercalar mensagens ("Hey, I'm Charles" e em seguida "But you can call me Sharlee").
  - Apresentação rápida da "tagline" de suas especializações.
  - Dois botões direcionais estilizados por `Link` (para `/projects` e `/about`).
  - Um elemento circular abstrato de fundo sendo animado no onLoad.

### 4.3. Página Sobre Mim (About) - `/about`
**Componente**: `src/pages/About/index.tsx`
- **Responsabilidade**: Informar detalhes pessoais e links utilitários.
- **Funcionalidades e Regras de Negócio**:
  - Utiliza `framer-motion` para cascata (stagger) de transições suaves (`fadeUp`).
  - Exibição de foto de perfil com sobreposição de escala de cinza (`grayscale`), efeito "overlay" sobreposto e marca d'água ("portfolio '24").
  - Redirecionamento para Download do Resumo através do React Router (Link com `to="/resume.pdf"`).

### 4.4. Página de Projetos (Projects) - `/projects`
**Componente Root**: `src/pages/Projects/index.tsx`
**Componente de Cartão/Vitrine**: `src/components/Projects/cards/index.tsx`

Nesta seção concentra-se a lógica mais avançada de estado ("Regras de Negócio / Filtros") da camada de UI.

- **Responsabilidade**: Mapear e exibir os cases de estudo/designs de forma interativa.
- **Modelagem de Dados Atual**: Há um array de objetos `projects` constante com os dados (`id`, `title`, `category`, `image`, `logo`).
- **Estados Genéricos**:
  - Utiliza um estado (`activeProject` / `setActiveProject`) que muda a visualização inteira dinamicamente.
- **Funcionalidades do Carrossel e Feedback**:
  - A tela é dividida em duas grandes áreas horizontais (`h-[40vh]` e `h-[60vh]`).
  - **A Metade Superior**: Apresenta um componente `<Carousel>` do Shadcn que exibe "fichas/cartões" simplificados.
  - **Interação (Hover)**: Ao passar o mouse (`onMouseEnter`) sobre o item no carrossel, ele altera o estado de todo o componente setando o `activeProject`. 
  - O cartão ativo sofre um destaque de brilho, bordas de acentuação primária e fundo realçado; já os não-ativos mantêm opacidade baixa.
  - **A Metade Inferior**: Lê o estado `activeProject`. Usando o `<AnimatePresence>` do Framer Motion, executa uma transição sutil (esmaecimento + desfoque / *blur*) trocando a **imagem de fundo**, o texto decorativo e exibindo as classificações: **Category** (a categoria que atua como contexto de filtro lógico visual) e o **Title** do projeto. 
  - **Categorias Existentes**: Atualmente categoriza o trabalho visualmente (e.g. "Branding", "Web Development", "Portrait", "UX/UI Design"). Diferente de um filtro tradicional on/off com botões, a página de portfólio usa o *Hover* para renderizar instantaneamente todo o contexto, criando uma experiência contínua (smooth) ao invés do modelo padrão de clicar e carregar.

---

## 5. Práticas Notáveis de Desenvolvimento (Tech/UI)
1. **Design Responsivo e Polido**: O projeto gerencia as fontes responsivamente (`text-sm` até `text-7xl`) e usa as cores atreladas a tokens (`bg-background`, `text-primary`, `opacity-10`/`30`/`60`) herdadas da configuração via globals/Tailwind/Shadcn.
2. **Desempenho Visual (Mix Blending)**: Utiliza `mix-blend-multiply` e `mix-blend-difference` para criar contrastes orgânicos entre textos muito imensos/dinâmicos e imagens coloridas por baixo.
3. **Escalonamento**: O projeto foi montado perfeitamente isolado: as páginas estão encapsuladas dependendo apenas dos componentes agnósticos (sejam de navegação, carrossel ou modais). Isso significa que criar dados remotos ou um CMS no futuro, para buscar `projects`, será tão simples quanto substituir o objeto constante e carregar dentro do `useEffect`.
