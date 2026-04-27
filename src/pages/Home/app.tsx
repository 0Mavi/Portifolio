import { motion } from "framer-motion";
import { useMemo } from "react";
import { Button } from "../../components/ui/button";
import { Typewriter } from "../../components/Typewriter";
import { Link } from "react-router-dom";
import { ArrowRight, UserCircle } from "lucide-react";

// CSS keyframes injetado uma única vez (performance >> framer-motion para loops infinitos)
(() => {
  if (typeof document === "undefined") return;
  const id = "particle-keyframes";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
    @keyframes particleDrift {
      0%, 100% { opacity: 0; transform: translate(0, 0) scale(1); }
      25% { opacity: var(--p-opacity); transform: translate(var(--p-dx), var(--p-dy)) scale(1.3); }
      50% { opacity: calc(var(--p-opacity) * 0.4); transform: translate(calc(var(--p-dx) * -0.5), calc(var(--p-dy) * -0.3)) scale(0.9); }
      75% { opacity: var(--p-opacity); transform: translate(calc(var(--p-dx) * 0.3), calc(var(--p-dy) * 0.6)) scale(1.1); }
    }
  `;
  document.head.appendChild(style);
})();

/**
 * Gera partículas com posições e timings aleatórios (mas determinísticos por render).
 */
function useParticles(count: number) {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,          // % posição horizontal
      y: Math.random() * 100,           // % posição vertical
      size: Math.random() * 2 + 1,      // 1–3px
      duration: Math.random() * 15 + 20, // 20–35s ciclo
      delay: Math.random() * 5,          // 0–5s delay
      driftX: (Math.random() - 0.5) * 60, // -30 a +30px drift
      driftY: (Math.random() - 0.5) * 80, // -40 a +40px drift
      opacity: Math.random() * 0.3 + 0.1, // 0.1–0.4
    }));
  }, [count]);
}

export default function Home() {
  const particles = useParticles(12);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background text-center px-4 md:px-6 overflow-hidden">
      
      {/* ═══ LAYER 0 — Grid de profundidade ═══ */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--foreground) 1px, transparent 1px),
            linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ═══ LAYER 1 — Partículas flutuantes (CSS puro — zero overhead Framer) ═══ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-primary"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              '--p-opacity': p.opacity,
              '--p-dx': `${p.driftX}px`,
              '--p-dy': `${p.driftY}px`,
              animation: `particleDrift ${p.duration}s ${p.delay}s ease-in-out infinite`,
              willChange: 'transform, opacity',
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ═══ LAYER 2 — Linhas verticais drift (parallax sutil) ═══ */}
      {[15, 40, 65, 85].map((left, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute pointer-events-none"
          style={{
            left: `${left}%`,
            top: 0,
            width: "1px",
            height: "100%",
            background: `linear-gradient(to bottom, transparent, oklch(72% 0.14 65 / 0.04) 50%, transparent)`,
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: "easeOut" }}
        />
      ))}

      {/* ═══ LAYER 3 — Orb primária (caramelo/dourado) — estática ═══ */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute pointer-events-none"
        style={{
          top: "35%",
          left: "55%",
          width: "clamp(300px, 50vw, 700px)",
          height: "clamp(300px, 50vw, 700px)",
          background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 15%, transparent) 0%, transparent 60%)",
          transform: "translate(-50%, -50%)",
          willChange: "opacity",
        }}
      />

      {/* ═══ LAYER 4 — Orb secundária (teal) — estática ═══ */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.2 }}
        className="absolute pointer-events-none"
        style={{
          top: "60%",
          left: "30%",
          width: "clamp(200px, 35vw, 500px)",
          height: "clamp(200px, 35vw, 500px)",
          background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 12%, transparent) 0%, transparent 60%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* ═══ LAYER 5 — Orb accent (azul profundo) — estática ═══ */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 3, ease: "easeOut", delay: 0.4 }}
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          left: "25%",
          width: "clamp(150px, 25vw, 400px)",
          height: "clamp(150px, 25vw, 400px)",
          background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 12%, transparent) 0%, transparent 60%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* ═══ LAYER 6 — Círculo decorativo com respiração ═══ */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [0.9, 1.02, 0.98, 1],
          opacity: [0, 0.15, 0.25, 0.2],
        }}
        transition={{ 
          duration: 8, 
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror"
        }}
        className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] border border-primary/5 rounded-full pointer-events-none"
      />

      {/* ═══ LAYER 7 — Segundo anel, contra-rotação ═══ */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ 
          opacity: [0, 0.08, 0.12, 0.08],
          rotate: [0, -180, -360],
        }}
        transition={{ 
          duration: 30, 
          ease: "linear",
          repeat: Infinity,
        }}
        className="absolute w-[250px] h-[250px] sm:w-[380px] sm:h-[380px] border border-secondary/10 rounded-full pointer-events-none"
        style={{ borderStyle: "dashed" }}
      />

      {/* ═══ LAYER 8 — Noise texture overlay (blend mix pesava na GPU, simplificado) ═══ */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* ═══ Conteúdo principal ═══ */}
      <main className="z-10 w-full max-w-4xl flex flex-col items-center">
        {/* Tipografia — hierarquia elegante e leve */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight tracking-wide leading-[1.3]">
          <Typewriter 
            text="Hey, I'm Maria Vitória" 
            className="block" 
          />
          <Typewriter 
            text="Frontend Developer." 
            delay={0.6} 
            className="text-primary/80 block mt-3 font-light"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          className="mt-8 text-muted-foreground text-[10px] sm:text-xs font-normal tracking-[0.35em] uppercase max-w-[280px] sm:max-w-none mx-auto"
        >
          react · angular · typescript <br className="hidden sm:block" />
          <span className="text-primary/30 mx-2 hidden sm:inline">·</span> frontend development <span className="text-primary/30 mx-2">·</span> 
        </motion.p>

        {/* CTAs com stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/projects">
              <Button className="group bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] px-6 py-4 rounded-full shadow-md hover:shadow-primary/20">
                see my projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/about">
              <Button variant="outline" className="group border-primary/10 hover:border-primary/40 transition-all flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] px-6 py-4 rounded-full bg-transparent hover:bg-primary/5">
                <UserCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                more about me
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}