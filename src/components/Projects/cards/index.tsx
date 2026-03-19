import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";


const projects = [
  { id: 1, title: "sharlee", category: "Branding", image: "https://i.pinimg.com/1200x/03/78/7d/03787d6a5f5e0cfdc8a83b473390e720.jpg", logo: "SH" },
  { id: 2, title: "act responsable", category: "Web Development", image: "https://i.pinimg.com/1200x/3a/32/86/3a32863d0886da74aaf06332c581e1db.jpg", logo: "AR" },
  { id: 3, title: "dua lipa", category: "Portrait", image: "https://i.pinimg.com/736x/a7/ec/5c/a7ec5c868329a9acf66e7d875e9402a3.jpg", logo: "DL" },
  { id: 4, title: "cocolyze", category: "UX/UI Design", image: "https://i.pinimg.com/736x/44/48/8b/44488b159ed88090f91cc11bff8826ab.jpg", logo: "CC" },
];

export default function ProjectCard() {
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground overflow-hidden">
      

      <div className="h-[40vh] flex flex-col items-center justify-center bg-secondary/5 px-10">
        <div className="w-full max-w-6xl">
          <div className="flex justify-between items-center mb-10 opacity-30">
            <span className="text-[10px] uppercase tracking-widest">Selected Work</span>
            <span className="text-[10px] font-mono">0{activeProject.id} / 0{projects.length}</span>
          </div>

          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {projects.map((project) => (
                <CarouselItem 
                  key={project.id} 
                  className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div
                    onMouseEnter={() => setActiveProject(project)}
                    className={`
                      relative py-10 px-6 cursor-pointer transition-all duration-500 border-t 
                      ${activeProject.id === project.id 
                        ? "border-primary opacity-100 bg-primary/5" 
                        : "border-primary/10 opacity-30 hover:opacity-60"
                      }
                    `}
                  >
                    <h3 className="text-3xl font-black tracking-tighter mb-1">
                      {project.logo}
                    </h3>
                    <p className="text-[9px] uppercase tracking-widest font-bold">
                      {project.title}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

    <div className="relative h-[60vh] w-full overflow-hidden border-b border-primary/10 rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={activeProject.image}
              alt={activeProject.title}
              className="w-full h-full object-cover grayscale opacity-50 rounded-2xl"
            />
            {/* Overlay com a cor Coffee */}
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
          </motion.div>
        </AnimatePresence>

        {/* Informações do Projeto Flutuando sobre a Imagem */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
          <motion.span 
            key={`cat-${activeProject.id}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[10px] uppercase tracking-[0.5em] mb-4 text-primary"
          >
            {activeProject.category}
          </motion.span>
          <motion.h2 
            key={`title-${activeProject.id}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter mix-blend-difference"
          >
            {activeProject.title}
          </motion.h2>
        </div>
      </div>
    </div>
  );
}