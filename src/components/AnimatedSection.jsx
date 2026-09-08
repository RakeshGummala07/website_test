import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../animations/variants";

// Pre-built motion components so we don't call motion(Tag) on every render
// (which would create a new component identity and remount children).
const MOTION_TAGS = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  li: motion.li,
  span: motion.span,
  h2: motion.h2,
  h3: motion.h3,
};

/**
 * Wraps content so it fades/slides into view once when it enters the viewport.
 * Use `variants` to override the animation, `as` to change the wrapping tag.
 */
export default function AnimatedSection({
  children,
  variants = fadeUp,
  className = "",
  as = "div",
  delay = 0,
  ...rest
}) {
  const MotionTag = MOTION_TAGS[as] || motion.div;
  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={variants}
      transition={delay ? { delay } : undefined}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
