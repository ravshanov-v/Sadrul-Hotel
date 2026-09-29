import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useProphile } from "./useProphile"
import { useAuth } from "../Auth/useAuth"
import { useDarkMode } from "../DarkMode/useDarkMode"
import { useFavorites } from "../Favorites/useFavorites"
import { useLanguage } from "../Language/useLanguage.js"
import ServicePanel from "./ServicePanel"
import { setSeen, getSeen, getBookingCount } from "./seenStorage"
import close from "../../Assets/Icons/close.svg"
import sun from "../../Assets/Icons/sun.svg"
import moon from "../../Assets/Icons/moon.svg"
import "./Prophile.css"

export default function Prophile() {
  const { isOpen, closeProphile } = useProphile()
  const { user, logout } = useAuth()
  const { isDark, toggleDark } = useDarkMode()
  const { favorites, count: favCount } = useFavorites()
  const { t, tData } = useLanguage()
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState(null)
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

  const [prevOpen, setPrevOpen] = useState(isOpen)
  if (prevOpen !== isOpen) {
    setPrevOpen(isOpen)
    if (!isOpen) setActiveKey(null)
  }

  function computeUnread(email, favoritesCount) {
    let bookingCount = 0
    try {
      bookingCount = JSON.parse(localStorage.getItem("bookings_" + (email || "guest")) || "[]").length
    } catch {
      // corrupted bookings — treat as zero
    }
    return {
      bookings: Math.max(0, bookingCount - getSeen("bookings", email)),
      favorites: Math.max(0, favoritesCount - getSeen("favorites", email)),
    }
  }

  const [unread, setUnread] = useState(() => computeUnread(userEmail, favCount))
  const [unreadSeed, setUnreadSeed] = useState(() => ({ favCount, isOpen, userEmail }))
  if (
    unreadSeed.favCount !== favCount ||
    unreadSeed.isOpen !== isOpen ||
    unreadSeed.userEmail !== userEmail
  ) {
    setUnreadSeed({ favCount, isOpen, userEmail })
    setUnread(computeUnread(userEmail, favCount))
  }

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
      count = getBookingCount(userEmail)
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
            {isDark ? (
              <img className="prophile-dark-sun" src={sun} alt={t("prophile.sunAlt")} />
            ) : (
              <img className="prophile-dark-moon" src={moon} alt={t("prophile.moonAlt")} />
            )}
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
                  className="prophile-service-card"
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
