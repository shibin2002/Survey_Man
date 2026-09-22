import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { navLinks } from "../data/content"
import { scrollToId } from "../hooks/useLenis"
import Logo from "./Logo"

function getScrollY() {
  return window.__lenis?.scroll ?? window.scrollY ?? 0
}

export default function Navbar({ hidden = false }) {
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const onScroll = () => setCompact(getScrollY() > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    const lenis = window.__lenis
    lenis?.on("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      lenis?.off("scroll", onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const go = (href) => {
    setOpen(false)
    scrollToId(href)
  }

  const bar = (
    <>
      <header
        className={`pointer-events-none fixed z-[100] flex justify-center transition-all duration-500 ${
          hidden ? "pointer-events-none -translate-y-6 opacity-0" : "translate-y-0 opacity-100"
        } ${compact ? "inset-x-3 top-3 md:inset-x-4 md:top-4" : "inset-x-0 top-0"}`}
      >
        <div
          className={`pointer-events-auto w-full transition-all duration-300 ${
            compact
              ? "max-w-4xl rounded-full border border-line bg-bg/80 shadow-[0_8px_32px_rgba(31,33,31,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-bg/70"
              : "max-w-none rounded-none border border-transparent bg-transparent shadow-none backdrop-blur-none"
          }`}
        >
          <div
            className={`mx-auto flex w-full items-center justify-between transition-all duration-300 ${
              compact ? "h-16 max-w-4xl px-4 md:px-6" : "h-24 max-w-none px-6 md:h-28 md:px-10 lg:px-12"
            }`}
          >
            <button
              type="button"
              onClick={() => go("#home")}
              className="flex shrink-0 items-center"
              aria-label="Survey Man home"
            >
              <Logo className={`w-auto max-w-[62vw] object-contain transition-all duration-300 md:max-w-none ${compact ? "h-10 max-[429px]:h-12 md:h-14" : "h-14 max-[429px]:h-[68px] md:h-20 brightness-0 invert"}`} />
            </button>

            <nav className="hidden items-center gap-6 lg:flex">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => go(link.href)}
                  className={`font-mono text-[10px] tracking-[0.18em] uppercase transition-colors ${
                    compact ? "text-mute hover:text-ink" : "text-white hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go("#contact")}
                className="hidden rounded-full bg-accent px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-on-accent uppercase md:inline-flex"
              >
                Get a Survey
              </button>
              <button
                type="button"
                className={`flex h-9 w-9 items-center justify-center rounded-full border lg:hidden ${compact ? "border-line" : "border-white/30"}`}
                onClick={() => setOpen((v) => !v)}
                aria-label="Menu"
              >
                <span className="sr-only">Menu</span>
                <span className="flex w-4 flex-col gap-1">
                  <span className={`h-px transition ${compact ? "bg-ink" : "bg-white"} ${open ? "translate-y-[2.5px] rotate-45" : ""}`} />
                  <span className={`h-px transition ${compact ? "bg-ink" : "bg-white"} ${open ? "-translate-y-[2.5px] -rotate-45" : ""}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[99] bg-bg/95 px-6 pt-24 backdrop-blur-sm transition-all duration-400 lg:hidden ${
          hidden ? "pointer-events-none opacity-0" : open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => go(link.href)}
              className="font-display text-left text-4xl"
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => go("#contact")}
            className="mt-4 w-fit rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent"
          >
            Get a Survey
          </button>
        </div>
      </div>
    </>
  )

  if (typeof document === "undefined") return bar
  return createPortal(bar, document.body)
}
