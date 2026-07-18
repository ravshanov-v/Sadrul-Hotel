import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useProphile } from "./useProphile"
import { useAuth } from "../Auth/useAuth"
import { useDarkMode } from "../DarkMode/useDarkMode"
import { useFavorites } from "../Favorites/useFavorites"
import { useLanguage } from "../Language/useLanguage.js"
import { hotels } from "../../data/hotels"
import { roomTypes } from "../../utils/roomData"
import { menuItems } from "../../data/taomnoma"
import close from "../../Assets/Icons/close.svg"
import sun from "../../Assets/Icons/sun.svg"
import moon from "../../Assets/Icons/moon.svg"
import "./Prophile.css"

function userKey(email) { return email || "guest" }

function getSeen(key, email) {
  const fullKey = "seen_" + key + "_" + userKey(email)
  try { return JSON.parse(localStorage.getItem(fullKey) || "0") } catch { return 0 }
}
function setSeen(key, val, email) {
  const fullKey = "seen_" + key + "_" + userKey(email)
  localStorage.setItem(fullKey, JSON.stringify(val))
}

function ServicePanel({ activeKey, favorites, onClose, user, onSeen, userEmail, t, tData }) {
  const navigate = useNavigate()

  if (!activeKey) return null

  function handleBack() {
    if (onSeen) onSeen(activeKey)
    onClose(null)
  }

  switch (activeKey) {
    case "favorites": {
      const favHotels = hotels.filter(h => favorites.has(h.id))
      const favRooms = roomTypes.filter(r => favorites.has('room_' + r.id))
      const favFood = menuItems.filter(m => favorites.has('food_' + m.id))
      const totalFav = favHotels.length + favRooms.length + favFood.length
      return (
        <div className="prophile-subpanel">
          <div className="prophile-subpanel-header">
            <button className="prophile-sub-back" onClick={handleBack}>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h4>{t("prophile.favoritesTitle")}</h4>
            <span className="prophile-sub-count">{totalFav} {t("prophile.count")}</span>
          </div>
          {totalFav === 0 ? (
            <div className="prophile-sub-empty">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p>{t("prophile.favoritesEmpty")}</p>
              <button className="prophile-sub-btn" onClick={() => { handleBack(); navigate("/mehmonxonalar") }}>{t("prophile.viewHotels")}</button>
            </div>
          ) : (
            <div className="prophile-fav-list">
              {favHotels.length > 0 && (
                <>
                  <span className="prophile-fav-type-label">{t("prophile.favHotels")}</span>
                  {favHotels.map(h => (
                    <div key={'hotel-' + h.id} className="prophile-fav-item">
                      <img src={h.image} alt={tData("data.hotels." + h.id + ".name", h.name)} />
                      <div className="prophile-fav-info">
                        <span className="prophile-fav-name">{tData("data.hotels." + h.id + ".name", h.name)}</span>
                        <span className="prophile-fav-loc">{tData("data.hotels." + h.id + ".location", h.location)}</span>
                      </div>
                      <span className="prophile-fav-price">${h.price}</span>
                    </div>
                  ))}
                </>
              )}
              {favRooms.length > 0 && (
                <>
                  <span className="prophile-fav-type-label">{t("prophile.favRooms")}</span>
                  {favRooms.map(r => (
                    <div key={'room-' + r.id} className="prophile-fav-item">
                      <img src={r.image} alt={tData("data.rooms." + r.id + ".name", r.name)} />
                      <div className="prophile-fav-info">
                        <span className="prophile-fav-name">{tData("data.rooms." + r.id + ".name", r.name)}</span>
                        <span className="prophile-fav-loc">{tData("data.rooms." + r.id + ".category", r.category)}</span>
                      </div>
                    </div>
                  ))}
                </>
              )}
              {favFood.length > 0 && (
                <>
                  <span className="prophile-fav-type-label">{t("prophile.favFood")}</span>
                  {favFood.map(m => (
                    <div key={'food-' + m.id} className="prophile-fav-item">
                      <img src={m.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&q=80'} alt={tData("data.menu." + m.id + ".name", m.name)} />
                      <div className="prophile-fav-info">
                        <span className="prophile-fav-name">{tData("data.menu." + m.id + ".name", m.name)}</span>
                        <span className="prophile-fav-loc">{tData("data.menu." + m.id + ".category", m.category)}</span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      )
    }

    case "bookings": {
      let savedBookings = []
      try {
        const bk = "bookings_" + userKey(userEmail)
        const data = localStorage.getItem(bk)
        if (data) savedBookings = JSON.parse(data)
      } catch {}
      return (
        <div className="prophile-subpanel">
          <div className="prophile-subpanel-header">
            <button className="prophile-sub-back" onClick={handleBack}>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h4>{t("prophile.bookingsTitle")}</h4>
            <span className="prophile-sub-count">{savedBookings.length} {t("prophile.count")}</span>
          </div>
          {savedBookings.length === 0 ? (
            <div className="prophile-sub-empty">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <p>{t("prophile.bookingsEmpty")}</p>
              <button className="prophile-sub-btn" onClick={() => { handleBack(); navigate("/mehmonxonalar") }}>{t("prophile.viewHotels")}</button>
            </div>
          ) : (
            <div className="prophile-fav-list">
              {savedBookings.map((b, i) => (
                <div key={i} className="prophile-booking-item">
                  <div className="prophile-booking-top">
                    <span className="prophile-booking-hotel">{b.hotelName}</span>
                    <span className="prophile-booking-status">{t("prophile.statusConfirmed")}</span>
                  </div>
                  <span className="prophile-booking-dates">{b.checkIn} — {b.checkOut}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    case "settings": {
      return (
        <div className="prophile-subpanel">
          <div className="prophile-subpanel-header">
            <button className="prophile-sub-back" onClick={handleBack}>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h4>{t("prophile.settings")}</h4>
          </div>
          <div className="prophile-settings">
            <div className="prophile-setting-row">
              <span className="prophile-setting-label">{t("prophile.settingsName")}</span>
              <span className="prophile-setting-value">{user?.fullName}</span>
            </div>
            <div className="prophile-setting-row">
              <span className="prophile-setting-label">{t("prophile.settingsEmail")}</span>
              <span className="prophile-setting-value">{user?.email}</span>
            </div>
          </div>
        </div>
      )
    }

    case "help": {
      return (
        <div className="prophile-subpanel">
          <div className="prophile-subpanel-header">
            <button className="prophile-sub-back" onClick={handleBack}>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h4>{t("prophile.help")}</h4>
          </div>
          <div className="prophile-help-list">
            {[
              { q: t("prophile.helpFAQ1Q"), a: t("prophile.helpFAQ1A") },
              { q: t("prophile.helpFAQ2Q"), a: t("prophile.helpFAQ2A") },
              { q: t("prophile.helpFAQ3Q"), a: t("prophile.helpFAQ3A") },
            ].map((item, i) => (
              <details key={i} className="prophile-help-item">
                <summary className="prophile-help-question">{item.q}</summary>
                <p className="prophile-help-answer">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      )
    }

    default:
      return null
  }
}

export default function Prophile() {
  const { isOpen, closeProphile } = useProphile()
  const { user, logout } = useAuth()
  const { isDark, toggleDark } = useDarkMode()
  const { favorites, count: favCount } = useFavorites()
  const { t, tData } = useLanguage()
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState(null)
  const [unread, setUnread] = useState({ bookings: 0, favorites: 0 })
  const userEmail = user?.email

  const serviceItems = [
    {
      key: "bookings",
      label: t("prophile.bookings"),
      desc: t("prophile.bookingsDesc"),
      color: "#D4AF37",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="16" r="1.5" fill="currentColor" />
          <circle cx="16" cy="16" r="1.5" fill="currentColor" />
          <circle cx="8" cy="16" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      key: "favorites",
      label: t("prophile.favorites"),
      desc: t("prophile.favoritesDesc"),
      color: "#e74c3c",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      key: "settings",
      label: t("prophile.settings"),
      desc: t("prophile.settingsDesc"),
      color: "#8e44ad",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      key: "help",
      label: t("prophile.help"),
      desc: t("prophile.helpDesc"),
      color: "#00b894",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      key: "dashboard",
      label: t("prophile.dashboard"),
      desc: t("prophile.dashboardDesc"),
      color: "#D4AF37",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="13" y="3" width="8" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="13" y="9" width="8" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      key: "home",
      label: t("prophile.home"),
      desc: t("prophile.homeDesc"),
      color: "#D4AF37",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) setActiveKey(null)
  }, [isOpen])

  useEffect(() => {
    let bookingCount = 0
    try {
      const bk = "bookings_" + userKey(userEmail)
      const data = localStorage.getItem(bk)
      if (data) bookingCount = JSON.parse(data).length
    } catch {}
    const seenB = getSeen("bookings", userEmail)
    const seenF = getSeen("favorites", userEmail)
    setUnread({
      bookings: Math.max(0, bookingCount - seenB),
      favorites: Math.max(0, favCount - seenF),
    })
  }, [favCount, isOpen, userEmail])

  const initials = user?.fullName
    ? user.fullName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "?"

  function handleLogout() {
    logout()
    closeProphile()
    navigate("/")
  }

  function handleServiceClick(key) {
    if (key === "dashboard") {
      closeProphile()
      navigate("/dashboard")
    } else if (key === "home") {
      closeProphile()
      navigate("/")
    } else {
      setActiveKey(key)
    }
  }

  const handleSeen = useCallback((key) => {
    let count = 0
    if (key === "bookings") {
      try {
        const bk = "bookings_" + userKey(userEmail)
        count = JSON.parse(localStorage.getItem(bk) || "[]").length
      } catch {}
    } else if (key === "favorites") {
      count = favCount
    }
    setSeen(key, count, userEmail)
    setUnread(prev => ({ ...prev, [key]: 0 }))
  }, [favCount, userEmail])

  if (!isOpen) return null

  return (
    <>
      <div className="prophile-overlay" onClick={closeProphile} />
      <aside className={`prophile-panel ${isOpen ? "open" : ""}`}>
        <div className="prophile-header">
          <button className="prophile-close" onClick={closeProphile}>
            <img src={close} alt={t("prophile.closeAlt")} />
          </button>
          <span className="prophile-title">{t("prophile.title")}</span>
          <button className="prophile-dark-toggle" onClick={toggleDark}>
            <img src={isDark ? sun : moon} alt={isDark ? "sun" : "moon"} />
          </button>
        </div>

        <div className="prophile-user">
          <div className="prophile-avatar-wrap">
            <span className="prophile-avatar">{initials}</span>
            <span className="prophile-avatar-ring" />
          </div>
          <h3 className="prophile-name">{user?.fullName}</h3>
          <p className="prophile-email">{user?.email}</p>
        </div>

        {activeKey ? (
          <ServicePanel activeKey={activeKey} favorites={favorites} onClose={setActiveKey} user={user} onSeen={handleSeen} userEmail={userEmail} t={t} tData={tData} />
        ) : (
          <>
            <div className="prophile-services">
              {serviceItems.map((item, i) => (
                <button
                  key={item.key}
                  className={`prophile-service-card ${activeKey === item.key ? "active" : ""}`}
                  onClick={() => handleServiceClick(item.key)}
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <div className="prophile-service-icon" style={{ color: item.color }}>
                    {item.icon}
                    {unread[item.key] > 0 && item.key !== "dashboard" && item.key !== "home" && (
                      <span className="prophile-service-badge">{unread[item.key]}</span>
                    )}
                  </div>
                  <div className="prophile-service-info">
                    <span className="prophile-service-label">{item.label}</span>
                    <span className="prophile-service-desc">{item.desc}</span>
                  </div>
                  {item.key !== "dashboard" && item.key !== "home" && (
                    <svg className="prophile-service-arrow" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            <div className="prophile-footer">
              <button className="prophile-logout-btn" onClick={handleLogout}>
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t("prophile.logout")}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
