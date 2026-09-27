import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

export function Cursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  // Dot follows mouse instantly
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // Ring follows with a spring lag
  const ringX = useSpring(x, { stiffness: 520, damping: 28, mass: 0.15 })
  const ringY = useSpring(y, { stiffness: 520, damping: 28, mass: 0.15 })

  // Only enable on true pointer devices (not touch)
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)")
    const hover = window.matchMedia("(hover: hover)")
    const sync = () => {
      const on = fine.matches && hover.matches && !reduce
      setEnabled(on)
      document.documentElement.classList.toggle("has-custom-cursor", on)
    }
    sync()
    fine.addEventListener("change", sync)
    hover.addEventListener("change", sync)
    return () => {
      fine.removeEventListener("change", sync)
      hover.removeEventListener("change", sync)
      document.documentElement.classList.remove("has-custom-cursor")
    }
  }, [reduce])

  useEffect(() => {
    if (!enabled) return

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const over = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null
      setHovering(Boolean(el?.closest("a, button, [data-cursor], summary")))
    }
    const leave = () => setVisible(false)

    window.addEventListener("pointermove", move)
    window.addEventListener("pointerover", over)
    document.documentElement.addEventListener("mouseleave", leave)
    return () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerover", over)
      document.documentElement.removeEventListener("mouseleave", leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      {/* ── Sonar pulse rings — emanate continuously from the dot ── */}
      {[0, 0.6].map((delay) => (
        <motion.div
          key={delay}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[9996]"
          style={{ x, y, translateX: "-50%", translateY: "-50%" }}
          animate={{ opacity: visible && !hovering ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.span
            className="block rounded-full border border-forest/50 dark:border-beige/40"
            animate={
              visible && !hovering
                ? { width: [8, 42], height: [8, 42], opacity: [0.7, 0] }
                : { width: 8, height: 8, opacity: 0 }
            }
            transition={{
              duration: 1.4,
              delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.div>
      ))}

      {/* ── Dot — sits exactly on the pointer ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.12 }}
      >
        <motion.span
          className="block rounded-full bg-forest dark:bg-beige"
          animate={{
            width:  hovering ? 6 : 8,
            height: hovering ? 6 : 8,
            scale:  hovering ? 0.7 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* ── Trailing ring — spring-lagged, grows on hover ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          width:  hovering ? 44 : 26,
          height: hovering ? 44 : 26,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <span className="block h-full w-full rounded-full border-[1.5px] border-forest/60 dark:border-beige/60" />
      </motion.div>
    </>
  )
}
