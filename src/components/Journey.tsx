import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { useRef } from "react"
import type { JourneyMilestone as JourneyMilestoneData } from "../data/journey"
import { journeyMilestones } from "../data/journey"
import { JourneyMilestoneCard, MilestoneBody } from "./JourneyMilestone"
import { SectionHeading } from "./SectionHeading"

export function Journey() {
  const ref = useRef<HTMLElement>(null)
  const portraitSrc = `${import.meta.env.BASE_URL}portrait.png`
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  })
  const raw = useSpring(scrollYProgress, { stiffness: 60, damping: 28, mass: 0.4 })
  const pathLength = reduce ? 1 : raw
  const mountainShift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 24])
  const sky = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    ["#F7F5EF", "#E8EEE6", "#E6D7C3"],
  )
  const skyDark = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    ["#17202A", "#1A2830", "#241C18"],
  )

  return (
    <section
      ref={ref}
      id="journey"
      className="relative scroll-mt-24 overflow-hidden px-5 py-20 md:px-8 md:py-28"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 dark:hidden"
        style={{ backgroundColor: sky }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden dark:block"
        style={{ backgroundColor: skyDark }}
      />
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 1200 400"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 w-full opacity-40 md:h-80"
        style={{ y: mountainShift }}
      >
        <path d="M0 400 L180 210 L280 290 L430 120 L620 280 L780 90 L980 250 L1200 70 V400 Z" fill="#3F5945" opacity="0.18" />
        <path d="M0 400 L140 280 L260 340 L400 200 L580 320 L760 180 L980 300 L1200 160 V400 Z" fill="#71856F" opacity="0.16" />
      </motion.svg>

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="The path"
          title="The journey"
          subtitle="Every project, every bug, and every new concept moves the path forward."
        />

        <div className="relative md:hidden">
          <MobileJourney />
        </div>

        <div className="relative hidden md:block">
          <svg
            className="pointer-events-none absolute inset-y-0 left-1/2 h-full w-[220px] -translate-x-1/2"
            viewBox="0 0 220 1600"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <clipPath id="journeyAvatarClip">
                <circle cx="0" cy="0" r="13" />
              </clipPath>
            </defs>

            {/* Winding path */}
            <motion.path
              d="M110 20 C 70 140, 170 220, 110 340 C 50 460, 170 540, 110 680 C 40 820, 180 900, 110 1040 C 50 1160, 160 1240, 110 1380 C 80 1460, 130 1520, 110 1580"
              fill="none"
              stroke="currentColor"
              className="text-forest/50 dark:text-beige/50"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength }}
            />

            {/* Profile pic travels along the path as user scrolls */}
            <motion.g
              style={{
                offsetPath: `path("M110 20 C 70 140, 170 220, 110 340 C 50 460, 170 540, 110 680 C 40 820, 180 900, 110 1040 C 50 1160, 160 1240, 110 1380 C 80 1460, 130 1520, 110 1580")`,
                offsetDistance: reduce ? "100%" : (raw as unknown as string),
                offsetRotate: "0deg",
              }}
            >
              <motion.circle
                cx="0" cy="0"
                fill="none"
                stroke="#3F5945"
                strokeWidth="1.2"
                className="dark:stroke-beige"
                animate={{ r: [15, 30], opacity: [0.55, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              />
              <circle cx="0" cy="0" r="15" fill="#f7f5ef" className="dark:fill-navy" />
              <circle cx="0" cy="0" r="15" fill="none" stroke="#3F5945" strokeWidth="2.5" className="dark:stroke-beige" />
              <image
                href={portraitSrc}
                x="-13" y="-13"
                width="26" height="26"
                clipPath="url(#journeyAvatarClip)"
                preserveAspectRatio="xMidYMid slice"
              />
            </motion.g>
          </svg>

          <ol className="relative space-y-24">
            {journeyMilestones.map((milestone, index) => (
              <JourneyMilestoneCard
                key={milestone.id}
                milestone={milestone}
                align={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function MobileJourney() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.95"],
  })
  const lineHeight = useTransform(
    reduce ? scrollYProgress : scrollYProgress,
    [0, 1],
    ["0%", "100%"],
  )

  return (
    <div ref={ref} className="relative ml-3 pl-8">
      {/* Background track */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-px bg-forest/10 dark:bg-beige/10"
      />
      {/* Animated fill — grows downward as you scroll */}
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-0 w-px bg-forest/50 dark:bg-beige/50"
        style={{ height: reduce ? "100%" : lineHeight }}
      />

      <ol className="space-y-6">
        {journeyMilestones.map((milestone, index) => (
          <MobileJourneyItem key={milestone.id} milestone={milestone} index={index} />
        ))}
      </ol>
    </div>
  )
}

function MobileJourneyItem({
  milestone,
  index: _index,
}: {
  milestone: JourneyMilestoneData
  index: number
}) {
  const ref = useRef<HTMLLIElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" })
  const reduce = useReducedMotion()
  const isHere = milestone.kind === "here"
  const isNext = milestone.kind === "next"

  return (
    <motion.li
      ref={ref}
      initial={reduce ? false : { opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Timeline dot */}
      {isHere ? (
        <span
          className="absolute -left-[46px] top-4 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="absolute inline-flex h-8 w-8 rounded-full bg-forest/20 motion-safe:animate-ping" />
          <span className="relative h-3.5 w-3.5 rounded-full bg-forest shadow-[0_0_0_2.5px_rgba(113,133,111,0.3)] dark:bg-beige" />
        </span>
      ) : (
        <span
          className="absolute -left-[37px] top-[22px] h-2.5 w-2.5 rounded-full border-2 border-forest/60 bg-cream dark:border-beige/60 dark:bg-navy"
          aria-hidden="true"
        />
      )}

      {/* Card */}
      <article
        className={`rounded-2xl border border-navy/8 bg-cream/70 p-5 shadow-[0_8px_28px_-18px_rgba(23,32,42,0.25)] dark:border-cream/10 dark:bg-navy/40 ${
          isHere ? "ring-1 ring-sage/50" : ""
        }`}
      >
        <MilestoneBody milestone={milestone} isHere={isHere} isNext={isNext} />
      </article>
    </motion.li>
  )
}
