import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { site } from "../data/site"
import { scrollToId } from "../lib/nav"

const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const mountainY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70])
  const pathY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 28])

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="motion-drift absolute top-24 left-[12%] h-40 w-40 rounded-full bg-sky/35 blur-3xl dark:bg-forest/25" />
        <div
          className="motion-drift absolute top-40 right-[8%] h-52 w-52 rounded-full bg-beige/50 blur-3xl dark:bg-beige/10"
          style={{ animationDelay: "-3s" }}
        />
      </div>
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <motion.div
          initial={reduce ? false : "hidden"}
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
          }}
        >
          {/* Circular profile photo with availability badge */}
          <motion.div className="mb-6 flex items-center gap-4" variants={heroItem}>
            <div className="relative rounded-full p-[2.5px] bg-gradient-to-br from-forest via-sage to-beige shadow-[0_12px_32px_-12px_rgba(63,89,69,0.45)]">
              <div className="rounded-full p-[3px] bg-cream dark:bg-navy">
                <img
                  src="/portrait.png"
                  alt="Portrait of U.Praghnya"
                  width={72}
                  height={72}
                  className="h-[72px] w-[72px] rounded-full object-cover"
                />
              </div>
              {/* Green online dot */}
              <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-forest border-2 border-cream dark:border-navy" />
            </div>
            <div>
              <p className="text-sm font-medium text-navy dark:text-cream">U.Praghnya</p>
              <p className="mt-0.5 text-xs text-navy/50 dark:text-cream/50">Open to opportunities</p>
            </div>
          </motion.div>

          <motion.p className="kicker text-sage" variants={heroItem}>
            CSE • AI & ML • Software development
          </motion.p>
          <motion.h1
            className="editorial mt-4 text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.95] text-navy dark:text-cream"
            variants={heroItem}
          >
            {site.name}
          </motion.h1>
          <motion.p
            className="editorial mt-5 text-2xl italic text-forest dark:text-beige md:text-3xl"
            variants={heroItem}
          >
            {site.tagline}
          </motion.p>
          <motion.p
            className="mt-4 text-sm tracking-wide text-navy/60 dark:text-cream/60"
            variants={heroItem}
          >
            {site.role}
          </motion.p>
          <motion.p
            className="mt-6 max-w-md text-pretty text-lg text-navy/80 dark:text-cream/80"
            variants={heroItem}
          >
            {site.intro}
          </motion.p>
          <motion.div className="mt-8 flex flex-wrap gap-3" variants={heroItem}>
            <button
              type="button"
              className="rounded-full bg-forest px-5 py-3 text-sm text-cream shadow-[0_8px_24px_-16px_rgba(23,32,42,0.5)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-18px_rgba(63,89,69,0.7)] dark:bg-beige dark:text-navy"
              onClick={() => scrollToId("journey")}
            >
              Explore my journey
            </button>
            <button
              type="button"
              className="rounded-full border border-navy/15 px-5 py-3 text-sm text-navy transition hover:-translate-y-0.5 hover:border-forest dark:border-cream/20 dark:text-cream"
              onClick={() => scrollToId("projects")}
            >
              View projects
            </button>
          </motion.div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-lg">
          <motion.div style={{ y: mountainY }} className="will-change-transform">
            <HeroLandscape pathY={pathY} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function HeroLandscape({ pathY }: { pathY: ReturnType<typeof useTransform<number, number>> }) {
  const reduce = useReducedMotion()

  return (
    <svg
      viewBox="0 0 560 520"
      role="img"
      aria-labelledby="hero-landscape-title"
      className="h-auto w-full"
    >
      <title id="hero-landscape-title">
        A quiet mountain landscape with a winding path beginning at Start
      </title>
      <defs>
        <linearGradient id="skyWash" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B8CAD4" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#F7F5EF" stopOpacity="0" />
        </linearGradient>
        {/* Circular clip for the avatar */}
        <clipPath id="avatarClip">
          <circle cx="0" cy="0" r="13" />
        </clipPath>
        {/* Ring border clip */}
        <clipPath id="avatarRingClip">
          <circle cx="0" cy="0" r="15" />
        </clipPath>
      </defs>
      <ellipse
        className="motion-drift"
        cx="410"
        cy="90"
        rx="48"
        ry="16"
        fill="#B8CAD4"
        opacity="0.35"
      />
      <path d="M40 430 L160 250 L230 330 L330 170 L520 430 Z" fill="#3F5945" opacity="0.18" />
      <path d="M80 430 L220 290 L280 360 L390 220 L530 430 Z" fill="#71856F" opacity="0.28" />
      <path d="M0 430 L120 340 L190 390 L270 300 L360 380 L460 250 L560 430 L560 520 L0 520 Z" fill="#D8CCB8" opacity="0.55" />
      <path
        d="M0 438 H560"
        stroke="#17202A"
        strokeOpacity="0.12"
        strokeWidth="1"
      />
      <motion.path
        d="M118 470 C 150 430, 170 400, 188 372 C 210 338, 236 348, 250 320 C 268 284, 292 270, 318 248 C 352 220, 372 198, 404 168"
        fill="none"
        stroke="#3F5945"
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduce ? 0 : 1.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: pathY }}
        className="dark:stroke-beige"
      />
      {/* ── Moving avatar along the path ── */}
      <motion.g
        style={{ y: pathY }}
        initial={{ opacity: reduce ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 0.4, duration: 0.4 }}
      >
        {/* Hidden path for motion-path reference */}
        <motion.circle
          cx="0"
          cy="0"
          r="0"
          fill="transparent"
          style={{
            offsetPath: `path("M118 470 C 150 430, 170 400, 188 372 C 210 338, 236 348, 250 320 C 268 284, 292 270, 318 248 C 352 220, 372 198, 404 168")`,
            offsetRotate: "0deg",
          }}
          animate={{ offsetDistance: reduce ? "100%" : ["0%", "100%"] }}
          transition={{
            duration: reduce ? 0 : 1.6,
            ease: [0.22, 1, 0.36, 1],
            delay: 0,
          }}
        />

        {/* Avatar group — follows the same path via separate motion.g */}
        <motion.g
          style={{
            offsetPath: `path("M118 470 C 150 430, 170 400, 188 372 C 210 338, 236 348, 250 320 C 268 284, 292 270, 318 248 C 352 220, 372 198, 404 168")`,
            offsetRotate: "0deg",
          }}
          animate={{ offsetDistance: reduce ? "100%" : ["0%", "100%"] }}
          transition={{
            duration: reduce ? 0 : 1.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* White/beige ring */}
          <circle cx="0" cy="0" r="15" fill="#f7f5ef" className="dark:fill-navy" />
          {/* Forest ring border */}
          <circle cx="0" cy="0" r="15" fill="none" stroke="#3F5945" strokeWidth="2" className="dark:stroke-beige" />
          {/* Profile pic */}
          <image
            href="/portrait.png"
            x="-13"
            y="-13"
            width="26"
            height="26"
            clipPath="url(#avatarClip)"
            preserveAspectRatio="xMidYMid slice"
          />
          {/* Pulse ring */}
          <motion.circle
            cx="0"
            cy="0"
            fill="none"
            stroke="#3F5945"
            strokeWidth="1.2"
            className="dark:stroke-beige"
            animate={{ r: [15, 28], opacity: [0.6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.g>
      </motion.g>

      {/* START label — stays at the bottom */}
      <text
        x="132"
        y="490"
        className="fill-navy dark:fill-cream"
        fontSize="11"
        letterSpacing="2.4"
        fontFamily="DM Sans, sans-serif"
      >
        START
      </text>
    </svg>
  )
}
