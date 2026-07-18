import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { hotels } from "../../data/hotels"
import { getSimilarRooms, getNearbyHotels, getAlternativeDates } from "../../utils/availability"
import { categoryMultiplier, roomTypes } from "../../utils/roomData"
import "./UnavailableModal.css"

export default function UnavailableModal({ hotelId, roomType, checkIn, checkOut, onClose }) {
  const navigate = useNavigate()
  const hotel = hotels.find(h => h.id === Number(hotelId)) || hotels[0]

  const [similarRooms] = useState(() => getSimilarRooms(hotelId, roomType, roomTypes, hotel?.price || 0))
  const [nearbyHotels] = useState(() => getNearbyHotels(hotel, hotels))
  const [alternativeDates] = useState(() => getAlternativeDates(checkIn, checkOut))

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  return (
    <div className="uam-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="uam-backdrop" />
      <div className="uam-modal">
        <div className="uam-header">
          <div className="uam-header-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="uam-header-text">
            <h2>Bu xona band</h2>
            <p>Kechirasiz, tanlagan xonangiz hozirda mavjud emas. Quyidagi alternativlarni ko'rib chiqing.</p>
          </div>
          <button className="uam-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="uam-body">
          {similarRooms.length > 0 && (
            <div className="uam-section">
              <h3 className="uam-section-title">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M3 7V5a2 2 0 012-2h14a2 2 0 012 2v2M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                O'xshash xonalar
              </h3>
              <div className="uam-rooms-grid">
                {similarRooms.slice(0, 4).map(room => (
                  <div
                    key={room.id}
                    className="uam-room-card"
                    onClick={() => {
                      navigate(`/bron-qilish/${hotel.id}?room=${room.id}`)
                      onClose()
                    }}
                  >
                    <img className="uam-room-img" src={room.image} alt={room.name} />
                    <div className="uam-room-info">
                      <h4>{room.name}</h4>
                      <div className="uam-room-cat">{room.category}</div>
                      <div className="uam-room-price">
                        ${Math.round(hotel.price * (categoryMultiplier[room.category] || 1))}
                        <small>/kecha</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {alternativeDates.length > 0 && (
            <div className="uam-section">
              <h3 className="uam-section-title">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 10h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Alternativ sanalar
              </h3>
              <div className="uam-dates-list">
                {alternativeDates.map((alt, i) => (
                  <div
                    key={i}
                    className="uam-date-chip"
                    onClick={() => {
                      navigate(`/bron-qilish/${hotel.id}?room=${roomType}&checkIn=${alt.checkIn}&checkOut=${alt.checkOut}`)
                      onClose()
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M3 10h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span>
                      <span className="uam-date-label">{alt.label}</span>
                      {alt.checkIn} – {alt.checkOut}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {nearbyHotels.length > 0 && (
            <div className="uam-section">
              <h3 className="uam-section-title">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                Yaqin atrofdagi mehmonxonalar
              </h3>
              <div className="uam-hotels-grid">
                {nearbyHotels.map(h => (
                  <div
                    key={h.id}
                    className="uam-hotel-card"
                    onClick={() => {
                      navigate(`/mehmonxona/${h.id}`)
                      onClose()
                    }}
                  >
                    <img className="uam-hotel-img" src={h.image} alt={h.name} />
                    <div className="uam-hotel-info">
                      <h4>{h.name}</h4>
                      <div className="uam-hotel-meta">
                        <span className="uam-hotel-rating">
                          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 12, height: 12, verticalAlign: 'middle', marginRight: 2 }}>
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                          </svg>
                          {h.rating}
                        </span>
                        <span>{h.rooms} xona</span>
                        <span className="uam-hotel-distance">
                          <svg viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                          {h.distance} km
                        </span>
                      </div>
                    </div>
                    <button className="uam-hotel-btn" onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/mehmonxona/${h.id}`)
                      onClose()
                    }}>
                      Ko'rish
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
