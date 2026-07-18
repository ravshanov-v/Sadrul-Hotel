import { useState, useEffect } from "react"
import close from "../../../Assets/Icons/close.svg"
import logoIconS from "../../../Assets/Icons/logo-S-icon.png"
import { useModal } from "./useModal"
import { useAuth } from "../../Auth/useAuth"
import { validateEmail } from "../../../utils/auth"
import "./Modal.css"

export default function Modal() {

  const { isOpen, modalType, modalReason, openModal, closeModal } = useModal()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      setEmail("")
      setPassword("")
      setShowPassword(false)
      setEmailTouched(false)
      setPasswordTouched(false)
    }
  }, [isOpen])



  const emailCheck = email ? validateEmail(email) : { valid: false, errors: [] }
  const emailValid = emailCheck.valid
  const passwordValid = password.length >= 6

  const emailClass = emailTouched ? (emailValid ? "modal-input-email success" : "modal-input-email error") : "modal-input-email"

  const passwordClass = passwordTouched
    ? passwordValid ? "modal-input-password success" : "modal-input-password error"
    : "modal-input-password"

  function handleEmailChange(e) {
    setEmail(e.target.value)
    setEmailTouched(prev => prev ? prev : true)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
    setPasswordTouched(prev => prev ? prev : true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setEmailTouched(true)
    setPasswordTouched(true)
    if (emailValid && passwordValid) {
      const nameFromEmail = email.split("@")[0].replace(/[._]/g, " ")
      const fullName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1)
      login({ fullName, email })
      setEmail("")
      setPassword("")
      setEmailTouched(false)
      setPasswordTouched(false)
      closeModal()
    }
  }

  if (!isOpen || modalType !== 'login') return null

  return (
    <div className="modal-backdrop" onClick={closeModal} role="dialog" aria-modal="true">
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeModal}>
          <img className="close" src={close} alt="Yopish" />
        </button>
        <div className="modal-content">
          <article className="modal-left">
            <article className="modal-left-logo">
              <img className="left-logo-img" src={logoIconS} alt="Logo" />
              <p className="left-logo-p">sadrul</p>
            </article>
            <div className="modal-left-decoration">
              <span>HOTEL</span>
            </div>
            <div className="modal-left-quote">
              <p>Hashtamat dam olish</p>
              <p>sari bir qadam</p>
            </div>
          </article>
          <article className="modal-right">
            {modalReason && (
              <div className="modal-reason-banner">{modalReason}</div>
            )}
            <h1 className="right-h">Xush kelibsiz!</h1>
            <article className="modal-right-p-parent">
              <p className="modal-right-p">Sadrul mehmonxonasiga kirish uchun elektron pochta va parolingizni kiriting.</p>
            </article>
            <form className="modal-form" onSubmit={handleSubmit} noValidate>
              <div className="modal-field">
                <input
                  className={emailClass}
                  type="text"
                  placeholder="Elektron pochta"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailTouched && !emailValid && emailCheck.errors.length > 0 && (
                  <div className="modal-feedback-list">
                    {emailCheck.errors.map((msg, i) => (
                      <p key={i} className="modal-feedback error">{msg}</p>
                    ))}
                  </div>
                )}
                {emailTouched && emailValid && (
                  <p className="modal-feedback success">To'g'ri</p>
                )}
              </div>
              <div className="modal-field">
                <div className="modal-pw-wrap">
                  <input
                    className={passwordClass}
                    type={showPassword ? "text" : "password"}
                    placeholder="Parol (kamida 6 belgi)"
                    autoComplete="new-password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    className="modal-eye-btn"
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
                {passwordTouched && !passwordValid && (
                  <p className="modal-feedback error">Parol kamida 6 belgidan iborat bo'lishi kerak</p>
                )}
                {passwordTouched && passwordValid && (
                  <p className="modal-feedback success">To'g'ri</p>
                )}
              </div>
              <button className="login-btn" type="submit"><span>Kirish</span></button>
            </form>
          </article>
        </div>
        <div className="modal-bottom-link">
          <p>Agar ro'yxatdan o'tmagan bo'lsangiz <a href="#" onClick={(e) => { e.preventDefault(); openModal('signup', modalReason) }}>ro'yxatdan o'tish</a> havolasi orqali ro'yxatdan o'ting</p>
        </div>
      </div>
    </div>
  )
} 
