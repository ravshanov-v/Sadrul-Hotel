import { useState, useRef, useEffect } from "react"
import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import { menuItems, menuCategories } from "../../data/taomnoma"
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./Taomnoma.css"
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useFavorites } from "../../components/Favorites/useFavorites.js"
import { useLanguage } from "../../components/Language/useLanguage.js"

const getCategoryId = (cat) => cat.toLowerCase().replace(/\s+/g, '-')

const TM_PARTICLES = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: (i * 17 + 3) % 100,
    y: (i * 31 + 7) % 100,
    size: ((i * 13 + 5) % 3) + 1.5,
    delay: (i * 7) % 8,
    duration: ((i * 11 + 3) % 6) + 6,
    drift: (((i * 19 + 13) % 20) - 10)
}))

function ParticleField() {

    return (
        <div className="tm-particles" data-aos="fade-up">
            {TM_PARTICLES.map(p => (
                <div
                    key={p.id}
                    className="tm-particle"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                        "--drift": `${p.drift}px`
                    }}
                />
            ))}
        </div>
    )
}

function MenuCard({ item }) {
    const navigate = useNavigate()
    const { toggleFav, isFav } = useFavorites()
    const { t, tData } = useLanguage()

    return (
        <div
            className="tm-card"
            data-aos="fade-up"
            onClick={() => navigate(`/taomnoma/${item.id}`)}
        >
            <div className="tm-card-img">
                <img src={item.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80"} alt={tData("data.menu." + item.id + ".name", item.name)} loading="lazy" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80" }} />
                <button
                    className={`tm-like-btn ${isFav('food_' + item.id) ? 'liked' : ''}`}
                    onClick={(e) => { e.stopPropagation(); toggleFav('food_' + item.id) }}
                    aria-label={t("common.like")}
                >
                    <svg viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
            <div className="tm-card-body">
                <div className="tm-card-top">
                    <h3 className="tm-card-name" data-aos="fade-up">{tData("data.menu." + item.id + ".name", item.name)}</h3>
                    <span className="tm-card-cat-label">{tData("data.menu." + item.id + ".category", item.category)}</span>
                </div>
                <p className="tm-card-desc" data-aos="fade-up">{tData("data.menu." + item.id + ".description", item.description)}</p>
                <div className="tm-card-bottom">
                    <span className="tm-card-price">
                        {item.variants && item.variants.length > 0 ? (
                            (() => {
                                const prices = item.variants.filter(v => v.available).map(v => parseInt(v.price.replace(/\D/g, '')))
                                const min = Math.min(...prices)
                                const max = Math.max(...prices)
                                return min === max ? `${min.toLocaleString()} so'm` : `${min.toLocaleString()} - ${max.toLocaleString()} so'm`
                            })()
                        ) : ''}
                    </span>
                </div>
                <div className="tm-var-wrap">
                    <span className="tm-about-btn" onClick={(e) => { e.stopPropagation(); navigate(`/taomnoma/${item.id}`) }}>
                        <svg viewBox="0 0 24 24" fill="none" className="tm-about-icon">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span>{t("menu.aboutFood")}</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default function Taomnoma() {
    const location = useLocation()
    const { t } = useLanguage()
    const isChildRoute = location.pathname !== "/taomnoma" && location.pathname.startsWith("/taomnoma/")

    const [activeCategory, setActiveCategory] = useState("Barchasi")
    const [visibleCount, setVisibleCount] = useState(12)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchLoading, setSearchLoading] = useState(false)
    const [searchError, setSearchError] = useState("")
    const [highlightedCat, setHighlightedCat] = useState("")
    const bodyRef = useRef(null)

    const filtered = activeCategory === "Barchasi"
        ? menuItems
        : menuItems.filter(i => i.category === activeCategory)

    useEffect(() => {
        if (activeCategory !== "Barchasi") {
            const id = getCategoryId(activeCategory)
            const el = document.getElementById(id)
            if (el) {
                setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100)
            }
        }
    }, [activeCategory])

    useEffect(() => {
        if (searchError) {
            const timer = setTimeout(() => {
                setSearchError("")
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [searchError])

    const handleSearch = () => {
        const q = searchQuery.trim()
        if (!q) return

        setSearchLoading(true)
        setSearchError("")

        setTimeout(() => {
            const match = menuCategories.find(cat => {
                if (cat === "Barchasi") return false
                const a = cat.toLowerCase()
                const b = q.toLowerCase()
                return a.includes(b) || b.includes(a)
            })

            if (match) {
                setActiveCategory(match)
                setVisibleCount(12)
                setSearchQuery("")
                setHighlightedCat(match)
                setTimeout(() => setHighlightedCat(""), 2000)

                const id = getCategoryId(match)
                const el = document.getElementById(id)
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" })
                } else {
                    bodyRef.current?.scrollIntoView({ behavior: "smooth" })
                }
            } else {
                setSearchError(t("menu.notFoundTitle"))
            }

            setSearchLoading(false)
        }, 1200)
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value)
        if (searchError) setSearchError("")
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch()
    }

    const handleCategoryClick = (cat) => {
        setActiveCategory(cat)
        setVisibleCount(12)
        setSearchQuery("")
        setSearchError("")
    }

    if (isChildRoute) return <Outlet />

    const visible = filtered.slice(0, visibleCount)
    const hasMore = visibleCount < filtered.length

    return (
        <div className="taomnoma" data-aos="fade-up">
            <section className="tm-hero" data-aos="fade-up">
                <ParticleField />
                <div className="tm-hero-glow" data-aos="fade-up" />
                <div className="tm-hero-overlay" data-aos="fade-up" />
                <div className="tm-hero-content" data-aos="zoom-in">
                    <div className="tm-badge-wrap" data-aos="fade-up">
                        <div className="tm-badge" data-aos="fade-up">
                            <input
                                type="text"
                                className="tm-badge-inp"
                                placeholder={t("menu.searchPlaceholder")}
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                            />
                            <button
                                className="badge-btn"
                                data-aos="zoom-in"
                                onClick={handleSearch}
                                disabled={searchLoading}
                            >
                                {searchLoading ? (
                                    <>
                                        <span className="tm-btn-loader" />
                                        <span>{t("menu.searching")}</span>
                                    </>
                                ) : t("menu.searchBtn")}
                            </button>
                        </div>
                        {(searchLoading || searchError) && (
                            <div className={`tm-loading-panel visible`} data-aos="fade-up">
                                {searchLoading && (
                                    <div className="tm-lp-loader" data-aos="fade-up">
                                        <div className="tm-lp-ring" />
                                        <div className="tm-lp-text">
                                            <p className="tm-lp-title">{t("menu.loadingTitle")}</p>
                                            <p className="tm-lp-sub">{t("menu.loadingDesc")}</p>
                                        </div>
                                    </div>
                                )}
                                {searchError && !searchLoading && (
                                    <div className="tm-lp-warning" data-aos="fade-up">
                                        <div className="tm-lp-warn-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <div className="tm-lp-warn-text">
                                            <p className="tm-lp-warn-title">{t("menu.notFoundTitle")}</p>
                                            <p className="tm-lp-warn-sub">{t("menu.notFoundDesc")}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <h1 className="tm-title" data-aos="fade-up">
                        {t("menu.heroTitle1")} <span className="tm-gold">{t("menu.heroTitleGold")}</span> {t("menu.heroTitle2")}
                    </h1>
                    <p className="tm-subtitle" data-aos="fade-up">
                        {t("menu.heroDesc")}
                    </p>
                    <div className="tm-hero-actions" data-aos="fade-up">
                        <button className="tm-hero-btn" data-aos="zoom-in" onClick={() => bodyRef.current?.scrollIntoView({ behavior: "smooth" })}>
                            {t("menu.viewMenu")}
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="tm-divider" data-aos="fade-up">
                        <span data-aos="fade-up" /><div className="tm-diamond" data-aos="fade-up" /><span data-aos="fade-up" />
                    </div>
                </div>
            </section>
            <section className="tm-body" ref={bodyRef} data-aos="fade-up">
                <div className="tm-section-label" data-aos="fade-up">
                    <span className="tm-label-line" data-aos="fade-up" />
                    <span data-aos="fade-up">{t("menu.menuLabel")}</span>
                    <span className="tm-label-line" data-aos="fade-up" />
                </div>
                <h2 className="tm-section-title" data-aos="fade-up">{t("menu.availableTitle1")} <span className="tm-gold">{t("menu.availableTitleGold")}</span> {t("menu.availableTitle2")}</h2>
                <div
                    className={`tm-categories ${highlightedCat ? "tm-section-highlight" : ""}`}
                    id={getCategoryId(activeCategory)}
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <div className="tm-cat-track" data-aos="fade-up">
                        {menuCategories.map((cat, ci) => (
                            <button
                                key={cat}
                                className={`tm-cat-btn ${activeCategory === cat ? "active" : ""}`}
                                data-aos="fade-up"
                                data-aos-delay={ci * 50}
                                onClick={() => handleCategoryClick(cat)}
                            >
                                {t("menu.cat_" + cat.replace(/ /g, "_"))}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="tm-stats" data-aos="fade-up" data-aos-delay="150">
                    <span className="tm-stats-count">{filtered.length} {t("menu.found")}</span>
                </div>
                <div className="tm-grid-wrap" data-aos="fade-up">
                    <div className="tm-grid" data-aos="fade-up">
                        {Array.from({ length: Math.ceil(visible.length / 4) }, (_, i) => {
                            const rowItems = visible.slice(i * 4, i * 4 + 4)
                            return (
                                <div key={i} className="tm-grid-row" data-aos="row-reveal" data-aos-delay={i * 50} data-aos-offset="100">
                                    {rowItems.map(item => (
                                        <MenuCard key={item.id} item={item} />
                                    ))}
                                </div>
                            )
                        })}
                    </div>
                </div>
                {hasMore && (
                    <div className="tm-load-more" data-aos="fade-up">
                        <button className="tm-load-btn" data-aos="zoom-in" onClick={() => setVisibleCount(prev => prev + 4)}>
                            {t("menu.viewMore")}
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                )}
                {filtered.length === 0 && !searchLoading && (
                    <div className="tm-empty" data-aos="fade-up">
                        <svg viewBox="0 0 24 24" fill="none">
                            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <p>{t("menu.empty")}</p>
                    </div>
                )}
                <article className="swiper-art" data-aos="fade-up">
                    <Swiper
                        spaceBetween={0}
                        effect={'fade'}
                        navigation={true}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                        speed={1200}
                        modules={[EffectFade, Navigation, Pagination, Autoplay]}
                        className="mySwiper"
                    >
                        <SwiperSlide><img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80" /></SwiperSlide>
                        <SwiperSlide><img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&q=80" /></SwiperSlide>
                        <SwiperSlide><img src="https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1200&q=80" /></SwiperSlide>
                        <SwiperSlide><img src="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200&q=80" /></SwiperSlide>
                        <SwiperSlide><img src="https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1200&q=80" /></SwiperSlide>
                        <SwiperSlide><img src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&q=80" /></SwiperSlide>
                        <SwiperSlide><img src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=1200&q=80" /></SwiperSlide>
                    </Swiper>
                </article>
            </section>
        </div>
    )
}
