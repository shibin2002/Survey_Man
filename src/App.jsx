import { useCallback, useState } from "react"
import { useLenis } from "./hooks/useLenis"
import { usePrefersReducedMotion } from "./hooks/useMedia"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import WhySurveyMan from "./components/WhySurveyMan"
import Stats from "./components/Stats"
import Services from "./components/Services"
import SurveyProcess from "./components/SurveyProcess"
import LandToPlan from "./components/LandToPlan"
import Training from "./components/Training"
import Testimonials from "./components/Testimonials"
import CTA from "./components/CTA"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Preloader from "./components/Preloader"

export default function App() {
  const reduced = usePrefersReducedMotion()
  const [ready, setReady] = useState(reduced)
  useLenis(ready && !reduced)

  const onDone = useCallback(() => setReady(true), [])

  return (
    <div className="bg-bg text-ink">
      {!ready && <Preloader onDone={onDone} />}
      <Navbar hidden={!ready} />
      <main>
        <Hero />
        <WhySurveyMan />
        <Stats />
        <Services />
        <SurveyProcess />
        <LandToPlan />
        <Training />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
