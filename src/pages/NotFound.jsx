import SEO from "../components/SEO";
import Button from "../components/Button";
import GridBackground from "../components/GridBackground";

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-24">
      <GridBackground />
      <div className="container-px relative text-center">
        <SEO title="Page not found" path="/404" />
        <p className="text-sm text-violet-400 font-medium">404</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-medium">This page doesn&apos;t exist.</h1>
        <p className="mt-4 text-ink-400">The page you&apos;re looking for may have moved or been removed.</p>
        <div className="mt-8 flex justify-center">
          <Button to="/" size="lg">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
