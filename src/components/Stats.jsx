import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { stats } from "../data/content"
import { gsap } from "../lib/gsap"

export default function Stats() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const numbers = sectionRef.current.querySelectorAll("[data-count]")
      numbers.forEach((el) => {
        const target = Number(el.dataset.count)
        const obj = { n: 0 }
        gsap.to(obj, {
          n: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.n)}`
          },
        })
      })

      gsap.from(sectionRef.current.querySelectorAll("[data-stat]"), {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section className="relative overflow-hidden border-y border-line py-20 md:py-28">
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-60" />
      <div ref={sectionRef} className="relative mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 md:grid-cols-4 md:px-8">
        {stats.map((item) => (
          <div key={item.label} data-stat>
            <div className="font-display text-5xl leading-none md:text-7xl">
              <span data-count={item.value}>0</span>
              <span className="text-accent">{item.suffix}</span>
            </div>
            <p className="font-mono mt-3 text-[11px] tracking-[0.18em] text-mute uppercase">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
