import { motion } from "framer-motion";
import { getIcon } from "../lib/icons";

export default function TechnologyCard({ icon, name }) {
  const Icon = getIcon(icon);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 hover:border-violet-400/30 hover:bg-white/[0.04] transition-colors duration-200"
    >
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-gradient blur-xl -z-10" />
      <Icon size={18} className="text-ink-400 group-hover:text-violet-300 transition-colors" strokeWidth={1.6} />
      <span className="text-sm text-ink-300 group-hover:text-ink-100 transition-colors">{name}</span>
    </motion.div>
  );
}
