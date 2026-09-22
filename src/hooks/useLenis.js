import { useEffect } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "../lib/gsap"

export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.1,
    })

    lenis.on("scroll", ScrollTrigger.update)

    const update = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    window.__lenis = lenis
    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
      window.__lenis = null
    }
  }, [enabled])
}

export function scrollToId(id) {
  const target = document.querySelector(id)
  if (!target) return
  if (window.__lenis) {
    window.__lenis.scrollTo(target, { offset: -80 })
    return
  }
  target.scrollIntoView({ behavior: "smooth" })
}
