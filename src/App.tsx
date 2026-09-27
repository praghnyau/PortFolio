import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { Journey } from "./components/Journey"
import { Projects } from "./components/Projects"
import { About } from "./components/About"
import { Skills } from "./components/Skills"
import { Learning } from "./components/Learning"
import { Achievements } from "./components/Achievements"
import { Contact } from "./components/Contact"
import { Footer } from "./components/Footer"
import { Cursor } from "./components/Cursor"
import { ScrollProgress } from "./components/ScrollProgress"
import { PageTransitionProvider, IntroAnimation } from "./components/PageTransition"

export default function App() {
  return (
    <PageTransitionProvider>
    <div className="min-h-svh overflow-x-hidden bg-cream text-navy dark:bg-navy dark:text-cream">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 dark:focus:bg-navy"
      >
        Skip to content
      </a>
      <IntroAnimation />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <Journey />
        <Projects />
        <About />
        <Skills />
        <Learning />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
    </PageTransitionProvider>
  )
}
