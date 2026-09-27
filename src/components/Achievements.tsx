import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { achievements } from "../data/skills"
import { FadeIn, SectionHeading } from "./SectionHeading"

const categoryColor: Record<string, string> = {
  Participation:
    "bg-forest/10 text-forest border border-forest/20 dark:bg-forest/20 dark:text-beige dark:border-forest/30",
  Certifications:
    "bg-sky/20 text-navy border border-sky/30 dark:bg-sky/10 dark:text-sky dark:border-sky/20",
  Learning:
    "bg-beige/60 text-navy border border-beige dark:bg-navy/40 dark:text-cream/70 dark:border-cream/10",
}

type ModalItem = { image: string; title: string }

function CertificateModal({ item, onClose }: { item: ModalItem; onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        {/* Blurred backdrop */}
        <div className="absolute inset-0 bg-navy/70 backdrop-blur-md dark:bg-navy/85" />

        {/* Modal panel */}
        <motion.div
          key="panel"
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl bg-cream shadow-[0_32px_80px_-24px_rgba(23,32,42,0.65)] dark:bg-navy"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-navy/8 px-5 py-4 dark:border-cream/10">
            <p className="font-medium text-navy dark:text-cream text-sm">{item.title}</p>
            <button
              onClick={onClose}
              aria-label="Close certificate viewer"
              className="flex h-8 w-8 items-center justify-center rounded-full text-navy/50 transition hover:bg-navy/8 hover:text-navy dark:text-cream/50 dark:hover:bg-cream/8 dark:hover:text-cream"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Certificate image */}
          <div className="bg-beige/20 dark:bg-navy/60 p-4 md:p-6">
            <img
              src={item.image}
              alt={`${item.title} certificate`}
              className="w-full rounded-xl shadow-[0_8px_32px_-12px_rgba(23,32,42,0.3)]"
            />
          </div>

          {/* Footer hint */}
          <div className="px-5 py-3 text-center">
            <p className="text-xs text-navy/40 dark:text-cream/40">Press Esc or click outside to close</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function Achievements() {
  const [modal, setModal] = useState<ModalItem | null>(null)
  const openModal = useCallback((item: ModalItem) => setModal(item), [])
  const closeModal = useCallback(() => setModal(null), [])

  return (
    <>
      <section id="milestones" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading kicker="Markers" title="Certifications & participations" />
          <div className="flex snap-x gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
            {achievements.map((item, index) => {
              const badgeClass =
                categoryColor[item.category] ??
                "bg-beige/60 text-navy border border-beige dark:bg-navy/40 dark:text-cream/70"

              const Card = (
                <article className="group h-full overflow-hidden rounded-2xl border border-navy/8 bg-cream/60 p-5 transition hover:-translate-y-1 dark:border-cream/10 dark:bg-navy/40">
                  {item.image ? (
                    <div className="mb-4 overflow-hidden rounded-xl border border-navy/8 bg-cream dark:border-cream/10">
                      <img
                        src={item.image}
                        alt={`${item.title} certificate`}
                        className="aspect-[4/3] w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : null}
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold tracking-wider uppercase ${badgeClass}`}
                    >
                      {item.category}
                    </span>
                    <p className="text-xs text-navy/45 dark:text-cream/45">{item.year}</p>
                  </div>
                  <h3 className="mt-3 font-medium text-navy dark:text-cream">{item.title}</h3>
                  <p className="mt-2 text-sm text-navy/65 dark:text-cream/65">{item.detail}</p>
                  {item.image ? (
                    <p className="kicker mt-4 text-[0.68rem] text-navy/40 transition group-hover:text-navy dark:text-cream/40 dark:group-hover:text-cream">
                      Click to view →
                    </p>
                  ) : null}
                </article>
              )

              return (
                <FadeIn key={item.title} className="min-w-[260px] snap-start md:min-w-0" delay={index * 0.05}>
                  {item.image ? (
                    <button
                      type="button"
                      className="block h-full w-full text-left"
                      onClick={() => openModal({ image: item.image!, title: item.title })}
                    >
                      {Card}
                    </button>
                  ) : (
                    Card
                  )}
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Lightbox modal rendered at root level */}
      {modal && <CertificateModal item={modal} onClose={closeModal} />}
    </>
  )
}
