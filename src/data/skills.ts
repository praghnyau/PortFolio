export type SkillGroup = {
  category: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    items: ["C", "Python", "Java", "SQL"],
  },
  {
    category: "Web",
    items: ["HTML", "CSS", "JavaScript"],
  },
  {
    category: "AI / ML",
    items: ["AI/ML", "LLMs", "RAG", "LangChain", "FAISS"],
  },
  {
    category: "Development",
    items: ["Git", "VS Code", "Android Studio"],
  },
  {
    category: "Backend / Data",
    items: ["Elixir", "Phoenix", "PostgreSQL", "Supabase"],
  },
]

export const learningTracks = [
  {
    number: "01",
    title: "AI / ML",
    detail: "Exploring intelligent systems and practical AI.",
  },
  {
    number: "02",
    title: "Software engineering",
    detail: "Building cleaner and more reliable applications.",
  },
  {
    number: "03",
    title: "Systems & backend",
    detail: "Understanding how applications work beyond the UI.",
  },
]

export type Achievement = {
  category: string
  title: string
  detail: string
  year: string
  image?: string
  href?: string
  placeholder?: boolean
}

const certificatesBase = `${import.meta.env.BASE_URL}certificates/`

export const achievements: Achievement[] = [
  // Sep 2026
  {
    category: "Certifications",
    title: "Oracle Certified Foundations Associate",
    detail: "Oracle Cloud Infrastructure Certified AI Foundations Associate.",
    year: "Sep 2026",
    image: `${certificatesBase}oracle-ai-foundations.png`,
    href: `${certificatesBase}oracle-ai-foundations.png`,
  },
  {
    category: "Certifications",
    title: "SQL (Basic)",
    detail: "HackerRank skill certification, earned 25 Sep 2026.",
    year: "Sep 2026",
    image: `${certificatesBase}sql-basic.png`,
    href: `${certificatesBase}sql-basic.pdf`,
  },
  // Aug 2026
  {
    category: "Participation",
    title: "Google Cloud Gen AI Academy APAC 2026",
    detail:
      "Cohort 2 Hackathon powered by Hack2skill — applied Generative AI & Google Cloud technologies to build innovative solutions for real-world challenges.",
    year: "Aug 2026",
    image: `${certificatesBase}google-cloud-genai-academy.png`,
    href: `${certificatesBase}google-cloud-genai-academy.png`,
  },
  // Jul 2026
  {
    category: "Participation",
    title: "QuizOff 2026 — India's Biggest AI Quiz",
    detail:
      "Competed among 5,25,000+ students from 48,500+ institutions across the globe on Unstop, organised by CampusCrew.",
    year: "Jul 2026",
    image: `${certificatesBase}quizoff-2026.png`,
    href: `${certificatesBase}quizoff-2026.png`,
  },
  {
    category: "Certifications",
    title: "Python (Basic)",
    detail: "HackerRank skill certification, earned 21 Jul 2026.",
    year: "Jul 2026",
    image: `${certificatesBase}python-basic.png`,
    href: `${certificatesBase}python-basic.pdf`,
  },
  // 2025
  {
    category: "Learning",
    title: "Started the path in earnest",
    detail: "Fundamentals, then tooling, then projects that other people can use.",
    year: "2025",
  },
]
