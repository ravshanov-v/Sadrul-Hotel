import { useState, useEffect } from "react"
import close from "../../../Assets/Icons/close.svg"
import logoIconS from "../../../Assets/Icons/logo-S-icon.png"
import { useModal } from "./useModal"
import { useAuth } from "../../Auth/useAuth"
import { validateEmail } from "../../../utils/auth"
import { useLanguage } from "../../Language/useLanguage.js"
import "./SignUpModal.css"

export default function SignUpModal() {
  const { isOpen, modalType, modalReason, openModal, closeModal } = useModal()
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

  useEffect(() => {
    if (isOpen && modalType === 'signup') {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen, modalType])

  useEffect(() => {
    if (!isOpen || modalType !== 'signup') {
      setForm({ fullName: "", email: "", phone: "", password: "", confirmPassword: "" })
      setTouched({ fullName: false, email: false, phone: false, password: false, confirmPassword: false })
      setShowPassword(false)
      setShowConfirm(false)
    }
  }, [isOpen, modalType])

  function handleChange(field) {
    return (e) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }))
      if (!touched[field]) {
        setTouched(prev => ({ ...prev, [field]: true }))
      }
    }
  }

  function getPasswordStrength(pass) {
    if (!pass || pass.length < 6) return null
    const hasLetter = /[a-zA-Z]/.test(pass)
    const hasNumber = /[0-9]/.test(pass)
    const hasSpecial = /[^a-zA-Z0-9]/.test(pass)
    const types = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length
    if (types >= 3) return { level: 'strong' }
    if (types >= 2) return { level: 'medium' }
    return { level: 'weak' }
  }

  function getPasswordFeedback(pass) {
    const items = []
    if (pass.length < 6) items.push({ key: 'length', text: t("signupModal.minChars") })
    if (!/[a-zA-Z]/.test(pass)) items.push({ key: 'letter', text: t("signupModal.minLetter") })
    if (!/[0-9]/.test(pass)) items.push({ key: 'number', text: t("signupModal.minNumber") })
    if (!/[^a-zA-Z0-9]/.test(pass)) items.push({ key: 'special', text: t("signupModal.minSpecial") })
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
      login({ fullName: form.fullName, email: form.email, phone: form.phone })
      closeModal()
    }
  }

  if (!isOpen || modalType !== 'signup') return null

  return (
    <div className="modal-backdrop" onClick={closeModal} role="dialog" aria-modal="true">
      <div className="su-modal-window" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeModal}>
          <img className="close" src={close} alt={t("signupModal.closeAlt")} />
        </button>
        <div className="su-modal-content">
          <div className="su-modal-left">
            <div className="su-modal-left-logo">
              <img className="su-left-logo-img" src={logoIconS} alt={t("signupModal.logoAlt")} />
              <p className="su-left-logo-p">{t("signupModal.logoSpan")}</p>
            </div>
            <div className="su-left-decoration">
              <span>{t("signupModal.hotelSpan")}</span>
            </div>
            <div className="su-left-quote">
              <p>{t("signupModal.quote1")}</p>
              <p>{t("signupModal.quote2")}</p>
            </div>
          </div>
          <div className="su-modal-right">
            {modalReason && (
              <div className="su-reason-banner">{modalReason}</div>
            )}
            <h1 className="su-right-h">{t("signupModal.title")}</h1>
            <p className="su-right-desc">{t("signupModal.desc")}</p>
            <form className="su-modal-form" onSubmit={handleSubmit} noValidate>
              <div className="su-modal-field">
                <input
                  className={inputClass("fullName")}
                  type="text"
                  placeholder={t("signupModal.namePlaceholder")}
                  value={form.fullName}
                  onChange={handleChange("fullName")}
                />
                {touched.fullName && !validations.fullName && (
                  <p className="su-feedback error">{t("signupModal.nameError")}</p>
                )}
              </div>
              <div className="su-modal-row">
                <div className="su-modal-field">
                  <input
                    className={inputClass("email")}
                    type="email"
                    placeholder={t("signupModal.emailPlaceholder")}
                    value={form.email}
                    onChange={handleChange("email")}
                  />
                  {touched.email && !validations.email && emailCheck.errors.length > 0 && (
                    <div className="su-feedback-list">
                      {emailCheck.errors.map((msg, i) => (
                        <p key={i} className="su-feedback error">{msg}</p>
                      ))}
                    </div>
                  )}
                </div>
                <div className="su-modal-field">
                  <input
                    className={inputClass("phone")}
                    type="tel"
                    placeholder={t("signupModal.phonePlaceholder")}
                    value={form.phone}
                    onChange={handleChange("phone")}
                  />
                  {touched.phone && !validations.phone && (
                    <p className="su-feedback error">{t("signupModal.phoneError")}</p>
                  )}
                </div>
              </div>
              <div className="su-modal-row">
                <div className="su-modal-field">
                  <div className="su-pw-wrap">
                    <input
                      className={inputClass("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder={t("signupModal.passwordPlaceholder")}
                      value={form.password}
                      onChange={handleChange("password")}
                    />
                    <button
                      type="button"
                      className="su-eye-btn"
                      onClick={() => setShowPassword(prev => !prev)}
                      aria-label={showPassword ? t("signupModal.hidePwd") : t("signupModal.showPwd")}
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
                    <p className="su-feedback error">{t("signupModal.passErrorShort")}</p>
                  )}
                  {touched.password && validations.password && (
                    <>
                      {getPasswordFeedback(form.password).length > 0 && (
                        <div className="su-feedback-list">
                          {getPasswordFeedback(form.password).map(item => (
                            <p key={item.key} className="su-feedback error">{item.text}</p>
                          ))}
                        </div>
                      )}
                      {getPasswordFeedback(form.password).length === 0 && getPasswordStrength(form.password) && (
                        <p className={`su-feedback ${getPasswordStrength(form.password).level}`}>
                          {getPasswordStrength(form.password).level === 'weak' ? t("signupModal.weakPwd") : getPasswordStrength(form.password).level === 'medium' ? t("signupModal.mediumPwd") : t("signupModal.strongPwd")}
                        </p>
                      )}
                    </>
                  )}
                </div>
                <div className="su-modal-field">
                  <div className="su-pw-wrap">
                    <input
                      className={inputClass("confirmPassword")}
                      type={showConfirm ? "text" : "password"}
                      placeholder={t("signupModal.confirmPlaceholder")}
                      value={form.confirmPassword}
                      onChange={handleChange("confirmPassword")}
                    />
                    <button
                      type="button"
                      className="su-eye-btn"
                      onClick={() => setShowConfirm(prev => !prev)}
                      aria-label={showConfirm ? t("signupModal.hidePwd") : t("signupModal.showPwd")}
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
                    <p className="su-feedback error">{t("signupModal.passMismatch")}</p>
                  )}
                </div>
              </div>
              <button className="su-submit-btn" type="submit"><span>{t("signupModal.submitBtn")}</span></button>
            </form>
            <p className="su-login-link">
              {t("signupModal.haveAccount")}
              <a href="#" onClick={(e) => { e.preventDefault(); openModal('login', modalReason) }}>{t("signupModal.loginLink")}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}