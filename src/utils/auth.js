export function validateEmail(email) {
  const errors = []

  if (!email || typeof email !== "string") {
    errors.push("Elektron pochta manzili kiritilmagan.")
    return { valid: false, errors }
  }

  if (email.length > 254) {
    errors.push("Elektron pochta manzili juda uzun (maksimal 254 belgi).")
    return { valid: false, errors }
  }

  if (/\s/.test(email)) {
    errors.push("Elektron pochta manzilida bo'sh joy bo'lmasligi kerak.")
  }

  const atCount = (email.match(/@/g) || []).length
  if (atCount === 0) {
    errors.push("Elektron pochta manzilida @ belgisi mavjud emas.")
  } else if (atCount > 1) {
    errors.push("Elektron pochta manzilida faqat bitta @ belgisi bo'lishi kerak.")
  }

  if (errors.length > 0) return { valid: false, errors }

  const parts = email.split("@")
  const localPart = parts[0]
  const domain = parts[1]

  if (!localPart || localPart.length === 0) {
    errors.push("@ belgisidan oldin qism mavjud emas.")
  } else if (localPart.length > 64) {
    errors.push("Elektron pochtaning @ oldidagi qismi juda uzun (maksimal 64 belgi).")
  }

  if (!domain || domain.length === 0) {
    errors.push("@ belgisidan keyin domen mavjud emas.")
  } else {
    if (!domain.includes(".")) {
      errors.push("Domen noto'g'ri formatda (masalan: gmail.com, mail.ru).")
    } else {
      const domainParts = domain.split(".")
      const tld = domainParts[domainParts.length - 1]
      if (tld.length < 2) {
        errors.push("Domenning yuqori darajali qismi (TLD) kamida 2 belgidan iborat bo'lishi kerak.")
      }
      if (domainParts.some(p => p.length === 0)) {
        errors.push("Domen qismlari bo'sh bo'lmasligi kerak.")
      }
      if (domain.startsWith(".") || domain.endsWith(".")) {
        errors.push("Domen nuqta bilan boshlanmasligi yoki tugamasligi kerak.")
      }
    }
  }

  const localValid = localPart && /^[a-zA-Z0-9._%+\-]+$/.test(localPart)
  if (localPart && !localValid) {
    errors.push("Elektron pochta nomi faqat harflar, raqamlar va . _ % + - belgilaridan iborat bo'lishi mumkin.")
  }

  if (errors.length > 0) return { valid: false, errors }

  return { valid: true, errors: [] }
}

export function getCurrentUserEmail() {
  try {
    const saved = localStorage.getItem("authUser")
    if (saved) {
      const user = JSON.parse(saved)
      if (user && user.email) return user.email
    }
  } catch {}
  return ""
}

export function generateBookingId() {
  const prefix = "SDR"
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

export function createBookingVoucher({ booking, hotel, formData, totalPrice }) {
  return {
    id: generateBookingId(),
    hotelId: hotel?.id,
    hotelName: hotel?.name,
    hotelLocation: hotel?.location,
    guestName: formData?.fullName || booking?.guestName || "",
    guestPhone: formData?.phone || booking?.guestPhone || "",
    guestEmail: getCurrentUserEmail(),
    checkIn: formData?.checkIn || booking?.checkIn || "",
    checkOut: formData?.checkOut || booking?.checkOut || "",
    roomType: formData?.roomType || booking?.roomType || "",
    guests: formData?.guests || booking?.guests || 1,
    totalPrice: totalPrice || booking?.totalPrice || 0,
    paymentMethod: formData?.paymentMethod || "naqt",
    promoCode: formData?.promoCode || booking?.promoCode || undefined,
    promoDiscount: formData?.promoDiscount || booking?.promoDiscount || undefined,
    createdAt: new Date().toISOString(),
    status: "confirmed"
  }
}

export async function sendVoucherEmail(voucher) {
  try {
    const { sendVoucherEmail: send } = await import("./emailService")
    return send(voucher)
  } catch {
    console.log("[Demo Mode] Email xizmati yuklanmadi, voucher localStorage ga saqlandi.")
    return { success: false, demo: true }
  }
}

export function prepareVoucherEmail(voucher) {
  return {
    to: voucher.guestEmail,
    subject: `Sadrul — Bron tasdiqnomasi #${voucher.id}`,
    body: `Hurmatli ${voucher.guestName},\n\n` +
      `Sizning broningiz tasdiqlandi!\n\n` +
      `Mehmonxona: ${voucher.hotelName}\n` +
      `Xona: ${voucher.roomType}\n` +
      `Kelish: ${voucher.checkIn}\n` +
      `Ketish: ${voucher.checkOut}\n` +
      `Mehmonlar: ${voucher.guests} kishi\n` +
      `Umumiy to'lov: $${voucher.totalPrice}\n\n` +
      `Bron ID: ${voucher.id}\n` +
      `Voucher quyidagi manzilga yuborildi: ${voucher.guestEmail}\n\n` +
      `Sadrul mehmonxonasiga tashrifingizdan xursandmiz!`
  }
}
