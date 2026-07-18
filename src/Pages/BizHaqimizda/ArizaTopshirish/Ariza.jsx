import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { positionNames } from "../../../data/karyera"
import "./Ariza.css"

export default function Ariza() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialPosition = searchParams.get("position") || ""

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    position: initialPosition,
    coverLetter: "",
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])



  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || "8660545473:AAGY89rv43RrDkXL7y5D-QfeAupQj6izoUA";
    const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || "7483038020";

    const text = `
📩 Yangi ish arizasi

 Ism: ${form.fullName}

 Telefon: ${form.phone}

 Email: ${form.email}

 Lavozim: ${form.position}

 Motivatsion xat:

${form.coverLetter}
`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text,
          }),
        }
      );

      const data = await response.json();

      if (data.ok) {
        setSubmitted(true);
      } else {
        alert("Telegramga yuborishda xatolik yuz berdi.");
      }
    } catch (error) {
      alert("Internet yoki server xatosi.");
    }
  };
  if (submitted) {
    return (
      <div className="ariza-page">
        <div className="ariza-hero">
          <div className="ariza-hero-overlay" />
          <div className="ariza-hero-content">
            <h1>Ariza Qabul Qilindi!</h1>
            <p className="ariza-hero-sub">Sizning arizangiz muvaffaqiyatli qabul qilindi</p>
          </div>
        </div>
        <div className="ariza-body">
          <div className="ariza-success-card" data-aos="fade-up">
            <div className="ariza-success-icon" data-aos="zoom-in" data-aos-delay="100">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#D4AF37" strokeWidth="2" />
                <path d="M8 12L11 15L16 9" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 data-aos="fade-up" data-aos-delay="200">Tabriklaymiz, {form.fullName}!</h2>
            <p className="ariza-success-text" data-aos="fade-up" data-aos-delay="300">
              Sizning <strong>{form.position}</strong> lavozimiga arizangiz qabul qilindi.
            </p>
            <p className="ariza-success-note" data-aos="fade-up" data-aos-delay="400">Tez orada siz bilan bog'lanamiz.</p>
            <button className="ariza-btn ariza-btn-primary" data-aos="fade-up" data-aos-delay="500" onClick={() => navigate("/biz-haqimizda")}>
              Biz haqimizda sahifasiga qaytish
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ariza-page">
      <div className="ariza-hero">
        <div className="ariza-hero-overlay" />
        <div className="ariza-hero-content" data-aos="zoom-in">
          <div className="ariza-badge" data-aos="fade-up" data-aos-delay="0">Karyera</div>
          <h1>Ariza <span className="gold-text">Topshirish</span></h1>
          <p className="ariza-hero-sub">Bizning jamoamizga qo'shiling va birgalikda rivojlaning</p>
        </div>
      </div>

      <div className="ariza-body">
        <div className="ariza-container">
          <form className="ariza-form" onSubmit={handleSubmit} data-aos="fade-up">
            <h2 className="ariza-form-title">Shaxsiy ma'lumotlar</h2>
            <div className="ariza-form-grid">
              <div className="ariza-form-group ariza-full">
                <label>To'liq ismingiz</label>
                <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Ali Aliyev" required />
              </div>
              <div className="ariza-form-group">
                <label>Telefon raqam</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+998 90 123 45 67" required />
              </div>
              <div className="ariza-form-group">
                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="ali@example.com" required />
              </div>
              <div className="ariza-form-group ariza-full">
                <label>Lavozim</label>
                <select name="position" value={form.position} onChange={handleChange} required>
                  <option value="" disabled>Lavozimni tanlang</option>
                  {positionNames.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="ariza-form-group ariza-full">
                <label>Xat:</label>
                <textarea name="coverLetter" value={form.coverLetter} onChange={handleChange} placeholder="O'zingiz haqingizda qisqacha ma'lumot (yoshingiz, qayerda yashashingiz, va h.k) va nima uchun biz bilan ishlashni xohlayotganingizni yozing..." rows={5} />
              </div>
            </div>

            <button type="submit" className="ariza-btn ariza-btn-primary ariza-btn-submit" data-aos="zoom-in">
              Arizani yuborish
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
