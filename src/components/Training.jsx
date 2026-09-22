import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { trainingPoints } from "../data/content"
import { scrollToId } from "../hooks/useLenis"
import { gsap } from "../lib/gsap"


export default function Training() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from("[data-train]", {
        y: 36,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="training" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2
          data-train
          className="font-display max-w-none text-2xl leading-[0.95] tracking-tight md:text-4xl lg:whitespace-nowrap lg:text-[clamp(28px,3.9vw,48px)]"
        >
          LEARN THE FIELD. MASTER THE TECHNOLOGY.
        </h2>
      </div>
      <div className="mx-auto mt-10 grid max-w-6xl items-center gap-10 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <p data-train className="max-w-xl text-mute">
            Along with professional services, Survey Man provides practical training for students and beginners
            who want to build a career in land surveying. The programme is hands-on, field-based, and designed
            for real industry work.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {trainingPoints.map((item) => (
              <li
                key={item}
                data-train
                className="border border-line px-4 py-4 font-display text-lg uppercase"
              >
                {item}
              </li>
            ))}
          </ul>
          <p data-train className="mt-6 text-sm text-mute">
            Learn from professionals. Practice with real equipment. Understand how fieldwork actually happens.
          </p>
          <button
            data-train
            type="button"
            onClick={() => scrollToId("#contact")}
            className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent"
          >
            Explore Training
          </button>
        </div>
        <div className="h-[48vh] overflow-hidden rounded-sm border border-line bg-bg-alt">
          <img
            src="/training-surveyor.jpg"
            alt="Surveyor with total station on road - Training"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
