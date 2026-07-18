export const ROOM_IMAGES = [
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80",
  "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?w=600&q=80",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80"
]

export const roomTypes = [
  { id: "standart-1", name: "Standart Ikki Kishilik", description: "Qulay va arzon narxdagi ikki kishilik standart xona. Konditsioner, shaxsiy hammom va minibar mavjud.", image: ROOM_IMAGES[0], category: "Standart" },
  { id: "standart-2", name: "Standart Bir Kishilik", description: "Yakka sayohatchilar uchun mo'ljallangan qulay bir kishilik xona. Barcha kerakli jihozlar bilan ta'minlangan.", image: ROOM_IMAGES[1], category: "Standart" },
  { id: "standart-3", name: "Standart Terrasali", description: "O'zining shaxsiy terrassiga ega standart xona. Ertalabki qahvangizni ochiq havoda iching.", image: ROOM_IMAGES[2], category: "Standart" },
  { id: "standart-4", name: "Standart Shahar Manzarali", description: "Shaharning go'zal manzarasini tomosha qilish imkoniyatiga ega standart xona.", image: ROOM_IMAGES[3], category: "Standart" },
  { id: "standart-5", name: "Standart Bog' Manzarali", description: "Yam-yashil bog'ga qaragan tinch va sokin standart xona. Dam olish uchun ideal.", image: ROOM_IMAGES[4], category: "Standart" },
  { id: "standart-6", name: "Standart Premium", description: "Kengroq maydon va qo'shimcha qulayliklarga ega standart xona. Yuqori qavatda joylashgan.", image: ROOM_IMAGES[5], category: "Standart" },
  { id: "hashamatli-1", name: "Hashamatli Suit", description: "Keng va hashamatli suit xona. Shahar manzarasi, premium jihozlar bilan jihozlangan.", image: ROOM_IMAGES[1], category: "Hashamatli" },
  { id: "hashamatli-2", name: "Hashamatli Junior Suit", description: "Kichik yashash xonasiga ega hashamatli junior suit. Zamonaviy dizayn va qulaylik.", image: ROOM_IMAGES[2], category: "Hashamatli" },
  { id: "hashamatli-3", name: "Hashamatli Panoramali", description: "Katta panoramali oynalardan shahar manzarasi ochiladigan hashamatli xona.", image: ROOM_IMAGES[3], category: "Hashamatli" },
  { id: "hashamatli-4", name: "Hashamatli Terrasali", description: "Keng terrasa va jakuzili hammomga ega hashamatli xona. Romantic dam olish uchun.", image: ROOM_IMAGES[4], category: "Hashamatli" },
  { id: "hashamatli-5", name: "Hashamatli Ikki Xonali", description: "Alohida yashash va yotoq xonasiga ega keng hashamatli suit.", image: ROOM_IMAGES[5], category: "Hashamatli" },
  { id: "hashamatli-6", name: "Hashamatli Premium", description: "Eng yuqori darajadagi hashamatli xona. Butler xizmati va VIP qulayliklar mavjud.", image: ROOM_IMAGES[6], category: "Hashamatli" },
  { id: "biznes-1", name: "Biznes Standart", description: "Ishbilarmonlar uchun maxsus jihozlangan xona. Tezkor internet va ish stoli mavjud.", image: ROOM_IMAGES[2], category: "Biznes" },
  { id: "biznes-2", name: "Biznes Suit", description: "Keng ish maydoni va konferentsiya zali xizmatiga ega biznes suit.", image: ROOM_IMAGES[3], category: "Biznes" },
  { id: "biznes-3", name: "Biznes Executive", description: "Yuqori lavozimli mehmonlar uchun executive darajadagi biznes xona.", image: ROOM_IMAGES[4], category: "Biznes" },
  { id: "biznes-4", name: "Biznes Premium", description: "Qo'shimcha ofis jihozlari va VIP biznes xizmatlarga ega premium xona.", image: ROOM_IMAGES[5], category: "Biznes" },
  { id: "biznes-5", name: "Biznes Deluxe", description: "Keng yashash maydoni va zamonaviy konferentsiya imkoniyatlariga ega deluxe xona.", image: ROOM_IMAGES[6], category: "Biznes" },
  { id: "biznes-6", name: "Biznes Grand", description: "Eng katta biznes xona. 6 kishilik muzokara stoli va premium texnika bilan jihozlangan.", image: ROOM_IMAGES[0], category: "Biznes" },
  { id: "oilaviy-1", name: "Oilaviy Ikki Xonali", description: "Katta oilalar uchun ikki xonali keng xona. Bolalar uchun qo'shimcha yotoq mavjud.", image: ROOM_IMAGES[3], category: "Oilaviy" },
  { id: "oilaviy-2", name: "Oilaviy Uch Xonali", description: "Uch alohida xonadan iborat oilaviy suit. Katta oilalar uchun ideal tanlov.", image: ROOM_IMAGES[4], category: "Oilaviy" },
  { id: "oilaviy-3", name: "Oilaviy Suit", description: "Oshxona va yashash xonasiga ega to'liq jihozlangan oilaviy suit.", image: ROOM_IMAGES[5], category: "Oilaviy" },
  { id: "oilaviy-4", name: "Oilaviy Terrasali", description: "Katta terrasa va bolalar o'yin maydonchasi yaqinidagi oilaviy xona.", image: ROOM_IMAGES[6], category: "Oilaviy" },
  { id: "oilaviy-5", name: "Oilaviy Premium", description: "Premium jihozlangan katta oilaviy xona. Barcha qulayliklar oilangiz uchun.", image: ROOM_IMAGES[0], category: "Oilaviy" },
  { id: "oilaviy-6", name: "Oilaviy Grand Suit", description: "Eng katta oilaviy suit. 8 kishigacha mo'ljallangan, to'liq jihozlangan oshxona.", image: ROOM_IMAGES[1], category: "Oilaviy" },
  { id: "lyuks-1", name: "Lyuks Suit", description: "Premium jihozlangan hashamatli lyuks xona. Alohida yashash xonasi va VIP xizmat.", image: ROOM_IMAGES[4], category: "Lyuks" },
  { id: "lyuks-2", name: "Lyuks Junior Suit", description: "Kichik yashash xonasi va premium jihozlarga ega lyuks junior suit.", image: ROOM_IMAGES[5], category: "Lyuks" },
  { id: "lyuks-3", name: "Lyuks Panoramali", description: "360 daraja shahar manzarasi ochiladigan panoramali lyuks xona.", image: ROOM_IMAGES[6], category: "Lyuks" },
  { id: "lyuks-4", name: "Lyuks Royal Suit", description: "Qirollik darajasidagi lyuks xona. Antiqa mebellar va eksklyuziv dizayn.", image: ROOM_IMAGES[0], category: "Lyuks" },
  { id: "lyuks-5", name: "Lyuks Imperial", description: "Imperator uslubidagi eng hashamatli lyuks xonalardan biri.", image: ROOM_IMAGES[1], category: "Lyuks" },
  { id: "lyuks-6", name: "Lyuks Presidential", description: "Prezident darajasidagi lyuks xona. Shaxsiy butler va barcha imkoniyatlar.", image: ROOM_IMAGES[2], category: "Lyuks" },
  { id: "prezident-1", name: "Prezident Suit", description: "Eng yuqori darajadagi prezident suit. Maxsus dizayn va shaxsiy butler xizmati.", image: ROOM_IMAGES[5], category: "Prezident" },
  { id: "prezident-2", name: "Prezident Royal", description: "Qirollik darajasidagi prezident xonasi. Keng yashash maydoni va VIP xizmat.", image: ROOM_IMAGES[6], category: "Prezident" },
  { id: "prezident-3", name: "Prezident Imperial", description: "Eng hashamatli prezident xonalaridan biri. Barcha imkoniyatlar siz uchun.", image: ROOM_IMAGES[0], category: "Prezident" },
  { id: "prezident-4", name: "Prezident VIP", description: "Maxfiylik va hashamatni birlashtirgan VIP prezident xonasi.", image: ROOM_IMAGES[1], category: "Prezident" },
  { id: "prezident-5", name: "Prezident Grand", description: "200 kv.m maydonga ega grand prezident suit. Shaxsiy SPA va basseyn.", image: ROOM_IMAGES[2], category: "Prezident" },
  { id: "prezident-6", name: "Prezident Executive", description: "Eng yuqori darajadagi executive prezident xonasi. Barcha xizmatlar 24/7.", image: ROOM_IMAGES[3], category: "Prezident" }
]

export const roomCategories = ["Barchasi", "Standart", "Hashamatli", "Biznes", "Oilaviy", "Lyuks", "Prezident"]

export const categoryMultiplier = {
  standart: 0.8, hashamatli: 1.3, biznes: 1.0,
  oilaviy: 1.2, lyuks: 2.0, prezident: 3.0
}

export const categoryLabel = {
  standart: "Standart", hashamatli: "Hashamatli", biznes: "Biznes",
  oilaviy: "Oilaviy", lyuks: "Lyuks", prezident: "Prezident"
}

export function extractCategory(rt) {
  if (!rt) return ""
  const s = String(rt)
  const idx = s.indexOf("-")
  return idx > 0 ? s.substring(0, idx).toLowerCase() : s.toLowerCase()
}

export function getRoomLabel(roomType) {
  return categoryLabel[roomType] || "Standart"
}
