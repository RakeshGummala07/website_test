import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";

const VARIANTS = {
  primary:
    "text-white shadow-glow bg-brand-gradient hover:brightness-110 active:brightness-95",
  secondary:
    "text-ink-100 bg-white/[0.04] border border-white/[0.12] hover:bg-white/[0.08] hover:border-white/[0.2]",
  ghost: "text-ink-300 hover:text-ink-100",
};

const SIZES = {
  md: "text-sm px-5 py-2.5",
  lg: "text-[15px] px-6 py-3.5",
};

const Button = forwardRef(function Button(
  { children, variant = "primary", size = "md", icon = true, to, href, loading = false, className = "", ...rest },
  ref
) {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-premium disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  const content = (
    <>
      {loading ? <Loader2 size={16} className="animate-spin" /> : null}
      <span>{children}</span>
      {icon && !loading && (
        <ArrowRight size={16} className="transition-transform duration-200 ease-premium group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button ref={ref} className={classes} {...rest}>
      {content}
    </button>
  );
});

export default Button;
