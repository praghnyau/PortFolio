import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion"

export function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.2 })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-forest dark:bg-beige"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  )
}
