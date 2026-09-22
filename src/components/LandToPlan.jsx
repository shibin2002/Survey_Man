import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { landStages } from "../data/content"
import { useIsMobile } from "../hooks/useMedia"
import { ScrollTrigger } from "../lib/gsap"
import LandToPlanVisual from "./visuals/LandToPlanVisual"

export default function LandToPlan() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const progressRef = useRef(0)
  const [stage, setStage] = useState(0)
  const isMobile = useIsMobile()

  useGSAP(
    () => {
      if (isMobile) {
        progressRef.current = 1
        return
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=280%",
        pin: pinRef.current,
        scrub: true,
        onUpdate: (self) => {
          progressRef.current = self.progress
          setStage(Math.min(landStages.length - 1, Math.floor(self.progress * landStages.length)))
        },
      })
    },
    { scope: sectionRef, dependencies: [isMobile] },
  )

  return (
    <section ref={sectionRef} className="relative">
      <div ref={pinRef} className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 py-20 md:px-8">
        <h2 className="font-display text-4xl leading-[0.95] md:text-6xl">FROM LAND TO PLAN.</h2>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1fr_1.4fr]">
          <ol className="space-y-3">
            {landStages.map((item, i) => (
              <li
                key={item}
                className={`font-display text-xl uppercase transition-colors md:text-3xl ${
                  i === stage ? "text-accent" : "text-ink/25"
                }`}
              >
                {item}
              </li>
            ))}
          </ol>
          <div className="h-[46vh] overflow-hidden rounded-sm border border-line bg-bg-alt md:h-[60vh]">
            <LandToPlanVisual progressRef={progressRef} />
          </div>
        </div>
      </div>
    </section>
  )
}
