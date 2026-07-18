import { useState, useEffect, useRef, useCallback } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import AOS from "aos"
import { hotels, categories } from "../../data/hotels"
import { useLanguage } from "../../components/Language/useLanguage.js"
import "./Mehmonxonalar.css"

const STAR_SVG = "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: (i * 17 + 3) % 100,
  y: (i * 31 + 7) % 100,
  size: ((i * 13 + 5) % 4) + 2,
  delay: ((i * 7) % 8),
  duration: ((i * 11 + 3) % 6) + 6,
  drift: (((i * 19 + 13) % 20) - 10)
}))

function ParticleField() {

  return (
    <div className="mx-particles">
      {PARTICLES.map(p => (
        <div
          key={p.id}
          className="mx-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            "--drift": `${p.drift}px`
          }}
        />
      ))}
    </div>
  )
}

function FeaturedStrip({ hotels }) {
  const { t, tData } = useLanguage()
  const featured = hotels.filter(h => h.rating >= 4.8)
  const navigate = useNavigate()

  return (
    <section className="mx-featured">
      <div className="mx-section-label" data-aos="fade-up">
        <span className="mx-label-line" />
        <span>{t("hotels.featuredLabel")}</span>
        <span className="mx-label-line" />
      </div>
      <h2 className="mx-section-title" data-aos="fade-up" data-aos-delay="100">{t("hotels.featuredTitle")}</h2>
      <div className="mx-featured-track" data-aos="fade-up" data-aos-delay="200">
        <div className="mx-featured-inner">
          {[...featured, ...featured].map((h, i) => (
            <article
              key={`${h.id}-${i}`}
              className="mx-feat-card"
              onClick={() => navigate(`/mehmonxona/${h.id}`)}
            >
              <div className="mx-feat-img">
                <img src={h.image} alt={tData("data.hotels." + h.id + ".name", h.name)} loading="lazy" />
                <div className="mx-feat-rating-badge">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d={STAR_SVG} />
                  </svg>
                  {h.rating}
                </div>
              </div>
              <div className="mx-feat-body">
                <h3>{tData("data.hotels." + h.id + ".name", h.name)}</h3>
                <span className="mx-feat-loc">{tData("data.hotels." + h.id + ".location", h.location)}</span>
                <span className="mx-feat-price">${h.price}<small>{t("hotels.perNight")}</small></span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function HotelCard({ hotel }) {
  const { t, tData } = useLanguage()
  const navigate = useNavigate()
  const [imgError, setImgError] = useState(false)

  const stars = Array.from({ length: hotel.stars || 5 })
  const goToHotel = useCallback(() => navigate(`/mehmonxona/${hotel.id}`), [navigate, hotel.id])

  return (
    <article
      className="mx-card"
      onClick={goToHotel}
    >
      <div className="mx-card-image">
        <img
          src={imgError ? "https://placehold.co/600x400/1a1a2e/d4af37?text=Hotel" : hotel.image}
          alt={tData("data.hotels." + hotel.id + ".name", hotel.name)}
          loading="lazy"
          onError={() => setImgError(true)}
        />
        <div className="mx-card-category">
          <svg viewBox="0 0 24 24" fill="none">
            <path d={STAR_SVG} fill="currentColor" />
          </svg>
          {tData("data.hotels." + hotel.id + ".category", hotel.category)}
        </div>
        <div className="mx-card-image-rating">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d={STAR_SVG} />
          </svg>
          <span>{hotel.rating}</span>
        </div>
      </div>
      <div className="mx-card-body">
        <div className="mx-card-top">
          <h3 className="mx-card-name">{tData("data.hotels." + hotel.id + ".name", hotel.name)}</h3>
          <div className="mx-card-stars" title={`${hotel.stars} ${t("hotels.stars")}`}>
            {stars.map((_, i) => (
              <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                <path d={STAR_SVG} />
              </svg>
            ))}
          </div>
        </div>
        <div className="mx-card-location">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span>{tData("data.hotels." + hotel.id + ".location", hotel.location)}</span>
        </div>
        <p className="mx-card-desc">{tData("data.hotels." + hotel.id + ".description", hotel.description)}</p>
        <div className="mx-card-bottom">
          <button className="mx-card-btn" onClick={goToHotel}>
            <span>{t("hotels.viewHotel")}</span>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Mehmonxonalar() {
  const { t } = useLanguage()
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get("category")
  const [activeCategory, setActiveCategory] = useState(categoryParam && categories.includes(categoryParam) ? categoryParam : "Barchasi")
  const bodyRef = useRef(null)

  const filtered = activeCategory === "Barchasi"
    ? hotels
    : hotels.filter(h => h.category === activeCategory)

  const rows = []
  for (let i = 0; i < filtered.length; i += 3) {
    rows.push(filtered.slice(i, i + 3))
  }

  const handleCategory = (cat) => {
    setActiveCategory(cat)
  }

  useEffect(() => {
    if (bodyRef.current && activeCategory !== "Barchasi") {
      bodyRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [activeCategory])

  useEffect(() => {
    AOS.refresh()
  }, [filtered, activeCategory])

  return (
    <div className="mehmonxonalar">

      <section className="mx-hero">
        <ParticleField />
        <div className="mx-hero-glow" />
        <div className="mx-hero-overlay" />
        <div className="mx-hero-content" data-aos="zoom-in">
          <div className="mx-badge">
            <svg viewBox="0 0 24 24" fill="none">
              <path d={STAR_SVG} fill="currentColor" />
            </svg>
            <span className="mx-badge-line" />
            {t("hotels.heroBadge")}
            <span className="mx-badge-line" />
            <svg viewBox="0 0 24 24" fill="none">
              <path d={STAR_SVG} fill="currentColor" />
            </svg>
          </div>
          <h1 className="mx-title">
            {t("hotels.heroTitle1")} <span className="mx-gold">{t("hotels.heroTitleGold")}</span> {t("hotels.heroTitle2")}
          </h1>
          <p className="mx-subtitle">
            {t("hotels.heroDesc")}
          </p>
          <div className="mx-hero-actions">
            <button className="mx-hero-btn" onClick={() => bodyRef.current?.scrollIntoView({ behavior: "smooth" })}>
              {t("hotels.viewCatalog")}
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="mx-divider">
            <span /><div className="mx-diamond" /><span />
          </div>
        </div>
      </section>

      <FeaturedStrip hotels={hotels} />

      <section className="mx-body" ref={bodyRef}>
        <div className="mx-section-label" data-aos="fade-up">
          <span className="mx-label-line" />
          <span>{t("hotels.catalogLabel")}</span>
          <span className="mx-label-line" />
        </div>
        <h2 className="mx-section-title" data-aos="fade-up" data-aos-delay="100">{t("hotels.catalogTitle")}</h2>

        <div className="mx-categories" data-aos="fade-up" data-aos-delay="150">
          <div className="mx-cat-track">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`mx-cat-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => handleCategory(cat)}
                data-aos="fade-up"
                data-aos-delay={200 + i * 40}
              >
                {t("hotels.cat_" + cat)}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-stats" data-aos="fade-up" data-aos-delay="300">
          <span className="mx-stats-count">{filtered.length} {t("hotels.found")}</span>
        </div>

        <div className="mx-grid">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="mx-grid-row"
              data-aos="row-reveal"
              data-aos-delay={rowIndex * 150}
              data-aos-offset="100"
            >
              {row.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mx-empty" data-aos="fade-up">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p>{t("hotels.emptyCategory")}</p>
          </div>
        )}
      </section>

      <section className="mx-booking">
        <div className="mx-booking-bg" />
        <div className="mx-section-label" style={{ position: "relative", zIndex: 2 }} data-aos="fade-up">
          <span className="mx-label-line" />
          <span>{t("hotels.ctaLabel")}</span>
          <span className="mx-label-line" />
        </div>
        <h2 className="mx-section-title" style={{ position: "relative", zIndex: 2, color: "#fff" }} data-aos="zoom-in" data-aos-delay="150">
          {t("hotels.ctaTitle1")} <span className="mx-gold">{t("hotels.ctaTitleGold")}</span> {t("hotels.ctaTitle2")}
        </h2>
        <p className="mx-booking-sub" style={{ position: "relative", zIndex: 2 }} data-aos="fade-up" data-aos-delay="300">
          {t("hotels.ctaDesc")}
        </p>
      </section>

    </div>
  )
}
