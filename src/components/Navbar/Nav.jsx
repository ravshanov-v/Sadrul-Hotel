import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import iconLogo from "../../Assets/Icons/icon-S.png"
import sun from "../../Assets/Icons/sun.svg"
import moon from "../../Assets/Icons/moon.svg"
import userIcon from "../../Assets/Icons/user.svg"
import { useModal } from "../SmallWindows/Modal/useModal.js"
import { useDarkMode } from "../DarkMode/useDarkMode.js"
import { useAuth } from "../Auth/useAuth.js"
import { useProphile } from "../Prophile/useProphile.js"
import { useLanguage } from "../Language/useLanguage.js"

const NAV_LINKS = [
  { to: "/", key: "nav.home", delay: 0 },
  { to: "/mehmonxonalar", key: "nav.hotels", delay: 50 },
  { to: "/taomnoma", key: "nav.menu", delay: 100 },
  { to: "/takliflar", key: "nav.offers", delay: 150 },
  { to: "/biz-haqimizda", key: "nav.about", delay: 200 },
]

export default function Nav() {
  const { openModal } = useModal()
  const { isDark, toggleDark } = useDarkMode()
  const { user } = useAuth()
  const { openProphile } = useProphile()
  const { lang, setLang, t } = useLanguage()
  const [langOpen, setLangOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const drawerRef = useRef(null)
  const burgerRef = useRef(null)
  const langRef = useRef(null)

  const initials = user?.fullName
    ? user.fullName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "?"

  const closeMenu = () => {
    setMenuOpen(false)
    burgerRef.current?.focus()
  }

  useEffect(() => {
    if (!langOpen) return
    const onPointerDown = (e) => {
      if (!langRef.current?.contains(e.target)) setLangOpen(false)
    }
    const onKey = (e) => {
      if (e.key === "Escape") setLangOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [langOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false)
    }
    document.addEventListener("keydown", onKey)
    window.addEventListener("resize", onResize)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    drawerRef.current?.focus()
    return () => {
      document.removeEventListener("keydown", onKey)
      window.removeEventListener("resize", onResize)
      document.body.style.overflow = prevOverflow
    }
  }, [menuOpen])

  const linkClass = ({ isActive }) =>
    `relative whitespace-nowrap py-2 text-[15px] font-medium tracking-[0.3px] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-gold-light after:transition-all after:duration-300 after:content-[''] ${
      isActive
        ? "text-gold-light after:w-full"
        : "text-[#4a443d] hover:text-gold-light hover:after:w-full dark:text-[#b8b8c2] dark:hover:text-gold-light"
    }`

  const drawerLinkClass = ({ isActive }) =>
    `flex w-full items-center rounded-xl px-4 py-3 text-[15px] font-medium tracking-[1px] transition-colors duration-200 min-h-[44px] ${
      isActive
        ? "bg-gold/10 text-gold-light"
        : "text-[#555] hover:bg-gold/5 hover:text-gold-light dark:text-[#b0b0b0] dark:hover:bg-white/5 dark:hover:text-gold-light"
    }`

  return (
    <>
      <nav data-aos="fade-down" className="sticky top-0 z-[100] flex h-[68px] items-center justify-between gap-3 bg-[#f5f0eb] px-4 shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-colors duration-300 dark:bg-[#00122d] dark:shadow-[0_2px_10px_rgba(0,0,0,0.4)] sm:px-6 lg:gap-4 xl:px-10">
        <article className="shrink-0" data-aos="fade-down">
          <NavLink to="/" className="flex items-center gap-2 no-underline">
            <img className="h-[40px] w-[32px] object-contain" src={iconLogo} alt={t("nav.logoAlt")} />
            <span className="text-[17px] font-semibold leading-none tracking-[3px] text-[#6a4c00] dark:text-gold">adrul</span>
          </NavLink>
        </article>

        <ul className="hidden list-none items-center gap-6 lg:flex xl:gap-9" data-aos="fade-down">
          {NAV_LINKS.map((l) => (
            <li key={l.to} data-aos="fade-down" data-aos-delay={l.delay}>
              <NavLink to={l.to} className={linkClass}>{t(l.key)}</NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 items-center gap-2.5 lg:flex xl:gap-3" data-aos="fade-down">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full bg-transparent p-1 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
            onClick={toggleDark}
            aria-label={isDark ? t("nav.sunAlt") : t("nav.moonAlt")}
            aria-pressed={isDark}
          >
            {isDark ? (
              <img className="h-[21px] w-[21px] [filter:brightness(0)_saturate(100%)_invert(72%)_sepia(68%)_saturate(438%)_hue-rotate(359deg)_brightness(88%)_contrast(92%)]" src={sun} alt="" />
            ) : (
              <img className="h-[21px] w-[21px] [filter:brightness(0)_saturate(100%)_invert(0.45)]" src={moon} alt="" />
            )}
          </button>

          <div className="relative" ref={langRef}>
            <button
              className="flex h-9 items-center gap-1 rounded-lg border-[1.5px] border-black/10 bg-transparent px-2.5 text-[14px] font-semibold tracking-[0.5px] text-[#4a443d] transition-all duration-200 hover:border-gold hover:text-gold dark:border-white/10 dark:text-[#b8b8c2] dark:hover:border-gold dark:hover:text-gold"
              onClick={() => setLangOpen(!langOpen)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
            >
              {lang.toUpperCase()}
              <svg className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" width="12" height="12">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {langOpen && (
              <div
                role="listbox"
                className="absolute right-0 top-full z-[200] mt-1.5 min-w-16 overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.1)] dark:border-white/10 dark:bg-[#1a1a2e] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
              >
                {["uz", "ru", "en"].filter(l => l !== lang).map(l => (
                  <button
                    key={l}
                    role="option"
                    aria-selected={false}
                    className="block w-full px-4 py-2.5 text-center text-[14px] font-semibold tracking-[0.5px] text-[#4a443d] transition-colors duration-150 hover:bg-[#f5f0eb] hover:text-gold dark:text-[#b8b8c2] dark:hover:bg-white/5 dark:hover:text-gold"
                    onClick={() => { setLang(l); setLangOpen(false) }}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          {user ? (
            <div className="flex items-center gap-1.5">
              <button
                className="flex items-center gap-2.5 rounded-full border-[1.5px] border-gold/15 bg-gradient-to-br from-gold/10 to-gold/5 py-1 pl-1 pr-3.5 transition-all duration-300 hover:-translate-y-px hover:border-gold/30 hover:shadow-[0_4px_16px_rgba(212,175,55,0.15)] dark:border-gold/10 dark:from-gold/5 dark:to-gold/2 dark:hover:border-gold/20"
                onClick={openProphile}
              >
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-light text-[13px] font-bold text-navy shadow-[0_2px_8px_rgba(212,175,55,0.25)]">
                  {initials}
                  <span className="absolute -inset-0.5 rounded-full border-2 border-gold/20" aria-hidden="true" />
                </span>
                <span className="max-w-[110px] truncate text-[13px] font-medium tracking-[0.3px] text-navy dark:text-gray-100">{user.fullName}</span>
              </button>
            </div>
          ) : (
            <button
              className="group flex h-9 min-w-[86px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-black px-4 text-[14px] text-white transition-colors duration-300 hover:bg-gold-light hover:text-black hover:shadow-[0_0_2px_1px_#9a7800] dark:bg-[#2a2a3e] dark:text-gray-100 dark:hover:bg-gold dark:hover:text-navy"
              onClick={() => openModal('login')}
            >
              <img
                className="h-[18px] w-[18px] shrink-0 [filter:brightness(0)_saturate(100%)_invert(1)] transition-[filter] duration-300 group-hover:[filter:brightness(0)_saturate(100%)_invert(0)]"
                src={userIcon}
                alt=""
              />
              <span>{t("nav.login")}</span>
            </button>
          )}
        </div>

        <button
          ref={burgerRef}
          className="flex h-[44px] w-[44px] items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-black/5 dark:text-gray-200 dark:hover:bg-white/10 lg:hidden"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          aria-expanded={menuOpen}
          aria-controls="sadrul-mobile-menu"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-[150] bg-black/50 backdrop-blur-sm lg:hidden" onClick={closeMenu} aria-hidden="true" />
          <aside
            ref={drawerRef}
            id="sadrul-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t("nav.menu")}
            tabIndex={-1}
            className="fixed inset-y-0 right-0 z-[160] flex w-80 max-w-[85vw] flex-col bg-[#f5f0eb] shadow-2xl outline-none dark:bg-[#00122d] lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-black/10 px-4 py-4 dark:border-white/10">
              <NavLink to="/" onClick={closeMenu} className="flex items-center gap-2 no-underline">
                <img className="h-[36px] w-[29px] object-contain" src={iconLogo} alt={t("nav.logoAlt")} />
                <span className="text-[17px] font-semibold leading-none tracking-[3px] text-[#6a4c00] dark:text-gold">adrul</span>
              </NavLink>
              <button
                className="flex h-[44px] w-[44px] items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/10"
                onClick={closeMenu}
                aria-label={t("nav.closeMenu")}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <ul className="flex-1 list-none space-y-1 overflow-y-auto px-3 py-4">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} className={drawerLinkClass} onClick={closeMenu}>{t(l.key)}</NavLink>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-black/10 px-4 py-4 dark:border-white/10">
              <button
                className="flex h-[44px] w-full items-center justify-center gap-2 rounded-xl border-[1.5px] border-black/10 bg-transparent px-3 text-sm font-medium text-[#4a443d] transition-colors duration-300 hover:border-gold/40 hover:bg-gold/5 hover:text-gold dark:border-white/10 dark:text-[#b8b8c2] dark:hover:border-gold/30 dark:hover:bg-white/5 dark:hover:text-gold"
                onClick={toggleDark}
                aria-pressed={isDark}
              >
                <img
                  className={`h-[18px] w-[18px] shrink-0 ${isDark ? "[filter:brightness(0)_saturate(100%)_invert(72%)_sepia(68%)_saturate(438%)_hue-rotate(359deg)_brightness(88%)_contrast(92%)]" : "[filter:brightness(0)_saturate(100%)_invert(0.45)]"}`}
                  src={isDark ? sun : moon}
                  alt=""
                />
                <span>{isDark ? t("nav.sunAlt") : t("nav.moonAlt")}</span>
              </button>

              <div className="flex items-center justify-center gap-2">
                {["uz", "ru", "en"].map(l => (
                  <button
                    key={l}
                    className={`h-[44px] min-w-[44px] rounded-lg px-3 text-sm font-semibold tracking-[0.5px] transition-colors duration-200 ${
                      lang === l
                        ? "bg-gold text-navy"
                        : "text-[#4a443d] hover:bg-gold/10 hover:text-gold dark:text-[#b8b8c2] dark:hover:text-gold-light"
                    }`}
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              {user ? (
                <button
                  className="flex h-[44px] w-full items-center justify-center gap-2 rounded-xl border-[1.5px] border-gold/20 bg-gradient-to-br from-gold/10 to-gold/5 px-3 text-sm font-medium text-navy transition-colors duration-300 hover:border-gold/40 dark:text-gray-100"
                  onClick={() => { openProphile(); closeMenu() }}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-light text-xs font-bold text-navy">
                    {initials}
                  </span>
                  <span className="truncate">{user.fullName}</span>
                </button>
              ) : (
                <button
                  className="flex h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-black px-3 text-sm text-white transition-colors duration-300 hover:bg-gold-light hover:text-black dark:bg-[#2a2a3e] dark:text-gray-100 dark:hover:bg-gold dark:hover:text-navy"
                  onClick={() => { openModal('login'); closeMenu() }}
                >
                  <img
                    className="h-[18px] w-[18px] shrink-0 [filter:brightness(0)_saturate(100%)_invert(1)]"
                    src={userIcon}
                    alt=""
                  />
                  <span>{t("nav.login")}</span>
                </button>
              )}
            </div>
          </aside>
        </>
      )}
    </>
  )
}