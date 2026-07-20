import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { positionNames } from "../../../data/karyera"
import { useLanguage } from "../../../components/Language/useLanguage.js"
import { validateEmail } from "../../../utils/auth"
import "./Ariza.css"

export default function Ariza() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialPosition = searchParams.get("position") || ""

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    position: initialPosition,
    coverLetter: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [touched, setTouched] = useState({
    fullName: false,
    phone: false,
    email: false,
    position: false,
  })
  const { t, tData } = useLanguage()

  const emailCheck = form.email ? validateEmail(form.email) : { valid: false, errors: [] }

  const validations = {
    fullName: form.fullName.trim().length >= 2,
    phone: /^[\d\s+\-()]{7,15}$/.test(form.phone),
    email: emailCheck.valid,
    position: form.position !== "",
  }

  const allValid = Object.values(validations).every(Boolean)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setTouched(prev => prev[name] ? prev : { ...prev, [name]: true })
  }

  function inputClass(field) {
    const val = validations[field]
    return touched[field]
      ? `ariza-input ${val ? "success" : "error"}`
      : "ariza-input"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ fullName: true, phone: true, email: true, position: true })
    if (!allValid) return

    const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    if (!BOT_TOKEN || !CHAT_ID) { alert(t("ariza.errorConfig")); return }

    const text = `
📩 ${t("ariza.telegramNewApp")}

 ${t("ariza.telegramName")}: ${form.fullName}

 ${t("ariza.telegramPhone")}: ${form.phone}

 ${t("ariza.telegramEmail")}: ${form.email}

 ${t("ariza.telegramPosition")}: ${form.position}

 ${t("ariza.telegramLetter")}:

${form.coverLetter}
`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text,
          }),
        }
      );

      const data = await response.json();

      if (data.ok) {
        setSubmitted(true);
      } else {
        alert(t("ariza.errorTelegram"));
      }
    } catch (error) {
      alert(t("ariza.errorNetwork"));
    }
  };
  if (submitted) {
    return (
      <div className="ariza-page">
        <div className="ariza-hero" data-aos="fade-up">
          <div className="ariza-hero-overlay" />
          <div className="ariza-hero-content" data-aos="fade-up">
            <h1 data-aos="fade-up">{t("ariza.successTitle")}</h1>
            <p className="ariza-hero-sub" data-aos="fade-up">{t("ariza.successSub")}</p>
          </div>
        </div>
        <div className="ariza-body" data-aos="fade-up">
          <div className="ariza-success-card" data-aos="fade-up">
            <div className="ariza-success-icon" data-aos="zoom-in" data-aos-delay="100">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#D4AF37" strokeWidth="2" />
                <path d="M8 12L11 15L16 9" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 data-aos="fade-up" data-aos-delay="200">{t("ariza.successGreeting")}, {form.fullName}!</h2>
            <p className="ariza-success-text" data-aos="fade-up" data-aos-delay="300">
              {t("ariza.successYou")} <strong>{form.position}</strong> {t("ariza.successText")}
            </p>
            <p className="ariza-success-note" data-aos="fade-up" data-aos-delay="400">{t("ariza.successNote")}</p>
            <button className="ariza-btn ariza-btn-primary" data-aos="fade-up" data-aos-delay="500" onClick={() => navigate("/biz-haqimizda")}>
              {t("ariza.backBtn")}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ariza-page">
      <div className="ariza-hero" data-aos="fade-up">
        <div className="ariza-hero-overlay" />
        <div className="ariza-hero-content" data-aos="zoom-in">
          <div className="ariza-badge" data-aos="fade-up" data-aos-delay="0">{t("ariza.heroBadge")}</div>
          <h1 data-aos="fade-up">{t("ariza.heroTitle")}</h1>
          <p className="ariza-hero-sub" data-aos="fade-up">{t("ariza.heroDesc")}</p>
        </div>
      </div>

      <div className="ariza-body" data-aos="fade-up">
          <div className="ariza-container" data-aos="fade-up">
          <form className="ariza-form" onSubmit={handleSubmit} data-aos="fade-up">
            <h2 className="ariza-form-title" data-aos="fade-up">{t("ariza.formTitle")}</h2>
            <div className="ariza-form-grid">
              <div className="ariza-form-group ariza-full">
                <label>{t("ariza.fullName")}</label>
                <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder={t("ariza.namePlaceholder")} className={inputClass("fullName")} />
                {touched.fullName && !validations.fullName && (
                  <p className="ariza-feedback error">{t("ariza.nameError")}</p>
                )}
              </div>
              <div className="ariza-form-group">
                <label>{t("ariza.phone")}</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder={t("ariza.phonePlaceholder")} className={inputClass("phone")} />
                {touched.phone && !validations.phone && (
                  <p className="ariza-feedback error">{t("ariza.phoneError")}</p>
                )}
              </div>
              <div className="ariza-form-group">
                <label>{t("ariza.email")}</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder={t("ariza.emailPlaceholder")} className={inputClass("email")} />
                {touched.email && !validations.email && (
                  <p className="ariza-feedback error">{t("ariza.emailError")}</p>
                )}
              </div>
              <div className="ariza-form-group ariza-full">
                <label>{t("ariza.position")}</label>
                <select name="position" value={form.position} onChange={handleChange} className={inputClass("position")}>
                  <option value="" disabled>{t("ariza.selectDefault")}</option>
                  {positionNames.map((p, idx) => (
                    <option key={p} value={p}>{tData("data.careers." + idx + ".title", p)}</option>
                  ))}
                </select>
                {touched.position && !validations.position && (
                  <p className="ariza-feedback error">{t("ariza.positionError")}</p>
                )}
              </div>
              <div className="ariza-form-group ariza-full">
                <label>{t("ariza.coverLetter")}</label>
                <textarea name="coverLetter" value={form.coverLetter} onChange={handleChange} placeholder={t("ariza.letterPlaceholder")} rows={5} />
              </div>
            </div>

            <button type="submit" className="ariza-btn ariza-btn-primary ariza-btn-submit" data-aos="zoom-in">
              {t("ariza.submitBtn")}
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
