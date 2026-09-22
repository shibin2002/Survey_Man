import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { company } from "../data/content"
import { scrollToId } from "../hooks/useLenis"
import { gsap } from "../lib/gsap"
import HeroCanvas from "./visuals/HeroCanvas"

export default function CTA() {
  const sectionRef = useRef(null)
  const progressRef = useRef(1)

  useGSAP(
    () => {
      gsap.from("[data-cta]", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.85,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-28 md:py-36">
      <HeroCanvas progressRef={progressRef} reduced />
      <div className="absolute inset-0 bg-bg/70" />
      <div className="relative mx-auto max-w-5xl px-5 text-center md:px-8">
        <h2 data-cta className="font-display text-5xl leading-[0.9] md:text-7xl lg:text-8xl">
          HAVE LAND TO SURVEY?
        </h2>
        <p data-cta className="mt-6 text-xl text-mute md:text-2xl">
          Let’s measure it right.
        </p>
        <div data-cta className="mt-10 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollToId("#contact")}
            className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-on-accent"
          >
            Get a Survey
          </button>
          <a
            href={`https://wa.me/${company.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line px-7 py-3 text-sm"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  )
}
