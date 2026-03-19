import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Header() {
  return (
   
    <header className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start z-50 pointer-events-none">
    <Link to="/">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pointer-events-auto cursor-pointer"
        >
          <div className="flex items-center justify-center w-12 h-12 border border-primary/40 rounded-full text-primary font-medium text-xl">
            <img src="/src/assets/download (4).jpg" alt="" className="rounded-full"/>
          </div>
        </motion.div>
      </Link>
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col items-end gap-8 pointer-events-auto"
      >
        

   
        <button className="group flex flex-col gap-1 items-end p-2 transition-transform active:scale-90">
          <div className="grid grid-cols-3 gap-1.5">
            {[...Array(9)].map((_, i) => (
              <div 
                key={i} 
                className="w-1 h-1 bg-primary/60 rounded-full group-hover:bg-primary transition-all duration-300 shadow-[0_0_8px_rgba(var(--color-primary),0.3)]" 
              />
            ))}
          </div>
        </button>
      </motion.div>
    </header>
  );
}