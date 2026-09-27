import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string
  title: string
  subtitle?: string
}) {
  return (
    <FadeIn>
      <header className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
        {kicker ? <p className="kicker text-sage">{kicker}</p> : null}
        <h2 className="editorial mt-3 text-3xl text-navy dark:text-cream md:text-5xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-4 text-pretty text-navy/70 dark:text-cream/70">
            {subtitle}
          </p>
        ) : null}
      </header>
    </FadeIn>
  )
}
