import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

/**
 * Wraps a single interactive child (usually <Button />) and makes it drift
 * gently toward the cursor on hover — disabled automatically on touch
 * devices via the `pointer: fine` media check.
 */
export default function MagneticButton({ children, strength = 14, className = "" }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = useCallback(
    (e) => {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      setPos({ x: (relX / rect.width) * strength, y: (relY / rect.height) * strength });
    },
    [strength]
  );

  const reset = useCallback(() => setPos({ x: 0, y: 0 }), []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
