# Documentação do Projeto: Portfólio Pessoal

## Visão Geral
Este documento detalha a arquitetura, regras de negócio, funcionalidades e a estrutura técnica do projeto de portfólio pessoal (Maria Vitória - Frontend Developer). O projeto é uma Single Page Application (SPA) desenvolvida para exibir os projetos, habilidades e experiências da desenvolvedora, com forte ênfase em design, animações (motion design) e performance.

## Stack Tecnológico
- **Core:** React, TypeScript, Vite.
- **Estilização:** Tailwind CSS (com variáveis CSS customizadas para temas e cores).
- **Animações:** Framer Motion (animações fluidas, transições de página, 3D), animações CSS puras (para otimização de performance, ex: partículas na home).
- **Roteamento:** React Router DOM.
- **Componentização UI:** Radix UI / Shadcn UI (adaptado), Lucide React (ícones).
- **Funcionalidades Extras:** `@react-pdf/renderer` (para geração e download dinâmico do currículo).

## Estrutura de Diretórios (`src/`)

- `assets/`: Arquivos estáticos (imagens, fontes, ícones).
- `components/`: Componentes reutilizáveis da interface.
  - `CustomCursor/`: Cursor customizado magnético que reage a elementos interativos.
  - `Header/` & `Footer/`: Componentes globais de navegação e rodapé.
  - `Projects/`: Componentes específicos da vitrine de projetos (ex: cards com carrossel).
  - `ResumePDF/`: Componente responsável pela geração estruturada do PDF do currículo.
  - `Typewriter/`: Efeito visual de digitação usado na página inicial.
  - `ui/`: Componentes base reutilizáveis (botões, carrossel, etc., possivelmente baseados no shadcn/ui).
- `data/`: Contém a base de dados estática do projeto.
  - `projectsData.ts`: Fonte da verdade central contendo todos os dados dos projetos (título, slug, categoria, imagens, descrição, ano, role).
- `lib/`: Utilitários gerais (ex: `utils.ts` para mesclagem de classes do Tailwind).
- `pages/`: Componentes que representam as páginas da aplicação.
  - `Home/`: Página de aterrissagem (landing page).
  - `Projects/`: Listagem e vitrine interativa dos projetos.
    - `ProjectDetail/`: Página dinâmica (`/projects/:slug`) exibindo detalhes profundos de um projeto selecionado.
  - `About/`: Página "Sobre Mim", detalhando a trajetória e fornecendo a funcionalidade de download do currículo.
  - `layout/`: Layout base da aplicação (`AppLayout`), envolvendo as rotas.
  - `404/`: Página de "Não Encontrado" customizada.
- `routes.tsx`: Definição das rotas e mapeamento para os componentes de página.
- `Global.css`: Estilos globais, incluindo as declarações de variáveis CSS (temas dark/light, paleta de cores primárias "purple and black").

## Funcionalidades Principais

### 1. Landing Page (Home)
- **Apresentação Visual:** Utiliza um grid de profundidade, partículas flutuantes puras em CSS para performance, orbs decorativas animadas e background parallax.
- **Tipografia Dinâmica:** Uso do componente `Typewriter` para a introdução.
- **Navegação Rápida:** Botões de chamada para ação (CTAs) direcionando para "Projetos" e "Sobre Mim" com animações de stagger.

### 2. Vitrine de Projetos (Projects)
- **Carrossel Interativo:** A visualização dos projetos não utiliza uma listagem estática, mas sim um carrossel dinâmico (`Carousel` da ui).
- **Seleção Dinâmica (Filtro Visual):** Ao passar o mouse (hover) sobre um card no carrossel superior, o projeto correspondente é ativado (`activeProject` state).
- **Showcase de Fundo:** A seção inferior da tela reage instantaneamente ao projeto ativo, atualizando a imagem de fundo (com transições crossfade de desfoque e escala), título, categoria e cor de destaque daquele projeto.
- **Acesso ao Detalhe:** O clique no card do carrossel ou no showcase de fundo redireciona para a página interna do projeto.

### 3. Detalhamento Dinâmico de Projeto (`/projects/:slug`)
- **Roteamento Dinâmico:** Captura o parâmetro `:slug` da URL.
- **Resolução de Dados:** Utiliza a função `getProjectBySlug` do arquivo `projectsData.ts` para buscar todas as informações técnicas e imagens do projeto selecionado para renderização.

### 4. Sobre Mim & Currículo PDF (About)
- **Apresentação Pessoal:** Descreve a experiência e habilidades.
- **Geração de PDF:** Integração avançada com `@react-pdf/renderer` para permitir que o usuário faça o download do currículo em formato PDF gerado on-the-fly, mantendo alinhamento com a identidade visual do portfólio.

### 5. Identidade Visual e Motion Design
- **Tema Customizado:** Sistema de tema coeso (Purple and Black theme) com adaptações precisas para light e dark modes.
- **Animações (Layer 1 e Layer 2):** Transições de página fluídas (`AnimatePresence`), hover states em botões, movimento 3D no hover dos cards dos projetos (tilt e escala), e delays sequenciais de renderização nas listagens para criar um efeito cinematográfico (motion design premium).
- **Cursor Customizado:** Substituição do cursor padrão do navegador para um dot magnético.

## Regras de Negócio e Fluxo de Dados

- **Fonte Estática (`projectsData.ts`):** Para adicionar, remover ou editar um projeto, nenhuma alteração em componentes é necessária. Todo o conteúdo da vitrine de projetos e das páginas de detalhe é mapeado diretamente a partir da constante `projects` (que segue a interface `Project`).
- **Gerenciamento de Estado de Visualização:** Na página de projetos principais, o estado de "qual projeto está em destaque" é volátil e gerenciado localmente pelo hook `useState` atrelado ao evento de mouse hover nos itens do carrossel.
- **Performance de Renderização:** Elementos contínuos e muito pesados (como as partículas de background) usam `@keyframes` do CSS inseridos dinamicamente e `will-change` no style, em vez de depender inteiramente do loop do Framer Motion, evitando sobrecarga na main thread e melhorando os FPS.
