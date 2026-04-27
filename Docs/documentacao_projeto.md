# Documentação do Projeto: Portfólio Pessoal (Landing Page)

## 1. Visão Geral
O projeto é um **portfólio pessoal interativo** desenvolvido para demonstrar habilidades avançadas em desenvolvimento frontend, com foco rigoroso em **Motion Design**, acessibilidade e UI/UX premium. A aplicação é uma Single Page Application (SPA) estática projetada para rodar localmente no navegador sem a necessidade de um backend dedicado, servindo como uma vitrine profissional de projetos e experiências.

## 2. Tecnologias Utilizadas (Stack Principal)
- **Framework Core**: React 19 (com Vite)
- **Linguagem**: TypeScript
- **Estilização & Design System**: Tailwind CSS v4, variáveis CSS nativas (Global.css)
- **Motion Design & Animações**: Framer Motion (para transições orquestradas, drag, orbs de fundo) e CSS Keyframes (para animações infinitas de alta performance).
- **Roteamento**: React Router DOM v7
- **Geração de PDF**: `@react-pdf/renderer` (para criação dinâmica e download do currículo)
- **Componentes Base**: Radix UI / Shadcn UI adaptados, Embla Carousel.
- **Ícones**: Lucide React.

## 3. Arquitetura de Dados (Mock Backend)
Como não há um servidor de banco de dados, o projeto utiliza um arquivo central estático como "Data Layer":
- **Caminho**: `src/data/projectsData.ts`
- **Estrutura**: Um Array estático contendo os objetos de tipo `Project`.
- **Modelagem do Projeto**: Cada projeto possui `id`, `slug` (usado para URL amigável), `title`, `category`, `image` (capa principal em alta resolução), `logo`, `description` (sinopse detalhada), `year`, `role` (função no projeto), e uma `gallery` (array com objetos contendo src e alt para imagens adicionais).
- **Regra de Busca (Filtro)**: O método exportado `getProjectBySlug(slug: string)` atua como um repositório para resgatar dados do projeto baseado na rota atual.

## 4. Estrutura de Rotas e Navegação
A navegação é orquestrada no arquivo `src/routes.tsx` por meio do `createBrowserRouter`, envolvendo tudo em um `AppLayout` (Layout principal).

| Rota | Página | Descrição |
|---|---|---|
| `/` | `Home` | Landing page principal com partículas, orbs dinâmicas, máquina de escrever (`Typewriter`) e CTAs de navegação. |
| `/projects` | `Projects` | Vitrine de todos os projetos cadastrados no portfólio. |
| `/projects/:slug` | `ProjectDetail` | Página detalhada de um projeto específico, montada dinamicamente pelo slug. |
| `/about` | `AboutMe` | Informações sobre a desenvolvedora, stack tecnológico, foto de perfil e download do CV. |
| `/*` | `NotFound` | Fallback de erro padrão (Página 404). |

## 5. Regras de Negócio, Funcionalidades e Fluxo

### 5.1. Página Inicial (Home)
- **Apresentação Otimizada**: Utiliza injeção nativa de CSS `@keyframes` no DOM para renderizar "partículas" de poeira cósmica/brilho no fundo. Esta foi uma decisão técnica arquitetural (regra) explícita no código para manter alto desempenho e evitar overhead no React.
- **Fluxo Call-to-Action**: Apresenta de imediato os botões magnéticos para as seções chaves (`/projects` e `/about`).

### 5.2. Vitrine de Projetos (`/projects`)
- **Lista/Carrossel Dinâmico**: Os projetos são carregados da constante `projects` (em `projectsData.ts`). Eles são listados em um carrossel horizontal de rolagem infinita (`loop: true`).
- **Estado Híbrido (Hover)**: Ao passar o mouse (Hover) em um card específico no carrossel superior, um estado local (`activeProject`) é alterado.
- **Showcase Interativo**: A mudança no `activeProject` desencadeia uma animação de transição (usando `AnimatePresence`) na parte inferior da tela, que carrega instantaneamente a imagem, o título e a categoria do projeto ativado como uma vitrine expansiva.
- **Navegação**: O clique final em um card de projeto redireciona para `/projects/:slug`.

### 5.3. Detalhes do Projeto (`/projects/:slug`)
- **Regra de Fallback e Tratamento de Erro**: O sistema lê o parâmetro `:slug` da URL. Se a função `getProjectBySlug` retornar falso (projeto inexistente, slug digitado errado), a página invoca a regra `<Navigate to="/projects" replace />`, redirecionando o usuário graciosamente de volta à listagem.
- **Renderização Sequencial**: As informações (metadados de ano, função, descrição e a galeria de imagens secundárias) surgem organizadas por meio de stagger animations de entrada (`fadeUp`), conferindo um aspecto luxuoso na visualização.

### 5.4. Sessão "Sobre" e Download Dinâmico (`/about`)
- **Grade de Habilidades**: Separação semântica em Frontend, Backend & Integração, e Ferramentas.
- **Funcionalidade de Currículo Dinâmico**: É acionada a biblioteca `react-pdf/renderer` envolvendo o botão de CTA "download resume". Este botão não faz requisição de rede para baixar um arquivo PDF estático hospedado; em vez disso, o componente interno `<ResumePDF />` "compila" e converte o layout React para PDF instaneamente de forma declarativa e no lado do cliente.

## 6. Padrões de Layout e Motion Design (Regras Visuais)
1. **Glassmorfismo e Gradientes**: Extenso uso de gradientes radiais, `color-mix`, e máscaras de ruído (SVG Backgrounds com `fractalNoise`) aplicadas em mix-blend.
2. **Custom Cursor**: O projeto possui um ecossistema de ponteiro modificado (`CustomCursor`), o qual frequentemente reage magneticamente a botões (Magnetic) se aproximando de links ou ações.
3. **Gerenciamento de Z-Index e Layers**: A profundidade visual é rigidamente controlada através de camadas renderizadas consecutivamente na Home e About (`Layer 0`, `Layer 1`, etc.), onde cada layer é tratada por propriedades separadas do framer-motion (`scaleY`, `rotateX`, `spring` transitions).
