import { useState, useRef, useEffect } from "react"
import { hotels } from "../../data/hotels"
import { menuItems } from "../../data/taomnoma"
import { takliflar } from "../../data/takliflar"
import "./StatsBar.css"

function useScrollReveal(threshold = 0.4) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, visible]
}

function AnimatedCounter({ target, suffix = "" }) {
  const [ref, visible] = useScrollReveal(0.5)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!visible) return
    let start = 0
    const duration = 1500
    const step = 16
    const totalSteps = duration / step
    const increment = target / totalSteps
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, step)
    return () => clearInterval(timer)
  }, [visible, target])

  return <span ref={ref}>{count}{suffix}</span>
}

function StatItem({ icon, target, label, suffix = "" }) {
  const [ref, visible] = useScrollReveal(0.4)
  return (
    <div ref={ref} className={`sb-stat-item ${visible ? "visible" : ""}`}>
      <div className="sb-stat-icon">{icon}</div>
      <div className="sb-stat-num">
        <AnimatedCounter target={target} suffix={suffix} />
      </div>
      <div className="sb-stat-label">{label}</div>
    </div>
  )
}

const hotelCount = hotels.length
const variantCount = menuItems.reduce((s, item) => s + (item.variants?.length || 0), 0)
const cityCount = [...new Set(hotels.map(h => h.location?.split(",")[0]?.trim()).filter(Boolean))].length
const offerCount = takliflar.length
const roomCount = hotels.reduce((s, h) => s + (h.rooms || 0), 0)

const stats = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m16-11v11M8 14v.01M12 14v.01M16 14v.01M12 18v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    target: hotelCount,
    suffix: "+",
    label: "Mehmonxonalar"
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    target: variantCount,
    suffix: "+",
    label: "Milliy taomlar"
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    target: roomCount,
    suffix: "+",
    label: "Qulay xonalar"
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    target: cityCount,
    suffix: "+",
    label: "Shaharlar"
  }
]

export default function StatsBar() {
  return (
    <section className="sb-bar">
      {stats.map((s, i) => (
        <StatItem key={i} {...s} />
      ))}
    </section>
  )
}
