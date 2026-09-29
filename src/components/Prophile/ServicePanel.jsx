import { useNavigate } from "react-router-dom"
import { hotels } from "../../data/hotels"
import { roomTypes } from "../../utils/roomData"
import { menuItems } from "../../data/taomnoma"
import { HeartIcon } from "../ui/icons"
import { userKey, getBookingCount } from "./seenStorage"

function SubpanelHeader({ title, count, t, onBack }) {
  return (
    <div className="prophile-subpanel-header">
      <button className="prophile-sub-back" onClick={onBack}>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <h4>{title}</h4>
      {count !== undefined && (
        <span className="prophile-sub-count">{count} {t("prophile.count")}</span>
      )}
    </div>
  )
}

function EmptyPanel({ icon, text, actionLabel, onAction }) {
  return (
    <div className="prophile-sub-empty">
      {icon}
      <p>{text}</p>
      <button className="prophile-sub-btn" onClick={onAction}>{actionLabel}</button>
    </div>
  )
}

function FavoritesPanel({ favorites, t, tData, handleBack }) {
  const navigate = useNavigate()

  const favHotels = hotels.filter(h => favorites.has('hotel_' + h.id))
  const favRooms = roomTypes.filter(r => favorites.has('room_' + r.id))
  const favFood = menuItems.filter(m => favorites.has('food_' + m.id))
  const totalFav = favHotels.length + favRooms.length + favFood.length

  return (
    <div className="prophile-subpanel">
      <SubpanelHeader title={t("prophile.favoritesTitle")} count={totalFav} t={t} onBack={handleBack} />
      {totalFav === 0 ? (
        <EmptyPanel
          icon={<HeartIcon strokeWidth="1.8" />}
          text={t("prophile.favoritesEmpty")}
          actionLabel={t("prophile.viewHotels")}
          onAction={() => { handleBack(); navigate("/mehmonxonalar") }}
        />
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

function BookingsPanel({ userEmail, t, handleBack }) {
  const navigate = useNavigate()
  const savedBookings = getBookingCount(userEmail)
  let bookings = []
  try {
    bookings = JSON.parse(localStorage.getItem("bookings_" + userKey(userEmail)) || "[]")
  } catch {
    // corrupted bookings — show empty list
  }

  return (
    <div className="prophile-subpanel">
      <SubpanelHeader title={t("prophile.bookingsTitle")} count={savedBookings} t={t} onBack={handleBack} />
      {bookings.length === 0 ? (
        <EmptyPanel
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          }
          text={t("prophile.bookingsEmpty")}
          actionLabel={t("prophile.viewHotels")}
          onAction={() => { handleBack(); navigate("/mehmonxonalar") }}
        />
      ) : (
        <div className="prophile-fav-list">
          {bookings.map((b, i) => (
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

function SettingsPanel({ user, t, handleBack }) {
  return (
    <div className="prophile-subpanel">
      <SubpanelHeader title={t("prophile.settings")} t={t} onBack={handleBack} />
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

function HelpPanel({ t, handleBack }) {
  return (
    <div className="prophile-subpanel">
      <SubpanelHeader title={t("prophile.help")} t={t} onBack={handleBack} />
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

export default function ServicePanel({ activeKey, favorites, onClose, user, onSeen, userEmail, t, tData }) {
  if (!activeKey) return null

  function handleBack() {
    if (onSeen) onSeen(activeKey)
    onClose(null)
  }

  switch (activeKey) {
    case "favorites":
      return <FavoritesPanel favorites={favorites} t={t} tData={tData} handleBack={handleBack} />
    case "bookings":
      return <BookingsPanel userEmail={userEmail} t={t} handleBack={handleBack} />
    case "settings":
      return <SettingsPanel user={user} t={t} handleBack={handleBack} />
    case "help":
      return <HelpPanel t={t} handleBack={handleBack} />
    default:
      return null
  }
}
