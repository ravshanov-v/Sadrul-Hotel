import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import logoIconS from "../../Assets/Icons/logo-S-icon.png"
import close from "../../Assets/Icons/close.svg"
import { useModal } from "../../components/SmallWindows/Modal/useModal.js"
import { useAuth } from "../../components/Auth/useAuth"
import { validateEmail, getEmailErrorText } from "../../utils/auth"
import { useLanguage } from "../../components/Language/useLanguage.js"

import "./SignUp.css"

export default function SignUp() {
  const navigate = useNavigate()
  const { openModal } = useModal()
  const { login } = useAuth()
  const { t } = useLanguage()

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false
  })

  function handleChange(field) {
    return (e) => {
      const value = e.target.value
      setForm(prev => ({ ...prev, [field]: value }))
      setTouched(prev => {
        if (prev[field]) return prev
        return { ...prev, [field]: true }
      })
    }
  }

  function getPasswordStrength(pass) {
    if (!pass || pass.length < 6) return null
    const hasLetter = /[a-zA-Z]/.test(pass)
    const hasNumber = /[0-9]/.test(pass)
    const hasSpecial = /[^a-zA-Z0-9]/.test(pass)
    const types = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length

    if (types >= 3) return { level: 'mukammal' }
    if (types >= 2) return { level: 'normal' }
    return { level: 'oddiy' }
  }

  function getPasswordFeedback(pass) {
    const items = []
    if (pass.length < 6) items.push({ key: 'length', text: t("signup.minChars") })
    if (!/[a-zA-Z]/.test(pass)) items.push({ key: 'letter', text: t("signup.minLetter") })
    if (!/[0-9]/.test(pass)) items.push({ key: 'number', text: t("signup.minNumber") })
    if (!/[^a-zA-Z0-9]/.test(pass)) items.push({ key: 'special', text: t("signup.minSpecial") })
    return items
  }

  const emailCheck = form.email ? validateEmail(form.email) : { valid: false, errors: [] }

  const validations = {
    fullName: form.fullName.trim().length >= 2,
    email: emailCheck.valid,
    phone: /^[\d\s+\-()]{7,15}$/.test(form.phone),
    password: form.password.length >= 6,
    confirmPassword: form.confirmPassword === form.password && form.confirmPassword.length > 0
  }

  const allValid = Object.values(validations).every(Boolean)

  function inputClass(field) {
    if (field === 'password' && touched.password) {
      const s = getPasswordStrength(form.password)
      if (s) return `signup-input ${s.level}`
      return 'signup-input error'
    }
    const val = validations[field]
    return touched[field]
      ? `signup-input ${val ? "success" : "error"}`
      : "signup-input"
  }

  function handleSubmit(e) {
    e.preventDefault()
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true
    })
    if (allValid) {
      login({ fullName: form.fullName, email: form.email })
      setForm({ fullName: "", email: "", phone: "", password: "", confirmPassword: "" })
      setTouched({ fullName: false, email: false, phone: false, password: false, confirmPassword: false })
      navigate("/dashboard")
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        <button className="signup-close-btn" onClick={() => navigate("/")}>
          <img className="close" src={close} alt={t("signup.closeAlt")} />
        </button>
        <div className="signup-content">
          <div className="signup-left" data-aos="fade-right">
            <div className="signup-left-logo">
              <img className="signup-logo-img" src={logoIconS} alt={t("signup.logoAlt")} />
              <p className="signup-logo-p">{t("signup.logoSpan")}</p>
            </div>
            <span className="signup-left-decoration">
              <span>{t("signup.hotelSuffix")}</span>
            </span>
            <div className="signup-left-quote">
              <p>{t("signup.quote1")}</p>
              <p>{t("signup.quote2")}</p>
            </div>
          </div>

          <div className="signup-right" data-aos="fade-up">
            <h1 className="signup-h">{t("signup.title")}</h1>
            <p className="signup-desc">{t("signup.desc")}</p>

            <form className="signup-form" onSubmit={handleSubmit} noValidate autoComplete="off">
              <div className="signup-field">
                <input
                  className={inputClass("fullName")}
                  type="text"
                  placeholder={t("signup.fullName")}
                  value={form.fullName}
                  onChange={handleChange("fullName")}
                />
                {touched.fullName && !validations.fullName && (
                  <p className="signup-feedback error">{t("signup.nameError")}</p>
                )}
              </div>

              <div className="signup-field">
                <input
                  className={inputClass("email")}
                  type="email"
                  placeholder={t("signup.email")}
                  value={form.email}
                  onChange={handleChange("email")}
                />
                {touched.email && !validations.email && emailCheck.errors.length > 0 && (
                  <div className="signup-feedback-list">
                    {emailCheck.errors.map((code, i) => (
                      <p key={i} className="signup-field-error">{getEmailErrorText(code, t)}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="signup-field">
                <input
                  className={inputClass("phone")}
                  type="tel"
                  placeholder={t("signup.phone")}
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange("phone")}
                />
                {touched.phone && !validations.phone && (
                  <p className="signup-feedback error">{t("signup.phoneError")}</p>
                )}
              </div>

              <div className="signup-row">
                <div className="signup-field">
                  <div className="signup-pw-wrap">
                    <input
                      className={inputClass("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder={t("signup.password")}
                      autoComplete="new-password"
                      value={form.password}
                      onChange={handleChange("password")}
                    />
                    <button
                      type="button"
                      className="signup-eye-btn"
                      onClick={() => setShowPassword(prev => !prev)}
                      aria-label={showPassword ? t("signup.hidePwd") : t("signup.showPwd")}
                    >
                      {showPassword ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {touched.password && !validations.password && (
                    <p className="signup-feedback error">{t("signup.passwordLength")}</p>
                  )}
                  {touched.password && validations.password && (
                    <>
                      {getPasswordFeedback(form.password).length > 0 && (
                        <div className="signup-feedback-list">
                          {getPasswordFeedback(form.password).map(item => (
                            <p key={item.key} className="signup-feedback error">{item.text}</p>
                          ))}
                        </div>
                      )}
                      {getPasswordFeedback(form.password).length === 0 && getPasswordStrength(form.password) && (
                        <p className={`signup-feedback ${getPasswordStrength(form.password).level}`}>
                          {t(getPasswordStrength(form.password).level === 'oddiy' ? 'signup.weakPwd' : getPasswordStrength(form.password).level === 'normal' ? 'signup.mediumPwd' : 'signup.strongPwd')}
                        </p>
                      )}
                    </>
                  )}
                </div>

                <div className="signup-field">
                  <div className="signup-pw-wrap">
                    <input
                      className={inputClass("confirmPassword")}
                      type={showConfirm ? "text" : "password"}
                      placeholder={t("signup.confirmPassword")}
                      autoComplete="new-password"
                      value={form.confirmPassword}
                      onChange={handleChange("confirmPassword")}
                    />
                    <button
                      type="button"
                      className="signup-eye-btn"
                      onClick={() => setShowConfirm(prev => !prev)}
                      aria-label={showConfirm ? t("signup.hidePwd") : t("signup.showPwd")}
                    >
                      {showConfirm ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {touched.confirmPassword && !validations.confirmPassword && (
                    <p className="signup-feedback error">{t("signup.passwordMismatch")}</p>
                  )}
                </div>
              </div>

              <button className="signup-btn" type="submit" data-aos="zoom-in"><span>{t("signup.submit")}</span></button>
            </form>

            <p className="signup-login-link">
              {t("signup.haveAccount")} <span className="signup-toggle-link" onClick={() => { openModal(); navigate("/", { state: { openModal: true } }) }}>{t("signup.loginLink")}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
