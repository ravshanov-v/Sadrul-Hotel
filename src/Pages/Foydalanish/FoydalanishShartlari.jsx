import { useLanguage } from "../../components/Language/useLanguage.js"
import "./FoydalanishShartlari.css"

export default function FoydalanishShartlari() {
  const { t } = useLanguage()
  const sections = t("terms.sections")
  return (
    <div className="terms-page" data-aos="fade-up">
      <section className="terms-hero" data-aos="fade-up">
        <div className="terms-hero-overlay" />
        <div className="terms-hero-content" data-aos="zoom-in">
          <div className="terms-badge">
            <span className="terms-badge-line" />
            <span>{t("terms.badge")}</span>
            <span className="terms-badge-line" />
          </div>
          <h1 className="terms-hero-title">
            {t("terms.title")} <span className="gold-text">{t("terms.titleGold")}</span>
          </h1>
          <p className="terms-hero-desc">
            {t("terms.desc")}
          </p>
        </div>
      </section>

      <section className="terms-content" data-aos="fade-up">
        {sections.map((s) => (
          <article key={s.id} className="terms-article" data-aos="fade-up" data-aos-delay={s.id * 50}>
            <div className="terms-article-header">
              <span className="terms-article-num">0{s.id}</span>
              <h2 className="terms-article-title">{s.title}</h2>
            </div>
            <p className="terms-article-text">{s.text}</p>
          </article>
        ))}
      </section>

      <section className="terms-updated" data-aos="fade-up">
        <div className="terms-updated-line" />
        <p>{t("terms.updated")}</p>
      </section>
    </div>
  )
}
