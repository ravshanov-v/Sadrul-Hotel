import { useState, useEffect } from "react"
import close from "../../../Assets/Icons/close.svg"
import logoIconS from "../../../Assets/Icons/logo-S-icon.png"
import { useModal } from "./useModal"
import { useAuth } from "../../Auth/useAuth"
import { validateEmail } from "../../../utils/auth"
import "./SignUpModal.css"

export default function SignUpModal() {
  const { isOpen, modalType, modalReason, openModal, closeModal } = useModal()
  const { login } = useAuth()

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
    if (types >= 3) return { level: 'mukammal' }
    if (types >= 2) return { level: 'normal' }
    return { level: 'oddiy' }
  }

  function getPasswordFeedback(pass) {
    const items = []
    if (pass.length < 6) items.push({ key: 'length', text: 'Kamida 6 belgi' })
    if (!/[a-zA-Z]/.test(pass)) items.push({ key: 'letter', text: 'Kamida 1 ta harf' })
    if (!/[0-9]/.test(pass)) items.push({ key: 'number', text: 'Kamida 1 ta raqam' })
    if (!/[^a-zA-Z0-9]/.test(pass)) items.push({ key: 'special', text: 'Kamida 1 ta maxsus belgi (!@#$%^&*)' })
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
          <img className="close" src={close} alt="Yopish" />
        </button>
        <div className="su-modal-content">
          <div className="su-modal-left">
            <div className="su-modal-left-logo">
              <img className="su-left-logo-img" src={logoIconS} alt="Sadrul" />
              <p className="su-left-logo-p">sadrul</p>
            </div>
            <div className="su-left-decoration">
              <span>HOTEL</span>
            </div>
            <div className="su-left-quote">
              <p>Mukammal dam olishingiz</p>
              <p>aynan shu yerdan boshlanadi</p>
            </div>
          </div>
          <div className="su-modal-right">
            {modalReason && (
              <div className="su-reason-banner">{modalReason}</div>
            )}
            <h1 className="su-right-h">Ro'yxatdan o'tish</h1>
            <p className="su-right-desc">Sadrul mehmonxonasida hisob yaratish uchun ma'lumotlaringizni kiriting.</p>
            <form className="su-modal-form" onSubmit={handleSubmit} noValidate>
              <div className="su-modal-field">
                <input
                  className={inputClass("fullName")}
                  type="text"
                  placeholder="To'liq ismingiz"
                  value={form.fullName}
                  onChange={handleChange("fullName")}
                />
                {touched.fullName && !validations.fullName && (
                  <p className="su-feedback error">Ismingiz kamida 2 belgidan iborat bo'lishi kerak</p>
                )}
              </div>
              <div className="su-modal-row">
                <div className="su-modal-field">
                  <input
                    className={inputClass("email")}
                    type="email"
                    placeholder="Elektron pochta"
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
                    placeholder="Telefon raqam"
                    value={form.phone}
                    onChange={handleChange("phone")}
                  />
                  {touched.phone && !validations.phone && (
                    <p className="su-feedback error">Telefon raqam noto'g'ri formatda</p>
                  )}
                </div>
              </div>
              <div className="su-modal-row">
                <div className="su-modal-field">
                  <div className="su-pw-wrap">
                    <input
                      className={inputClass("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Parol"
                      value={form.password}
                      onChange={handleChange("password")}
                    />
                    <button
                      type="button"
                      className="su-eye-btn"
                      onClick={() => setShowPassword(prev => !prev)}
                      aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
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
                    <p className="su-feedback error">Parol kamida 6 belgidan iborat bo'lishi kerak</p>
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
                          {getPasswordStrength(form.password).level === 'oddiy' ? 'Zaif parol' : getPasswordStrength(form.password).level === 'normal' ? "O'rtacha parol" : 'Kuchli parol'}
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
                      placeholder="Parolni tasdiqlang"
                      value={form.confirmPassword}
                      onChange={handleChange("confirmPassword")}
                    />
                    <button
                      type="button"
                      className="su-eye-btn"
                      onClick={() => setShowConfirm(prev => !prev)}
                      aria-label={showConfirm ? "Parolni yashirish" : "Parolni ko'rsatish"}
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
                    <p className="su-feedback error">Parollar mos kelmadi</p>
                  )}
                </div>
              </div>
              <button className="su-submit-btn" type="submit"><span>Ro'yxatdan o'tish</span></button>
            </form>
            <p className="su-login-link">
              Hisobingiz bormi?
              <a href="#" onClick={(e) => { e.preventDefault(); openModal('login', modalReason) }}>Kirish</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}