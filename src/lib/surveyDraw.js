function mulberry32(seed) {
  let a = seed
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function heightAt(x, y) {
  return (
    Math.sin(x * 0.018) * Math.cos(y * 0.014) * 0.55 +
    Math.sin(x * 0.009 + y * 0.011) * 0.28 +
    Math.cos((x + y) * 0.007) * 0.17
  )
}

export function createField(count = 90, seed = 42) {
  const rand = mulberry32(seed)
  const points = []
  for (let i = 0; i < count; i += 1) {
    const angle = rand() * Math.PI * 2
    const radius = 0.18 + rand() * 0.34 + (rand() > 0.82 ? rand() * 0.16 : 0)
    const cx = 0.5 + Math.cos(angle) * radius * (0.85 + rand() * 0.3)
    const cy = 0.5 + Math.sin(angle) * radius * 0.72
    points.push({
      x: Math.min(0.92, Math.max(0.08, cx)),
      y: Math.min(0.9, Math.max(0.1, cy)),
      r: 1 + rand() * 1.6,
    })
  }
  return points
}

export function nearestLinks(points, maxDist = 0.16, maxLinks = 3) {
  const links = []
  points.forEach((p, i) => {
    const near = points
      .map((q, j) => ({ j, d: Math.hypot(p.x - q.x, p.y - q.y) }))
      .filter((n) => n.j !== i && n.d < maxDist)
      .sort((a, b) => a.d - b.d)
      .slice(0, maxLinks)
    near.forEach((n) => {
      if (n.j > i) links.push([i, n.j])
    })
  })
  return links
}

function landBoundary(cx, cy, rx, ry, steps = 18) {
  const pts = []
  for (let i = 0; i < steps; i += 1) {
    const t = (i / steps) * Math.PI * 2
    const wobble = 0.82 + Math.sin(t * 2.2) * 0.1 + Math.cos(t * 3.1) * 0.08
    pts.push({
      x: cx + Math.cos(t) * rx * wobble,
      y: cy + Math.sin(t) * ry * wobble,
    })
  }
  return pts
}

export function drawGrid(ctx, w, h, alpha = 0.12, step = 56) {
  ctx.save()
  ctx.strokeStyle = `rgba(31,33,31,${alpha})`
  ctx.lineWidth = 1
  for (let x = 0; x <= w; x += step) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, h)
    ctx.stroke()
  }
  for (let y = 0; y <= h; y += step) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    ctx.stroke()
  }
  ctx.restore()
}

export function drawContours(ctx, w, h, progress = 1, color = "rgba(47,91,216,0.45)") {
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  const levels = [-0.6, -0.35, -0.1, 0.12, 0.36, 0.58]
  const res = 18
  levels.forEach((level, li) => {
    if (progress < li / levels.length) return
    const local = Math.min(1, (progress - li / levels.length) * levels.length)
    ctx.globalAlpha = 0.35 + local * 0.45
    for (let y = 0; y < h; y += res) {
      ctx.beginPath()
      let started = false
      for (let x = 0; x < w * local; x += 6) {
        const n = heightAt(x, y + li * 8)
        const yy = y + n * 26
        if (!started) {
          ctx.moveTo(x, yy)
          started = true
        } else {
          ctx.lineTo(x, yy)
        }
      }
      ctx.stroke()
    }
  })
  ctx.restore()
}

export function drawParcel(ctx, w, h, progress = 1) {
  const pts = landBoundary(w * 0.5, h * 0.5, w * 0.28, h * 0.26, 16)
  const count = Math.max(2, Math.floor(pts.length * progress))
  ctx.save()
  ctx.strokeStyle = "rgba(47,91,216,0.8)"
  ctx.lineWidth = 1.4
  ctx.beginPath()
  pts.slice(0, count).forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y)
    else ctx.lineTo(p.x, p.y)
  })
  if (progress > 0.96) ctx.closePath()
  ctx.stroke()
  ctx.restore()
  return pts
}


