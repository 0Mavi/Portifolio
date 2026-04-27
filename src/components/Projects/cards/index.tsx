import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";
import { projects, type Project } from "../../../data/projectsData";

export default function ProjectCard() {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);

  return (
    <div className="flex flex-col h-screen w-full text-foreground overflow-hidden">
      
      {/* ═══ Seção Superior — Carrossel ═══ */}
      <div className="min-h-[35vh] flex flex-col items-center justify-center px-6 sm:px-10 pt-32 sm:pt-36 pb-8">
        <div className="w-full max-w-6xl">
          {/* Header da seção */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-between items-end mb-8"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground/30">
                Selected Work
              </span>
              <h1 className="text-xl sm:text-2xl font-extralight tracking-wide text-foreground">
                Projects
              </h1>
            </div>
            <motion.span
              key={activeProject.id}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-mono text-muted-foreground/25 tracking-widest"
            >
              {String(activeProject.id).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </motion.span>
          </motion.div>

          {/* Carrossel de cards */}
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-3">
              {projects.map((project) => {
                const isActive = activeProject.id === project.id;
                return (
                  <CarouselItem 
                    key={project.id} 
                    className="pl-3 basis-1/2 md:basis-1/3 lg:basis-1/4"
                    style={{ perspective: 800 }}
                  >
                    <motion.div
                      onMouseEnter={() => setActiveProject(project)}
                      whileHover={{ scale: 1.04, rotateX: 3, rotateY: -3 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      className={`
                        relative py-8 px-5 cursor-pointer rounded-lg transition-colors duration-500
                        border border-transparent
                        ${isActive 
                          ? "bg-primary/5 border-primary/15" 
                          : "bg-transparent hover:bg-primary/[0.02] opacity-40 hover:opacity-70"
                        }
                      `}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Indicador ativo — linha top */}
                      <motion.div
                        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute top-0 left-4 right-4 h-[1px] bg-primary/40 origin-left"
                      />

                      <Link to={`/projects/${project.slug}`} className="block">
                        <motion.span 
                          className="block text-2xl sm:text-3xl font-extralight tracking-wide mb-2"
                          style={{ transform: "translateZ(25px)" }}
                        >
                          {project.logo}
                        </motion.span>
                        <motion.span 
                          className="block text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50 font-normal"
                          style={{ transform: "translateZ(15px)" }}
                        >
                          {project.title}
                        </motion.span>
                      </Link>

                      {/* Dot indicador */}
                      {isActive && (
                        <motion.div
                          layoutId="cardDot"
                          className="absolute bottom-3 right-4 w-1 h-1 bg-primary rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      {/* ═══ Seção Inferior — Vitrine do projeto ativo ═══ */}
      <div className="relative flex-1 w-full overflow-hidden mx-auto max-w-7xl px-4 sm:px-6 pb-4">
        <Link to={`/projects/${activeProject.slug}`} className="block relative h-full rounded-2xl overflow-hidden border border-primary/5 group cursor-pointer">
          
          {/* Imagem de fundo */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-50 transition-opacity duration-500"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              {/* Tint */}
              <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
            </motion.div>
          </AnimatePresence>

          {/* Informações do projeto */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 sm:pb-16 text-center p-6 z-10 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeProject.id} 
                className="flex flex-col items-center gap-5"
              >
                <motion.span
                  initial={{ y: 15, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -10, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-[9px] uppercase tracking-[0.5em] text-primary/70"
                >
                  {activeProject.category}
                </motion.span>
                <motion.h2
                  initial={{ y: 20, opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -15, opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
                  className="text-4xl sm:text-5xl md:text-7xl font-extralight uppercase tracking-widest mix-blend-difference"
                >
                  {activeProject.title}
                </motion.h2>
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                  className="w-12 h-[1px] bg-primary/20 mt-2"
                />
                {/* CTA sutil */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground/30 mt-4 group-hover:text-primary/50 transition-colors duration-300 pointer-events-auto"
                >
                  view project →
                </motion.span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03] rounded-2xl"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />
        </Link>
      </div>
    </div>
  );
}