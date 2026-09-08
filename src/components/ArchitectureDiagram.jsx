import { useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Box, Plug, ShieldCheck, Database, CloudCog } from "lucide-react";

const NODES = {
  client: { label: "Client", icon: Monitor, tip: "Browsers and mobile apps that reach the product." },
  application: { label: "Application", icon: Box, tip: "Your product's core business logic." },
  api: { label: "API", icon: Plug, tip: "Typed, versioned interfaces between services." },
  security: { label: "Security", icon: ShieldCheck, tip: "Authentication, authorization and monitoring." },
  data: { label: "Data", icon: Database, tip: "Databases, caches and storage layers." },
  cloud: { label: "Cloud / DevOps", icon: CloudCog, tip: "Automated infrastructure, CI/CD and observability." },
};

function Node({ id, active, onHover }) {
  const { label, icon: Icon, tip } = NODES[id];
  const isActive = active === id;

  return (
    <div className="relative flex flex-col items-center">
      <motion.button
        type="button"
        onMouseEnter={() => onHover(id)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(id)}
        onBlur={() => onHover(null)}
        whileHover={{ y: -3 }}
        animate={{
          borderColor: isActive ? "rgba(196,161,255,0.55)" : "rgba(255,255,255,0.09)",
          backgroundColor: isActive ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.02)",
        }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center gap-2 rounded-xl border px-5 py-4 w-32 md:w-36"
      >
        <Icon size={20} className={isActive ? "text-violet-300" : "text-ink-400"} strokeWidth={1.7} />
        <span className={`text-xs text-center ${isActive ? "text-ink-100" : "text-ink-400"}`}>{label}</span>
      </motion.button>

      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-14 z-20 w-48 rounded-lg border border-white/[0.1] bg-base-850 px-3 py-2 text-[11px] text-ink-300 shadow-glow-sm text-center"
        >
          {tip}
        </motion.div>
      )}
    </div>
  );
}

function Connector({ active, vertical = true }) {
  return (
    <svg
      width={vertical ? 2 : "100%"}
      height={vertical ? 40 : 2}
      className={vertical ? "mx-auto" : "my-auto"}
    >
      <line
        x1={vertical ? 1 : 0}
        y1={vertical ? 0 : 1}
        x2={vertical ? 1 : "100%"}
        y2={vertical ? "100%" : 1}
        stroke={active ? "#B084F5" : "rgba(255,255,255,0.14)"}
        strokeWidth={active ? 2 : 1.5}
        strokeDasharray={vertical ? undefined : "3 5"}
      />
    </svg>
  );
}

export default function ArchitectureDiagram() {
  const [active, setActive] = useState(null);

  return (
    <div className="rounded-xl2 border border-white/[0.08] bg-base-900/60 p-8 md:p-12">
      <div className="flex flex-col items-center gap-0">
        <Node id="client" active={active} onHover={setActive} />
        <Connector active={active === "client" || active === "application"} />
        <Node id="application" active={active} onHover={setActive} />
        <Connector active={["application", "api", "security", "data"].includes(active)} />

        <div className="flex items-start gap-6 md:gap-10">
          <Node id="api" active={active} onHover={setActive} />
          <Node id="security" active={active} onHover={setActive} />
          <Node id="data" active={active} onHover={setActive} />
        </div>

        <Connector active={["api", "security", "data", "cloud"].includes(active)} />
        <Node id="cloud" active={active} onHover={setActive} />
      </div>
    </div>
  );
}
