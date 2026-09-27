import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projects } from "../data/projects"
import type { Project } from "../data/projects"
import { FadeIn, SectionHeading } from "./SectionHeading"
import { ProjectCard } from "./ProjectCard"
import { TransitionLink } from "./PageTransition"

/* ── GitHub icon ─────────────────────────────────────── */
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

/* ── Project Detail Drawer ───────────────────────────── */
function ProjectDrawer({ project, onClose }: { project: Project; onClose: () => void }) {
  // Escape key closes drawer
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[90] bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer panel — slides in from the right */}
      <motion.aside
        key="drawer"
        role="dialog"
        aria-modal="true"
        aria-label={`About ${project.title}`}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 380, damping: 38, mass: 0.8 }}
        className="fixed right-0 top-0 z-[91] flex h-full w-full max-w-lg flex-col overflow-y-auto bg-cream shadow-[-24px_0_80px_-16px_rgba(23,32,42,0.25)] dark:bg-navy"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-navy/8 px-6 py-5 dark:border-cream/10">
          <p className="kicker text-sage">{project.number} / Project</p>
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="flex h-9 w-9 items-center justify-center rounded-full text-navy/50 transition hover:bg-navy/8 hover:text-navy dark:text-cream/50 dark:hover:bg-cream/8 dark:hover:text-cream"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-1 flex-col gap-8 px-6 py-8">

          {/* Title */}
          <h2 className="editorial text-4xl leading-tight text-navy dark:text-cream md:text-5xl">
            {project.title}
          </h2>

          {/* Summary */}
          <div>
            <p className="kicker mb-2 text-sage">What it is</p>
            <p className="text-lg leading-relaxed text-navy/80 dark:text-cream/80">
              {project.summary}
            </p>
          </div>

          {/* Problem */}
          <div>
            <p className="kicker mb-2 text-sage">The problem it solves</p>
            <p className="text-navy/70 leading-relaxed dark:text-cream/70">
              {project.problem}
            </p>
          </div>

          {/* Tech stack */}
          <div>
            <p className="kicker mb-3 text-sage">Built with</p>
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-beige/60 px-4 py-1.5 text-sm font-medium text-navy dark:bg-cream/10 dark:text-cream"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <hr className="border-navy/8 dark:border-cream/10" />

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {project.github && (
              <TransitionLink
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-cream shadow-[0_8px_24px_-12px_rgba(63,89,69,0.6)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(63,89,69,0.7)] dark:bg-beige dark:text-navy"
              >
                <GitHubIcon className="h-4 w-4" />
                View on GitHub
              </TransitionLink>
            )}
            {project.live && (
              <TransitionLink
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-forest/30 px-5 py-2.5 text-sm font-medium text-forest transition hover:-translate-y-0.5 hover:border-forest dark:border-beige/30 dark:text-beige"
              >
                ↗ Live demo
              </TransitionLink>
            )}
          </div>
        </div>

        {/* ── Footer hint ── */}
        <div className="border-t border-navy/8 px-6 py-4 dark:border-cream/10">
          <p className="text-center text-xs text-navy/35 dark:text-cream/35">
            Press <kbd className="rounded bg-navy/8 px-1.5 py-0.5 font-mono text-[0.65rem] dark:bg-cream/10">Esc</kbd> or click outside to close
          </p>
        </div>
      </motion.aside>
    </AnimatePresence>
  )
}

/* ── Projects section ────────────────────────────────── */
export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const open = useCallback((p: Project) => setSelected(p), [])
  const close = useCallback(() => setSelected(null), [])

  return (
    <>
      <section id="projects" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            kicker="Selected work"
            title="What I've built"
            subtitle="The places where learning turned into something tangible."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              <FadeIn key={project.id} delay={index * 0.05}>
                <ProjectCard project={project} onClick={() => open(project)} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {selected && <ProjectDrawer project={selected} onClose={close} />}
    </>
  )
}
