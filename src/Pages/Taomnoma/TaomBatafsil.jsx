import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { menuItems } from "../../data/taomnoma"
import "./TaomBatafsil.css"
import { useLanguage } from "../../components/Language/useLanguage.js"

export default function TaomBatafsil() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, tData } = useLanguage()
  const [showVariants, setShowVariants] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(null)

  const item = menuItems.find(i => i.id === Number(id))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!item) {
    return (
      <div className="tb-empty">
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <h2>{t("menu.notFound")}</h2>
        <button onClick={() => navigate("/taomnoma")}>{t("menu.back")}</button>
      </div>
    )
  }

  const hasVariants = item.variants && item.variants.length > 0

  return (
    <div className="tb-page">
      <div className={`tb-main ${showVariants ? "shifted" : ""}`}>
        <button className="tb-back" onClick={() => navigate("/taomnoma")}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t("menu.back")}
        </button>

        <div className="tb-hero">
          <div className="tb-hero-img" data-aos="fade-left">
            <img src={item.image} alt={tData("data.menu." + item.id + ".name", item.name)} />
            <div className={`tb-avail ${item.available ? "yes" : "no"}`}>
              {item.available ? t("menu.available") : t("menu.unavailable")}
            </div>
          </div>
          <div className="tb-hero-info" data-aos="fade-right">
            <span className="tb-cat">{tData("data.menu." + item.id + ".category", item.category)}</span>
            <h1 className="tb-name">{tData("data.menu." + item.id + ".name", item.name)}</h1>
            <p className="tb-desc">{tData("data.menu." + item.id + ".description", item.description)}</p>
            <div className="tb-meta">
              <span className="tb-meta-item">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {tData("data.menu." + item.id + ".info", item.info)}
              </span>
            </div>
            {hasVariants && (
              <button className="tb-variants-btn" onClick={() => setShowVariants(true)} data-aos="zoom-in">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t("menu.viewVariants")} ({item.variants.length})
                <svg viewBox="0 0 24 24" fill="none" className="tb-arrow-right">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {selectedVariant && (
          <div className="tb-selected" data-aos="fade-up">
            <div className="tb-selected-img">
              <img src={selectedVariant.image} alt={tData("data.menu." + item.id + ".variants." + item.variants.indexOf(selectedVariant) + ".name", selectedVariant.name)} />
            </div>
            <div className="tb-selected-info">
              <h3>{tData("data.menu." + item.id + ".variants." + item.variants.indexOf(selectedVariant) + ".name", selectedVariant.name)}</h3>
              <span className="tb-selected-price">{selectedVariant.price}</span>
              <p>{tData("data.menu." + item.id + ".variants." + item.variants.indexOf(selectedVariant) + ".desc", selectedVariant.desc)}</p>
            </div>
          </div>
        )}
      </div>

      <div className={`tb-panel ${showVariants ? "open" : ""}`}>
        <div className="tb-panel-header">
          <h2>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t("menu.variants")} ({item.variants.length})
          </h2>
          <button className="tb-panel-close" onClick={() => setShowVariants(false)}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="tb-panel-body">
          {item.variants.map((v, i) => (
            <div
              key={i}
              className={`tb-panel-item ${v.available ? "yes" : "no"} ${selectedVariant === v ? "active" : ""}`}
              onClick={() => { setSelectedVariant(v); setShowVariants(false) }}
            >
              <div className="tb-panel-item-img">
                <img src={v.image} alt={tData("data.menu." + item.id + ".variants." + i + ".name", v.name)} />
              </div>
              <div className="tb-panel-item-info">
                <h4>{tData("data.menu." + item.id + ".variants." + i + ".name", v.name)}</h4>
                <span className="tb-panel-item-price">{v.price}</span>
                <p>{tData("data.menu." + item.id + ".variants." + i + ".desc", v.desc)}</p>
              </div>
              {!v.available && <span className="tb-panel-item-na">{t("menu.notAvailable")}</span>}
            </div>
          ))}
        </div>
      </div>

      {showVariants && <div className="tb-overlay" onClick={() => setShowVariants(false)} />}
    </div>
  )
}
