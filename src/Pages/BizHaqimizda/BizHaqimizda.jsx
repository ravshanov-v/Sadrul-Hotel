import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { hotels } from "../../data/hotels"
import "./BizHaqimizda.css"
import { BsBuildings, BsPeople, BsShieldCheck, BsStar } from 'react-icons/bs'
import { jobPositions } from "../../data/karyera"
import { useLanguage } from "../../components/Language/useLanguage"
import useYouTubePlayer from "../../hooks/useYouTubePlayer"
import { PinIcon } from "../../components/ui/icons"
import { cityCount, totalRoomCount as roomCount, offerCount, hotelCount } from "../../utils/stats"
import companyImage from "../../Assets/Images/sadrul-kompany.jpg"

export default function BizHaqimizda() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t, tData } = useLanguage()
  const stats = [
    { icon: <BsBuildings />, value: `${hotelCount}+`, label: t("about.statsHotels") },
    { icon: <BsPeople />, value: `${roomCount}+`, label: t("about.statsRooms") },
    { icon: <BsShieldCheck />, value: `${offerCount}+`, label: t("about.statsOffers") },
    { icon: <BsStar />, value: `${cityCount}+`, label: t("about.statsCities") },
  ]

  const values = [
    {
      title: t("home.valueTrust"),
      desc: t("home.valueTrustDesc"),
    },
    {
      title: t("home.valueQuality"),
      desc: t("home.valueQualityDesc"),
    },
    {
      title: t("home.valueInnovation"),
      desc: t("home.valueInnovationDesc"),
    },
    {
      title: t("home.valueResult"),
      desc: t("home.valueResultDesc"),
    },
  ]

  const { containerRef, isPlaying, togglePlay } = useYouTubePlayer("78z9wfm-Gtg")

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
    <div className='about-page' data-aos="fade-up">

      <section className='about-hero' data-aos="fade-up">
        <div className='about-hero-overlay'></div>
        <div className='about-hero-content' data-aos="zoom-in">
          <div className='about-badge' data-aos="fade-up">
            <span className='about-badge-line' />
            <span>{t("about.heroBadge")}</span>
            <span className='about-badge-line' />
          </div>
          <h1 className='about-hero-title' data-aos="fade-up" data-aos-delay="100">
            {t("about.heroTitle1")} <span className='gold-text'>{t("about.heroTitleGold")}</span> {t("about.heroTitle2")}
          </h1>
          <p className='about-hero-desc' data-aos="fade-up" data-aos-delay="200">
            {t("about.heroDesc")}
          </p>
        </div>
      </section>

      <section className='about-stats' data-aos="fade-up">
        {stats.map((s, i) => (
          <div key={i} className='about-stat-card' data-aos="fade-up" data-aos-delay={i * 100}>
            <div className='about-stat-icon'>{s.icon}</div>
            <span className='about-stat-value'>{s.value}</span>
            <span className='about-stat-label'>{s.label}</span>
          </div>
        ))}
      </section>
      <section className="about-video-wrap" data-aos="fade-up">
        <div className="about-video-card" data-aos="fade-up">
          <div className="about-video-label" data-aos="fade-up">
            <span className="about-badge-line" />
            <span>{t("about.videoLabel")}</span>
            <span className="about-badge-line" />
          </div>
          <h2 className="about-section-title" data-aos="fade-up" data-aos-delay="100">
            {t("about.videoTitle1")} <span className="gold-text">{t("about.videoTitleGold")}</span> {t("about.videoTitle2")}
          </h2>
          <div className="about-video-container" data-aos="fade-up">
            <div ref={containerRef} className="about-video" />
            <div className={`about-video-overlay ${!isPlaying ? "about-video-overlay-visible" : ""}`} data-aos="zoom-in" onClick={togglePlay}>
              <div className="about-video-ring" />
              <button
                className={`about-video-btn ${isPlaying ? "about-video-btn-small" : ""}`}
                data-aos="zoom-in"
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
      <section className="about-jamoa" id="jamoa" data-aos="fade-up">
        <div className='about-section-badge' data-aos="fade-up">
          <span className='about-badge-line' />
          <span>{t("about.teamLabel")}</span>
          <span className='about-badge-line' />
        </div>
        <h2 className='about-section-title' data-aos="fade-up">
          {t("about.teamTitle1")} <span className='gold-text'>{t("about.teamTitleGold")}</span> {t("about.teamTitle2")}
        </h2>
        <div className='about-jamoa-grid' data-aos="fade-up">
          {[
            { name: t("about.member1Name"), role: t("about.member1Role"), desc: t("about.member1Desc") },
            { name: t("about.member2Name"), role: t("about.member2Role"), desc: t("about.member2Desc") },
            { name: t("about.member3Name"), role: t("about.member3Role"), desc: t("about.member3Desc") },
            { name: t("about.member4Name"), role: t("about.member4Role"), desc: t("about.member4Desc") },
          ].map((member, i) => (
            <div key={i} className='about-jamoa-card' data-aos="fade-up" data-aos-delay={i * 100}>
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


      <section className='about-mission' id="missiyamiz" data-aos="fade-up">
        <div className='about-mission-content' data-aos="fade-right">
          <div className='about-section-badge' data-aos="fade-up">
            <span className='about-badge-line' />
            <span>{t("about.missionLabel")}</span>
            <span className='about-badge-line' />
          </div>
          <h2 className='about-section-title' data-aos="fade-up" data-aos-delay="100">
            {t("about.missionTitle1")} <span className='gold-text'>{t("about.missionTitleGold")}</span> {t("about.missionTitle2")}
          </h2>
          <p className='about-section-text' data-aos="fade-up" data-aos-delay="200">
            {t("about.missionText1")}
          </p>
          <p className='about-section-text' data-aos="fade-up" data-aos-delay="200">
            {t("about.missionText2", { cityCount, "hotels.length": hotels.length })}
          </p>
        </div>
        <div className='about-mission-image' data-aos="fade-left">
          <img src={companyImage} alt={t("about.teamImgAlt")} data-aos="zoom-in" />
          <div className='about-mission-image-overlay'></div>
        </div>
      </section>


      <section className='about-values' data-aos="fade-up">
        <div className='about-section-badge' data-aos="fade-up">
          <span className='about-badge-line' />
          <span>{t("about.valuesLabel")}</span>
          <span className='about-badge-line' />
        </div>
        <h2 className='about-section-title' data-aos="fade-up">
          {t("about.valuesTitle1")} <span className='gold-text'>{t("about.valuesTitleGold")}</span> {t("about.valuesTitle2")}
        </h2>
        <div className='about-values-grid' data-aos="fade-up">
          {values.map((v, i) => (
            <div key={i} className='about-value-card' data-aos="fade-up" data-aos-delay={i * 100}>
              <div className='about-value-num'>0{i + 1}</div>
              <h3 className='about-value-title'>{v.title}</h3>
              <p className='about-value-desc'>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="about-karyera" id="karyera" data-aos="fade-up">
        <div className='about-section-badge' data-aos="fade-up">
          <span className='about-badge-line' />
          <span>{t("about.careerLabel")}</span>
          <span className='about-badge-line' />
        </div>
        <h2 className='about-section-title' data-aos="fade-up">
          {t("about.careerTitle1")} <span className='gold-text'>{t("about.careerTitleGold")}</span> {t("about.careerTitle2")}
        </h2>
        <div className='about-karyera-grid' data-aos="fade-up">
          {jobPositions.map((job, i) => (
            <div key={i} className='about-karyera-card' data-aos="fade-up" data-aos-delay={i * 100}>
              <div className='about-karyera-type'>{tData("data.careers." + i + ".type", job.type)}</div>
              <h3 className='about-karyera-title'>{tData("data.careers." + i + ".title", job.title)}</h3>
              <div className='about-karyera-loc'>
                <PinIcon />
                {tData("data.careers." + i + ".loc", job.loc)}
              </div>
              <p className='about-karyera-desc'>{tData("data.careers." + i + ".desc", job.desc)}</p>
              <button className='about-karyera-btn' data-aos="zoom-in" onClick={() => navigate(`/ariza?position=${encodeURIComponent(job.title)}`)}>{t("about.applyBtn")}</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
