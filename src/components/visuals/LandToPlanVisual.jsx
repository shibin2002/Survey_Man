import { useEffect, useRef } from "react"
import {
  createField,
  drawContours,
  drawGrid,
  drawParcel,
  nearestLinks,
} from "../../lib/surveyDraw"

export default function LandToPlanVisual({ progressRef }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext("2d")
    const points = createField(70, 19)
    const links = nearestLinks(points, 0.18, 3)
    let raf
    let visible = true

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
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

    const draw = () => {
      if (!visible) {
        raf = requestAnimationFrame(draw)
        return
      }
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const p = progressRef?.current ?? 0
      ctx.clearRect(0, 0, w, h)

      const land = 1 - Math.min(1, p / 0.16)
      const pts = Math.min(1, Math.max(0, (p - 0.1) / 0.16))
      const bounds = Math.min(1, Math.max(0, (p - 0.26) / 0.16))
      const topo = Math.min(1, Math.max(0, (p - 0.42) / 0.16))
      const cad = Math.min(1, Math.max(0, (p - 0.58) / 0.16))
      const plan = Math.min(1, Math.max(0, (p - 0.74) / 0.2))

      const g = ctx.createRadialGradient(w * 0.5, h * 0.55, 20, w * 0.5, h * 0.5, w * 0.5)
      g.addColorStop(0, `rgba(160, 166, 158,${0.45 * land})`)
      g.addColorStop(1, "rgba(232,233,232,0)")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      if (topo > 0) drawContours(ctx, w, h, topo)
      if (bounds > 0.05 || cad > 0) drawParcel(ctx, w, h, Math.max(bounds, cad))
      if (cad > 0.2) drawGrid(ctx, w, h, 0.08 * cad, 40)

      if (pts > 0) {
        const shown = Math.floor(points.length * pts)
        ctx.fillStyle = "rgba(47,91,216,0.9)"
        points.slice(0, shown).forEach((pt) => {
          ctx.beginPath()
          ctx.arc(pt.x * w, pt.y * h, 2.2, 0, Math.PI * 2)
          ctx.fill()
        })
        if (bounds > 0) {
          ctx.strokeStyle = "rgba(61,107,102,0.35)"
          links.slice(0, Math.floor(links.length * bounds)).forEach(([a, b]) => {
            ctx.beginPath()
            ctx.moveTo(points[a].x * w, points[a].y * h)
            ctx.lineTo(points[b].x * w, points[b].y * h)
            ctx.stroke()
          })
        }
      }

      if (plan > 0) {
        ctx.save()
        ctx.globalAlpha = plan
        ctx.strokeStyle = "rgba(47,91,216,0.85)"
        ctx.strokeRect(w * 0.34, h * 0.38, w * 0.14, h * 0.16)
        ctx.strokeRect(w * 0.5, h * 0.34, w * 0.18, h * 0.22)
        ctx.beginPath()
        ctx.moveTo(w * 0.28, h * 0.7)
        ctx.lineTo(w * 0.72, h * 0.7)
        ctx.stroke()
        ctx.restore()
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      observer.disconnect()
    }
  }, [progressRef])

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
}
