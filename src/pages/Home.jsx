import { motion } from "framer-motion";
import { getIcon } from "../lib/icons";
import SEO from "../components/SEO";
import Button from "../components/Button";
import MagneticButton from "../components/MagneticButton";
import GridBackground from "../components/GridBackground";
import HeroVisual from "../components/HeroVisual";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeading from "../components/SectionHeading";
import TechnologyCard from "../components/TechnologyCard";
import ServiceCard from "../components/ServiceCard";
import ProductCard from "../components/ProductCard";
import StatCard from "../components/StatCard";
import ArchitectureDiagram from "../components/ArchitectureDiagram";
import { services } from "../data/services";
import { products } from "../data/products";
import { technologies, stats, processStages, whyUs } from "../data/technologies";
import { staggerContainer, fadeUp, viewportOnce } from "../animations/variants";

export default function Home() {
  return (
    <>
      <SEO
        title="IT Services & Digital Solutions"
        description="Jayanth Technologies provides full stack development, cybersecurity, software testing, DevOps and cloud solutions for modern businesses."
        path="/"
      />

      {/* ---------------- HERO ---------------- */}
      <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <GridBackground />
        <div className="container-px relative grid lg:grid-cols-2 gap-16 items-center">
          <div>
            

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.02] font-medium tracking-tight"
            >
              <span className="text-ink-100">Build. </span>
              <span className="brand-gradient-text">Secure.</span>
              <span className="text-ink-100"> Scale.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-lg text-ink-400 max-w-lg leading-relaxed"
            >
              Engineering digital experiences and scalable technology solutions for modern businesses. Jayanth
              Technologies is a Hyderabad-based team building full stack applications, secure infrastructure and
              cloud-ready systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <Button to="/contact" size="lg">
                  Start a Project
                </Button>
              </MagneticButton>
              <Button to="/services" variant="secondary" size="lg" icon={false}>
                Explore Services
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </section>

      {/* ---------------- TRUST / TECHNOLOGY STRIP ---------------- */}
      <section className="section-py border-t border-white/[0.06]">
        <div className="container-px">
          <p className="text-sm text-ink-500 mb-8">Technologies we build with</p>
          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {technologies.map((tech) => (
              <motion.div key={tech.name} variants={fadeUp}>
                <TechnologyCard icon={tech.icon} name={tech.name} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section className="section-py border-t border-white/[0.06]">
        <div className="container-px">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <SectionHeading
              title="What we build"
              description="End-to-end technology services designed to help businesses build, launch and scale."
            />
            <AnimatedSection>
              <Button to="/services" variant="ghost">
                View all services
              </Button>
            </AnimatedSection>
          </div>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[minmax(0,1fr)]"
          >
            {services.map((service, i) => (
              <motion.div key={service.slug} variants={fadeUp} className={service.span === "large" ? "md:col-span-2 md:row-span-1" : service.span === "tall" ? "md:row-span-2" : service.span === "wide" ? "md:col-span-2" : ""}>
                <ServiceCard service={service} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------- INTERACTIVE CAPABILITIES / ARCHITECTURE ---------------- */}
      <section className="section-py border-t border-white/[0.06]">
        <div className="container-px">
          <SectionHeading
            title="How we architect systems"
            description="A simplified view of how client, application, security and infrastructure layers connect. Hover a node for detail."
            className="mb-14"
          />
          <AnimatedSection variants={fadeUp}>
            <ArchitectureDiagram />
          </AnimatedSection>
        </div>
      </section>

      {/* ---------------- PRODUCTS PREVIEW ---------------- */}
      <section className="section-py border-t border-white/[0.06]">
        <div className="container-px">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <SectionHeading
              title="Technology solutions"
              description="Configurable solution categories we design and build around your operations."
            />
            <AnimatedSection>
              <Button to="/products" variant="ghost">
                View all solutions
              </Button>
            </AnimatedSection>
          </div>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {products.slice(0, 3).map((product) => (
              <motion.div key={product.slug} variants={fadeUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------- WHY JAYANTH TECHNOLOGIES ---------------- */}
      <section className="section-py border-t border-white/[0.06]">
        <div className="container-px">
          <SectionHeading title="Why work with us" className="mb-14" />
          <motion.div
            variants={staggerContainer(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {whyUs.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <motion.div
                  key={item.name}
                  variants={fadeUp}
                  className="rounded-xl2 border border-white/[0.08] bg-white/[0.02] p-7 hover:bg-white/[0.04] transition-colors duration-300"
                >
                  <Icon size={20} className="text-magenta-400" strokeWidth={1.7} />
                  <h3 className="mt-4 text-lg font-medium text-ink-100">{item.name}</h3>
                  <p className="mt-2 text-sm text-ink-400 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ---------------- PROCESS ---------------- */}
      <section className="section-py border-t border-white/[0.06]">
        <div className="container-px">
          <SectionHeading title="From idea to production" className="mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {processStages.map((stage, i) => (
              <motion.div
                key={stage.index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-0"
              >
                <span className="text-xs font-mono text-violet-400">{stage.index}</span>
                <h3 className="mt-3 text-base font-medium text-ink-100">{stage.title}</h3>
                <p className="mt-2 text-sm text-ink-400 leading-relaxed">{stage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}
      <section className="section-py border-t border-white/[0.06]">
        <div className="container-px">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <StatCard key={s.label} value={s.value} label={s.label} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="section-py border-t border-white/[0.06]">
        <div className="container-px">
          <AnimatedSection
            variants={fadeUp}
            className="relative overflow-hidden rounded-xl2 border border-white/[0.09] bg-base-900/60 px-8 py-16 md:px-16 md:py-20 text-center"
          >
            <div className="absolute inset-0 bg-brand-gradient opacity-[0.08]" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-medium max-w-xl mx-auto">
                Have a project or technology challenge in mind?
              </h2>
              <p className="mt-4 text-ink-400 max-w-lg mx-auto">
                Tell us what you&apos;re building — we&apos;ll help you scope, architect and ship it.
              </p>
              <div className="mt-8 flex justify-center">
                <MagneticButton>
                  <Button to="/contact" size="lg">
                    Start a Project
                  </Button>
                </MagneticButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
