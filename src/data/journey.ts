export type JourneyKind = "skills" | "projects" | "here" | "next"

export type JourneyMilestone = {
  id: string
  number: string
  year: string
  title: string
  subtitle: string
  kind: JourneyKind
  items?: string[]
  body?: string
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: "beginning",
    number: "01",
    year: "2025",
    title: "The beginning",
    subtitle: "Learning the fundamentals",
    kind: "skills",
    items: ["C", "Programming fundamentals", "Data structures", "Problem solving"],
  },
  {
    id: "learning",
    number: "02",
    year: "2026",
    title: "Learning to build",
    subtitle: "Expanding the toolkit",
    kind: "skills",
    items: ["Python", "Java", "SQL", "HTML", "CSS", "Git"],
  },
  {
    id: "exploring-ai",
    number: "03",
    year: "2026",
    title: "Exploring AI",
    subtitle: "Moving deeper into intelligent systems",
    kind: "skills",
    items: ["AI/ML", "LLMs", "RAG", "LangChain", "FAISS"],
  },
  {
    id: "building",
    number: "04",
    year: "2026",
    title: "Building real projects",
    subtitle: "Destinations along the path",
    kind: "projects",
    body: "Selected work lives just ahead — the places where learning turned into something tangible.",
  },
  {
    id: "current",
    number: "05",
    year: "Now",
    title: "Current position",
    subtitle: "You are here",
    kind: "here",
    body: "Currently exploring AI, software engineering, and better ways to turn ideas into useful products.",
  },
  {
    id: "next",
    number: "06",
    year: "Ahead",
    title: "What's next?",
    subtitle: "Next destination",
    kind: "next",
    body: "More things to build. More problems to solve. More things to learn.",
  },
]
