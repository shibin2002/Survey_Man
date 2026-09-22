import { useEffect, useRef, useState } from "react"
import { testimonials } from "../data/content"

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const viewportRef = useRef(null)
  const [cardW, setCardW] = useState(396)
  const [viewportW, setViewportW] = useState(0)

  // measure card width + gap and viewport width for centering
  useEffect(() => {
    const measure = () => {
      const vw = window.innerWidth
      const w = vw < 768 ? Math.min(vw * 0.82, 384) + 16 : 380 + 16
      setCardW(w)
      if (viewportRef.current) setViewportW(viewportRef.current.clientWidth)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  // auto-scroll faster
  useEffect(() => {
    if (paused) return undefined
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 1800)
    return () => clearInterval(id)
  }, [paused])

  const go = (i) => {
    setPaused(true)
    setIndex(((i % testimonials.length) + testimonials.length) % testimonials.length)
  }

  const next = () => go(index + 1)

  if (!testimonials.length) return null

  const boxW = cardW - 16
  const centerPad = viewportW ? (viewportW - boxW) / 2 : 0
  // centered offset: selected card centered in viewport
  const offset = index * cardW - centerPad

  return (
    <section className="relative border-y border-line py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="font-display text-center text-3xl md:text-5xl">WHAT CLIENTS SAY</h2>

        <div
          ref={viewportRef}
          className="relative mt-10 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bg to-transparent md:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bg to-transparent md:w-20" />

          <div
            className="flex w-max gap-4 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {[...testimonials, ...testimonials].map((t, i) => {
              const realIndex = i % testimonials.length
              const active = realIndex === index
              return (
                <button
                  key={`${t.name}-${i}`}
                  type="button"
                  onClick={() => go(realIndex)}
                  className={`flex w-[82vw] max-w-sm shrink-0 flex-col justify-between border p-6 text-left transition md:w-[380px] md:p-7 ${
                    active ? "border-accent bg-bg-alt shadow-[0_8px_24px_rgba(0,0,0,0.2)]" : "border-line bg-bg-alt hover:border-ink/20"
                  }`}
                >
                  <p className="text-[15px] leading-relaxed text-ink/90">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 border-t border-line pt-4">
                    <p className="font-mono text-[11px] tracking-[0.14em] text-ink uppercase">{t.name}</p>
                    <p className="mt-1 text-xs tracking-[0.08em] text-mute uppercase">{t.location}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="flex gap-1.5">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-accent" : "w-1.5 bg-line"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg text-mute transition hover:border-ink hover:text-ink"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}
