import { createRef, useRef, useMemo } from "react"
import searchIcon from "../../Assets/Icons/search.svg"
import "./BookingForm.css"
import { useLanguage } from "../Language/useLanguage.js"

export default function BookingForm({ variant = "light" }) {
  const { t } = useLanguage()

  const fields = useMemo(() => [
    {
      id: "destination",
      label: t("bookingForm.destination"),
      type: "text",
      placeholder: t("bookingForm.placeholder"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#D4AF37" strokeWidth="2" />
          <circle cx="12" cy="9" r="2.5" stroke="#D4AF37" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: "checkin",
      label: t("bookingForm.checkIn"),
      type: "date",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="#D4AF37" strokeWidth="2" />
          <path d="M3 10H21" stroke="#D4AF37" strokeWidth="2" />
          <path d="M8 2V6M16 2V6" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "checkout",
      label: t("bookingForm.checkOut"),
      type: "date",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="#D4AF37" strokeWidth="2" />
          <path d="M3 10H21" stroke="#D4AF37" strokeWidth="2" />
          <path d="M8 2V6M16 2V6" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "guests",
      label: t("bookingForm.guests"),
      type: "number",
      min: "1",
      defaultValue: "2",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M17 21V19C17 16.8 15.2 15 13 15H5C2.8 15 1 16.8 1 19V21" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
          <circle cx="9" cy="7" r="4" stroke="#D4AF37" strokeWidth="2" />
        </svg>
      )
    }
  ], [t])

  const refs = useRef(fields.map(() => createRef())).current

  return (
    <form className={`bf-form bf-${variant}`} onSubmit={e => e.preventDefault()}>
      <div className="bf-grid">
        {fields.map((f, i) => (
          <div className="bf-field" key={f.id}>
            <label className="bf-label" htmlFor={f.id}>{f.label}</label>
            <div className="bf-input-wrap" onClick={() => refs[i]?.current?.focus()}>
              <span className="bf-input-icon">{f.icon}</span>
              <input
                ref={refs[i]}
                id={f.id}
                className="bf-input"
                type={f.type}
                placeholder={f.placeholder || ""}
                min={f.min || ""}
                defaultValue={f.defaultValue || ""}
              />
            </div>
          </div>
        ))}
        <div className="bf-action">
          <label className="bf-label">&nbsp;</label>
          <button className="bf-btn" type="submit">
            <img className="bf-btn-icon" src={searchIcon} alt="" />
            {t("bookingForm.search")}
          </button>
        </div>
      </div>
    </form>
  )
}
