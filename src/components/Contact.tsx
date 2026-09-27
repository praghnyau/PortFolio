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
            <ContactLink href={site.leetcode} label="LeetCode" icon="leetcode" />
            <ContactLink href={site.hackerrank} label="HackerRank" icon="hackerrank" />
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
  icon: "github" | "linkedin" | "leetcode" | "hackerrank" | "mail"
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

function Icon({ name }: { name: "github" | "linkedin" | "leetcode" | "hackerrank" | "mail" }) {
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
  if (name === "leetcode") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .666-1.607c.014-.015.03-.03.045-.045l3.855-4.127 5.406-5.788c.54-.54.54-1.414 0-1.954A1.37 1.37 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    )
  }
  if (name === "hackerrank") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm3.176 15.656h-1.632v-3.232h-3.088v3.232H8.824V8.344h1.632v3.088h3.088V8.344h1.632v7.312z" />
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
