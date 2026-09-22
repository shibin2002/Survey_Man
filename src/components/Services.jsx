import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { AnimatePresence, motion } from "framer-motion"
import { services } from "../data/content"
import { useIsMobile } from "../hooks/useMedia"
import { ScrollTrigger } from "../lib/gsap"

const serviceImages = [
  "/service-01.jpg",
  "/service-02.jpg",
  "/service-03.jpg",
  "/service-04.jpg",
  "/service-05.jpg",
  "/service-06.jpg",
  "/service-07.jpg",
  "/service-08.jpg",
]

export default function Services() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const [active, setActive] = useState(0)
  const isMobile = useIsMobile()

  useGSAP(
    () => {
      if (isMobile) return undefined

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${services.length * 70}%`,
        pin: pinRef.current,
        scrub: true,
        onUpdate: (self) => {
          const index = Math.min(
            services.length - 1,
            Math.floor(self.progress * services.length),
          )
          setActive(index)
        },
      })
    },
    { scope: sectionRef, dependencies: [isMobile] },
  )

  const current = services[active]

  return (
    <section id="services" ref={sectionRef} className="relative">
      <div
        ref={pinRef}
        className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 py-20 md:px-8 lg:flex-row lg:items-center lg:gap-16"
      >
        <div className="lg:w-[46%]">
          <h2 className="font-display text-4xl leading-[0.95] md:text-6xl">
            SURVEYING, MEASURED WITH PRECISION.
          </h2>

          {isMobile ? (
            <div className="mt-12 space-y-10">
              {services.map((service, i) => (
                <article key={service.id} className="overflow-hidden rounded-sm border border-line bg-bg-alt">
                  <img src={serviceImages[i]} alt={service.name} className="h-56 w-full object-cover" loading="lazy" />
                  <div className="p-6">
                    <p className="font-mono text-accent">{service.id}</p>
                    <h3 className="font-display mt-2 text-2xl uppercase">{service.name}</h3>
                    <p className="mt-3 text-mute">{service.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-12 min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-mono text-5xl text-accent">{current.id}</p>
                  <h3 className="font-display mt-3 text-4xl uppercase">{current.name}</h3>
                  <p className="mt-4 max-w-md text-lg text-mute">{current.copy}</p>
                </motion.div>
              </AnimatePresence>
              <div className="mt-10 flex gap-2">
                {services.map((service, i) => (
                  <span
                    key={service.id}
                    className={`h-px w-8 transition-colors ${i === active ? "bg-accent" : "bg-ink/15"}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {!isMobile && (
          <div className="relative mt-12 h-[52vh] overflow-hidden rounded-sm border border-line bg-bg-alt lg:mt-0 lg:h-[62vh] lg:w-[54%]">
            <img src={serviceImages[active]} alt={current.name} className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4">
              <p className="font-mono text-[10px] tracking-[0.18em] text-white/80 uppercase">{current.name}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
