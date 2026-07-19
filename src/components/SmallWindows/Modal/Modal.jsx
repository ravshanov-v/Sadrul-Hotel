import { useState, useEffect } from "react"
import close from "../../../Assets/Icons/close.svg"
import logoIconS from "../../../Assets/Icons/logo-S-icon.png"
import { useModal } from "./useModal"
import { useAuth } from "../../Auth/useAuth"
import { validateEmail, getEmailErrorText } from "../../../utils/auth"
import { useLanguage } from "../../Language/useLanguage.js"
import "./Modal.css"

export default function Modal() {

  const { isOpen, modalType, modalReason, openModal, closeModal } = useModal()
  const { login } = useAuth()
  const { t } = useLanguage()
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
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close-btn" onClick={closeModal}>
          <img className="close" src={close} alt={t("modal.closeAlt")} />
        </button>
        <div className="modal-content">
          <article className="modal-left">
            <article className="modal-left-logo">
              <img className="left-logo-img" src={logoIconS} alt={t("modal.logoAlt")} />
              <p className="left-logo-p">{t("modal.logoSpan")}</p>
            </article>
            <div className="modal-left-decoration">
              <span>{t("modal.hotelSpan")}</span>
            </div>
            <div className="modal-left-quote">
              <p>{t("modal.hotelPrefix")}</p>
              <p>{t("modal.hotelSuffix")}</p>
            </div>
          </article>
          <article className="modal-right">
            {modalReason && (
              <div className="modal-reason-banner">{modalReason}</div>
            )}
            <h1 className="right-h">{t("modal.welcome")}</h1>
            <article className="modal-right-p-parent">
              <p className="modal-right-p">{t("modal.loginDesc")}</p>
            </article>
            <form className="modal-form" onSubmit={handleSubmit} noValidate>
              <div className="modal-field">
                <input
                  className={emailClass}
                  type="text"
                  placeholder={t("modal.emailPlaceholder")}
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailTouched && !emailValid && emailCheck.errors.length > 0 && (
                  <div className="modal-feedback-list">
                    {emailCheck.errors.map((code, i) => (
                      <p key={i} className="modal-feedback error">{getEmailErrorText(code, t)}</p>
                    ))}
                  </div>
                )}
                {emailTouched && emailValid && (
                  <p className="modal-feedback success">{t("modal.validLabel")}</p>
                )}
              </div>
              <div className="modal-field">
                <div className="modal-pw-wrap">
                  <input
                    className={passwordClass}
                    type={showPassword ? "text" : "password"}
                    placeholder={t("modal.passwordPlaceholder")}
                    autoComplete="new-password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    className="modal-eye-btn"
                    onClick={() => setShowPassword(prev => !prev)}
                    aria-label={showPassword ? t("modal.hidePwd") : t("modal.showPwd")}
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
                  <p className="modal-feedback error">{t("modal.passwordError")}</p>
                )}
                {passwordTouched && passwordValid && (
                  <p className="modal-feedback success">{t("modal.validLabel")}</p>
                )}
              </div>
              <button className="login-btn" type="submit"><span>{t("modal.loginBtn")}</span></button>
            </form>
          </article>
        </div>
        <div className="modal-bottom-link">
          <p>{t("modal.noAccount")} <a href="#" onClick={(e) => { e.preventDefault(); openModal('signup', modalReason) }}>{t("modal.signupLink")}</a></p>
        </div>
      </div>
    </div>
  )
} 
