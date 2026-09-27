import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

/* ─────────────────────────────────────────────
   Context
───────────────────────────────────────────── */
type TransitionCtx = {
  trigger: (onMidpoint: () => void) => void
}

const Ctx = createContext<TransitionCtx>({ trigger: (fn) => fn() })

export function usePageTransition() {
  return useContext(Ctx)
}

/* ─────────────────────────────────────────────
   Intro Animation — plays on every page load
   Two panels start fully covering the screen
   and sweep out to the right to reveal content
───────────────────────────────────────────── */
export function IntroAnimation() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Short delay so the page assets can start loading before reveal
    const t = setTimeout(() => setVisible(false), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* ── Beige panel (exits first, trails the green) ── */}
          <motion.div
            key="intro-beige"
            aria-hidden="true"
            className="fixed inset-0 z-[9998] bg-beige dark:bg-navy"
            initial={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            style={{ originX: 1 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
          />

          {/* ── Forest panel (exits last, leads the reveal) ── */}
          <motion.div
            key="intro-forest"
            aria-hidden="true"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-forest"
            initial={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            style={{ originX: 1 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Centred name mark shown during the intro */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <p className="editorial text-[clamp(2.8rem,10vw,6rem)] leading-none tracking-tight text-cream">
                U.Praghnya
              </p>
              <p className="kicker mt-3 text-cream/50 tracking-[0.3em]">Portfolio</p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ─────────────────────────────────────────────
   Provider + Link-click Overlay
───────────────────────────────────────────── */
export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle")
  const midpointRef = useRef<(() => void) | null>(null)

  const trigger = useCallback((onMidpoint: () => void) => {
    midpointRef.current = onMidpoint
    setPhase("in")
  }, [])

  const onInComplete = () => {
    midpointRef.current?.()
    midpointRef.current = null
    setTimeout(() => setPhase("out"), 80)
  }

  const onOutComplete = () => setPhase("idle")

  return (
    <Ctx.Provider value={{ trigger }}>
      {children}

      <AnimatePresence>
        {phase !== "idle" && (
          <>
            {/* ── Panel 1: forest green (leads) ── */}
            <motion.div
              key="panel-forest"
              aria-hidden="true"
              className="fixed inset-0 z-[9999] bg-forest"
              initial={{ scaleX: 0 }}
              animate={phase === "in" ? { scaleX: 1 } : { scaleX: 0 }}
              exit={{ scaleX: 0 }}
              style={{ originX: phase === "in" ? 0 : 1 }}
              transition={
                phase === "in"
                  ? { duration: 0.42, ease: [0.76, 0, 0.24, 1] }
                  : { duration: 0.38, ease: [0.76, 0, 0.24, 1], delay: 0.04 }
              }
              onAnimationComplete={phase === "in" ? onInComplete : undefined}
            />

            {/* ── Panel 2: beige/cream (trails behind) ── */}
            <motion.div
              key="panel-beige"
              aria-hidden="true"
              className="fixed inset-0 z-[9998] bg-beige dark:bg-navy"
              initial={{ scaleX: 0 }}
              animate={phase === "in" ? { scaleX: 1 } : { scaleX: 0 }}
              style={{ originX: phase === "in" ? 0 : 1 }}
              transition={
                phase === "in"
                  ? { duration: 0.42, ease: [0.76, 0, 0.24, 1], delay: 0.07 }
                  : { duration: 0.38, ease: [0.76, 0, 0.24, 1] }
              }
              onAnimationComplete={phase === "out" ? onOutComplete : undefined}
            />
          </>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  )
}

/* ─────────────────────────────────────────────
   TransitionLink — drop-in replacement for <a>
───────────────────────────────────────────── */
export function TransitionLink({
  href,
  children,
  className,
  target,
  rel,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { trigger } = usePageTransition()
  const isExternal = href && !href.startsWith("#") && !href.startsWith("mailto:")

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isExternal || !href) return
    e.preventDefault()
    trigger(() => {
      window.open(href, target ?? "_blank", rel ? `rel=${rel}` : undefined)
    })
  }

  return (
    <a
      href={href}
      target={isExternal ? (target ?? "_blank") : target}
      rel={isExternal ? (rel ?? "noreferrer") : rel}
      className={className}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  )
}
