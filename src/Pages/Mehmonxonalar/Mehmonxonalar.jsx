import { useState, useEffect, useRef, useCallback } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import AOS from "aos"
import { hotels, categories } from "../../data/hotels"
import { useLanguage } from "../../components/Language/useLanguage.js"
import { StarIcon, PinIcon, ArrowRightIcon } from "../../components/ui/icons"

import "./Mehmonxonalar.css"

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

function FeaturedStrip({ hotels, buildHref }) {
  const { t, tData } = useLanguage()
  const featured = hotels.filter(h => h.rating >= 4.8)
  const navigate = useNavigate()

  return (
    <section className="mx-featured" data-aos="fade-up">
      <div className="mx-section-label" data-aos="fade-up">
        <span className="mx-label-line" />
        <span>{t("hotels.featuredLabel")}</span>
        <span className="mx-label-line" />
      </div>
      <h2 className="mx-section-title" data-aos="fade-up" data-aos-delay="100">{t("hotels.featuredTitle")}</h2>
      <div className="mx-featured-track" data-aos="fade-up" data-aos-delay="200">
        <div className="mx-featured-inner" data-aos="fade-up">
          {[...featured, ...featured].map((h, i) => (
            <article
              key={`${h.id}-${i}`}
              className="mx-feat-card"
              onClick={() => navigate(buildHref(h.id))}
              data-aos="fade-up"
              data-aos-delay={i * 50}
            >
              <div className="mx-feat-img" data-aos="fade-up">
                <img src={h.image} alt={tData("data.hotels." + h.id + ".name", h.name)} loading="lazy" />
                <div className="mx-feat-rating-badge" data-aos="fade-up" data-aos-delay="50">
                  <StarIcon />
                  {h.rating}
                </div>
              </div>
              <div className="mx-feat-body" data-aos="fade-up" data-aos-delay="100">
                <h3 data-aos="fade-up">{tData("data.hotels." + h.id + ".name", h.name)}</h3>
                <span className="mx-feat-loc" data-aos="fade-up" data-aos-delay="50">{tData("data.hotels." + h.id + ".location", h.location)}</span>
                <span className="mx-feat-price" data-aos="fade-up" data-aos-delay="100">${h.price}<small>{t("home.perNight")}</small></span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function HotelCard({ hotel, buildHref }) {
  const { t, tData } = useLanguage()
  const navigate = useNavigate()
  const [imgError, setImgError] = useState(false)

  const stars = Array.from({ length: hotel.stars || 5 })
  const goToHotel = useCallback(() => navigate(buildHref(hotel.id)), [navigate, buildHref, hotel.id])

  return (
    <article
      className="mx-card"
      onClick={goToHotel}
      data-aos="fade-up"
    >
      <div className="mx-card-image" data-aos="fade-up">
        <img
          src={imgError ? "https://placehold.co/600x400/1a1a2e/d4af37?text=Hotel" : hotel.image}
          alt={tData("data.hotels." + hotel.id + ".name", hotel.name)}
          loading="lazy"
          onError={() => setImgError(true)}
        />
        <div className="mx-card-category" data-aos="fade-up">
          <StarIcon />
          {tData("data.hotels." + hotel.id + ".category", hotel.category)}
        </div>
        <div className="mx-card-image-rating" data-aos="fade-up" data-aos-delay="50">
          <StarIcon />
          <span>{hotel.rating}</span>
        </div>
      </div>
      <div className="mx-card-body" data-aos="fade-up" data-aos-delay="100">
        <div className="mx-card-top" data-aos="fade-up">
          <h3 className="mx-card-name" data-aos="fade-up">{tData("data.hotels." + hotel.id + ".name", hotel.name)}</h3>
          <div className="mx-card-stars" title={`${hotel.stars} ${t("hotels.stars")}`} data-aos="fade-up">
            {stars.map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
        </div>
        <div className="mx-card-location" data-aos="fade-up" data-aos-delay="50">
          <PinIcon />
          <span>{tData("data.hotels." + hotel.id + ".location", hotel.location)}</span>
        </div>
        <p className="mx-card-desc" data-aos="fade-up" data-aos-delay="100">{tData("data.hotels." + hotel.id + ".description", hotel.description)}</p>
        <div className="mx-card-bottom" data-aos="fade-up" data-aos-delay="150">
          <button className="mx-card-btn" data-aos="zoom-in" data-aos-delay="300" onClick={goToHotel}>
            <span>{t("hotels.viewHotel")}</span>
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Mehmonxonalar() {
  const { t } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get("category")
  const bodyRef = useRef(null)

  const checkInParam = searchParams.get("checkIn") || ""
  const checkOutParam = searchParams.get("checkOut") || ""
  const guestsParam = searchParams.get("guests") || ""

  const buildHref = useCallback((id) => {
    const params = new URLSearchParams()
    if (checkInParam) params.set("checkIn", checkInParam)
    if (checkOutParam) params.set("checkOut", checkOutParam)
    if (guestsParam) params.set("guests", guestsParam)
    return `/mehmonxona/${id}${params.size ? `?${params}` : ""}`
  }, [checkInParam, checkOutParam, guestsParam])

  const activeCategory = categoryParam && categories.includes(categoryParam) ? categoryParam : "Barchasi"

  const filtered = activeCategory === "Barchasi"
    ? hotels
    : hotels.filter(h => h.category === activeCategory)

  const rows = []
  for (let i = 0; i < filtered.length; i += 3) {
    rows.push(filtered.slice(i, i + 3))
  }

  const handleCategory = (cat) => {
    const next = new URLSearchParams(searchParams)
    if (cat === "Barchasi") next.delete("category")
    else next.set("category", cat)
    setSearchParams(next, { preventScrollReset: true })
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
    <div className="mehmonxonalar" data-aos="fade-up">

      <section className="mx-hero" data-aos="fade-up">
        <ParticleField />
        <div className="mx-hero-glow" />
        <div className="mx-hero-overlay" />
        <div className="mx-hero-content" data-aos="zoom-in">
          <div className="mx-badge" data-aos="fade-up">
            <StarIcon />
            <span className="mx-badge-line" />
            {t("hotels.heroBadge")}
            <span className="mx-badge-line" />
            <StarIcon />
          </div>
          <h1 className="mx-title" data-aos="fade-up" data-aos-delay="100">
            {t("hotels.heroTitle1")} <span className="mx-gold">{t("hotels.heroTitleGold")}</span> {t("hotels.heroTitle2")}
          </h1>
          <p className="mx-subtitle" data-aos="fade-up" data-aos-delay="200">
            {t("hotels.heroDesc")}
          </p>
          <div className="mx-hero-actions" data-aos="zoom-in" data-aos-delay="300">
            <button className="mx-hero-btn" data-aos="zoom-in" data-aos-delay="300" onClick={() => bodyRef.current?.scrollIntoView({ behavior: "smooth" })}>
              {t("hotels.viewCatalog")}
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="mx-divider" data-aos="fade-up" data-aos-delay="400">
            <span /><div className="mx-diamond" /><span />
          </div>
        </div>
      </section>

      <FeaturedStrip hotels={hotels} buildHref={buildHref} />

      <section className="mx-body" ref={bodyRef} data-aos="fade-up">
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

        <div className="mx-grid" data-aos="fade-up" data-aos-delay="350">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="mx-grid-row"
              data-aos="row-reveal"
              data-aos-delay={rowIndex * 150}
              data-aos-offset="100"
            >
              {row.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} buildHref={buildHref} />
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

      <section className="mx-booking" data-aos="fade-up">
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
