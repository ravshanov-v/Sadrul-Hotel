import { useEffect, useRef, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { hotels } from "../../data/hotels"
import { takliflar } from "../../data/takliflar"
import "./BizHaqimizda.css"
import { BsBuildings, BsPeople, BsShieldCheck, BsStar } from 'react-icons/bs'
import { jobPositions } from "../../data/karyera"

const cityCount = [...new Set(hotels.map(h => h.location?.split(",")[0]?.trim()).filter(Boolean))].length
const roomCount = hotels.reduce((s, h) => s + (h.rooms || 0), 0)

export default function BizHaqimizda() {
  const navigate = useNavigate()
  const location = useLocation()
  const stats = [
    { icon: <BsBuildings />, value: `${hotels.length}+`, label: "Mehmonxonalar" },
    { icon: <BsPeople />, value: `${roomCount}+`, label: "Qulay xonalar" },
    { icon: <BsShieldCheck />, value: `${takliflar.length}+`, label: "Maxsus takliflar" },
    { icon: <BsStar />, value: `${cityCount}+`, label: "Shaharlar" },
  ]

  const values = [
    {
      title: "Ishonchlilik",
      desc: "Har bir hamkorimiz bilan uzoq muddatli va ishonchli munosabatlar o'rnatamiz",
    },
    {
      title: "Sifat",
      desc: "Xizmat ko'rsatishda eng yuqori standartlarga amal qilamiz",
    },
    {
      title: "Innovatsiya",
      desc: "Zamonaviy texnologiyalar yordamida xizmatlarni doimiy takomillashtirib boramiz",
    },
    {
      title: "Natija",
      desc: "Har bir vazifaga mas'uliyat bilan yondashib, aniq natijaga erishamiz",
    },
  ]

  const containerRef = useRef(null)
  const playerRef = useRef(null)
  const apiReady = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)

  useEffect(() => {
    let player
    const id = "yt-player-" + Math.random().toString(36).slice(2, 8)

    const initPlayer = () => {
      if (!window.YT?.Player || apiReady.current) return
      apiReady.current = true
      if (containerRef.current) containerRef.current.id = id
      player = new window.YT.Player(id, {
        videoId: "78z9wfm-Gtg",
        playerVars: {
          controls: 0,
          modestbranding: 1,
          rel: 0,
          start: 45,
          playsinline: 1,
          origin: window.location.origin,
          enablejsapi: 1,
        },
        events: {
          onReady: () => setPlayerReady(true),
          onStateChange: (e) => {
            setIsPlaying(e.data === window.YT.PlayerState.PLAYING)
          }
        }
      })
      playerRef.current = player
    }

    if (window.YT?.Player) {
      initPlayer()
    } else {
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        if (prev) prev()
        initPlayer()
      }
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const s = document.createElement("script")
        s.src = "https://www.youtube.com/iframe_api"
        document.head.appendChild(s)
      }
    }

    return () => {
      apiReady.current = false
      if (player && player.destroy) player.destroy()
    }
  }, [])

  const togglePlay = () => {
    const p = playerRef.current
    if (!p || !playerReady) return
    if (isPlaying) {
      p.pauseVideo()
    } else {
      p.playVideo()
    }
  }

  useEffect(() => {
    const hash = location.hash.replace("#", "")
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash)
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }, [location])

  return (
    <div className='about-page'>

      <section className='about-hero'>
        <div className='about-hero-overlay'></div>
        <div className='about-hero-content' data-aos="zoom-in">
          <div className='about-badge'>
            <span className='about-badge-line' />
            <span>Sadrul.uz</span>
            <span className='about-badge-line' />
          </div>
          <h1 className='about-hero-title'>
            Biz <span className='gold-text'>haqimizda</span>
          </h1>
          <p className='about-hero-desc'>
            Sadrul — zamonaviy texnologiyalar va tajribani birlashtirib, mijozlarga yuqori sifatli xizmatlar taqdim etuvchi platforma
          </p>
        </div>
      </section>

      <section className='about-stats'>
        {stats.map((s, i) => (
          <div key={i} className='about-stat-card'>
            <div className='about-stat-icon'>{s.icon}</div>
            <span className='about-stat-value'>{s.value}</span>
            <span className='about-stat-label'>{s.label}</span>
          </div>
        ))}
      </section>
      <section className="about-video-wrap" data-aos="fade-up">
        <div className="about-video-card">
          <div className="about-video-label">
            <span className="about-badge-line" />
            <span>Sadrul hayoti</span>
            <span className="about-badge-line" />
          </div>
          <h2 className="about-section-title">
            Kompaniyamiz <span className="gold-text">hayotidan</span>
          </h2>
          <div className="about-video-container">
            <div ref={containerRef} className="about-video" />
            <div className={`about-video-overlay ${!isPlaying ? "about-video-overlay-visible" : ""}`} onClick={togglePlay}>
              <div className="about-video-ring" />
              <button
                className={`about-video-btn ${isPlaying ? "about-video-btn-small" : ""}`}
                onClick={(e) => { e.stopPropagation(); togglePlay() }}
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="about-video-play-icon">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="about-jamoa" id="jamoa">
        <div className='about-section-badge' data-aos="fade-up">
          <span className='about-badge-line' />
          <span>Jamoa</span>
          <span className='about-badge-line' />
        </div>
        <h2 className='about-section-title' data-aos="fade-up">
          Bizning <span className='gold-text'>jamoa</span>
        </h2>
        <div className='about-jamoa-grid'>
          {[
            { name: "Saidakbar Ravshanov", role: "Bosh direktor", desc: "10 yillik tajribaga ega mehmonxona biznesi mutaxassisi" },
            { name: "Akbar Umarov", role: "Marketing direktori", desc: "Brend strategiyasi va raqamli marketing bo'yicha yetakchi" },
            { name: "Ali Botirov", role: "Operatsion menejer", desc: "Mehmonxona operatsiyalari va xizmat ko'rsatish sifatini nazorat qiladi" },
            { name: "Shahribonu Amirova", role: "HR menejeri", desc: "Iste'dodlarni jalb qilish va jamoa rivojlanishi bilan shug'ullanadi" },
          ].map((member, i) => (
            <div key={i} className='about-jamoa-card'>
              <div className='about-jamoa-avatar'>
                {member.name.split(" ").map(n => n[0]).join("")}
              </div>
              <h3 className='about-jamoa-name'>{member.name}</h3>
              <span className='about-jamoa-role'>{member.role}</span>
              <p className='about-jamoa-desc'>{member.desc}</p>
            </div>
          ))}
        </div>
      </section>


      <section className='about-mission' id="missiyamiz">
        <div className='about-mission-content' data-aos="fade-right">
          <div className='about-section-badge'>
            <span className='about-badge-line' />
            <span>Missiyamiz</span>
            <span className='about-badge-line' />
          </div>
          <h2 className='about-section-title'>
            Eng yaxshi <span className='gold-text'>xizmat</span> siz uchun
          </h2>
          <p className='about-section-text'>
            Bizning asosiy maqsadimiz – O'zbekiston bo'ylab eng yaxshi mehmonxonalarni tanlab,
            sayohatchilarga qulay va ishonchli xizmat ko'rsatish.
            Har bir mijozimizni o'z uyimizdagidek his qilishimiz uchun bor kuchimiz bilan harakat qilamiz.
          </p>
          <p className='about-section-text'>
            Sadrul jamoasi {cityCount} dan ortiq shaharlarda faoliyat yuritib, {hotels.length} dan ortiq mehmonxonalar bilan hamkorlik qiladi.
          </p>
        </div>
        <div className='about-mission-image' data-aos="fade-left">
          <img src='/src/Assets/Images/sadrul-kompany.jpg' alt='Sadrul kompaniyasi' />
          <div className='about-mission-image-overlay'></div>
        </div>
      </section>


      <section className='about-values'>
        <div className='about-section-badge' data-aos="fade-up">
          <span className='about-badge-line' />
          <span>Qadriyatlarimiz</span>
          <span className='about-badge-line' />
        </div>
        <h2 className='about-section-title' data-aos="fade-up">
          Nega aynan <span className='gold-text'>Sadrul</span>?
        </h2>
        <div className='about-values-grid'>
          {values.map((v, i) => (
            <div key={i} className='about-value-card'>
              <div className='about-value-num'>0{i + 1}</div>
              <h3 className='about-value-title'>{v.title}</h3>
              <p className='about-value-desc'>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="about-karyera" id="karyera">
        <div className='about-section-badge' data-aos="fade-up">
          <span className='about-badge-line' />
          <span>Karyera</span>
          <span className='about-badge-line' />
        </div>
        <h2 className='about-section-title' data-aos="fade-up">
          Biz bilan <span className='gold-text'>ishlang</span>
        </h2>
        <div className='about-karyera-grid'>
          {jobPositions.map((job, i) => (
            <div key={i} className='about-karyera-card'>
              <div className='about-karyera-type'>{job.type}</div>
              <h3 className='about-karyera-title'>{job.title}</h3>
              <div className='about-karyera-loc'>
                <svg viewBox='0 0 24 24' fill='none'>
                  <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z' stroke='currentColor' strokeWidth='2' />
                  <circle cx='12' cy='9' r='2.5' stroke='currentColor' strokeWidth='2' />
                </svg>
                {job.loc}
              </div>
              <p className='about-karyera-desc'>{job.desc}</p>
              <button className='about-karyera-btn' onClick={() => navigate(`/ariza?position=${encodeURIComponent(job.title)}`)}>Ariza topshirish</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
