import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Typewriter } from "../../components/Typewriter";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    // Ajustado para min-h-screen para evitar problemas em navegadores mobile (safari toolbars)
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background text-center px-4 md:px-6 overflow-hidden">
      
      <main className="z-10 w-full max-w-4xl">
        {/* Ajuste de escala da fonte: menor em mobile, maior em desktop */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl  leading-[1.1] tracking-tighter">
          <Typewriter 
            text="Hey, I’m Charles Bruyerre" 
            className="block mb-2" 
          />
          <Typewriter 
            text="But you can call me Sharlee." 
            delay={1.5} 
            className="text-primary opacity-90 block"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 2 }}
          className="mt-6 text-muted-foreground text-sm sm:text-base md:text-lg font-medium tracking-wide max-w-[280px] sm:max-w-none mx-auto"
        >
          I'm a graphic designer, UX/UI designer <br className="hidden sm:block" />
          & front-end web developer
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1 }}
   
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8"
        >
          <Link to="/projects">
            <Button variant="link" className="group text-foreground hover:text-primary transition-colors flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] p-0">
              see my projects
            </Button>
          </Link>
          
          <Link to="/about">
            <Button variant="link" className="group text-foreground hover:text-primary transition-colors flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] p-0">
              more about me
            </Button>
          </Link>
        </motion.div>
      </main>

      {/* Círculo decorativo responsivo */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      
        className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] border border-primary/10 rounded-full -z-0 pointer-events-none"
      />
    </div>
  );
}