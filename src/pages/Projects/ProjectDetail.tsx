import { useParams, Link, Navigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getProjectBySlug } from "../../data/projectsData";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  // Slug inválido → redireciona para a listagem
  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden">
      
      {/* Grid de profundidade */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--foreground) 1px, transparent 1px),
            linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Orb decorativa */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          right: "10%",
          width: "clamp(250px, 40vw, 500px)",
          height: "clamp(250px, 40vw, 500px)",
          background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 10%, transparent) 0%, transparent 60%)",
        }}
      />

      {/* ═══ Hero ═══ */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
        <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />

        {/* Botão voltar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute top-36 sm:top-40 left-6 sm:left-12 z-20"
        >
          <Link
            to="/projects"
            className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            back to projects
          </Link>
        </motion.div>

        {/* Título no hero */}
        <div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-12 right-6 sm:right-12 z-10">
          <motion.span
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="block text-[9px] uppercase tracking-[0.5em] text-primary/60 mb-3"
          >
            {project.category}
          </motion.span>
          <motion.h1
            custom={0.35}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-4xl sm:text-5xl md:text-7xl font-extralight tracking-widest uppercase"
          >
            {project.title}
          </motion.h1>
          <motion.div
            custom={0.5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="w-12 h-[1px] bg-primary/20 mt-4"
          />
        </div>
      </div>

      {/* ═══ Conteúdo ═══ */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
        
        {/* Metadata */}
        <motion.div
          custom={0.5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-wrap gap-x-10 gap-y-4 mb-12 border-b border-primary/5 pb-8"
        >
          <div>
            <span className="block text-[9px] uppercase tracking-[0.4em] text-muted-foreground/30 mb-1">Year</span>
            <span className="text-sm font-light tracking-wide">{project.year}</span>
          </div>
          <div>
            <span className="block text-[9px] uppercase tracking-[0.4em] text-muted-foreground/30 mb-1">Category</span>
            <span className="text-sm font-light tracking-wide">{project.category}</span>
          </div>
          <div>
            <span className="block text-[9px] uppercase tracking-[0.4em] text-muted-foreground/30 mb-1">Role</span>
            <span className="text-sm font-light tracking-wide">{project.role}</span>
          </div>
        </motion.div>

        {/* Descrição */}
        <motion.div
          custom={0.65}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="max-w-2xl mb-16 sm:mb-24"
        >
          <h2 className="text-lg sm:text-xl font-extralight tracking-wide mb-6">About the project</h2>
          <p className="text-sm sm:text-base font-light leading-[1.8] text-muted-foreground/70">
            {project.description}
          </p>
        </motion.div>

        {/* ═══ Galeria ═══ */}
        <motion.div
          custom={0.8}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <h2 className="text-lg sm:text-xl font-extralight tracking-wide mb-8">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.gallery.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.15, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-xl border border-primary/5"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-[250px] sm:h-[350px] object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.3em] text-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {img.alt}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}
