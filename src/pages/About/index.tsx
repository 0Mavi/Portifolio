import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react"; 


const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2 
    }
  }
};

export default function AboutMe() {
  return (
    // Layout principal com min-h-screen e overflow-hidden para conter elementos absolutos
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      
      {/* Container Principal que centraliza o conteúdo verticalmente */}
      <main className="flex flex-col-reverse md:flex-row items-center justify-between min-h-screen w-full max-w-7xl mx-auto px-6 py-20 md:py-10 gap-12 md:gap-6 relative z-10">
        
      <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-2/5 flex justify-center md:justify-end relative"
        >
          <div className="relative w-full max-w-[400px] aspect-[3/4] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl shadow-black/30">
            {/* Imagem de Fundo (Grayscale) */}
            <img 
              src="https://i.pinimg.com/..." // Substitua pela sua URL da imagem de perfil
              alt="Charles Bruyerre Profile"
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-60"
            />
            
            {/* Overlay de Gradiente Suave */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/40" />
            
            {/* Ícones/Textos Decorativos sobre a imagem (como na referência) */}
            <div className="absolute top-6 right-6 z-10 opacity-30">
              {/* Exemplo de ícones, substitua se necessário */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                {/* Ícone de grade */}
                <path d="M5 5h3v3H5zM12 5h3v3h-3zM5 12h3v3H5zM12 12h3v3h-3z" />
              </svg>
            </div>
            
            <div className="absolute top-1/4 -left-10 z-10 opacity-20 transform -rotate-90 origin-right">
              <span className="text-[9px] uppercase tracking-[1em]">portfolio '24</span>
            </div>
          </div>
        </motion.section>

        {/* Lado Esquerdo: Conteúdo de Texto */}
        <motion.section 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="w-full md:w-3/5 md:pr-10"
        >
          {/* Título com animação */}
          <motion.h1 
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter mb-4"
          >
            About
          </motion.h1>

          {/* Linha Decorativa com animação */}
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="w-full h-px bg-primary/20 mb-8 origin-left"
          />

          {/* Parágrafo de Biografia */}
          <motion.p 
            variants={fadeUp}
            className="text-muted-foreground text-sm sm:text-base leading-relaxed md:leading-loose max-w-2xl"
          >
            Hey, my name is Charles Bruyerre and I use Sharlee as my nickname across social medias.
            I’m a graphic designer, UX/UI designer & front-end web developer from France. I’m also
            passionate about pop music and make portraits and universes around what I listen to and I’m
            always curious to learn more when it comes to new technologies and creative coding.
          </motion.p>

          {/* Link para o Resume/CV com ícone */}
          <motion.div variants={fadeUp} className="mt-12">
            <Link 
              to="/resume.pdf" // Substitua pelo link real do seu PDF
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 text-sm uppercase tracking-widest font-bold text-foreground hover:text-primary transition-colors"
            >
              <FileText className="w-4 h-4 text-primary transition-transform group-hover:-translate-y-0.5" />
              <span>resume</span>
            </Link>
          </motion.div>
        </motion.section>

        {/* Lado Direito: Imagem e Elementos Visuais */}
        

      </main>

      {/* Elementos Decorativos de Fundo (absolutos) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 3 }}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] border border-primary rounded-full pointer-events-none -z-0"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 4, delay: 0.5 }}
        className="absolute bottom-10 right-10 w-[500px] h-[500px] border border-primary/50 rounded-full pointer-events-none -z-0"
      />
    </div>
  );
}