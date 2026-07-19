import { useState, useEffect, useMemo } from "react"
import { useParams, useNavigate, useSearchParams } from "react-router-dom"
import { hotels } from "../../../data/hotels"
import { useAuth } from "../../../components/Auth/useAuth.js"
import { menuItems } from "../../../data/taomnoma"
import { categoryMultiplier, roomTypes } from "../../../utils/roomData"
import { checkRoomAvailability, getSimilarRooms } from "../../../utils/availability"
import { takliflar } from "../../../data/takliflar"
import { createBookingVoucher, getCurrentUserEmail, sendVoucherEmail } from "../../../utils/auth"
import "./BronQilish.css"
import { useLanguage } from "../../../components/Language/useLanguage.js"

export default function BronQilish() {
  const { hotelId } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const { t, tData } = useLanguage()
  const hotel = hotels.find(h => h.id === Number(hotelId)) || hotels[0]

  const roomLabel = (type) => ({
    standart: t("booking.roomStandard"),
    hashamatli: t("booking.roomLuxury"),
    biznes: t("booking.roomBusiness"),
    oilaviy: t("booking.roomFamily"),
    lyuks: t("booking.roomDeluxe"),
    prezident: t("booking.roomPresidential"),
  }[type] || t("booking.roomStandard"))

  const roomParamRaw = searchParams.get("room") || "standart"
  const roomParam = roomParamRaw.includes("-") ? roomParamRaw.split("-")[0] : roomParamRaw
  const promoCode = searchParams.get("promo") || ""
  const promoDiscount = Number(searchParams.get("discount")) || 0
  const urlCheckIn = searchParams.get("checkIn") || ""
  const urlCheckOut = searchParams.get("checkOut") || ""

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    checkIn: urlCheckIn,
    checkOut: urlCheckOut,
    guests: 2,
    roomType: roomParam,
    paymentMethod: "naqt",
    cardNumber: "",
    cardExpiry: "",
    cardPin: "",
    cardName: ""
  })
  const [cardErrors, setCardErrors] = useState({})
  const [availability, setAvailability] = useState(null)
  const [similarRooms, setSimilarRooms] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [emailStatus, setEmailStatus] = useState("idle")
  const [availChecking, setAvailChecking] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!form.checkIn || !form.checkOut || !form.roomType || !hotel) {
      setAvailability(null)
      setSimilarRooms([])
      return
    }
    setAvailChecking(true)
    const timer = setTimeout(() => {
      const result = checkRoomAvailability(hotel.id, form.roomType + "-1", form.checkIn, form.checkOut, user?.email, roomTypes)
      setAvailability(result)
      if (!result.available) {
        const similar = getSimilarRooms(hotel.id, form.roomType + "-1", roomTypes, hotel.price)
        setSimilarRooms(similar)
      } else {
        setSimilarRooms([])
      }
      setAvailChecking(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [form.checkIn, form.checkOut, form.roomType, hotel?.id, user?.email])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [toast])

  const handleChange = (e) => {
    const { name, value } = e.target
    let val = value
    if (name === "cardNumber") {
      val = value.replace(/\D/g, "").slice(0, 16)
      val = val.replace(/(\d{4})(?=\d)/g, "$1 ")
    }
    if (name === "cardExpiry") {
      val = value.replace(/\D/g, "").slice(0, 6)
      if (val.length > 2) {
        let yr = val.slice(2)
        if (yr.length === 4) {
          const fullYear = parseInt(yr, 10)
          if (fullYear > 99) yr = (fullYear % 100).toString().padStart(2, "0")
        }
        val = val.slice(0, 2) + "/" + yr.slice(0, 2)
      }
    }
    if (name === "cardPin") {
      val = value.replace(/\D/g, "").slice(0, 6)
    }
    setForm(prev => ({ ...prev, [name]: val }))
    setCardErrors(prev => ({ ...prev, [name]: "" }))
  }

  const validateCard = () => {
    const errs = {}
    if (!form.cardName.trim()) errs.cardName = t("booking.cardNameError")
    const cardDigits = form.cardNumber.replace(/\s/g, "")
    if (cardDigits.length !== 16) errs.cardNumber = t("booking.cardNumberError")
    const expParts = form.cardExpiry.split("/")
    if (expParts.length !== 2 || !expParts[0] || !expParts[1]) {
      errs.cardExpiry = t("booking.cardExpiryError")
    } else {
      const mm = parseInt(expParts[0], 10)
      let yy = parseInt(expParts[1], 10)
      if (yy > 99) yy = yy % 100
      if (mm < 1 || mm > 12) errs.cardExpiry = t("booking.cardExpiryMonthError")
      else {
        const now = new Date()
        const curYY = parseInt(now.getFullYear().toString().slice(-2), 10)
        const curMM = now.getMonth() + 1
        if (yy < curYY || (yy === curYY && mm < curMM)) errs.cardExpiry = t("booking.cardExpiredError")
      }
    }
    if (form.cardPin.length !== 6) errs.cardPin = t("booking.cardPinError")
    return errs
  }

  const checkInDate = new Date(form.checkIn)
  const checkOutDate = new Date(form.checkOut)
  const nights = form.checkIn && form.checkOut ? Math.max(0, (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)) : 0
  const rawTotal = hotel ? Math.round(hotel.price * nights * (categoryMultiplier[form.roomType] || 1)) : 0
  const totalPrice = promoDiscount ? Math.round(rawTotal * (1 - promoDiscount / 100)) : rawTotal

  const voucherEmail = getCurrentUserEmail()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (availability && !availability.available) {
      setToast(t("booking.toastUnavailable"))
      return
    }
    if (form.paymentMethod === "karta") {
      const errs = validateCard()
      setCardErrors(errs)
      if (Object.keys(errs).length > 0) return
    }
    const guestEmail = voucherEmail
    if (!guestEmail) {
      setToast(t("booking.toastLogin"))
      return
    }
    let voucher
    try {
      const bk = "bookings_" + guestEmail
      const existing = JSON.parse(localStorage.getItem(bk) || "[]")
      voucher = createBookingVoucher({
        hotel,
        formData: { ...form, guestEmail },
        totalPrice
      })
      existing.push(voucher)
      localStorage.setItem(bk, JSON.stringify(existing))
    } catch {}
    setSubmitted(true)
    setEmailStatus("sending")
    const result = await sendVoucherEmail(voucher)
    if (result.success) {
      setEmailStatus("sent")
    } else if (result.demo) {
      setEmailStatus("demo")
    } else {
      setEmailStatus("failed")
    }
  }

  const today = new Date().toISOString().split("T")[0]

  const recommendations = useMemo(() => {
    if (!submitted || !hotel) return []
    const hotelTakliflar = takliflar.filter(t => t.hotelId === hotel.id)
    const amenities = hotel.amenities || []
    const menu = menuItems.filter(m => m.available && m.image)
    const hName = tData("data.hotels." + hotel.id + ".name", hotel.name)
    const recs = []

    if (menu.length > 0 && amenities.includes("Restoran")) {
      recs.push({
        id: "restaurant",
        title: `${hName} ${t("booking.restaurantSuffix")}`,
        desc: t("booking.restaurantDesc", { count: menu.length }),
        image: menu[0].image,
        btnText: t("booking.viewMenu"),
        action: () => navigate("/taomnoma")
      })
      const chefPick = menu[Math.floor(Math.random() * menu.length)]
      recs.push({
        id: "chef",
        title: t("booking.chefPick"),
        desc: `${tData("data.menu." + chefPick.id + ".name", chefPick.name)} — ${tData("data.menu." + chefPick.id + ".description", chefPick.description)}`,
        image: chefPick.image,
        btnText: t("booking.orderNow"),
        action: () => navigate(`/taomnoma/${chefPick.id}`)
      })
    }

    if (amenities.includes("SPA")) {
      recs.push({
        id: "spa",
        title: `${hName} ${t("booking.spaSuffix")}`,
        desc: t("booking.spaDesc"),
        image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&q=80",
        btnText: t("booking.goToSpa"),
        action: () => navigate(`/mehmonxona/${hotel.id}`)
      })
    }

    if (amenities.includes("Basseyn")) {
      recs.push({
        id: "pool",
        title: `${hName} ${t("booking.poolTitle")}`,
        desc: t("booking.poolDesc"),
        image: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=400&q=80",
        btnText: t("booking.moreInfo"),
        action: () => navigate(`/mehmonxona/${hotel.id}`)
      })
    }

    if (amenities.includes("Fitness")) {
      recs.push({
        id: "fitness",
        title: `${hName} ${t("booking.fitnessTitle")}`,
        desc: t("booking.fitnessDesc"),
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
        btnText: t("booking.moreInfo"),
        action: () => navigate(`/mehmonxona/${hotel.id}`)
      })
    }

    if (hotelTakliflar.length > 0) {
      const pkg = hotelTakliflar[0]
      recs.push({
        id: "package",
        title: `${hName} ${t("booking.specialOffer")}`,
        desc: `${tData("data.offers." + pkg.id + ".title", pkg.title)} — ${(tData("data.offers." + pkg.id + ".description", pkg.description || "")).substring(0, 80)}...`,
        image: pkg.image,
        btnText: t("booking.viewPackage"),
        action: () => navigate(`/mehmonxona/${pkg.hotelId}?promo=${pkg.promoCode}&room=${pkg.roomId}&discount=${pkg.discount}`)
      })
    }

    recs.push({
      id: "transfer",
      title: `${hName} ${t("booking.transferTitle")}`,
      desc: t("booking.transferDesc"),
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80",
      btnText: t("booking.orderTransfer"),
      action: () => navigate(`/mehmonxona/${hotel.id}`)
    })

    if (amenities.includes("Restoran")) {
      recs.push({
        id: "breakfast",
        title: `${hName} ${t("booking.breakfastTitle")}`,
        desc: t("booking.breakfastDesc"),
        image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80",
        btnText: t("booking.orderBreakfast"),
        action: () => navigate("/taomnoma")
      })
    }

    recs.push({
      id: "addons",
      title: t("booking.addonsTitle"),
      desc: t("booking.addonsDesc", { hotel: hName }),
      image: "https://images.unsplash.com/photo-1549633038-e0ca1d15e2e1?w=400&q=80",
      btnText: t("booking.moreInfo"),
      action: () => navigate("/takliflar")
    })

    return recs
  }, [submitted, hotel])

  if (submitted) {
    return (
      <div className="bq-page" data-aos="fade-up">
        <div className="bq-sc" data-aos="fade-up">
          <div className="bq-sc-inner" data-aos="fade-up">
            <div className="bq-sc-hero" data-aos="fade-up">
              <div className="bq-sc-check" data-aos="zoom-in">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#D4AF37" strokeWidth="2" />
                  <path d="M8 12L11 15L16 9" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1 className="bq-sc-title" data-aos="fade-up" data-aos-delay="100">{t("booking.successTitle")}</h1>
              <p className="bq-sc-sub" data-aos="fade-up" data-aos-delay="200">
                {t("booking.successGreeting")} <strong>{form.fullName}</strong>! <strong>{tData("data.hotels." + hotel?.id + ".name", hotel?.name || "")}</strong> {t("booking.successBooked")}
              </p>
            </div>

            <div className="bq-sc-card" data-aos="fade-up" data-aos-delay="300">
              <div className="bq-sc-card-header" data-aos="fade-up">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 10h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {t("booking.bookingInfo")}
              </div>
              <div className="bq-sc-rows" data-aos="fade-up">
                <div className="bq-sc-row" data-aos="fade-up">
                  <span className="bq-sc-label">{t("booking.hotel")}</span>
                  <span className="bq-sc-value">{tData("data.hotels." + hotel?.id + ".name", hotel?.name || "")}</span>
                </div>
                <div className="bq-sc-row" data-aos="fade-up">
                  <span className="bq-sc-label">{t("booking.checkIn")}</span>
                  <span className="bq-sc-value">{form.checkIn}</span>
                </div>
                <div className="bq-sc-row" data-aos="fade-up">
                  <span className="bq-sc-label">{t("booking.checkOut")}</span>
                  <span className="bq-sc-value">{form.checkOut}</span>
                </div>
                <div className="bq-sc-row" data-aos="fade-up">
                  <span className="bq-sc-label">{t("booking.guests")}</span>
                  <span className="bq-sc-value">{form.guests} {t("booking.guestsCount")}</span>
                </div>
                <div className="bq-sc-row" data-aos="fade-up">
                  <span className="bq-sc-label">{t("booking.roomType")}</span>
                  <span className="bq-sc-value">{roomLabel(form.roomType)}</span>
                </div>
                <div className="bq-sc-row" data-aos="fade-up">
                  <span className="bq-sc-label">{t("booking.paymentMethod")}</span>
                  <span className="bq-sc-value">{form.paymentMethod === "naqt" ? t("booking.cash") : t("booking.card")}</span>
                </div>
                <div className="bq-sc-row bq-sc-total" data-aos="fade-up">
                  <span className="bq-sc-label">{t("booking.total")}</span>
                  <span className="bq-sc-total-amount">${totalPrice}</span>
                </div>
              </div>
              <div className="bq-sc-voucher" data-aos="fade-up">
                <div className="bq-sc-voucher-row" data-aos="fade-up">
                  <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                    <rect x="2" y="4" width="20" height="16" rx="2" stroke="#D4AF37" strokeWidth="1.5" />
                    <path d="M22 6L12 13L2 6" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{t("booking.voucherTo")}</span>
                </div>
                <div className="bq-sc-voucher-email" data-aos="fade-up">{voucherEmail}</div>
                {emailStatus === "sending" && (
                  <div className="bq-sc-voucher-sending" data-aos="fade-up">
                    <div className="bq-sc-voucher-spinner" />
                    {t("booking.voucherSending")}
                  </div>
                )}
                {emailStatus === "sent" && (
                  <div className="bq-sc-voucher-success" data-aos="fade-up">
                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t("booking.voucherSent")}
                  </div>
                )}
                {emailStatus === "demo" && (
                  <div className="bq-sc-voucher-demo" data-aos="fade-up">
                    <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    {t("booking.voucherDemo")}
                  </div>
                )}
                {emailStatus === "failed" && (
                  <div className="bq-sc-voucher-failed" data-aos="fade-up">
                    <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    {t("booking.voucherFailed")}
                  </div>
                )}
              </div>
              <button className="bq-sc-btn" data-aos="zoom-in" onClick={() => navigate("/mehmonxonalar")}>
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t("booking.backToHotels")}
              </button>
            </div>

            {recommendations.length > 0 && (
              <div className="bq-sc-recs" data-aos="fade-up">
                <div className="bq-sc-recs-header" data-aos="fade-up">
                  <span className="bq-sc-recs-line" data-aos="fade-up" />
                  <span data-aos="fade-up">{t("booking.recommendations")}</span>
                  <span className="bq-sc-recs-line" data-aos="fade-up" />
                </div>
                <div className="bq-sc-recs-track" data-aos="fade-up">
                  {recommendations.map((rec, ridx) => (
                    <div key={rec.id} className="bq-sc-rec" data-aos="fade-up" data-aos-delay={ridx * 50} onClick={rec.action}>
                      <div className="bq-sc-rec-img">
                        <img src={rec.image} alt={rec.title} loading="lazy" />
                        <div className="bq-sc-rec-overlay" />
                      </div>
                      <div className="bq-sc-rec-body">
                        <h4 data-aos="fade-up">{rec.title}</h4>
                        <p data-aos="fade-up">{rec.desc}</p>
                        <span className="bq-sc-rec-btn" data-aos="zoom-in">
                          {rec.btnText}
                          <svg viewBox="0 0 24 24" fill="none">
                            <path d="M5 12h14M19 12l-6-6M19 12l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
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

  return (
    <div className="bq-page" data-aos="fade-up">
      <div className="bq-hero" data-aos="fade-up">
        <div className="bq-hero-overlay" data-aos="fade-up" />
        <div className="bq-hero-content" data-aos="zoom-in">
          <div className="bq-badge" data-aos="fade-up">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
            </svg>
            {t("booking.heroBadge")}
            {promoCode && (
              <span className="bq-promo-hero-badge" data-aos="fade-up">{promoCode} · {promoDiscount}%</span>
            )}
          </div>
          <h1 data-aos="fade-up" data-aos-delay="100">{tData("data.hotels." + hotel?.id + ".name", hotel?.name || t("booking.fallbackHotel"))}</h1>
          <p className="bq-hero-sub" data-aos="fade-up" data-aos-delay="200">{tData("data.hotels." + hotel?.id + ".location", hotel?.location || "")}</p>
        </div>
      </div>

      <div className="bq-body" data-aos="fade-up">
          <div className="bq-container" data-aos="fade-up">
            <div className="bq-main" data-aos="fade-up">
            <div className="bq-hotel-preview" data-aos="fade-up">
              <img src={hotel?.image} data-aos="fade-up" alt={tData("data.hotels." + hotel?.id + ".name", hotel?.name || "")} />
              <div className="bq-hotel-info" data-aos="fade-up">
                <div className="bq-hotel-rating" data-aos="fade-up">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  {hotel?.rating}
                  <span className="bq-hotel-reviews">{t("booking.reviews", { count: hotel?.reviews })}</span>
                </div>
                <p className="bq-hotel-desc" data-aos="fade-up">{tData("data.hotels." + hotel?.id + ".description", hotel?.description || "")}</p>
                <div className="bq-hotel-price" data-aos="fade-up">
                  <span className="bq-price-amount">${hotel?.price}</span>
                  <span className="bq-price-unit">{t("booking.perNight")}</span>
                </div>
              </div>
            </div>

            <form className="bq-form" onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="100">
              <h2 className="bq-form-title" data-aos="fade-up">{t("booking.personalInfo")}</h2>
              <div className="bq-form-grid" data-aos="fade-up">
                <div className="bq-form-group bq-full" data-aos="fade-up">
                  <label>{t("booking.fullName")}</label>
                  <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder={t("booking.namePlaceholder")} required />
                </div>
                <div className="bq-form-group" data-aos="fade-up">
                  <label>{t("booking.phone")}</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder={t("booking.phonePlaceholder")} required />
                </div>
              </div>

              <div className="bq-email-info" data-aos="fade-up">
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="#D4AF37" strokeWidth="1.5" />
                  <path d="M22 6L12 13L2 6" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{t("booking.voucherTo")} <strong>{voucherEmail || t("booking.emailNotFound")}</strong></span>
              </div>

              <h2 className="bq-form-title" data-aos="fade-up">{t("booking.bookingInfo")}</h2>
              <div className="bq-form-grid" data-aos="fade-up">
                <div className="bq-form-group" data-aos="fade-up">
                  <label>{t("booking.checkIn")}</label>
                  <input type="date" name="checkIn" value={form.checkIn} onChange={handleChange} min={today} required />
                </div>
                <div className="bq-form-group" data-aos="fade-up">
                  <label>{t("booking.checkOut")}</label>
                  <input type="date" name="checkOut" value={form.checkOut} onChange={handleChange} min={form.checkIn || today} required />
                </div>
                <div className="bq-form-group" data-aos="fade-up">
                  <label>{t("booking.guests")}</label>
                  <input type="number" name="guests" value={form.guests} onChange={handleChange} min="1" max="10" required />
                </div>
                <div className="bq-form-group" data-aos="fade-up">
                  <label>{t("booking.roomType")}</label>
                  <select name="roomType" value={form.roomType} onChange={handleChange}>
                    <option value="standart">{t("booking.roomStandard")}</option>
                    <option value="hashamatli">{t("booking.roomLuxury")}</option>
                    <option value="biznes">{t("booking.roomBusiness")}</option>
                    <option value="oilaviy">{t("booking.roomFamily")}</option>
                    <option value="lyuks">{t("booking.roomDeluxe")}</option>
                    <option value="prezident">{t("booking.roomPresidential")}</option>
                  </select>
                </div>
              </div>

              <h2 className="bq-form-title" data-aos="fade-up">{t("booking.paymentMethod")}</h2>
              <div className="bq-payment-grid" data-aos="fade-up">
                <label className={`bq-payment-card ${form.paymentMethod === "naqt" ? "active" : ""}`} data-aos="fade-up" data-aos-delay="0">
                  <input type="radio" name="paymentMethod" value="naqt" checked={form.paymentMethod === "naqt"} onChange={handleChange} />
                  <span className="bq-payment-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span className="bq-payment-label">{t("booking.cash")}</span>
                  <span className="bq-payment-desc">{t("booking.cashDesc")}</span>
                </label>
                <label className={`bq-payment-card ${form.paymentMethod === "karta" ? "active" : ""}`} data-aos="fade-up" data-aos-delay="100">
                  <input type="radio" name="paymentMethod" value="karta" checked={form.paymentMethod === "karta"} onChange={handleChange} />
                  <span className="bq-payment-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="6" y1="16" x2="10" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="bq-payment-label">{t("booking.card")}</span>
                  <span className="bq-payment-desc">{t("booking.cardDesc")}</span>
                </label>
              </div>

              {form.paymentMethod === "naqt" && (
                <div className="bq-cash-notice" data-aos="fade-up">
                  <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span>{t("booking.cashNotice")}</span>
                </div>
              )}

              {form.paymentMethod === "karta" && (
                <div className="bq-card-form" data-aos="fade-up">
                  <h3 className="bq-card-form-title" data-aos="fade-up">{t("booking.cardFormTitle")}</h3>
                  <div className="bq-card-form-grid" data-aos="fade-up">
                    <div className="bq-form-group bq-full" data-aos="fade-up">
                      <label>{t("booking.cardName")}</label>
                      <input type="text" name="cardName" value={form.cardName} onChange={handleChange} placeholder={t("booking.cardNamePlaceholder")} className={cardErrors.cardName ? 'bq-input-error' : ''} required />
                      {cardErrors.cardName && <span className="bq-field-error">{cardErrors.cardName}</span>}
                    </div>
                    <div className="bq-form-group bq-full" data-aos="fade-up">
                      <label>{t("booking.cardNumber")}</label>
                      <input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder={t("booking.cardNumberPlaceholder")} maxLength="19" className={cardErrors.cardNumber ? 'bq-input-error' : ''} required />
                      {cardErrors.cardNumber && <span className="bq-field-error">{cardErrors.cardNumber}</span>}
                    </div>
                    <div className="bq-form-group" data-aos="fade-up">
                      <label>{t("booking.cardExpiry")}</label>
                      <input type="text" name="cardExpiry" value={form.cardExpiry} onChange={handleChange} placeholder={t("booking.cardExpiryPlaceholder")} maxLength="5" className={cardErrors.cardExpiry ? 'bq-input-error' : ''} required />
                      {cardErrors.cardExpiry && <span className="bq-field-error">{cardErrors.cardExpiry}</span>}
                    </div>
                    <div className="bq-form-group" data-aos="fade-up">
                      <label>{t("booking.cardPin")}</label>
                      <input type="password" name="cardPin" value={form.cardPin} onChange={handleChange} placeholder="••••••" maxLength="6" className={cardErrors.cardPin ? 'bq-input-error' : ''} required />
                      {cardErrors.cardPin && <span className="bq-field-error">{cardErrors.cardPin}</span>}
                    </div>
                  </div>
                </div>
              )}

              <button type="submit" className="bq-btn bq-btn-primary bq-btn-submit" data-aos="zoom-in">
                {t("booking.confirmBtn")}
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </div>

          <div className="bq-sidebar" data-aos="fade-up" data-aos-delay="200">
            <div className="bq-summary" data-aos="fade-up">
              <h3 data-aos="fade-up">{t("booking.summaryTitle")}</h3>
              <div className="bq-summary-row" data-aos="fade-up">
                <span>{tData("data.hotels." + hotel?.id + ".name", hotel?.name || "")}</span>
                <span>${hotel?.price} × {nights || 1} {t("booking.nights")}</span>
              </div>
              <div className="bq-summary-row" data-aos="fade-up">
                <span>{t("booking.roomType")}</span>
                <span>{roomLabel(form.roomType)}</span>
              </div>
              <div className="bq-summary-row" data-aos="fade-up">
                <span>{t("booking.guests")}</span>
                <span>{form.guests} {t("booking.guestsCount")}</span>
              </div>
              <div className="bq-summary-row" data-aos="fade-up">
                <span>{t("booking.paymentMethod")}</span>
                <span>{form.paymentMethod === "naqt" ? t("booking.cash") : t("booking.card")}</span>
              </div>
              {nights > 0 && (
                <div className="bq-summary-row" data-aos="fade-up">
                  <span>{t("booking.nights")}</span>
                  <span>{nights}</span>
                </div>
              )}
              {promoCode && nights > 0 && (
                <>
                  <div className="bq-summary-row" data-aos="fade-up">
                    <span>{t("booking.originalPrice")}</span>
                    <span className="bq-price-old">${rawTotal}</span>
                  </div>
                  <div className="bq-summary-row bq-promo-row" data-aos="fade-up">
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" width="14" height="14" style={{marginRight: 6, verticalAlign: 'middle'}}>
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 7h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      {t("booking.promoActivated", { code: promoCode, discount: promoDiscount })}
                    </span>
                    <span className="bq-promo-amount">-${rawTotal - totalPrice}</span>
                  </div>
                </>
              )}
              <div className="bq-summary-divider" data-aos="fade-up" />
              <div className="bq-summary-total" data-aos="fade-up">
                <span>{t("booking.total")}</span>
                <span className={`bq-total-amount ${promoDiscount ? 'bq-total-promo' : ''}`}>${totalPrice}</span>
              </div>
              <p className="bq-summary-note" data-aos="fade-up">{t("booking.freeCancel")}</p>
            </div>

            {availChecking && (
              <div className="bq-avail-checking" data-aos="fade-up">
                <div className="bq-avail-spinner" />
                <span>{t("booking.availChecking")}</span>
              </div>
            )}

            {availability && !availChecking && (
              <div className={`bq-avail-badge ${availability.available ? (availability.remaining <= Math.ceil(availability.totalRooms / 3) ? 'bq-avail-limited' : 'bq-avail-available') : 'bq-avail-booked'}`} data-aos="fade-up">
                {availability.available ? (
                  <>
                    <span className="bq-avail-dot" />
                    <span>
                      {availability.remaining >= availability.totalRooms
                        ? t("booking.available")
                        : t("booking.available", { remaining: availability.remaining })}
                    </span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span>{t("booking.booked")}</span>
                  </>
                )}
              </div>
            )}

            {availability && !availability.available && !availChecking && similarRooms.length > 0 && (
              <div className="bq-similar-rooms" data-aos="fade-up">
                <h4 className="bq-similar-title" data-aos="fade-up">{t("booking.similarRooms")}</h4>
                <div className="bq-similar-list" data-aos="fade-up">
                  {similarRooms.slice(0, 4).map((room, sidx) => (
                    <div
                      key={room.id}
                      className="bq-similar-item"
                      data-aos="fade-up"
                      data-aos-delay={sidx * 50}
                      onClick={() => {
                        navigate(`/bron-qilish/${hotel.id}?room=${room.id}&checkIn=${form.checkIn}&checkOut=${form.checkOut}`)
                      }}
                    >
                      <img src={room.image} alt={tData("data.rooms." + room.id + ".name", room.name)} className="bq-similar-img" />
                      <div className="bq-similar-info">
                        <span className="bq-similar-name">{tData("data.rooms." + room.id + ".name", room.name)}</span>
                        <span className="bq-similar-price">${room.price}{t("booking.perNight")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {toast && (
        <div className="bq-toast" data-aos="fade-up" onClick={() => setToast(null)}>
          <svg viewBox="0 0 24 24" fill="none" className="bq-toast-icon">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>{toast}</span>
        </div>
      )}
    </div>
  )
}
