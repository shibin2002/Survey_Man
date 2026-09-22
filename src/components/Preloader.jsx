import { useEffect, useRef } from "react"
import { gsap } from "../lib/gsap"
import Logo from "./Logo"

export default function Preloader({ onDone }) {
  const wrapRef = useRef(null)
  const barRef = useRef(null)
  const numRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    const state = { n: 0 }
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, y: 16, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" },
    )

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(wrapRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          onComplete: onDone,
        })
      },
    })

    tl.to(state, {
      n: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = `${String(Math.round(state.n)).padStart(3, "0")}`
        if (barRef.current) barRef.current.style.width = `${state.n}%`
      },
    })

    return () => tl.kill()
  }, [onDone])

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-bg px-6"
    >
      <div ref={logoRef} className="flex flex-col items-center">
        <Logo className="h-16 w-auto max-w-[85vw] object-contain md:h-24" />
        <p className="font-mono mt-8 text-[11px] tracking-[0.28em] text-mute uppercase">
          Loading
        </p>
        <div className="mt-4 h-px w-56 bg-ink/10 md:w-72">
          <div ref={barRef} className="h-px w-0 bg-accent" />
        </div>
        <p ref={numRef} className="font-mono mt-3 text-xs tracking-[0.2em] text-mute">
          000
        </p>
      </div>
    </div>
  )
}
