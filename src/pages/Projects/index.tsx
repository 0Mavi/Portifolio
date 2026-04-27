import ProjectCard from "../../components/Projects/cards"
import { motion } from "framer-motion"

export default function Projects() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background overflow-hidden">
      
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

      {/* Orb primária */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          right: "10%",
          width: "clamp(250px, 40vw, 500px)",
          height: "clamp(250px, 40vw, 500px)",
          background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 10%, transparent) 0%, transparent 60%)",
        }}
      />

      {/* Orb secundária */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 3, ease: "easeOut", delay: 0.5 }}
        className="absolute pointer-events-none"
        style={{
          bottom: "10%",
          left: "5%",
          width: "clamp(200px, 30vw, 400px)",
          height: "clamp(200px, 30vw, 400px)",
          background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 12%, transparent) 0%, transparent 60%)",
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col w-full min-h-screen">
        <ProjectCard />
      </div>
    </div>
  )
}