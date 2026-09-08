import { motion } from "framer-motion";
import { MapPin, Clock, Sparkles } from "lucide-react";
import SEO from "../components/SEO";
import GridBackground from "../components/GridBackground";
import SectionHeading from "../components/SectionHeading";
import Button from "../components/Button";
import { careers } from "../data/careers";
import { staggerContainer, fadeUp, viewportOnce } from "../animations/variants";
import { company } from "../config/company";

const REASONS = [
  { title: "Learn", description: "Work across real production systems, not toy problems." },
  { title: "Build", description: "Ship things that businesses actually depend on." },
  { title: "Innovate", description: "Bring in the right tool for the job, not just the familiar one." },
  { title: "Grow", description: "Take on more scope as your judgment earns it." },
];

export default function Careers() {
  return (
    <>
      <SEO
        title="Careers"
        description="Open roles at Jayanth Technologies, a Hyderabad-based technology company."
        path="/careers"
      />

      <section className="relative pt-40 pb-16 md:pt-48 md:pb-20 overflow-hidden">
        <GridBackground />
        <div className="container-px relative max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl leading-[1.05] font-medium"
          >
            Build the future <span className="brand-gradient-text">with us.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg text-ink-400 max-w-xl leading-relaxed"
          >
            We&apos;re a small, hands-on engineering team based in {company.location.city}. If you care about doing
            the work well, we want to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Why join */}
      <section className="section-py border-t border-white/[0.06]">
        <div className="container-px">
          <SectionHeading title="Why join us" className="mb-12" />
          <motion.div
            variants={staggerContainer(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
          >
            {REASONS.map((r) => (
              <motion.div key={r.title} variants={fadeUp} className="rounded-xl2 border border-white/[0.08] bg-white/[0.02] p-6">
                <h3 className="text-base font-medium text-ink-100">{r.title}</h3>
                <p className="mt-2 text-sm text-ink-400 leading-relaxed">{r.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open positions */}
      <section className="section-py border-t border-white/[0.06]">
        <div className="container-px">
          <SectionHeading title="Open positions" className="mb-12" />

          {careers.length > 0 ? (
            <motion.div
              variants={staggerContainer(0.06)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="flex flex-col gap-3"
            >
              {careers.map((job) => (
                <motion.div
                  key={job.slug}
                  variants={fadeUp}
                  className="group flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl2 border border-white/[0.08] bg-white/[0.02] p-6 hover:border-violet-400/25 hover:bg-white/[0.04] transition-colors duration-300"
                >
                  <div>
                    <h3 className="text-lg font-medium text-ink-100">{job.title}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-400">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={13} /> {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={13} /> {job.type}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {job.stack.map((s) => (
                        <span key={s} className="text-[11px] text-ink-400 rounded-full border border-white/[0.08] px-2.5 py-1">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button to="/contact" variant="ghost" size="md" className="shrink-0">
                    View position
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="rounded-xl2 border border-dashed border-white/[0.12] p-12 text-center">
              <Sparkles size={20} className="mx-auto text-violet-400" />
              <p className="mt-4 text-ink-300">There are no open positions right now.</p>
              <p className="mt-1 text-sm text-ink-500">Check back soon, or send your resume below.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-py border-t border-white/[0.06]">
        <div className="container-px">
          <div className="rounded-xl2 border border-white/[0.09] bg-base-900/60 p-10 md:p-14 text-center">
            <h2 className="text-2xl md:text-3xl font-medium">Don&apos;t see the right role?</h2>
            <p className="mt-3 text-ink-400 max-w-md mx-auto">
              We&apos;re always open to hearing from people who do great work.
            </p>
            <div className="mt-7 flex justify-center">
              <Button to="/contact" size="lg">
                Send Your Resume
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
