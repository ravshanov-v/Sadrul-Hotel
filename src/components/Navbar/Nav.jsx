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

import "./Nav.css"

function NavMemberToast({ show }) {
  return (
    <div className={`tk-member-toast ${show ? 'tk-member-toast-visible' : ''}`}>
      <div className="tk-member-toast-icon">
        <FiCheckCircle />
      </div>
      <div className="tk-member-toast-content">
        <span className="tk-member-toast-title">A'zolik tasdiqlandi</span>
        <span className="tk-member-toast-msg">Siz allaqachon a'zo bo'lgansiz</span>
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
  const [langOpen, setLangOpen] = useState(false)
  const [lang, setLang] = useState("UZ")

  const languages = ["UZ", "RU", "EN"]

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
          <img className="logo-icon" src={iconLogo} alt="Crown" />
          <span className="logo-text">adrul</span>
        </NavLink>
      </article>

      <ul className="nav-links">
        <li><NavLink to="/">Bosh sahifa</NavLink></li>
        <li><NavLink to="/mehmonxonalar">Mehmonxonalar</NavLink></li>
        <li><NavLink to="/taomnoma">Taomnoma</NavLink></li>
        <li><NavLink to="/takliflar">Takliflar</NavLink></li>
        <li><NavLink to="/biz-haqimizda">Biz haqimizda</NavLink></li>
      </ul>

      <div className="nav-actions">
        <button className="btn-darcmode" onClick={toggleDark}>
          {isDark ? (
            <img className="dark-sun" src={sun} alt="sun" />
          ) : (
            <img className="dark-moon" src={moon} alt="moon" />
          )}
        </button>
        <article className="lang-wrap">
          <button className="btn-lang" onClick={() => setLangOpen(!langOpen)}>
            {lang}
            <svg className={`lang-arrow ${langOpen ? "lang-arrow-open" : ""}`} viewBox="0 0 24 24" fill="none" width="12" height="12">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {langOpen && (
            <div className="lang-dropdown">
              {languages.filter(l => l !== lang).map(l => (
                <button key={l} className="lang-option" onClick={() => { setLang(l); setLangOpen(false) }}>
                  {l}
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
            <img className="nav-btn-login" src={userIcon} alt="user" /><p>Kirish</p>
          </button>
        )}
      </div>
    </nav>
  )
}
