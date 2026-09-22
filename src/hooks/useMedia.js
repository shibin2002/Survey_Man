import { useEffect, useState } from "react"

export function useMedia(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  )

  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setMatches(media.matches)
    onChange()
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [query])

  return matches
}

export function useIsMobile() {
  return useMedia("(max-width: 767px)")
}

export function usePrefersReducedMotion() {
  return useMedia("(prefers-reduced-motion: reduce)")
}
