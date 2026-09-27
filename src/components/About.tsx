import { FadeIn, SectionHeading } from "./SectionHeading"

export function About() {
  return (
    <section id="about" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="About" title="Who's walking this path?" />
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <FadeIn>
            <figure className="mx-auto w-full max-w-sm">
              {/* Outer decorative ring — forest-green */}
              <div className="relative rounded-full p-[3px] bg-gradient-to-br from-forest via-sage to-beige shadow-[0_32px_72px_-32px_rgba(63,89,69,0.45)] dark:shadow-[0_32px_72px_-32px_rgba(63,89,69,0.6)]">
                {/* Inner padding ring — cream/beige */}
                <div className="rounded-full p-[5px] bg-cream dark:bg-navy">
                  <div className="overflow-hidden rounded-full shadow-[inset_0_2px_12px_rgba(23,32,42,0.08)]">
                    <img
                      src="/portrait.png"
                      alt="Portrait of U.Praghnya"
                      width={650}
                      height={650}
                      className="aspect-square w-full rounded-full object-cover transition duration-700 hover:scale-[1.04] hover:brightness-[1.03]"
                    />
                  </div>
                </div>
                {/* Decorative floating accent dots */}
                <span className="pointer-events-none absolute -top-2 -right-2 h-5 w-5 rounded-full bg-beige border-2 border-cream dark:border-navy shadow-sm" />
                <span className="pointer-events-none absolute -bottom-1 -left-3 h-3.5 w-3.5 rounded-full bg-sage/60" />
                <span className="pointer-events-none absolute top-1/2 -right-4 h-2.5 w-2.5 rounded-full bg-forest/50" />
              </div>
            </figure>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="max-w-xl space-y-5 text-lg leading-relaxed text-navy/80 dark:text-cream/80">
              <p className="editorial text-3xl text-navy dark:text-cream">I'm U.Praghnya.</p>
              <p>
                I'm a Computer Science Engineering student specializing in AI & ML.
              </p>
              <p>
                I'm interested in building software, exploring AI systems, and learning through
                real projects.
              </p>
              <p>I don't believe in knowing everything before starting.</p>
              <p className="text-forest dark:text-beige">I learn by building.</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
