import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { processSteps } from "../data/content"
import { gsap, ScrollTrigger } from "../lib/gsap"

export default function SurveyProcess() {
  const sectionRef = useRef(null)
  const pathRef = useRef(null)

  useGSAP(
    () => {
      const path = pathRef.current
      if (path) {
        const length = path.getTotalLength()
        path.style.strokeDasharray = `${length}`
        path.style.strokeDashoffset = `${length}`
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: true,
          },
        })
      }

      gsap.from("[data-step]", {
        x: -30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      })

      ScrollTrigger.refresh()
    },
    { scope: sectionRef },
  )

  return (
    <section className="relative py-24 md:py-32">
      <div ref={sectionRef} className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="font-display max-w-3xl text-4xl leading-[0.95] md:text-6xl">
          FROM FIELD DATA TO FINAL DECISION.
        </h2>

        <div className="relative mt-16 grid gap-10 lg:grid-cols-[80px_1fr]">
          <div className="relative hidden lg:block">
            <svg className="absolute top-2 left-6 h-[92%] w-8" viewBox="0 0 20 800" fill="none" aria-hidden="true">
              <path
                ref={pathRef}
                d="M10 0 V800"
                stroke="#2F5BD8"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div className="space-y-10">
            {processSteps.map((step) => (
              <article key={step.id} data-step className="grid gap-3 border-t border-line pt-8 md:grid-cols-[140px_1fr] md:items-start">
                <p className="font-mono text-sm tracking-[0.2em] text-accent">
                  {step.id} —
                </p>
                <div>
                  <h3 className="font-display text-3xl uppercase md:text-4xl">{step.title}</h3>
                  <p className="mt-3 max-w-xl text-mute">{step.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
