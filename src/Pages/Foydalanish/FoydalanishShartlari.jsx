import "./FoydalanishShartlari.css"

const sections = [
  {
    id: 1,
    title: "Umumiy qoidalar",
    text: "Ushbu Foydalanish shartlari (keyingi o'rinlarda \"Shartlar\") Sadrul.uz veb-sayti va mobil ilovasidan foydalanishni tartibga soladi. Saytdan foydalanish orqali siz ushbu Shartlarga to'liq rozilik bildirasiz. Agar Shartlar bilan rozi bo'lmasangiz, saytdan foydalanmang."
  },
  {
    id: 2,
    title: "Xizmatlardan foydalanish",
    text: "Saytimiz orqali siz mehmonxonalarni qidirish, bron qilish va boshqa turistik xizmatlardan foydalanishingiz mumkin. Barcha xizmatlar faqat shaxsiy va notijorat maqsadlarda foydalanish uchun taqdim etiladi. Saytdan noqonuniy yoki ruxsatsiz maqsadlarda foydalanish taqiqlanadi."
  },
  {
    id: 3,
    title: "Ro'yxatdan o'tish va hisob xavfsizligi",
    text: "Ba'zi xizmatlardan foydalanish uchun ro'yxatdan o'tish talab qilinadi. Siz to'g'ri, aniq va to'liq ma'lumotlarni taqdim etishga majbursingiz. Hisob ma'lumotlaringizni maxfiy saqlash va hisobingiz ostida amalga oshirilgan barcha harakatlar uchun javobgar siz."
  },
  {
    id: 4,
    title: "Bron qilish va to'lov shartlari",
    text: "Bron qilish jarayonida ko'rsatilgan narxlar va mavjudlik o'zgarishi mumkin. To'lovlar tanlangan to'lov usuli orqali amalga oshiriladi. Bronni bekor qilish va qaytarib berish siyosati har bir mehmonxona tomonidan belgilanadi va sahifada ko'rsatiladi."
  },
  {
    id: 5,
    title: "Foydalanuvchi majburiyatlari",
    text: "Foydalanuvchi saytdan foydalanish paytida amaldagi qonunchilikka rioya qilishi, boshqa foydalanuvchilarning huquqlarini buzmasligi, sayt ishlashiga xalaqit beradigan harakatlardan voz kechishi va taqdim etilgan ma'lumotlarning haqiqiyligini ta'minlashi shart."
  },
  {
    id: 6,
    title: "Intellektual mulk",
    text: "Saytdagi barcha materiallar (matnlar, rasmlar, logotiplar, dizayn) Sadrul.uz yoki litsenziarovchilarning intellektual mulki hisoblanadi. Materiallardan faqat shaxsiy, notijorat maqsadlarda foydalanishga ruxsat beriladi."
  },
  {
    id: 7,
    title: "Mas'uliyatni cheklash",
    text: "Sadrul.uz saytda ko'rsatilgan ma'lumotlarning to'liqligi va aniqligi uchun kafolat bermaydi. Saytdan foydalanish natijasida yuzaga keladigan har qanday zarar uchun biz javobgar emasmiz. Barcha xizmatlar \"mavjud holatida\" taqdim etiladi."
  },
  {
    id: 8,
    title: "Shartlarni o'zgartirish",
    text: "Sadrul.uz ushbu Shartlarni istalgan vaqtda o'zgartirish huquqini saqlab qoladi. O'zgartirishlar sahifada e'lon qilingan paytdan boshlab kuchga kiradi. Foydalanuvchi o'zgartirishlarni muntazam ravishda kuzatib borishi tavsiya etiladi."
  }
]

export default function FoydalanishShartlari() {
  return (
    <div className="terms-page" data-aos="fade-up">
      <section className="terms-hero" data-aos="fade-up">
        <div className="terms-hero-overlay" />
        <div className="terms-hero-content" data-aos="zoom-in">
          <div className="terms-badge">
            <span className="terms-badge-line" />
            <span>Sadrul.uz</span>
            <span className="terms-badge-line" />
          </div>
          <h1 className="terms-hero-title">
            Foydalanish <span className="gold-text">shartlari</span>
          </h1>
          <p className="terms-hero-desc">
            Saytimizdan foydalanishdan oldin quyidagi shartlarni diqqat bilan o'qib chiqing
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
        <p>Oxirgi yangilanish: Iyul, 2026</p>
      </section>
    </div>
  )
}
