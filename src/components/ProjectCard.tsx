import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion"
import type { MouseEvent } from "react"
import type { Project } from "../data/projects"

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export function ProjectCard({
  project,
  onClick,
}: {
  project: Project
  onClick: () => void
}) {
  const reduce = useReducedMotion()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(184,202,212,0.28), transparent 55%)`

  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (reduce) return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * 10)
    rotateX.set((0.5 - py) * 8)
    glareX.set(px * 100)
    glareY.set(py * 100)
  }

  const onLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.article
      data-cursor
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-navy/8 bg-cream p-7 shadow-[0_24px_60px_-40px_rgba(23,32,42,0.5)] transition duration-300 hover:-translate-y-1 dark:border-cream/10 dark:bg-navy/50 md:min-h-[340px] md:p-10"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glare }}
      />

      <p className="kicker relative text-sage">{project.number}</p>
      <h3 className="editorial relative mt-6 text-3xl text-navy dark:text-cream md:text-4xl">
        {project.title}
      </h3>
      <p className="relative mt-4 max-w-xl text-pretty text-navy/75 dark:text-cream/75">
        {project.summary}
      </p>

      {/* Tech tags */}
      <ul className="relative mt-6 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-beige/50 px-3 py-1 text-xs text-navy dark:bg-cream/10 dark:text-cream"
          >
            {tech}
          </li>
        ))}
      </ul>

      {/* Bottom row */}
      <div className="relative mt-8 flex items-center gap-3">
        {project.github && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-navy/12 bg-navy/5 px-3.5 py-1.5 text-xs font-medium text-navy/60 dark:border-cream/12 dark:bg-cream/5 dark:text-cream/60">
            <GitHubIcon className="h-3.5 w-3.5" />
            GitHub
          </span>
        )}
        <span className="ml-auto kicker text-[0.68rem] text-navy/40 transition group-hover:translate-x-1 group-hover:text-navy dark:text-cream/40 dark:group-hover:text-cream">
          Read more →
        </span>
      </div>
    </motion.article>
  )
}
