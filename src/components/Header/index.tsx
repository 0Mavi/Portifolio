import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../lib/useTheme";

interface NavItem {
  label: string;
  href: string;
  index: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", index: "01" },
  { label: "Projects", href: "/projects", index: "02" },
  { label: "About", href: "/about", index: "03" },
];

// Variantes do painel lateral
const sidebarVariants: Variants = {
  closed: { 
    x: "100%",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  open: { 
    x: "0%",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
};

// Variantes do backdrop
const backdropVariants: Variants = {
  closed: { opacity: 0, transition: { duration: 0.3, delay: 0.2 } },
  open: { opacity: 1, transition: { duration: 0.4 } },
};

// Variantes dos links (stagger)
const navListVariants: Variants = {
  closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  open: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const navItemVariants: Variants = {
  closed: { opacity: 0, x: 40 },
  open: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 120, damping: 20 } },
};

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start z-50 pointer-events-none">
        {/* Logo tipográfico */}
        <Link to="/" onClick={() => setIsOpen(false)}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="pointer-events-auto cursor-pointer"
          >
            <div className="flex items-center justify-center w-12 h-12 border border-primary/20 rounded-full text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
              <span className="text-sm font-extralight tracking-[0.15em] select-none">VB</span>
            </div>
          </motion.div>
        </Link>

        {/* Controles à direita — theme toggle + menu */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Botão theme toggle */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
            className="flex items-center justify-center w-10 h-10 border border-primary/15 rounded-full hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <Sun className="w-4 h-4 text-primary" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <Moon className="w-4 h-4 text-primary" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Botão toggle — grid 3×3 → X */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
          <button 
            onClick={toggleMenu}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            className="relative flex items-center justify-center w-10 h-10 group transition-transform active:scale-90"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-col gap-[5px] items-center justify-center"
                >
                  <div className="w-5 h-[1.5px] bg-primary rotate-45 translate-y-[3px]" />
                  <div className="w-5 h-[1.5px] bg-primary -rotate-45 -translate-y-[3px]" />
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="grid grid-cols-3 gap-1.5"
                >
                  {[...Array(9)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1 h-1 bg-primary/60 rounded-full group-hover:bg-primary transition-all duration-300" 
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          </motion.div>
        </div>
      </header>

      {/* ═══ Sidebar Drawer ═══ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop escurecido */}
            <motion.div
              key="backdrop"
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm cursor-pointer"
            />

            {/* Painel lateral direito */}
            <motion.aside
              key="sidebar"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full z-40 w-[85vw] sm:w-[380px] md:w-[420px] bg-background/95 backdrop-blur-2xl border-l border-primary/5 flex flex-col"
            >
              {/* Grid de profundidade no fundo do painel */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.02]"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, var(--foreground) 1px, transparent 1px),
                    linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)
                  `,
                  backgroundSize: "50px 50px",
                }}
              />

              {/* Orb decorativa */}
              <div
                className="absolute pointer-events-none"
                style={{
                  bottom: "15%",
                  left: "20%",
                  width: "250px",
                  height: "250px",
                  background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 5%, transparent) 0%, transparent 70%)",
                  filter: "blur(60px)",
                }}
              />

              {/* Navegação */}
              <motion.nav
                variants={navListVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="relative z-10 flex flex-col justify-center flex-1 px-8 sm:px-12"
              >
                <div className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <motion.div key={item.href} variants={navItemVariants}>
                        <Link
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className="group flex items-center gap-4 py-4 border-b border-primary/5 last:border-0"
                        >
                          {/* Índice numérico */}
                          <span className={`text-[10px] font-mono tracking-widest transition-colors duration-300 ${
                            isActive ? "text-primary" : "text-muted-foreground/30 group-hover:text-primary/50"
                          }`}>
                            {item.index}
                          </span>

                          {/* Label principal */}
                          <span className={`text-2xl sm:text-3xl font-extralight tracking-wide transition-all duration-300 ${
                            isActive 
                              ? "text-primary" 
                              : "text-foreground/50 group-hover:text-foreground group-hover:translate-x-1"
                          }`}>
                            {item.label}
                          </span>

                          {/* Indicador de rota ativa */}
                          {isActive && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="w-1.5 h-1.5 bg-primary rounded-full ml-auto"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.nav>

              {/* Footer do painel */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="relative z-10 px-8 sm:px-12 pb-8"
              >
                <div className="border-t border-primary/5 pt-6">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground/25">
                    portfolio · 2025
                  </p>
                </div>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}