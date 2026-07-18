import "./Maxfiylik.css"

const sections = [
  {
    id: 1,
    title: "Kirish",
    text: "Sadrul.uz saytiga xush kelibsiz. Ushbu Maxfiylik siyosati sizning shaxsiy ma'lumotlaringizni qanday to'plash, saqlash, foydalanish va himoya qilishimizni tushuntiradi. Saytimizdan foydalanish orqali siz ushbu siyosat shartlariga rozilik bildirasiz."
  },
  {
    id: 2,
    title: "Biz to'playdigan ma'lumotlar",
    text: "Siz saytimizdan ro'yxatdan o'tish, bron qilish yoki biz bilan bog'lanish vaqtida quyidagi ma'lumotlarni taqdim etishingiz mumkin: ism va familiya, elektron pochta manzili, telefon raqami, to'lov ma'lumotlari, joylashuv ma'lumotlari va saytdan foydalanish statistikasi."
  },
  {
    id: 3,
    title: "Ma'lumotlardan foydalanish maqsadi",
    text: "Shaxsiy ma'lumotlaringiz quyidagi maqsadlarda ishlatiladi: bron qilish jarayonini boshqarish, siz bilan bog'lanish, xizmatlarimizni yaxshilash, maxsus taklif va yangiliklar haqida xabardor qilish (roziligingiz bilan), va qonuniy majburiyatlarni bajarish."
  },
  {
    id: 4,
    title: "Cookie siyosati",
    text: "Saytimiz foydalanuvchi tajribasini yaxshilash uchun cookie-fayllardan foydalanadi. Cookie-fayllar brauzeringiz orqali qurilmangizda saqlanadigan kichik matnli fayllardir. Ularni brauzer sozlamalarida boshqarishingiz yoki o'chirishingiz mumkin."
  },
  {
    id: 5,
    title: "Ma'lumotlarni himoya qilish",
    text: "Shaxsiy ma'lumotlaringizni ruxsatsiz kirish, o'zgartirish, oshkor qilish yoki yo'q qilishdan himoya qilish uchun zamonaviy xavfsizlik choralarini qo'llaymiz. Barcha ma'lumotlar shifrlangan protokollar orqali uzatiladi."
  },
  {
    id: 6,
    title: "Uchinchi tomon xizmatlari",
    text: "Biz to'lovlarni qayta ishlash va tahlil kabi xizmatlar uchun ishonchli uchinchi tomon provayderlaridan foydalanishimiz mumkin. Bu provayderlar ma'lumotlaringizdan faqat ko'rsatilgan xizmatlarni bajarish uchun foydalanadilar va maxfiylikni saqlashga majburdirlar."
  },
  {
    id: 7,
    title: "Foydalanuvchi huquqlari",
    text: "Siz istalgan vaqtda shaxsiy ma'lumotlaringizga kirish, ularni tuzatish yoki o'chirishni talab qilish huquqiga egasiz. Shuningdek, ma'lumotlaringizni qayta ishlashga roziligingizni qaytarib olishingiz mumkin. Buning uchun biz bilan bog'laning."
  },
  {
    id: 8,
    title: "Bog'lanish",
    text: "Agar ushbu Maxfiylik siyosati haqida savollaringiz bo'lsa yoki shaxsiy ma'lumotlaringiz bilan bog'liq so'rovlaringiz bo'lsa, biz bilan bog'lanishingiz mumkin: info@sadrul.uz yoki +998 __ ___ __ __."
  }
]

export default function Maxfiylik() {
  return (
    <div className="privacy-page" data-aos="fade-up">
      <section className="privacy-hero" data-aos="fade-up">
        <div className="privacy-hero-overlay" />
        <div className="privacy-hero-content" data-aos="zoom-in">
          <div className="privacy-badge">
            <span className="privacy-badge-line" />
            <span>Sadrul.uz</span>
            <span className="privacy-badge-line" />
          </div>
          <h1 className="privacy-hero-title">
            Maxfiylik <span className="gold-text">siyosati</span>
          </h1>
          <p className="privacy-hero-desc">
            Shaxsiy ma'lumotlaringizni himoya qilish — bizning ustuvor vazifamiz
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
        <p>Oxirgi yangilanish: Iyul, 2026</p>
      </section>
    </div>
  )
}
