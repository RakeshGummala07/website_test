import { motion } from "framer-motion";
import SEO from "../components/SEO";
import GridBackground from "../components/GridBackground";
import ServiceCard from "../components/ServiceCard";
import Button from "../components/Button";
import { services } from "../data/services";
import { staggerContainer, fadeUp, viewportOnce } from "../animations/variants";

const SPAN = {
  large: "md:col-span-2 md:row-span-2",
  tall: "md:row-span-2",
  wide: "md:col-span-3",
  small: "",
};

export default function Services() {
  return (
    <>
      <SEO
        title="Services"
        description="Full stack development, cybersecurity, software testing, DevOps and cloud solutions from Jayanth Technologies."
        path="/services"
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
            What we <span className="brand-gradient-text">build.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg text-ink-400 max-w-xl leading-relaxed"
          >
            End-to-end technology services designed to help businesses build, launch and scale.
          </motion.p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-px">
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {services.map((service, i) => (
              <motion.div key={service.slug} variants={fadeUp} className={SPAN[service.span]}>
                <ServiceCard service={service} index={i} />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-16 rounded-xl2 border border-white/[0.08] bg-base-900/60 p-10 md:p-14 text-center">
            <h2 className="text-2xl md:text-3xl font-medium">Not sure which service fits?</h2>
            <p className="mt-3 text-ink-400 max-w-md mx-auto">
              Tell us about the problem you&apos;re solving and we&apos;ll recommend an approach.
            </p>
            <div className="mt-7 flex justify-center">
              <Button to="/contact" size="lg">
                Talk to us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
