import { useEffect, useRef } from "react"
import {
  createField,
  drawContours,
  drawGrid,
  drawParcel,
  nearestLinks,
} from "../../lib/surveyDraw"

export default function HeroCanvas({ progressRef, reduced = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext("2d", { alpha: true })
    const points = createField(reduced ? 48 : 92, 71)
    const links = nearestLinks(points, 0.17, 3)
    let raf
    let visible = true

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize)

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    observer.observe(canvas)

    const draw = (time) => {
      if (!visible) {
        raf = requestAnimationFrame(draw)
        return
      }
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const p = progressRef?.current ?? 1
      const idle = Math.max(0, p - 0.92) / 0.08
      const zoom = 1.18 - Math.min(1, Math.max(0, (p - 0.72) / 0.22)) * 0.18
      const drift = Math.sin(time * 0.00018) * 8 * idle

      ctx.clearRect(0, 0, w, h)
      ctx.save()
      ctx.translate(w / 2 + drift, h / 2)
      ctx.scale(zoom, zoom)
      ctx.translate(-w / 2, -h / 2)

      const pointProg = Math.min(1, p / 0.18)
      const linkProg = Math.min(1, Math.max(0, (p - 0.14) / 0.18))
      const gridProg = Math.min(1, Math.max(0, (p - 0.28) / 0.16))
      const contourProg = Math.min(1, Math.max(0, (p - 0.42) / 0.2))
      const boundaryProg = Math.min(1, Math.max(0, (p - 0.6) / 0.18))

      if (gridProg > 0) drawGrid(ctx, w, h, 0.045 * gridProg, 64)

      if (linkProg > 0) {
        const shown = Math.floor(links.length * linkProg)
        ctx.strokeStyle = "rgba(61,107,102,0.35)"
        ctx.lineWidth = 1
        links.slice(0, shown).forEach(([a, b]) => {
          ctx.beginPath()
          ctx.moveTo(points[a].x * w, points[a].y * h)
          ctx.lineTo(points[b].x * w, points[b].y * h)
          ctx.stroke()
        })
      }

      if (contourProg > 0) {
        drawContours(ctx, w, h, contourProg, "rgba(47,91,216,0.32)")
      }

      if (boundaryProg > 0) {
        const parcel = drawParcel(ctx, w, h, boundaryProg)
        if (boundaryProg > 0.7) {
          ctx.fillStyle = "rgba(47,91,216,0.06)"
          ctx.beginPath()
          parcel.forEach((pt, i) => {
            if (i === 0) ctx.moveTo(pt.x, pt.y)
            else ctx.lineTo(pt.x, pt.y)
          })
          ctx.closePath()
          ctx.fill()
        }
      }

      const shownPoints = Math.floor(points.length * pointProg)
      points.slice(0, shownPoints).forEach((pt, i) => {
        const pulse = 0.7 + Math.sin(time * 0.002 + i) * 0.3 * idle
        ctx.beginPath()
        ctx.fillStyle = i % 7 === 0 ? "rgba(47,91,216,0.95)" : "rgba(31,33,31,0.55)"
        ctx.arc(pt.x * w, pt.y * h, pt.r * pulse, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.restore()

      ctx.font = "11px 'IBM Plex Mono', monospace"
      ctx.fillStyle = "rgba(95,101,98,0.7)"
      ctx.fillText("COORD  /  GRID  /  CONTOUR", 24, h - 24)
      ctx.fillText("SURVEY MAN  ·  FIELD MODEL", Math.max(24, w - 240), h - 24)

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      observer.disconnect()
    }
  }, [progressRef, reduced])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
