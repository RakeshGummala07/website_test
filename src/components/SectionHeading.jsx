import AnimatedSection from "./AnimatedSection";

export default function SectionHeading({ eyebrow, title, description, align = "left", className = "" }) {
  const alignClasses = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <AnimatedSection as="div" className={`flex flex-col gap-4 max-w-2xl ${alignClasses} ${className}`}>
      {eyebrow && <p className="text-sm text-violet-400 font-medium">{eyebrow}</p>}
      <h2 className="text-3xl md:text-[2.6rem] leading-[1.1] font-medium">{title}</h2>
      {description && <p className="text-ink-400 text-base md:text-lg leading-relaxed">{description}</p>}
    </AnimatedSection>
  );
}
