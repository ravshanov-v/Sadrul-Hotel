import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from "../../components/Language/useLanguage.js"
import './NotFound.css'


export default function NotFound() {
  const { t } = useLanguage()
    return (
        <div className="not-found-page" data-aos="zoom-in">
            <div className="nf-glow nf-glow-1" />
            <div className="nf-glow nf-glow-2" />

            <div className="nf-badge">{t("notFound.badge")}</div>

            <div className="nf-error-wrap">
                <span className="nf-char nf-char-1">4</span>
                <span className="nf-char nf-char-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                         strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                </span>
                <span className="nf-char nf-char-3">4</span>
            </div>

            <div className="nf-divider">
                <span /><span /><span />
            </div>

            <h2 className="nf-title">
                {t("notFound.title")}
            </h2>

            <p className="nf-desc">
                {t("notFound.desc")}
            </p>

            <Link to="/" className="nf-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                {t("notFound.homeBtn")}
            </Link>
        </div>
    )
}
