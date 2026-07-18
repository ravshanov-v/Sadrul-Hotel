import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { hotels } from "../../data/hotels"
import { menuItems } from "../../data/taomnoma"
import { takliflar } from "../../data/takliflar"
import { useProphile } from "../../components/Prophile/useProphile"
import Prophile from "../../components/Prophile/Prophile"
import Nav from "../../components/Navbar/Nav.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import Modal from "../../components/SmallWindows/Modal/Modal.jsx"
import SignUpModal from "../../components/SmallWindows/Modal/SignUpModal.jsx"
import {
  BsStar, BsHeart, BsCalendarCheck, BsArrowRight,
  BsBuilding, BsPeople, BsGlobe,
  BsCheckCircle, BsTag, BsCupHot, BsMap,
  BsChatDots
} from 'react-icons/bs'
import "./Dashboard.css"

const uniqueCities = [...new Set(hotels.map(h => h.location?.split(",")[0]?.trim()).filter(Boolean))]
const avgRating = parseFloat((hotels.reduce((s, h) => s + (h.rating || 0), 0) / hotels.length).toFixed(1))
const totalVariants = menuItems.reduce((s, item) => s + (item.variants?.length || 0), 0)
const roomCount = hotels.reduce((s, h) => s + (h.rooms || 0), 0)
const platformStats = [
  { value: hotels.length, suffix: "+", label: "Hamkor mehmonxona", icon: <BsBuilding /> },
  { value: totalVariants, suffix: "+", label: "Milliy taomlar", icon: <BsCupHot /> },
  { value: roomCount, suffix: "+", label: "Qulay xonalar", icon: <BsPeople /> },
  { value: uniqueCities.length, suffix: "+", label: "Shaharlar", icon: <BsMap /> },
  { value: 1, suffix: "+", label: "Davlatlar", icon: <BsGlobe /> },
  { value: avgRating, suffix: "", label: "O'rtacha reyting", icon: <BsStar />, isRating: true },
  { value: takliflar.length, suffix: "+", label: "Faol chegirmalar", icon: <BsTag /> },
]

const activities = [
  { icon: <BsCalendarCheck />, text: "Hyatt Regency Tashkent ga bron qilindi", time: "2 kun oldin", color: "#D4AF37" },
  { icon: <BsCheckCircle />, text: "Hilton Tashkent City to'lovi tasdiqlandi", time: "5 kun oldin", color: "#10b981" },
  { icon: <BsTag />, text: "30% chegirma promokodi faollashtirildi", time: "1 hafta oldin", color: "#8b5cf6" },
  { icon: <BsStar />, text: "Mövenpick Samarkand ga 5 yulduzli baho berildi", time: "2 hafta oldin", color: "#f59e0b" },
  { icon: <BsHeart />, text: "InterContinental Tashkent sevimlilarga qo'shildi", time: "3 hafta oldin", color: "#ef4444" },
]

function CountUp({ end, suffix, duration = 2000 }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const counted = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof end !== "number") return
    let timer
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true
        const step = Math.max(1, Math.floor(end / (duration / 16)))
        let current = 0
        timer = setInterval(() => {
          current += step
          setValue(current >= end ? end : current)
          if (current >= end) clearInterval(timer)
        }, 16)
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => { observer.disconnect(); if (timer) clearInterval(timer) }
  }, [end, duration])

  return <span ref={ref}>{typeof end === "number" ? value.toLocaleString() : end}{suffix}</span>
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { openProphile } = useProphile()

  return (
    <div className="dp">
      <Nav />
      <button className="dp-back-btn" onClick={openProphile} aria-label="Profil">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="5" width="18" height="2" rx="1" />
          <rect x="3" y="11" width="18" height="2" rx="1" />
          <rect x="3" y="17" width="18" height="2" rx="1" />
        </svg>
      </button>
      <Prophile />
      <Modal />
      <SignUpModal />
      <main>
        <div className="dp-container">

          <section className="dp-platform" data-aos="fade-up">
            <div className="dp-platform-header">
              <h2 className="dp-section-title">Sadrul platformasi</h2>
              <p className="dp-section-desc">O'zbekistonning eng yirik mehmonxona bron platformasi</p>
            </div>
            <div className="dp-platform-grid">
              {platformStats.map((stat, i) => (
                <div key={i} className={`dp-platform-card dp-platform-card-${i % 4 + 1}`}>
                  <div className="dp-platform-icon">{stat.icon}</div>
                  <div className="dp-platform-value">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                    {stat.isRating && <BsStar className="dp-platform-star" />}
                  </div>
                  <div className="dp-platform-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="dp-activity" data-aos="fade-up">
            <div className="dp-activity-header">
              <h2 className="dp-section-title">So'nggi faoliyat</h2>
            </div>
            <div className="dp-activity-timeline">
              {activities.map((a, i) => (
                <div key={i} className="dp-activity-item">
                  <div className="dp-activity-dot" style={{ background: a.color }}>
                    {a.icon}
                  </div>
                  <div className="dp-activity-content">
                    <span className="dp-activity-text">{a.text}</span>
                    <span className="dp-activity-time">{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="dp-concierge" data-aos="fade-up">
            <div className="dp-concierge-banner">
              <div className="dp-concierge-bg" />
              <div className="dp-concierge-content">
                <div className="dp-concierge-icon">
                  <BsChatDots />
                </div>
                <h2 className="dp-concierge-title">24/7 Concierge xizmati</h2>
                <p className="dp-concierge-text">Har qanday savolingizga istalgan vaqtda professional yordam oling. Biz sizga eng yaxshi tajribani taqdim etishga tayyormiz.</p>
                <button className="dp-btn dp-btn-primary" onClick={() => navigate("/biz-haqimizda")}>
                  Chat boshlash <BsArrowRight />
                </button>
              </div>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}
