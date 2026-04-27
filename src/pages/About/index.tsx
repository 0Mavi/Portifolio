import { motion, type Variants } from "framer-motion";
import { FileText, MapPin, Briefcase, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResumePDF } from "../../components/ResumePDF";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, delay, ease: "easeOut" as const },
  }),
};

interface SkillCategory {
  title: string;
  items: string[];
}

const skills: SkillCategory[] = [
  { title: "Frontend", items: ["React", "Angular", "TypeScript", "Tailwind CSS", "Bootstrap"] },
  { title: "Backend & Integração", items: ["APIs REST", "Integração de Sistemas", "Lógica de Negócio", "Modelagem de Dados", "JavaScript / Java"] },
  { title: "Ferramentas", items: ["Git / GitHub", "Figma", "VS Code", "HTML / CSS", "Framer Motion"] },
];

export default function AboutMe() {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      
      {/* ═══ Background layers ═══ */}
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute pointer-events-none"
        style={{
          top: "25%",
          right: "15%",
          width: "clamp(250px, 40vw, 500px)",
          height: "clamp(250px, 40vw, 500px)",
          background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 10%, transparent) 0%, transparent 60%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
        className="absolute pointer-events-none"
        style={{
          bottom: "20%",
          left: "10%",
          width: "clamp(200px, 30vw, 400px)",
          height: "clamp(200px, 30vw, 400px)",
          background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 12%, transparent) 0%, transparent 60%)",
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* ═══ Conteúdo principal ═══ */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 pt-28 sm:pt-36 pb-20">

        {/* Header da página */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
          <span className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground/30">
            Conheça-me melhor
          </span>
        </motion.div>
        <motion.h1
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-wide mt-2 mb-4"
        >
          About
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          className="w-full h-[1px] bg-primary/10 mb-12 sm:mb-16 origin-left"
        />

        {/* ═══ Hero section — foto + bio ═══ */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 mb-16 sm:mb-24">
          
          {/* Foto */}
          <motion.div
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="w-full md:w-2/5 flex justify-center md:justify-start"
          >
            <div className="relative w-full max-w-[360px] aspect-[3/4] rounded-2xl overflow-hidden border border-primary/5">
              <img
                src="/src/assets/download (4).jpg"
                alt="Maria Vitória Berto de Souza"
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-80 transition-all duration-700"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              {/* Marca d'água */}
              <div className="absolute bottom-6 left-6 z-10">
                <span className="text-[9px] uppercase tracking-[0.4em] text-foreground/20">
                  portfolio · 2025
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bio + metadata */}
          <div className="w-full md:w-3/5 flex flex-col justify-center">
            
            {/* Metadata strip */}
            <motion.div
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-x-8 gap-y-3 mb-8"
            >
              <div className="flex items-center gap-2 text-muted-foreground/40">
                <MapPin className="w-3 h-3" />
                <span className="text-[10px] uppercase tracking-[0.3em]">João Pessoa – PB</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground/40">
                <Briefcase className="w-3 h-3" />
                <span className="text-[10px] uppercase tracking-[0.3em]">ArcturoTech</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground/40">
                <Sparkles className="w-3 h-3" />
                <span className="text-[10px] uppercase tracking-[0.3em]">Frontend</span>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p
              custom={0.4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-sm sm:text-base font-light leading-[1.9] text-muted-foreground/70 mb-6"
            >
              Olá! Sou Maria Vitória Berto de Souza, Desenvolvedora Frontend
              na ArcturoTech. Trabalho com React, Angular
              e TypeScript, criando aplicações web performáticas, responsivas e
              acessíveis.
            </motion.p>

            <motion.p
              custom={0.5}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-sm sm:text-base font-light leading-[1.9] text-muted-foreground/70 mb-10"
            >
              Sou formada em Ciência da Computação pela UNIPÊ e tenho experiência
              em integração com APIs REST, arquitetura de projetos escaláveis e
              atuação em squads ágeis com times de backend, design e produto.
            </motion.p>

            {/* CTA — Download CV */}
            <motion.div
              custom={0.6}
              variants={fadeUp}
              initial="hidden"
              animate="show"
            >
              <PDFDownloadLink
                document={<ResumePDF />}
                fileName="curriculo-maria-vitoria.pdf"
              >
                {({ loading }) => (
                  <Button
                    variant="outline"
                    className="group border-primary/10 hover:border-primary/40 transition-all flex items-center gap-2.5 text-[10px] uppercase tracking-[0.25em] px-6 py-4 rounded-full bg-transparent hover:bg-primary/5"
                  >
                    <FileText className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                    {loading ? "gerando pdf..." : "download resume"}
                  </Button>
                )}
              </PDFDownloadLink>
            </motion.div>
          </div>
        </div>

        {/* ═══ Skills section ═══ */}
        <motion.div
          custom={0.7}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-lg sm:text-xl font-extralight tracking-wide">
              Expertise
            </h2>
            <div className="flex-1 h-[1px] bg-primary/5" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {skills.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + catIndex * 0.1, ease: "easeOut" }}
                className="rounded-xl border border-primary/5 bg-primary/[0.02] p-6"
              >
                <h3 className="text-[10px] uppercase tracking-[0.4em] text-primary/60 mb-5">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm font-light text-muted-foreground/50 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-primary/30 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}