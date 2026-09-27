import { motion, useReducedMotion } from "framer-motion"
import { skillGroups } from "../data/skills"
import { FadeIn, SectionHeading } from "./SectionHeading"

export function Skills() {
  const reduce = useReducedMotion()
  return (
    <section id="skills" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Toolkit"
          title="Tools I've picked up along the way"
        />
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <FadeIn key={group.category} delay={index * 0.04}>
              <div>
                <h3 className="kicker text-sage">{group.category}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <motion.span
                        data-cursor
                        whileHover={reduce ? undefined : { y: -3, scale: 1.04 }}
                        transition={{ type: "spring", stiffness: 400, damping: 22 }}
                        className="inline-flex rounded-full border border-navy/10 bg-cream px-3.5 py-1.5 text-sm text-navy hover:border-forest hover:text-forest dark:border-cream/15 dark:bg-navy/40 dark:text-cream dark:hover:border-beige dark:hover:text-beige"
                      >
                        {item}
                      </motion.span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
