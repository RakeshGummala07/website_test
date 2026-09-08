import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getIcon } from "../lib/icons";

export default function ServiceCard({ service, index = 0 }) {
  const ref = useRef(null);
  const [spot, setSpot] = useState({ x: 50, y: 50, active: false });
  const Icon = getIcon(service.icon);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setSpot((s) => ({ ...s, active: false }))}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-xl2 border border-white/[0.08] bg-base-900/70 p-7 md:p-8 flex flex-col justify-between min-h-[220px] h-full"
    >
      {/* spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: spot.active
            ? `radial-gradient(360px circle at ${spot.x}% ${spot.y}%, rgba(139,92,246,0.14), transparent 65%)`
            : "transparent",
        }}
      />
      {/* gradient border on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-xl2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-inset ring-violet-400/25" />

      <div className="relative">
        <motion.div
          whileHover={{ rotate: -8, scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-violet-300"
        >
          <Icon size={20} strokeWidth={1.7} />
        </motion.div>

        <h3 className="mt-5 text-xl font-medium text-ink-100">{service.name}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-400 max-w-sm">{service.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          {service.points.slice(0, 4).map((p) => (
            <li key={p} className="text-[11px] text-ink-400 rounded-full border border-white/[0.08] px-2.5 py-1">
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-6 flex items-center gap-1.5 text-sm text-ink-300 group-hover:text-violet-300 transition-colors">
        Explore service
        <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </motion.div>
  );
}
