import { motion } from "framer-motion";
import { viewportOnce } from "../animations/variants";

export default function StatCard({ value, label, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-xl2 border border-white/[0.07] bg-white/[0.02] px-6 py-8 text-center"
    >
      <div className="text-4xl md:text-5xl font-display brand-gradient-text font-medium">{value}</div>
      <div className="mt-2 text-sm text-ink-400">{label}</div>
    </motion.div>
  );
}
