import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
interface TypewriterProps {
  text: string;
  delay?: number;
  className?: string;
}

export const Typewriter = ({ text, delay = 0, className = "" }: TypewriterProps) => {
  const letters = Array.from(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.03, 
        delayChildren: delay 
      },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      display: "inline-block" as const,
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
    hidden: {
      opacity: 0,
      display: "none" as const,
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter: string, index: number) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
      
      {/* Cursor piscando */}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle"
      />
    </motion.span>
  );
};