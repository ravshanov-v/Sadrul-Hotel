import { useEffect, useState, useRef, useMemo } from "react"
import { useParams, useNavigate, useSearchParams } from "react-router-dom"
import { hotels } from "../../data/hotels"
import { useAuth } from "../../components/Auth/useAuth.js"
import { useModal } from "../../components/SmallWindows/Modal/useModal.js"
import { useFavorites } from "../../components/Favorites/useFavorites.js"
import { useLanguage } from "../../components/Language/useLanguage.js"
import { checkRoomAvailability } from "../../utils/availability"
import { roomCategories, categoryMultiplier, extractCategory, roomTypes } from "../../utils/roomData"
import UnavailableModal from "../../components/UnavailableModal/UnavailableModal"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "./MehmonxonaDetail.css"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
})

const amenityIcons = {
  "Basseyn": <svg viewBox="0 0 24 24"><path d="M2 12c2.5-1.5 5.5-1.5 8 0s5.5 1.5 8 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M2 16c2.5-1.5 5.5-1.5 8 0s5.5 1.5 8 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  "Restoran": <svg viewBox="0 0 24 24"><path d="M18 2v20M6 2v6a4 4 0 008 0V2M6 12h8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  "SPA": <svg viewBox="0 0 24 24"><path d="M12 2C8 5 4 9 4 13c0 4 3 7 8 9 5-2 8-5 8-9 0-4-4-8-8-11z" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M12 2v22" stroke="currentColor" strokeWidth="1.5"/></svg>,
  "Fitness": <svg viewBox="0 0 24 24"><path d="M18 5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2M6 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2M14 3h-4M14 21h-4M4 12h16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  "Tennis": <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M12 3a9 9 0 0 1 0 18" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M3 12h18" stroke="currentColor" strokeWidth="1.5"/></svg>,
  "Wi-Fi": <svg viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  "Nonushta": <svg viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  "Avtoturargoh": <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "Biznes": <svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
  "Ekskursiya": <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.5"/></svg>,
  "Bolalar": <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M5 22v-4a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v4" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
  "VIP": <svg viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/></svg>,
  "Sport": <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.5"/></svg>,
  "Turar joy": <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" strokeWidth="1.5"/><polyline points="9 22 9 12 15 12 15 22" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
  "Konferensiya": <svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
}

function getAmenityIcon(name) {
  const key = name.toLowerCase().replace(/[\s-]+/g, "")
  const normalized = {}
  for (const [k, v] of Object.entries(amenityIcons)) {
    normalized[k.toLowerCase().replace(/[\s-]+/g, "")] = v
  }
  return normalized[key] || amenityIcons["VIP"]
}

