import { motion } from "framer-motion";
import { getIcon } from "../lib/icons";
import SEO from "../components/SEO";
import GridBackground from "../components/GridBackground";
import SectionHeading from "../components/SectionHeading";
import StatCard from "../components/StatCard";
import { stats, values } from "../data/technologies";
import { staggerContainer, fadeUp, viewportOnce } from "../animations/variants";

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="Jayanth Technologies is a Hyderabad-based technology partner focused on software development, cybersecurity, testing, DevOps and cloud."
        path="/about"
      />

      {/* Hero */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-24 overflow-hidden">
        <GridBackground />
        <div className="container-px relative max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl leading-[1.05] font-medium"
          >
            Technology built <span className="brand-gradient-text">with purpose.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg text-ink-400 max-w-xl leading-relaxed"
          >
            Jayanth Technologies is a Hyderabad-based technology partner. We provide services across software
            development, cybersecurity, testing, DevOps and cloud — built by people who care about how systems
            hold up in production, not just how they look in a demo.
          </motion.p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section-py border-t border-white/[0.06]">
        <div className="container-px grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl2 border border-white/[0.08] bg-white/[0.02] p-8"
          >
            <h3 className="text-sm text-violet-400 font-medium">Mission</h3>
            <p className="mt-3 text-2xl font-medium text-ink-100 leading-snug">
              Build reliable technology that helps businesses grow.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl2 border border-white/[0.08] bg-white/[0.02] p-8"
          >
            <h3 className="text-sm text-magenta-400 font-medium">Vision</h3>
            <p className="mt-3 text-2xl font-medium text-ink-100 leading-snug">
              Become a trusted technology partner for organizations building their digital future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-py border-t border-white/[0.06]">
        <div className="container-px">
          <SectionHeading title="What guides our work" className="mb-14" />
          <motion.div
            variants={staggerContainer(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {values.map((v) => {
              const Icon = getIcon(v.icon);
              return (
                <motion.div
                  key={v.name}
                  variants={fadeUp}
                  className="rounded-xl2 border border-white/[0.08] bg-white/[0.02] p-7 hover:border-violet-400/25 transition-colors duration-300"
                >
                  <Icon size={20} className="text-violet-300" strokeWidth={1.7} />
                  <h3 className="mt-4 text-lg font-medium text-ink-100">{v.name}</h3>
                  <p className="mt-2 text-sm text-ink-400 leading-relaxed">{v.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-py border-t border-white/[0.06]">
        <div className="container-px">
          <p className="text-xs text-ink-500 mb-8">
            Early-stage figures — updated as the team and project history grow.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <StatCard key={s.label} value={s.value} label={s.label} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
