import { useState } from "react"
import { NavLink } from "react-router-dom"
import iconLogo from "../../Assets/Icons/icon-S.png"
import sun from "../../Assets/Icons/sun.svg"
import moon from "../../Assets/Icons/moon.svg"
import userIcon from "../../Assets/Icons/user.svg"
import { FiCheckCircle } from 'react-icons/fi'
import { useModal } from "../SmallWindows/Modal/useModal.js"
import { useDarkMode } from "../DarkMode/useDarkMode.js"
import { useAuth } from "../Auth/useAuth.js"
import { useProphile } from "../Prophile/useProphile.js"
import { useLanguage } from "../Language/useLanguage.js"

import "./Nav.css"

function NavMemberToast({ show }) {
  const { t } = useLanguage()
  return (
    <div className={`tk-member-toast ${show ? 'tk-member-toast-visible' : ''}`}>
      <div className="tk-member-toast-icon">
        <FiCheckCircle />
      </div>
      <div className="tk-member-toast-content">
        <span className="tk-member-toast-title">{t("nav.memberTitle")}</span>
        <span className="tk-member-toast-msg">{t("nav.memberMsg")}</span>
      </div>
    </div>
  )
}

export default function Nav() {
  const { openModal } = useModal()
  const { isDark, toggleDark } = useDarkMode()
  const { user } = useAuth()
  const { openProphile } = useProphile()
  const [memberToastShow, setMemberToastShow] = useState(false)
  const { lang, setLang, t } = useLanguage()
  const [langOpen, setLangOpen] = useState(false)

  const initials = user?.fullName
    ? user.fullName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "?"

  const handleLoginClick = () => {
    if (user) {
      setMemberToastShow(true)
      setTimeout(() => setMemberToastShow(false), 3500)
    } else {
      openModal('login')
    }
  }

  return (
    <nav>
      <NavMemberToast show={memberToastShow} />
      <article className="logo-art">
        <NavLink to="/">
          <img className="logo-icon" src={iconLogo} alt={t("nav.logoAlt")} />
          <span className="logo-text">adrul</span>
        </NavLink>
      </article>

      <ul className="nav-links">
        <li><NavLink to="/">{t("nav.home")}</NavLink></li>
        <li><NavLink to="/mehmonxonalar">{t("nav.hotels")}</NavLink></li>
        <li><NavLink to="/taomnoma">{t("nav.menu")}</NavLink></li>
        <li><NavLink to="/takliflar">{t("nav.offers")}</NavLink></li>
        <li><NavLink to="/biz-haqimizda">{t("nav.about")}</NavLink></li>
      </ul>

      <div className="nav-actions">
        <button className="btn-darcmode" onClick={toggleDark}>
          {isDark ? (
            <img className="dark-sun" src={sun} alt={t("nav.sunAlt")} />
          ) : (
            <img className="dark-moon" src={moon} alt={t("nav.moonAlt")} />
          )}
        </button>
        <article className="lang-wrap">
          <button className="btn-lang" onClick={() => setLangOpen(!langOpen)}>
            {lang.toUpperCase()}
            <svg className={`lang-arrow ${langOpen ? "lang-arrow-open" : ""}`} viewBox="0 0 24 24" fill="none" width="12" height="12">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {langOpen && (
            <div className="lang-dropdown">
              {["uz", "ru", "en"].filter(l => l !== lang).map(l => (
                <button key={l} className="lang-option" onClick={() => { setLang(l); setLangOpen(false) }}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </article>
        {user ? (
          <div className="nav-profile-wrap">
            <button className="btn-profile" onClick={openProphile}>
              <span className="profile-avatar">{initials}</span>
              <span className="profile-name">{user.fullName}</span>
            </button>
          </div>
        ) : (
          <button className="btn-login" onClick={handleLoginClick}>
            <img className="nav-btn-login" src={userIcon} alt={t("nav.userAlt")} /><span>{t("nav.login")}</span>
          </button>
        )}
      </div>
    </nav>
  )
}
