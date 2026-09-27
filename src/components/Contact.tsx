import { site } from "../data/site"
import { FadeIn } from "./SectionHeading"
import { TransitionLink } from "./PageTransition"

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <p className="kicker text-sage">The path continues</p>
          <h2 className="editorial mt-4 text-4xl text-navy dark:text-cream md:text-6xl">
            Where should we go next?
          </h2>
          <p className="mt-5 text-lg text-navy/70 dark:text-cream/70">
            Have an idea, opportunity, or interesting problem? Let's talk.
          </p>
          <p className="editorial mt-8 text-2xl italic text-forest dark:text-beige">
            The journey isn't finished. And that's the point.
          </p>
          <p className="mt-2 text-navy/70 dark:text-cream/70">Let's build something.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ContactLink href={site.github} label="GitHub" icon="github" />
            <ContactLink href={site.linkedin} label="LinkedIn" icon="linkedin" />
            <ContactLink href={`mailto:${site.email}`} label="Email me" icon="mail" />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function ContactLink({
  href,
  label,
  icon,
}: {
  href: string
  label: string
  icon: "github" | "linkedin" | "mail"
}) {
  return (
    <TransitionLink
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
      className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-5 py-3 text-sm text-navy transition hover:-translate-y-0.5 hover:border-forest hover:bg-forest hover:text-cream dark:border-cream/20 dark:text-cream dark:hover:bg-beige dark:hover:text-navy"
    >
      <Icon name={icon} />
      {label}
    </TransitionLink>
  )
}

function Icon({ name }: { name: "github" | "linkedin" | "mail" }) {
  if (name === "github") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 1.71.83 0-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-1.99 1.03-2.7-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.39.1 2.64.64.71 1.03 1.6 1.03 2.7 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    )
  }
  if (name === "linkedin") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.5 9H4V20h2.5V9ZM5.25 4A1.5 1.5 0 1 0 5.26 7 1.5 1.5 0 0 0 5.25 4ZM20 20h-2.5v-5.6c0-1.56-.56-2.62-1.95-2.62-1.06 0-1.7.72-1.97 1.41-.1.25-.13.6-.13.95V20H11V9h2.4v1.51c.32-.55 1.26-1.71 3.08-1.71 2.25 0 3.52 1.47 3.52 4.63V20Z" />
      </svg>
    )
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 7.5 12 12.5 19 7.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
