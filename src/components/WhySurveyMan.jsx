import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { company, reasons } from "../data/content"
import { gsap } from "../lib/gsap"

export default function WhySurveyMan() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const items = sectionRef.current.querySelectorAll("[data-why]")
      items.forEach((item) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="about" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="font-display text-4xl md:text-6xl">WHY SURVEY MAN?</h2>
        <p className="mt-5 max-w-2xl text-mute">
          {company.tagline} Trusted since {company.since}, Survey Man delivers accurate land surveys that help
          clients avoid costly mistakes and make confident decisions.
        </p>

        <div className="mt-16 space-y-2">
          {reasons.map((item) => (
            <article
              key={item.id}
              data-why
              className="group grid gap-3 border-t border-line py-8 md:grid-cols-[120px_1fr_1.2fr] md:items-center"
            >
              <p className="font-mono text-accent">{item.id} —</p>
              <h3 className="font-display text-3xl uppercase transition-colors group-hover:text-accent md:text-5xl">
                {item.title}
              </h3>
              <p className="text-mute">{item.copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-8 border-t border-line pt-10 md:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">Vision</p>
            <p className="mt-3 text-lg">{company.vision}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">Mission</p>
            <p className="mt-3 text-lg">{company.mission}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
