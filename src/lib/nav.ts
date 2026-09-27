export function scrollToId(id: string) {
  const node = document.getElementById(id)
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  node?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
}

export const navLinks = [
  { id: "journey", label: "Journey" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const
