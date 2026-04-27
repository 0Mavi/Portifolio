import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type CursorVariant = "default" | "hover" | "click";

const SPRING_CONFIG = { damping: 25, stiffness: 250, mass: 0.5 };

export default function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const rafId = useRef<number>(0);

  // Posição bruta → suavizada via spring
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, SPRING_CONFIG);
  const springY = useSpring(cursorY, SPRING_CONFIG);

  // Anel externo — spring mais lento para efeito de trailing
  const ringX = useSpring(cursorX, { damping: 20, stiffness: 150, mass: 0.8 });
  const ringY = useSpring(cursorY, { damping: 20, stiffness: 150, mass: 0.8 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      });
      if (!visible) setVisible(true);
    },
    [cursorX, cursorY, visible]
  );

  const handleMouseDown = useCallback(() => setVariant("click"), []);
  const handleMouseUp = useCallback(() => setVariant("default"), []);
  const handleMouseLeave = useCallback(() => setVisible(false), []);
  const handleMouseEnter = useCallback(() => setVisible(true), []);

  useEffect(() => {
    // Detectar dispositivo touch
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    // Esconde o cursor nativo
    document.body.style.cursor = "none";

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Delegação de eventos — O(1), sem MutationObserver


    const handleOverIn = (e: Event) => {
      const target = (e.target as Element)?.closest?.('a, button, [role="button"], input, textarea, select, [data-cursor="hover"]');
      if (target) setVariant("hover");
    };

    const handleOverOut = (e: Event) => {
      const target = (e.target as Element)?.closest?.('a, button, [role="button"], input, textarea, select, [data-cursor="hover"]');
      const related = (e as MouseEvent).relatedTarget as Element | null;
      if (target && (!related || !target.contains(related))) setVariant("default");
    };

    document.addEventListener("mouseover", handleOverIn, { passive: true });
    document.addEventListener("mouseout", handleOverOut, { passive: true });

    return () => {
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleOverIn);
      document.removeEventListener("mouseout", handleOverOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter]);

  // Não renderizar em dispositivos touch
  if (isTouchDevice) return null;

  const dotSize = variant === "hover" ? 40 : variant === "click" ? 6 : 8;
  const ringSize = variant === "hover" ? 60 : variant === "click" ? 20 : 36;

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Dot central */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{ x: springX, y: springY }}
          >
            <motion.div
              animate={{
                width: dotSize,
                height: dotSize,
                borderRadius: "50%",
                opacity: variant === "hover" ? 0.25 : 1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="bg-primary"
              style={{
                transform: "translate(-50%, -50%)",
              }}
            />
          </motion.div>

          {/* Anel externo — trailing */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            style={{ x: ringX, y: ringY }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{
                width: ringSize,
                height: ringSize,
                borderRadius: "50%",
                borderWidth: variant === "hover" ? 1.5 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="border-primary/30"
              style={{
                transform: "translate(-50%, -50%)",
                borderStyle: "solid",
                backgroundColor: variant === "hover" ? "color-mix(in srgb, var(--primary) 10%, transparent)" : "transparent",
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
