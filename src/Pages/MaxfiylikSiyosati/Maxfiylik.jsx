import { useLanguage } from "../../components/Language/useLanguage.js"
import "./Maxfiylik.css"

export default function Maxfiylik() {
  const { t } = useLanguage()
  const sections = t("privacy.sections")
  return (
    <div className="privacy-page" data-aos="fade-up">
      <section className="privacy-hero" data-aos="fade-up">
        <div className="privacy-hero-overlay" />
        <div className="privacy-hero-content" data-aos="zoom-in">
          <div className="privacy-badge" data-aos="fade-up">
            <span className="privacy-badge-line" />
            <span>{t("privacy.badge")}</span>
            <span className="privacy-badge-line" />
          </div>
          <h1 className="privacy-hero-title" data-aos="fade-up" data-aos-delay="100">
            {t("privacy.title")} <span className="gold-text">{t("privacy.titleGold")}</span>
          </h1>
          <p className="privacy-hero-desc" data-aos="fade-up" data-aos-delay="200">
            {t("privacy.desc")}
          </p>
        </div>
      </section>

      <section className="privacy-content" data-aos="fade-up">
        {sections.map((s) => (
          <article key={s.id} className="privacy-article" data-aos="fade-up" data-aos-delay={s.id * 50}>
            <div className="privacy-article-header">
              <span className="privacy-article-num">0{s.id}</span>
              <h2 className="privacy-article-title">{s.title}</h2>
            </div>
            <p className="privacy-article-text">{s.text}</p>
          </article>
        ))}
      </section>

      <section className="privacy-updated" data-aos="fade-up">
        <div className="privacy-updated-line" />
        <p>{t("privacy.updated")}</p>
      </section>
    </div>
  )
}
