# 🚀 Portfólio Pessoal | Maria Vitória

Bem-vindo ao repositório do meu **Portfólio Pessoal**, uma Single Page Application (SPA) projetada para entregar uma experiência premium. Este projeto é a intersecção entre código limpo, design moderno e motion design avançado, criado para demonstrar não apenas projetos, mas um alto nível de excelência visual e interativa.

O design foi estruturado com foco na hierarquia visual, uso otimizado de *whitespace* (respiro), acessibilidade e animações fluidas que guiam a jornada do usuário.

---

## 🖥️ Stack Tecnológico & Arquitetura

O ecossistema baseia-se nas ferramentas mais modernas de desenvolvimento web, garantindo performance e escalabilidade:

- **Core:** React 19, TypeScript, Vite e React Router v7.
- **UI & Estilização:** Tailwind CSS v4, Shadcn/ui (Radix primitives, CVA, clsx, tailwind-merge). A estilização é dinâmica via CSS Variables para facilitar temas (Dark/Light mode - *Purple and Black Theme*).
- **Motion Design:** Framer Motion (transições de página, *staggers* controlados, AnimatePresence) e animações CSS otimizadas para elementos repetitivos (evitando sobrecarga no main thread).
- **Componentes de Destaque:** 
  - Embla Carousel para a vitrine interativa.
  - Lucide React para iconografia minimalista.
  - `@react-pdf/renderer` para geração e download dinâmico do currículo on-the-fly.
  - Cursor magnético customizado para *affordance* aprimorado nas interações.

---

## 📁 Arquitetura de Diretórios (`src/`)

```
src/
├── assets/          # Assets estáticos, fontes e imagens.
├── components/      # UI isolada e reutilizável.
│   ├── CustomCursor/# Cursor interativo e adaptativo.
│   ├── Header/      # Navegação principal.
│   ├── Projects/    # Vitrine e lógica do carrossel com hover states complexos.
│   ├── ResumePDF/   # Engine de renderização de PDF para o currículo.
│   ├── Typewriter/  # Animação de entrada tipográfica para a Home.
│   └── ui/          # Radix Primitives e componentes Shadcn.
├── data/            # Fonte única de verdade (projectsData.ts).
├── lib/             # Utilitários (ex: cn merge).
├── pages/           # Views principais (Home, About, Projects, 404).
├── routes.tsx       # Definição e abstração das rotas (v7).
└── Global.css       # Design Tokens e setup de Tailwind.
```

---

## ✨ Design System & Acessibilidade

- **Aesthetics:** Utiliza cores baseadas na mistura de camadas (`mix-blend-multiply`, `difference`) e contraste dinâmico. O ritmo tipográfico flui responsivamente (`text-[9px]` até `text-7xl`) mantendo *kerning* e entrelinhas impecáveis.
- **Acessibilidade (A11y):** Cuidados especiais com os índices de contraste de cores (WCAG) e garantias de que a navegação por teclado e staggers de animação sigam as heurísticas de usabilidade.
- **Microinterações:** Efeitos de *tilt* 3D nos cards, desfoque dinâmico na vitrine e transições cinemáticas nas trocas de página.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/0Mavi/portifolio.git
```

2. Acesse a pasta:
```bash
cd portifolio
```

3. Instale as dependências:
```bash
npm install
```

4. Execute em ambiente de desenvolvimento:
```bash
npm run dev
```

5. O projeto estará rodando, de forma rápida, no endereço: `http://localhost:5173`

---

## 👨‍💻 Sobre
Desenvolvido por Maria Vitória. O foco deste portfólio não é apenas o que foi construído, mas *como* foi construído. Cada componente reflete decisões conscientes voltadas para a experiência do usuário (UX), garantindo que a interação seja tão memorável quanto os dados apresentados.
