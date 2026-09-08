import { motion } from "framer-motion";
import SEO from "../components/SEO";
import GridBackground from "../components/GridBackground";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { staggerContainer, fadeUp, viewportOnce } from "../animations/variants";

export default function Products() {
  return (
    <>
      <SEO
        title="Products"
        description="Configurable technology solutions from Jayanth Technologies — business management, customer experience, security monitoring, analytics and more."
        path="/products"
      />

      <section className="relative pt-40 pb-16 md:pt-48 md:pb-20 overflow-hidden">
        <GridBackground />
        <div className="container-px relative max-w-3xl">
          <p className="text-sm text-violet-400 font-medium mb-4">Technology Solutions</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl leading-[1.05] font-medium"
          >
            Solutions we <span className="brand-gradient-text">design and build.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg text-ink-400 max-w-xl leading-relaxed"
          >
            These are solution categories we can build and configure for your business — not existing off-the-shelf
            products. Each one is scoped to what your team actually needs.
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {products.map((product) => (
              <motion.div key={product.slug} variants={fadeUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
