import { Link } from "react-router-dom"
import { hotels } from "../../data/hotels"
import { menuItems } from "../../data/taomnoma"
import { takliflar } from "../../data/takliflar"
import { BsBuildings, BsPeople, BsShieldCheck, BsStar } from 'react-icons/bs'
import StatsBar from "../../components/StatsBar/StatsBar"
import "./BoshSahifa.css"

const hotelCount = hotels.length
const cityCount = [...new Set(hotels.map(h => h.location?.split(",")[0]?.trim()).filter(Boolean))].length
const offerCount = takliflar.length

export default function BoshSahifa() {
  const preview = hotels.slice(0, 4)
  const foodPreview = menuItems.filter(i => i.available).slice(0, 6)

  return (
    <div data-aos="fade-up">
      <div className='page-1' data-aos="fade-up">
        <article className='page-1-art' data-aos="zoom-in">
          <div className='page-1-badge'>
            <svg viewBox='0 0 24 24' fill='none'>
              <path d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' fill='currentColor' />
            </svg>
            <span className='page-1-badge-line' />
            Noyob Sayohat Tajribasi
            <span className='page-1-badge-line' />
            <svg viewBox='0 0 24 24' fill='none'>
              <path d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' fill='currentColor' />
            </svg>
          </div>
          <h1 className='main-h1'>Dam olishni <span className='gold-text'>Hashamat</span> Bilan boshlang</h1>
          <p className='main-p'>Noyob tajriba va unutilmas xotiralar uchun eng yaxshi joylarni toping</p>
          <div className='page-1-divider'>
            <span /><div className='page-1-diamond' /><span />
          </div>
        </article>

        <div className='page-1-stats' data-aos="fade-up" data-aos-delay="200">
          <StatsBar />
        </div>
      </div>

      <section className='hp-section' data-aos="fade-up">
        <div className='hp-label' data-aos="fade-up">
          <span className='hp-label-line' />
          <span>Mashhur Mehmonxonalar</span>
          <span className='hp-label-line' />
        </div>
        <h2 className='hp-title' data-aos="fade-up">O'zbekiston bo'ylab <span className='hp-gold'>Eng Yaxshi</span> Joylar</h2>
        <p className='hp-desc' data-aos="fade-up" data-aos-delay="100">Hashamatli saroylardan tortib, oilaviy mehmonxonalargacha — eng yaxshi tanlovlar</p>

        <div className='hp-grid'>
          {preview.map((hotel, i) => (
            <article key={hotel.id} className='hp-card'>
                <div className='hp-card-img'>
                <img src={hotel.image} alt={hotel.name} loading='lazy' />
                <div className='hp-card-cat'>{hotel.category}</div>
              </div>
              <div className='hp-card-body'>
                <h3 className='hp-card-name'>{hotel.name}</h3>
                <div className='hp-card-loc'>
                  <svg viewBox='0 0 24 24' fill='none'>
                    <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z' stroke='currentColor' strokeWidth='2' />
                    <circle cx='12' cy='9' r='2.5' stroke='currentColor' strokeWidth='2' />
                  </svg>
                  {hotel.location}
                </div>
                <div className='hp-card-bottom'>
                  <span className='hp-card-price'><strong>${hotel.price}</strong> / kecha</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className='hp-actions' data-aos="zoom-in">
          <Link to='/mehmonxonalar' className='hp-all-btn'>
            Barcha mehmonxonalarni ko'rish
            <svg viewBox='0 0 24 24' fill='none'>
              <path d='M5 12h14M12 5l7 7-7 7' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </Link>
        </div>
      </section>

      {/* ========== TAOMNOMA PREVIEW ========== */}
      <section className='tp-section' data-aos="fade-up">
        <div className='tp-label' data-aos="fade-up">
          <span className='tp-label-line' />
          <span>Sadrul Taomnoma</span>
          <span className='tp-label-line' />
        </div>
        <h2 className='tp-title' data-aos="fade-up">Milliy <span className='tp-gold'>Taomlar</span> Mazasi</h2>
        <p className='tp-desc' data-aos="fade-up" data-aos-delay="100">O'zbekistonning eng mazali taomlari, nonlari va ichimliklari — bir joyda</p>

        <div className='tp-grid'>
          {foodPreview.map((item, i) => (
            <article key={item.id} className='tp-card'>
              <div className='tp-card-img'>
                <img src={item.image} alt={item.name} loading='lazy' />
                <div className='tp-card-cat'>{item.category}</div>
              </div>
              <div className='tp-card-body'>
                <div className='tp-card-top'>
                  <h3 className='tp-card-name'>{item.name}</h3>
                  <span className='tp-card-cat-label'>{item.category}</span>
                </div>
                <p className='tp-card-desc'>{item.description}</p>
                <div className='tp-card-bottom'>
                  <span className='tp-card-info'>
                    <svg viewBox='0 0 24 24' fill='none'>
                      <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='1.5' />
                      <path d='M12 6v6l4 2' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
                    </svg>
                    {item.info}
                  </span>
                </div>
                <div className='tp-var-wrap'>
                  <Link to={`/taomnoma/${item.id}`} className='tp-about-btn' onClick={(e) => e.stopPropagation()}>
                    <svg viewBox='0 0 24 24' fill='none' className='tp-about-icon'>
                      <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='1.5' />
                      <path d='M12 16v-4M12 8h.01' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                    </svg>
                    <span>Taom haqida</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className='tp-actions' data-aos="zoom-in">
          <Link to='/taomnoma' className='tp-all-btn'>
            To'liq menyuni ko'rish
            <svg viewBox='0 0 24 24' fill='none'>
              <path d='M5 12h14M12 5l7 7-7 7' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </Link>
        </div>
      </section>

      {/* ========== TAKLIFLAR PREVIEW ========== */}
      <section className='op-section' data-aos="fade-up">
        <div className='op-label' data-aos="fade-up">
          <span className='op-label-line' />
          <span>Chegirmalar</span>
          <span className='op-label-line' />
        </div>
        <h2 className='op-title' data-aos="fade-up">Eksklyuziv <span className='op-gold'>chegirmalar</span></h2>
        <p className='op-desc' data-aos="fade-up" data-aos-delay="100">Cheklangan muddatli eng yaxshi takliflar faqat siz uchun</p>

        <div className='op-grid'>
          {takliflar.slice(0, 3).map((taklif, i) => (
            <article key={taklif.id} className='op-card'>
              <div className='op-card-img'>
                <img src={taklif.image} alt={taklif.title} loading='lazy' />
                <div className='op-discount'>-{taklif.discount}%</div>
              </div>
              <div className='op-card-body'>
                <h3 className='op-card-name'>{taklif.title}</h3>
                <p className='op-card-sub'>{taklif.subtitle}</p>
                <div className='op-card-footer'>
                  <span className='op-card-code'>{taklif.code}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className='op-actions' data-aos="zoom-in">
          <Link to='/takliflar' className='op-all-btn'>
            Batafsil
            <svg viewBox='0 0 24 24' fill='none'>
              <path d='M5 12h14M12 5l7 7-7 7' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </Link>
        </div>
      </section>

      {/* ========== BIZ HAQIMIZDA PREVIEW ========== */}
      <section className='ap-section' data-aos="fade-up">
        <div className='ap-label' data-aos="fade-up">
          <span className='ap-label-line' />
          <span>Sadrul.uz</span>
          <span className='ap-label-line' />
        </div>
        <h2 className='ap-title' data-aos="fade-up">Biz <span className='ap-gold'>haqimizda</span></h2>
        <p className='ap-desc' data-aos="fade-up" data-aos-delay="100">Sadrul — zamonaviy texnologiyalar va tajribani birlashtirib, mijozlarga yuqori sifatli xizmatlar taqdim etuvchi platforma</p>

        <div className='ap-stats'>
          {[
            { icon: <BsBuildings />, value: `${hotelCount}+`, label: "Mehmonxonalar" },
            { icon: <BsPeople />, value: `${hotels.reduce((s, h) => s + (h.rooms || 0), 0)}+`, label: "Qulay xonalar" },
            { icon: <BsStar />, value: `${cityCount}+`, label: "Shaharlar" },
            { icon: <BsShieldCheck />, value: `${offerCount}+`, label: "Maxsus takliflar" },
          ].map((s, i) => (
            <div key={i} className='ap-stat-card'>
              <div className='ap-stat-icon'>{s.icon}</div>
              <span className='ap-stat-value'>{s.value}</span>
              <span className='ap-stat-label'>{s.label}</span>
            </div>
          ))}
        </div>

        {/* ===== MISSIYA ===== */}
        <div className='ap-mission' data-aos="fade-up">
          <div className='ap-mission-content' data-aos="fade-right">
            <div className='ap-sub-label'>
              <span className='ap-sub-label-line' />
              <span>Missiyamiz</span>
              <span className='ap-sub-label-line' />
            </div>
            <h3 className='ap-sub-title'>Eng yaxshi <span className='ap-gold'>xizmat</span> siz uchun</h3>
            <p className='ap-sub-text'>
              Bizning asosiy maqsadimiz – O'zbekiston bo'ylab eng yaxshi mehmonxonalarni tanlab,
              sayohatchilarga qulay va ishonchli xizmat ko'rsatish.
            </p>
          </div>
          <div className='ap-mission-image' data-aos="fade-left">
            <img src='/src/Assets/Images/sadrul-kompany.jpg' alt='Sadrul kompaniyasi' />
          </div>
        </div>

        {/* ===== QADRIYATLAR ===== */}
        <div className='ap-values' data-aos="fade-up">
          <div className='ap-sub-label' data-aos="fade-up">
            <span className='ap-sub-label-line' />
            <span>Qadriyatlarimiz</span>
            <span className='ap-sub-label-line' />
          </div>
          <h3 className='ap-sub-title' data-aos="fade-up">Nega aynan <span className='ap-gold'>Sadrul</span>?</h3>
          <div className='ap-values-grid'>
            {[
              { title: "Ishonchlilik", desc: "Har bir hamkorimiz bilan uzoq muddatli va ishonchli munosabatlar o'rnatamiz" },
              { title: "Sifat", desc: "Xizmat ko'rsatishda eng yuqori standartlarga amal qilamiz" },
              { title: "Innovatsiya", desc: "Zamonaviy texnologiyalar yordamida xizmatlarni doimiy takomillashtirib boramiz" },
              { title: "Natija", desc: "Har bir vazifaga mas'uliyat bilan yondashib, aniq natijaga erishamiz" },
            ].map((v, i) => (
              <div key={i} className='ap-value-card'>
                <div className='ap-value-num'>0{i + 1}</div>
                <h4 className='ap-value-title'>{v.title}</h4>
                <p className='ap-value-desc'>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== KARYERA ===== */}
        <div className='ap-karyera' data-aos="fade-up">
          <div className='ap-sub-label' data-aos="fade-up">
            <span className='ap-sub-label-line' />
            <span>Karyera</span>
            <span className='ap-sub-label-line' />
          </div>
          <h3 className='ap-sub-title' data-aos="fade-up">Biz bilan <span className='ap-gold'>ishlang</span></h3>
          <div className='ap-karyera-grid'>
            {[
              { title: "Ofitsiant", type: "To'liq vaqt", loc: "Toshkent" },
              { title: "Reseptionist", type: "To'liq vaqt", loc: "Toshkent" },
              { title: "Farrosh", type: "To'liq vaqt", loc: "Toshkent" },
              { title: "Oshpaz", type: "To'liq vaqt", loc: "Toshkent" },
            ].map((job, i) => (
              <Link key={i} to={`/ariza?position=${encodeURIComponent(job.title)}`} className='ap-karyera-card'>
                <div className='ap-karyera-type'>{job.type}</div>
                <h4 className='ap-karyera-title'>{job.title}</h4>
                <div className='ap-karyera-loc'>
                  <svg viewBox='0 0 24 24' fill='none'>
                    <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z' stroke='currentColor' strokeWidth='2' />
                    <circle cx='12' cy='9' r='2.5' stroke='currentColor' strokeWidth='2' />
                  </svg>
                  {job.loc}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className='ap-actions' data-aos="zoom-in">
          <Link to='/biz-haqimizda' className='ap-all-btn'>
            Batafsil ma'lumot
            <svg viewBox='0 0 24 24' fill='none'>
              <path d='M5 12h14M12 5l7 7-7 7' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
