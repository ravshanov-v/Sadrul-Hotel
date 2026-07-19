import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import { takliflar } from '../../data/takliflar'
import { hotels } from '../../data/hotels'

import { useAuth } from '../../components/Auth/useAuth'
import { useLanguage } from "../../components/Language/useLanguage.js"
import { useModal } from '../../components/SmallWindows/Modal/useModal'
import { HiShieldCheck } from 'react-icons/hi'
import { FiUserPlus, FiCheckCircle } from 'react-icons/fi'
import "./Takliflar.css"

function Toast({ message, show }) {
  return (
    <div className={`tk-toast ${show ? 'tk-toast-visible' : ''}`} data-aos="fade-up">
      <svg viewBox="0 0 24 24" fill="none" className="tk-toast-icon">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{message}</span>
    </div>
  )
}

function OfferCard({ taklif, onCopyCode }) {
  const { t, tData } = useLanguage()
  const navigate = useNavigate()
  const hotel = hotels.find(h => h.id === taklif.hotelId)
  const [imgLoaded, setImgLoaded] = useState(false)

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    const months = t("offers.months")
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
  }

  return (
    <div className="tk-card" data-aos="fade-up">
      <div className="tk-card-image">
        <div className={`tk-image-loader ${imgLoaded ? 'tk-image-loaded' : ''}`} />
        <img
          src={taklif.image}
          alt={tData("data.offers." + taklif.id + ".title", taklif.title)}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          data-aos="zoom-in"
        />
        <div className="tk-card-overlay" />
        <div className="tk-discount-badge">
          <span className="tk-discount-number">-{taklif.discount}%</span>
        </div>
        {taklif.badge && (
          <div className="tk-card-badge">{tData("data.offers." + taklif.id + ".badge", taklif.badge)}</div>
        )}
      </div>
      <div className="tk-card-body">
        <h3 className="tk-card-title" data-aos="fade-up">{tData("data.offers." + taklif.id + ".title", taklif.title)}</h3>

        <div className="tk-card-pricing">
          <div className="tk-pricing-col">
            <span className="tk-price-label">{t("offers.oldPrice")}</span>
            <span className="tk-price-old">${taklif.oldPrice.toLocaleString()}</span>
          </div>
          <div className="tk-pricing-divider">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="tk-pricing-col">
            <span className="tk-price-label">{t("offers.newPrice")}</span>
            <span className="tk-price-new">${taklif.newPrice.toLocaleString()}</span>
          </div>
        </div>

        <div className="tk-card-expiry">
          <svg viewBox="0 0 24 24" fill="none" className="tk-expiry-icon">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 10h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="tk-expiry-text">
            <span className="tk-expiry-label">{t("offers.expires")}</span>
            {formatDate(taklif.expireDate)}
          </span>
        </div>

        {hotel && (
          <div className="tk-card-hotel">
            <svg viewBox="0 0 24 24" fill="none" className="tk-hotel-icon">
              <path d="M3 21V7l9-5 9 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{tData("data.hotels." + hotel.id + ".name", hotel.name)}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function MemberToast({ show }) {
  const { t } = useLanguage()
  return (
    <div className={`tk-member-toast ${show ? 'tk-member-toast-visible' : ''}`} data-aos="fade-up">
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

export default function Takliflar() {
  const { t } = useLanguage()
  const { isAuthenticated } = useAuth()
  const { openModal } = useModal()
  const navigate = useNavigate()
  const [toastMsg, setToastMsg] = useState("")
  const [toastShow, setToastShow] = useState(false)
  const [memberToastShow, setMemberToastShow] = useState(false)

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      setToastMsg(t("offers.toastCopied"))
      setToastShow(true)
      setTimeout(() => setToastShow(false), 2500)
    }).catch(() => {
      setToastMsg(t("offers.toastError"))
      setToastShow(true)
      setTimeout(() => setToastShow(false), 2500)
    })
  }

  const handleMemberClick = () => {
    if (isAuthenticated) {
      setMemberToastShow(true)
      setTimeout(() => setMemberToastShow(false), 3500)
    } else {
      openModal('signup')
    }
  }

  return (
    <div className='tk-page'>
      <Toast message={toastMsg} show={toastShow} />
      <MemberToast show={memberToastShow} />
      <div className='tk-header' data-aos="zoom-in">
        <div className='tk-badge' data-aos="fade-up">
          <span className='tk-badge-line' />
          <span>{t("offers.badge")}</span>
          <span className='tk-badge-line' />
        </div>
        <h1 className='tk-title' data-aos="fade-up">{t("offers.heroTitle1")} <span className='tk-gold'>{t("offers.heroTitleGold")}</span> {t("offers.heroTitle2")}</h1>
        <p className='tk-subtitle' data-aos="fade-up">{t("offers.desc")}</p>
      </div>
      <div className='tk-swiper-wrap' data-aos="fade-up">
        <Swiper
          grabCursor={true}
          slidesPerView={3}
          spaceBetween={30}
          loop={false}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          observer={true}
          observeParents={true}
          watchOverflow={true}
          autoHeight={false}
          modules={[Pagination, Navigation, Autoplay]}
          className="tk-swiper"
          breakpoints={{
            320: { slidesPerView: 1.15, spaceBetween: 14 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            900: { slidesPerView: 2.3, spaceBetween: 24 },
            1200: { slidesPerView: 3, spaceBetween: 30 },
          }}
        >
          {takliflar.map(taklif => (
            <SwiperSlide key={taklif.id}>
              <OfferCard taklif={taklif} onCopyCode={handleCopyCode} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="tk-bottom" data-aos="fade-up" data-aos-delay="300">
        <div className="tk-bottom-bg-pattern" />
        <div className="tk-bottom-glow" />
        <div className="tk-bottom-content">
          <div className="tk-bottom-badge" data-aos="fade-up">
            <HiShieldCheck />
            <span>{t("offers.premiumBadge")}</span>
          </div>
          <h2 className="tk-bottom-title" data-aos="fade-up">
            {t("offers.clubTitle1")} <span className="tk-gold">{t("offers.clubTitleGold")}</span> {t("offers.clubTitle2")}
          </h2>
          <p className="tk-bottom-desc" data-aos="fade-up">
            {t("offers.clubDesc")}
          </p>
          <div className="tk-bottom-features" data-aos="fade-up">
            <div className="tk-bottom-feature" data-aos="fade-up">
              <svg viewBox="0 0 24 24" fill="none"><path d="M12 2l1.5 5.5L19 8l-4 3.5L16.5 17 12 13.5 7.5 17 9 11.5 5 8l5.5-.5L12 2z" fill="currentColor"/></svg>
              <span>{t("offers.feature1")}</span>
            </div>
            <div className="tk-bottom-feature" data-aos="fade-up">
              <svg viewBox="0 0 24 24" fill="none"><path d="M12 2l1.5 5.5L19 8l-4 3.5L16.5 17 12 13.5 7.5 17 9 11.5 5 8l5.5-.5L12 2z" fill="currentColor"/></svg>
              <span>{t("offers.feature2")}</span>
            </div>
            <div className="tk-bottom-feature" data-aos="fade-up">
              <svg viewBox="0 0 24 24" fill="none"><path d="M12 2l1.5 5.5L19 8l-4 3.5L16.5 17 12 13.5 7.5 17 9 11.5 5 8l5.5-.5L12 2z" fill="currentColor"/></svg>
              <span>{t("offers.feature3")}</span>
            </div>
          </div>
          <button className="tk-bottom-cta" onClick={handleMemberClick} data-aos="zoom-in">
            <FiUserPlus />
            <span>{t("offers.joinBtn")}</span>
            <svg viewBox="0 0 24 24" fill="none" className="tk-bottom-arrow">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="tk-bottom-decor">
          <span className="tk-bottom-decor-dot" style={{ top: '15%', left: '8%' }} />
          <span className="tk-bottom-decor-dot" style={{ top: '75%', left: '12%' }} />
          <span className="tk-bottom-decor-dot" style={{ top: '25%', right: '10%' }} />
          <span className="tk-bottom-decor-dot" style={{ top: '65%', right: '6%' }} />
          <span className="tk-bottom-decor-ring" style={{ top: '10%', right: '18%' }} />
          <span className="tk-bottom-decor-ring" style={{ bottom: '15%', left: '5%' }} />
        </div>
      </div>
    </div>
  )
}
