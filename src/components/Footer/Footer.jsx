import React from 'react'
import { NavLink } from "react-router-dom"

import phone from "../../Assets/Icons/phone-icon.svg"
import email from "../../Assets/Icons/gmail-icon.svg"
import adres from "../../Assets/Icons/adres-icon.svg"

import "./Footer.css"

const socialIcons = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
  },
  {
    name: "Telegram",
    href: "https://t.me",
    path: "M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
  }
]

export default function Footer() {
  return (
    <div className='footer-parent' data-aos="fade-up">
      <footer className="footer-grid">
        <div className="footer-section" data-aos="fade-up" data-aos-delay="0">
          <div className="foot-brand">
            <span className="foot-brand-s">S</span>
            <span className="foot-brand-adrul">adrul</span>
          </div>
          <p className="foot-desc">
            Mukammal dam olish ishonchli tanlovdan boshlanadi. Sadrul sizni eng yaxshi mehmonxonalar va yuqori darajadagi xizmat bilan bog'laydi.
          </p>
          <div className="foot-social">
            {socialIcons.map((icon) => (
              <a key={icon.name} href={icon.href} target="_blank" rel="noopener noreferrer" className="foot-social-link">
                <svg viewBox="0 0 24 24" fill="currentColor" className="foot-social-icon">
                  <path d={icon.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="footer-section" data-aos="fade-up" data-aos-delay="100">
          <h3 className="foot-section-title">Kompaniya</h3>
          <ul className="foot-links">
            <li><NavLink to="/biz-haqimizda">Biz haqimizda</NavLink></li>
            <li><NavLink to="/biz-haqimizda#missiyamiz">Missiyamiz</NavLink></li>
            <li><NavLink to="/biz-haqimizda#jamoa">Jamoa</NavLink></li>
            <li><NavLink to="/biz-haqimizda#karyera">Karyera</NavLink></li>
          </ul>
        </div>

        <div className="footer-section" data-aos="fade-up" data-aos-delay="200">
          <h3 className="foot-section-title">Mehmonxonalar</h3>
          <ul className="foot-links">
            <li><NavLink to="/mehmonxonalar">Mehmonxonalar</NavLink></li>
            <li><NavLink to="/takliflar">Takliflar</NavLink></li>
            <li><NavLink to="/mehmonxonalar?category=Hashamatli">Lux to'plamlar</NavLink></li>
          </ul>
        </div>

        <div className="footer-section" data-aos="fade-up" data-aos-delay="300">
          <h3 className="foot-section-title">Aloqa</h3>
          <ul className="foot-contact">
            <li className="foot-contact-item">
              <img className="foot-contact-icon" src={phone} alt="Phone" />
              <span>+998 __ ___ __ __</span>
            </li>
            <li className="foot-contact-item">
              <img className="foot-contact-icon" src={email} alt="Email" />
              <span>info@sadrul.uz</span>
            </li>
            <li className="foot-contact-item">
              <img className="foot-contact-icon" src={adres} alt="Address" />
              <span>Toshkent, O'zbekiston</span>
            </li>
          </ul>
        </div>

        <div className="foot-divider" />

        <div className="foot-bottom">
          <ul className="foot-bottom-links">
            <li><NavLink to="/maxfiylik-siyosati">Maxfiylik siyosati</NavLink></li>
            <li><NavLink to="/foydalanish-shartlari">Foydalanish shartlari</NavLink></li>

          </ul>
          <p>&copy; {new Date().getFullYear()} Sadrul. Barcha huquqlar himoyalangan.</p>

        </div>
      </footer>
    </div>
  )
}
