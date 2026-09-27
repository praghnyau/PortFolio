import { site } from "../data/site"
import { TransitionLink } from "./PageTransition"

export function Footer() {
  return (
    <footer className="border-t border-navy/8 px-5 py-10 dark:border-cream/10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="kicker text-navy dark:text-cream">{site.name}</p>
          <p className="mt-2 text-sm text-navy/60 dark:text-cream/60">
            Building. Learning. Growing.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <TransitionLink
            className="text-navy/70 transition hover:text-forest dark:text-cream/70 dark:hover:text-beige"
            href={site.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </TransitionLink>
          <TransitionLink
            className="text-navy/70 transition hover:text-forest dark:text-cream/70 dark:hover:text-beige"
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </TransitionLink>
          <a
            className="text-navy/70 transition hover:text-forest dark:text-cream/70 dark:hover:text-beige"
            href={`mailto:${site.email}`}
          >
            Email
          </a>
        </div>
        <p className="text-sm text-navy/50 dark:text-cream/50">
          © {site.year} {site.name}
          <span className="mt-1 block">Made with curiosity & code.</span>
        </p>
      </div>
    </footer>
  )
}