export default function MehmonxonaDetail() {
  const { hotelId } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const { openModal } = useModal()
  const { toggleFav, isFav } = useFavorites()
  const { t, tData } = useLanguage()
  const hotel = hotels.find(h => h.id === Number(hotelId))
  const [roomCategory, setRoomCategory] = useState("Barchasi")
  const promoCode = searchParams.get("promo") || ""
  const promoRoom = searchParams.get("room") || ""
  const promoDiscount = Number(searchParams.get("discount")) || 0

  const [visibleCount, setVisibleCount] = useState(promoRoom ? roomTypes.length : 12)
  const [unavailableRoom, setUnavailableRoom] = useState(null)
  const [bookLoading, setBookLoading] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (promoRoom) {
      setTimeout(() => {
        const el = document.getElementById('md-promo-room')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 600)
    }
  }, [])

  useEffect(() => {
    if (!promoRoom) setVisibleCount(12)
  }, [roomCategory])

  // Pre-calculate availability for each room category
  const availabilityMap = useMemo(() => {
    if (!hotel) return {}
    const map = {}
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const weekLater = new Date(tomorrow)
    weekLater.setDate(weekLater.getDate() + 3)
    const ci = tomorrow.toISOString().split("T")[0]
    const co = weekLater.toISOString().split("T")[0]

    const categories = [...new Set(roomTypes.map(r => extractCategory(r.id)))]
    for (const cat of categories) {
      const result = checkRoomAvailability(hotel.id, cat + "-1", ci, co, user?.email, roomTypes)
      map[cat] = result
    }
    return map
  }, [hotel?.id, user?.email])

  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  useEffect(() => {
    if (!hotel?.coordinates || mapInstance.current) return
    const map = L.map(mapRef.current, {
      center: [hotel.coordinates.lat, hotel.coordinates.lng],
      zoom: 15,
      zoomControl: true,
      scrollWheelZoom: false
    })
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
    }).addTo(map)
    L.marker([hotel.coordinates.lat, hotel.coordinates.lng])
      .addTo(map)
      .bindPopup(`<b>${tData("data.hotels." + hotel.id + ".name", hotel.name)}</b><br>${tData("data.hotels." + hotel.id + ".location", hotel.location)}`)
    mapInstance.current = map
    return () => {
      map.remove()
      mapInstance.current = null
    }
  }, [hotel])

  if (!hotel) {
    return (
      <div className="md-page" data-aos="fade-up">
        <div className="md-hero md-hero-simple" data-aos="fade-up">
          <h1 data-aos="fade-up" data-aos-delay="100">{t("hotelDetail.notFound")}</h1>
          <button className="md-btn md-btn-primary" data-aos="fade-up" data-aos-delay="200" onClick={() => navigate("/mehmonxonalar")}>
            {t("hotelDetail.backToList")}
          </button>
        </div>
      </div>
    )
  }

  const stars = Array.from({ length: hotel.stars || 5 })
  const galleryImages = [
    hotel.image,
    "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?w=600&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80"
  ]

  const allRooms = roomTypes
    .filter(rt => roomCategory === "Barchasi" || rt.category === roomCategory)
    .map(rt => ({
      ...rt,
      price: Math.round(hotel.price * (categoryMultiplier[rt.category.toLowerCase()] || 1))
    }))

  const visible = allRooms.slice(0, visibleCount)
  const hasMore = visibleCount < allRooms.length

  const roomRows = []
  for (let i = 0; i < visible.length; i += 2) {
    roomRows.push(visible.slice(i, i + 2))
  }

  return (
    <div className="md-page" data-aos="fade-up">
      <section className="md-hero" data-aos="fade-up">
        <div className="md-hero-bg" style={{ backgroundImage: `url(${hotel.image})` }} />
        <div className="md-hero-overlay" />
        <div className="md-hero-content" data-aos="zoom-in">
          <div className="md-badge" data-aos="fade-up">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
            </svg>
            {tData("data.hotels." + hotel.id + ".category", hotel.category)}
          </div>
          <h1 className="md-title" data-aos="fade-up" data-aos-delay="100">{tData("data.hotels." + hotel.id + ".name", hotel.name)}</h1>
          <div className="md-hero-meta" data-aos="fade-up" data-aos-delay="200">
            <div className="md-stars" data-aos="fade-up">
              {stars.map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              ))}
            </div>
            <span className="md-rating-badge" data-aos="fade-up">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              {hotel.rating}
            </span>
            <span className="md-location" data-aos="fade-up">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
              </svg>
              {tData("data.hotels." + hotel.id + ".location", hotel.location)}
            </span>
          </div>
          <p className="md-subtitle" data-aos="fade-up" data-aos-delay="300">{tData("data.hotels." + hotel.id + ".description", hotel.description)}</p>
        </div>
      </section>

      <section className="md-section md-gallery" data-aos="fade-up">
        <div className="md-section-label" data-aos="fade-up">
          <span className="md-label-line" />
          <span>{t("hotelDetail.gallery")}</span>
          <span className="md-label-line" />
        </div>
        <h2 className="md-section-title" data-aos="fade-up" data-aos-delay="100"><span className="md-gold">{t("hotelDetail.galleryTitle")}</span></h2>
        <div className="md-gallery-grid" data-aos="fade-up" data-aos-delay="200">
          {galleryImages.map((img, i) => (
            <div key={i} className="md-gallery-item" data-aos="zoom-in" data-aos-delay={i * 100}>
              <img src={img} alt={`${tData("data.hotels." + hotel.id + ".name", hotel.name)} ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      <section className="md-section md-about" data-aos="fade-up">
        <div className="md-container" data-aos="fade-up">
          <div className="md-section-label" data-aos="fade-up">
            <span className="md-label-line" />
            <span>{t("hotelDetail.aboutLabel")}</span>
            <span className="md-label-line" />
          </div>
          <h2 className="md-section-title" data-aos="fade-up" data-aos-delay="100"><span className="md-gold">{t("hotelDetail.aboutTitle")}</span></h2>
          <div className="md-about-content">
            <div className="md-about-text" data-aos="fade-right">
              <p data-aos="fade-up">{tData("data.hotels." + hotel.id + ".description", hotel.description)}</p>
              <p data-aos="fade-up" data-aos-delay="100">
                {t("hotelDetail.description").replace("{name}", tData("data.hotels." + hotel.id + ".name", hotel.name)).replace("{stars}", hotel.stars).replace("{rooms}", hotel.rooms)}
              </p>
            </div>
            <div className="md-about-stats" data-aos="fade-left">
              <div className="md-stat-card" data-aos="fade-up">
                <span className="md-stat-number">{hotel.rooms}</span>
                <span className="md-stat-label">{t("hotelDetail.rooms")}</span>
              </div>
              <div className="md-stat-card" data-aos="fade-up" data-aos-delay="100">
                <span className="md-stat-number">{hotel.reviews}+</span>
                <span className="md-stat-label">{t("hotelDetail.reviews")}</span>
              </div>
              <div className="md-stat-card" data-aos="fade-up" data-aos-delay="200">
                <span className="md-stat-number">{hotel.stars}</span>
                <span className="md-stat-label">{t("hotelDetail.stars")}</span>
              </div>
              <div className="md-stat-card" data-aos="fade-up" data-aos-delay="300">
                <span className="md-stat-number">{hotel.rating}</span>
                <span className="md-stat-label">{t("hotelDetail.rating")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="md-section md-amenities" data-aos="fade-up">
        <div className="md-container" data-aos="fade-up">
          <div className="md-section-label" data-aos="fade-up">
            <span className="md-label-line" />
            <span>{t("hotelDetail.amenitiesLabel")}</span>
            <span className="md-label-line" />
          </div>
          <h2 className="md-section-title" data-aos="fade-up" data-aos-delay="100"><span className="md-gold">{t("hotelDetail.amenitiesTitle")}</span></h2>
          <div className="md-amenities-grid">
            {hotel.amenities.map((amenity, i) => (
              <div key={i} className="md-amenity-card" data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="md-amenity-icon">
                  {getAmenityIcon(amenity)}
                </div>
                <span className="md-amenity-name">{tData("data.hotels." + hotel.id + ".amenities." + i, amenity)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="md-section md-map" data-aos="fade-up">
        <div className="md-container" data-aos="fade-up">
          <div className="md-section-label" data-aos="fade-up">
            <span className="md-label-line" />
            <span>{t("hotelDetail.location")}</span>
            <span className="md-label-line" />
          </div>
          <h2 className="md-section-title" data-aos="fade-up" data-aos-delay="100"><span className="md-gold">{t("hotelDetail.locationTitle")}</span></h2>
          <div className="md-map-container" data-aos="fade-up" data-aos-delay="200">
            {hotel.coordinates ? (
              <div ref={mapRef} className="md-map-iframe" data-aos="fade-up" />
            ) : (
              <div className="md-map-placeholder" data-aos="fade-up">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
                </svg>
                <h3 data-aos="fade-up">{tData("data.hotels." + hotel.id + ".location", hotel.location)}</h3>
                <p data-aos="fade-up" data-aos-delay="100">{tData("data.hotels." + hotel.id + ".name", hotel.name)}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="md-section md-rooms" data-aos="fade-up">
        <div className="md-container" data-aos="fade-up">
          <div className="md-section-label" data-aos="fade-up">
            <span className="md-label-line" />
            <span>{t("hotelDetail.roomsLabel")}</span>
            <span className="md-label-line" />
          </div>
          <h2 className="md-section-title" data-aos="fade-up" data-aos-delay="100"><span className="md-gold">{t("hotelDetail.roomsTitle")}</span></h2>
          <p className="md-rooms-sub" data-aos="fade-up" data-aos-delay="200">
            {t("hotelDetail.roomsSub")}
          </p>
          <div className="md-room-categories" data-aos="fade-up">
            <div className="md-room-cat-track">
              {roomCategories.map((cat, i) => (
                <button
                  key={cat}
                  className={`md-room-cat-btn ${roomCategory === cat ? "active" : ""}`}
                  onClick={() => setRoomCategory(cat)}
                  data-aos="fade-up"
                  data-aos-delay={i * 50}
                >
                  {t("hotels.cat_" + cat)}
                </button>
              ))}
            </div>
          </div>
          {promoCode && (
            <div className="md-promo-banner" data-aos="fade-up">
              <div className="md-promo-banner-icon" data-aos="fade-up">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 7h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="md-promo-banner-text" data-aos="fade-up" data-aos-delay="100">
                <span className="md-promo-banner-title" data-aos="fade-up">{t("hotelDetail.promoActivated")}</span>
                <span className="md-promo-banner-code" data-aos="fade-up" data-aos-delay="50">{t("hotelDetail.promoInfo").replace("{code}", promoCode).replace("{discount}", promoDiscount)}</span>
              </div>
              <button className="md-promo-banner-clear" data-aos="fade-up" data-aos-delay="200" onClick={() => navigate(`/mehmonxona/${hotelId}`, { replace: true })}>
                {t("hotelDetail.dismiss")}
              </button>
            </div>
          )}
          <div className="md-rooms-grid" data-aos="fade-up" data-aos-delay="300">
            {roomRows.map((row, rowIndex) => (
              <div key={rowIndex} className="md-rooms-row" data-aos="row-reveal" data-aos-delay={rowIndex * 100} data-aos-offset="80">
                {row.map(room => {
                  const isPromoRoom = promoRoom === room.id
                  const promoPrice = isPromoRoom && promoDiscount
                    ? Math.round(room.price * (1 - promoDiscount / 100))
                    : null
                  const roomCat = extractCategory(room.id)
                  const avail = availabilityMap[roomCat]
                  return (
                    <div key={room.id} className={`md-room-card ${isPromoRoom ? 'md-room-promo' : ''} ${avail && !avail.available ? 'md-room-card-unavailable' : ''}`} id={isPromoRoom ? 'md-promo-room' : ''} data-aos="fade-up" data-aos-delay={rowIndex * 50}>
                      {isPromoRoom && <div className="md-room-promo-tag" data-aos="fade-up">{t("hotelDetail.specialOffer")}</div>}
                      <div className="md-room-image" data-aos="fade-up" data-aos-delay={rowIndex * 50}>
                        {avail && (
                          <div className={`md-avail-badge ${avail.available ? (avail.remaining <= Math.ceil(avail.totalRooms / 3) ? 'md-avail-limited' : 'md-avail-available') : 'md-avail-booked'}`} data-aos="fade-up">
                            {avail.available ? (
                              <>
                                <span className="md-avail-dot" />
                                <span>{avail.remaining >= avail.totalRooms ? t("hotelDetail.available") : `${avail.remaining} ${t("hotelDetail.remaining")}`}</span>
                              </>
                            ) : (
                              <>
                                <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                  <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                <span>{t("hotelDetail.booked")}</span>
                              </>
                            )}
                          </div>
                        )}
                        <img src={room.image} alt={tData("data.rooms." + room.id + ".name", room.name)} loading="lazy" />
                        <button
                          className={`md-like-btn ${isFav('room_' + room.id) ? 'liked' : ''}`}
                          onClick={(e) => { e.stopPropagation(); toggleFav('room_' + room.id) }}
                          aria-label={t("common.like")}
                          data-aos="fade-up"
                          data-aos-delay={rowIndex * 50 + 50}
                        >
                          <svg viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                      <div className="md-room-body" data-aos="fade-up" data-aos-delay={rowIndex * 50 + 100}>
                        <h3 className="md-room-name" data-aos="fade-up">{tData("data.rooms." + room.id + ".name", room.name)}</h3>
                        <p className="md-room-desc" data-aos="fade-up" data-aos-delay="50">{tData("data.rooms." + room.id + ".description", room.description)}</p>
                        <div className="md-room-bottom" data-aos="fade-up" data-aos-delay="100">
                          <div className="md-room-price" data-aos="fade-up">
                            {promoPrice ? (
                              <>
                                <span className="md-room-price-label">{t("hotelDetail.from")}</span>
                                <span className="md-room-price-old">${room.price}</span>
                                <span className="md-room-price-amount md-room-price-promo">${promoPrice}</span>
                                <span className="md-room-price-unit">{t("hotelDetail.perNight")}</span>
                              </>
                            ) : (
                              <>
                                <span className="md-room-price-label">{t("hotelDetail.from")}</span>
                                <span className="md-room-price-amount">${room.price}</span>
                                <span className="md-room-price-unit">{t("hotelDetail.perNight")}</span>
                              </>
                            )}
                          </div>
                          <button className={`md-room-btn ${avail && !avail.available ? 'md-room-btn-disabled' : ''} ${bookLoading === room.id ? 'md-room-btn-loading' : ''}`} data-aos="zoom-in" data-aos-delay="300"
                            disabled={avail && !avail.available}
                            onClick={() => {
                              if (!user) { openModal('login', t("hotelDetail.loginPrompt")); return }
                              setBookLoading(room.id)
                              const tomorrow = new Date()
                              tomorrow.setDate(tomorrow.getDate() + 1)
                              const weekLater = new Date(tomorrow)
                              weekLater.setDate(weekLater.getDate() + 3)
                              const ci = tomorrow.toISOString().split("T")[0]
                              const co = weekLater.toISOString().split("T")[0]
                              const result = checkRoomAvailability(hotel.id, room.id, ci, co, user?.email, roomTypes)
                              if (!result.available) {
                                setBookLoading(null)
                                setUnavailableRoom({ hotelId: hotel.id, roomType: room.id, checkIn: ci, checkOut: co })
                                return
                              }
                              setBookLoading(null)
                              navigate(`/bron-qilish/${hotel.id}?room=${room.id}${promoCode ? `&promo=${promoCode}&discount=${promoDiscount}` : ''}`)
                            }}>
                            {bookLoading === room.id ? (
                              <>
                                <span className="md-room-btn-spinner" />
                                {t("hotelDetail.checking")}
                              </>
                            ) : avail && !avail.available ? (
                              t("hotelDetail.booked")
                            ) : (
                              t("hotelDetail.bookNow")
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
          {hasMore && (
            <div className="md-load-wrap" data-aos="fade-up">
              <button className="md-load-btn" data-aos="fade-up" data-aos-delay="100" onClick={() => setVisibleCount(prev => prev + 6)}>
                {t("hotelDetail.viewMore")}
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M7 13l5 5 5-5M7 6l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="md-cta" data-aos="fade-up">
        <div className="md-cta-bg" />
        <div className="md-cta-content" data-aos="zoom-in">
          <h2 data-aos="fade-up" data-aos-delay="100">
            <span className="md-gold">{tData("data.hotels." + hotel.id + ".name", hotel.name)}</span> {t("hotelDetail.ctaTitle")}
          </h2>
          <p data-aos="fade-up" data-aos-delay="200">{t("hotelDetail.ctaDesc")}</p>
          <div className="md-cta-actions" data-aos="fade-up" data-aos-delay="300">
            <button className="md-btn md-btn-gold" data-aos="zoom-in" data-aos-delay="300" onClick={() => {
              const el = document.querySelector(".md-rooms")
              if (el) el.scrollIntoView({ behavior: "smooth" })
            }}>
              {t("hotelDetail.bookRoom")}
            </button>
            <button className="md-btn md-btn-outline" data-aos="zoom-in" data-aos-delay="400" onClick={() => navigate("/mehmonxonalar")}>
              {t("hotelDetail.allHotels")}
            </button>
          </div>
        </div>
      </section>
      {unavailableRoom && (
        <UnavailableModal
          hotelId={unavailableRoom.hotelId}
          roomType={unavailableRoom.roomType}
          checkIn={unavailableRoom.checkIn}
          checkOut={unavailableRoom.checkOut}
          onClose={() => setUnavailableRoom(null)}
        />
      )}
    </div>
  )
}

