export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  logo: string;
  description: string;
  year: string;
  role: string;
  gallery: ProjectImage[];
}

/**
 * Fonte central de dados dos projetos.
 * Para adicionar um novo projeto, basta inserir um objeto neste array
 * seguindo a interface `Project`.
 */
export const projects: Project[] = [
  {
    id: 1,
    slug: "arcturotech-platform",
    title: "arcturotech platform",
    category: "Web Development",
    image: "https://i.pinimg.com/1200x/03/78/7d/03787d6a5f5e0cfdc8a83b473390e720.jpg",
    logo: "AT",
    description:
      "Plataforma web corporativa desenvolvida na ArcturoTech utilizando React e TypeScript. O projeto envolveu implementação end-to-end — do design de componentes reutilizáveis à integração com APIs REST, com foco em performance, acessibilidade e arquitetura escalável.",
    year: "2024",
    role: "Desenvolvedora Frontend · Full Stack",
    gallery: [
      { src: "https://i.pinimg.com/1200x/03/78/7d/03787d6a5f5e0cfdc8a83b473390e720.jpg", alt: "ArcturoTech plataforma visão geral" },
      { src: "https://i.pinimg.com/736x/a7/ec/5c/a7ec5c868329a9acf66e7d875e9402a3.jpg", alt: "ArcturoTech dashboard interno" },
    ],
  },
  {
    id: 2,
    slug: "angular-dashboard",
    title: "angular dashboard",
    category: "Frontend · Angular",
    image: "https://i.pinimg.com/1200x/3a/32/86/3a32863d0886da74aaf06332c581e1db.jpg",
    logo: "AD",
    description:
      "Dashboard analítico construído com Angular e TypeScript para consumo de APIs REST. O projeto priorizou componentização modular, responsividade e integração com serviços externos para visualização de dados em tempo real.",
    year: "2024",
    role: "Desenvolvedora Frontend",
    gallery: [
      { src: "https://i.pinimg.com/1200x/3a/32/86/3a32863d0886da74aaf06332c581e1db.jpg", alt: "Angular dashboard homepage" },
      { src: "https://i.pinimg.com/1200x/03/78/7d/03787d6a5f5e0cfdc8a83b473390e720.jpg", alt: "Angular dashboard analytics" },
    ],
  },
  {
    id: 3,
    slug: "portfolio-pessoal",
    title: "portfólio pessoal",
    category: "React · Motion Design",
    image: "https://i.pinimg.com/736x/a7/ec/5c/a7ec5c868329a9acf66e7d875e9402a3.jpg",
    logo: "VB",
    description:
      "Portfólio pessoal construído com React, Vite, Tailwind CSS e Framer Motion. Foco em motion design premium, animações fluidas, cursor magnético e transições de página cinematográficas — demonstrando habilidades de frontend moderno.",
    year: "2025",
    role: "Desenvolvedora Frontend · Design",
    gallery: [
      { src: "https://i.pinimg.com/736x/a7/ec/5c/a7ec5c868329a9acf66e7d875e9402a3.jpg", alt: "Portfólio home page" },
      { src: "https://i.pinimg.com/736x/44/48/8b/44488b159ed88090f91cc11bff8826ab.jpg", alt: "Portfólio projetos" },
    ],
  },
  {
    id: 4,
    slug: "destemidos-robotica",
    title: "destemidos robotics",
    category: "Robótica · LEGO EV3",
    image: "https://i.pinimg.com/736x/44/48/8b/44488b159ed88090f91cc11bff8826ab.jpg",
    logo: "DS",
    description:
      "Projeto acadêmico com a Equipe Destemidos — desenvolvimento de soluções autônomas utilizando LEGO Mindstorms EV3 para competições nacionais (OBR e FLL). Foco em lógica de programação, resolução de problemas e trabalho em equipe.",
    year: "2018–2020",
    role: "Desenvolvedora · Programação",
    gallery: [
      { src: "https://i.pinimg.com/736x/44/48/8b/44488b159ed88090f91cc11bff8826ab.jpg", alt: "Destemidos robótica" },
      { src: "https://i.pinimg.com/1200x/3a/32/86/3a32863d0886da74aaf06332c581e1db.jpg", alt: "Destemidos competição" },
    ],
  },
];

/**
 * Busca um projeto pelo slug.
 * Útil para a rota dinâmica /projects/:slug.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
