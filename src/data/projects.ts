export type Project = {
  id: string
  number: string
  title: string
  summary: string
  problem: string
  technologies: string[]
  github?: string
  live?: string
}

export const projects: Project[] = [
  {
    id: "smart-health",
    number: "01",
    title: "Smart-Health",
    summary:
      "An AI-powered healthcare coordination platform for clinics, pharmacies, labs, and district networks.",
    problem:
      "Care teams often split operations, inventory, and clinical work across disconnected tools. Smart-Health explores keeping those workflows in one place.",
    technologies: ["JavaScript", "Firebase", "AI/ML"],
    github: "https://github.com/praghnyau/Smart-Health",
  },
  {
    id: "token-evaluator",
    number: "02",
    title: "Token Evaluator",
    summary:
      "A Python tool for evaluating and analysing token usage in LLM interactions and agent sessions.",
    problem:
      "Understanding token consumption and cost across different LLM calls is tedious without tooling. Token Evaluator makes that visible and measurable.",
    technologies: ["Python", "LLMs", "Telemetry"],
    github: "https://github.com/praghnyau/Token_Evaluator",
  },
  {
    id: "music-controller",
    number: "03",
    title: "StageSync",
    summary: "A web-based music events app for submissions, scheduling, and host coordination.",
    problem:
      "Campus music events were coordinated by hand. This project centralises song submissions and performance order.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/praghnyau/Musicevents_application",
  },
  {
    id: "fifteen-puzzle",
    number: "04",
    title: "15 Puzzle",
    summary:
      "A classic 15-tile sliding puzzle game built and deployed as an interactive web app.",
    problem:
      "Sliding puzzles are a great way to explore algorithmic thinking and UI state management. This project brings the classic 15-puzzle to the browser with smooth interactions.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/praghnyau/15_puzzle",
    live: "https://praghnyau.github.io/15_puzzle/",
  },
]
