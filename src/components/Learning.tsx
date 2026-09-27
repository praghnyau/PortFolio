import { learningTracks } from "../data/skills"
import { FadeIn, SectionHeading } from "./SectionHeading"

export function Learning() {
  return (
    <section id="learning" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Still moving"
          title="Currently learning"
          subtitle="Growth is a journey, not a destination."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {learningTracks.map((track, index) => (
            <FadeIn key={track.number} delay={index * 0.06}>
              <article className="h-full border-t border-navy/15 pt-6 dark:border-cream/15">
                <p className="kicker text-sage">{track.number}</p>
                <h3 className="editorial mt-4 text-2xl text-navy dark:text-cream">
                  {track.title}
                </h3>
                <p className="mt-3 text-navy/70 dark:text-cream/70">{track.detail}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
