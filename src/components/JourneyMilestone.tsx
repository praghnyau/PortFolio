import type { JourneyMilestone as JourneyMilestoneData } from "../data/journey"
import { FadeIn } from "./SectionHeading"

export function JourneyMilestoneCard({
  milestone,
  align,
}: {
  milestone: JourneyMilestoneData
  align: "left" | "right"
}) {
  const isHere = milestone.kind === "here"
  const isNext = milestone.kind === "next"

  return (
    <li className="grid grid-cols-[1fr_48px_1fr] items-center gap-6">
      <div className={align === "left" ? "text-right" : "order-3"}>
        <FadeIn>
          <article
            className={`max-w-md rounded-2xl border border-navy/8 bg-cream/70 p-6 text-left shadow-[0_20px_50px_-36px_rgba(23,32,42,0.45)] dark:border-cream/10 dark:bg-navy/40 ${
              align === "right" ? "" : "ml-auto"
            } ${isHere ? "ring-1 ring-sage/50" : ""}`}
          >
            <MilestoneBody milestone={milestone} isHere={isHere} isNext={isNext} />
          </article>
        </FadeIn>
      </div>

      <div className="relative z-10 flex justify-center">
        {isHere ? (
          /* ── Pulsing dot for the current milestone ── */
          <span className="relative flex items-center justify-center">
            {/* Pulse ring */}
            <span className="absolute inline-flex h-10 w-10 rounded-full bg-forest/20 motion-safe:animate-ping" />
            {/* Filled dot */}
            <span className="relative h-4 w-4 rounded-full bg-forest shadow-[0_0_0_3px_rgba(113,133,111,0.25)] dark:bg-beige" />
          </span>
        ) : (
          <span
            className="h-3.5 w-3.5 rounded-full border-2 border-forest bg-cream dark:border-beige dark:bg-navy"
            aria-hidden="true"
          />
        )}
      </div>

      <div className={align === "left" ? "order-3" : ""} />
    </li>
  )
}

export function MilestoneBody({
  milestone,
  isHere,
  isNext,
}: {
  milestone: JourneyMilestoneData
  isHere: boolean
  isNext: boolean
}) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <p className="kicker text-sage">{milestone.number}</p>
        <p className="text-xs text-navy/45 dark:text-cream/45">{milestone.year}</p>
      </div>
      <h3 className="editorial mt-3 text-2xl text-navy dark:text-cream">{milestone.title}</h3>
      <p className="mt-1 text-sm text-forest dark:text-beige">{milestone.subtitle}</p>
      {milestone.body ? (
        <p className="mt-4 text-navy/75 dark:text-cream/75">{milestone.body}</p>
      ) : null}
      {milestone.items ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {milestone.items.map((item) => (
            <li
              key={item}
              className="rounded-full border border-navy/10 px-3 py-1 text-xs text-navy/80 dark:border-cream/15 dark:text-cream/80"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}
      {isHere ? (
        <p className="kicker mt-5 inline-flex items-center gap-2 text-forest dark:text-beige">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-sage opacity-50 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-forest" />
          </span>
          You are here
        </p>
      ) : null}
      {isNext ? <DistantPeak /> : null}
    </>
  )
}

function DistantPeak() {
  return (
    <svg viewBox="0 0 220 70" className="mt-5 h-16 w-full" aria-hidden="true">
      <path d="M10 62 L70 22 L96 44 L140 8 L210 62 Z" fill="#3F5945" opacity="0.22" />
      <path d="M10 62 H210" stroke="#17202A" strokeOpacity="0.15" />
    </svg>
  )
}
