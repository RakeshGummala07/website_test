import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Cloud, AppWindow, Server, ShieldCheck } from "lucide-react";

const LAYERS = [
  { icon: Cloud, label: "Cloud" },
  { icon: AppWindow, label: "Applications" },
  { icon: Server, label: "Infrastructure" },
  { icon: ShieldCheck, label: "Security" },
];

export default function HeroVisual() {
  const ref = useRef(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    // clamp the drift so it stays premium rather than jumpy
    setGlow({ x: 50 + (x - 50) * 0.35, y: 50 + (y - 50) * 0.35 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className="relative aspect-square w-full max-w-md mx-auto select-none"
    >
      {/* mouse-following ambient glow */}
      <motion.div
        className="pointer-events-none absolute -inset-10 rounded-full blur-3xl"
        animate={{ background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(139,92,246,0.35), rgba(214,63,196,0.18) 45%, transparent 70%)` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      <div className="relative h-full w-full rounded-2xl border border-white/[0.08] bg-base-900/60 backdrop-blur-xl overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-60" />

        {/* connecting spine */}
        <svg className="absolute left-1/2 top-8 bottom-8 -translate-x-1/2" width="2" height="calc(100% - 64px)">
          <line x1="1" y1="0" x2="1" y2="100%" stroke="url(#spine)" strokeWidth="2" strokeDasharray="1 7" strokeLinecap="round" />
          <defs>
            <linearGradient id="spine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#EC4FCB" stopOpacity="0.7" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative h-full flex flex-col justify-between p-8">
          {LAYERS.map((layer, i) => {
            const Icon = layer.icon;
            const alignEnd = i % 2 === 1;
            return (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, x: alignEnd ? 16 : -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`flex items-center gap-3 ${alignEnd ? "self-end flex-row-reverse text-right" : "self-start"}`}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.1] bg-base-850 shadow-glow-sm"
                >
                  <Icon size={18} className="text-violet-300" strokeWidth={1.7} />
                </motion.div>
                <span className="text-xs text-ink-300 rounded-full border border-white/[0.08] bg-base-950/60 px-3 py-1.5">
                  {layer.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* floating abstract cards */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-4 top-10 h-16 w-24 rounded-lg border border-white/[0.08] bg-base-900/80 backdrop-blur-md shadow-glow-sm hidden md:block"
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -left-5 bottom-16 h-12 w-20 rounded-lg border border-white/[0.08] bg-base-900/80 backdrop-blur-md shadow-glow-sm hidden md:block"
        />
      </div>
    </div>
  );
}
