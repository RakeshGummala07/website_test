import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Button from "./Button";
import { getIcon } from "../lib/icons";

export default function ProductCard({ product }) {
  const Icon = getIcon(product.icon);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-xl2 border border-white/[0.08] bg-base-900/70 p-8 flex flex-col"
    >
      <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-brand-gradient opacity-0 group-hover:opacity-[0.18] blur-3xl transition-opacity duration-500" />

      <div className="relative flex items-center justify-between">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-magenta-400">
          <Icon size={22} strokeWidth={1.6} />
        </div>
        <span className="text-[11px] uppercase tracking-wide text-ink-500 border border-white/[0.08] rounded-full px-2.5 py-1">
          Solution
        </span>
      </div>

      <h3 className="relative mt-6 text-xl font-medium text-ink-100">{product.name}</h3>
      <p className="relative mt-2 text-sm text-ink-400 leading-relaxed">{product.description}</p>

      <ul className="relative mt-5 flex flex-col gap-2">
        {product.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-ink-300">
            <Check size={15} className="mt-0.5 text-violet-400 shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <div className="relative mt-7 pt-6 border-t border-white/[0.06]">
        <Button to="/contact" variant="ghost" size="md" className="!px-0">
          Discuss this solution
        </Button>
      </div>
    </motion.div>
  );
}
