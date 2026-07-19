export function validateEmail(email) {
  const codes = []

  if (!email || typeof email !== "string") {
    codes.push("EMAIL_EMPTY")
    return { valid: false, errors: codes }
  }

  if (email.length > 254) {
    codes.push("EMAIL_TOO_LONG")
    return { valid: false, errors: codes }
  }

  if (/\s/.test(email)) {
    codes.push("EMAIL_HAS_SPACES")
  }

  const atCount = (email.match(/@/g) || []).length
  if (atCount === 0) {
    codes.push("EMAIL_NO_AT")
  } else if (atCount > 1) {
    codes.push("EMAIL_MULTIPLE_AT")
  }

  if (codes.length > 0) return { valid: false, errors: codes }

  const parts = email.split("@")
  const localPart = parts[0]
  const domain = parts[1]

  if (!localPart || localPart.length === 0) {
    codes.push("EMAIL_NO_LOCAL_PART")
  } else if (localPart.length > 64) {
    codes.push("EMAIL_LOCAL_PART_TOO_LONG")
  }

  if (!domain || domain.length === 0) {
    codes.push("EMAIL_NO_DOMAIN")
  } else {
    if (!domain.includes(".")) {
      codes.push("EMAIL_INVALID_DOMAIN")
    } else {
      const domainParts = domain.split(".")
      const tld = domainParts[domainParts.length - 1]
      if (tld.length < 2) {
        codes.push("EMAIL_TLD_TOO_SHORT")
      }
      if (domainParts.some(p => p.length === 0)) {
        codes.push("EMAIL_EMPTY_DOMAIN_PART")
      }
      if (domain.startsWith(".") || domain.endsWith(".")) {
        codes.push("EMAIL_DOMAIN_DOTS")
      }
    }
  }

  const localValid = localPart && /^[a-zA-Z0-9._%+\-]+$/.test(localPart)
  if (localPart && !localValid) {
    codes.push("EMAIL_INVALID_CHARS")
  }

  if (codes.length > 0) return { valid: false, errors: codes }

  return { valid: true, errors: [] }
}

export function getEmailErrorText(code, t) {
  const map = {
    EMAIL_EMPTY: t("validation.emailEmpty"),
    EMAIL_TOO_LONG: t("validation.emailTooLong"),
    EMAIL_HAS_SPACES: t("validation.emailHasSpaces"),
    EMAIL_NO_AT: t("validation.emailNoAt"),
    EMAIL_MULTIPLE_AT: t("validation.emailMultipleAt"),
    EMAIL_NO_LOCAL_PART: t("validation.emailNoLocalPart"),
    EMAIL_LOCAL_PART_TOO_LONG: t("validation.emailLocalPartTooLong"),
    EMAIL_NO_DOMAIN: t("validation.emailNoDomain"),
    EMAIL_INVALID_DOMAIN: t("validation.emailInvalidDomain"),
    EMAIL_TLD_TOO_SHORT: t("validation.emailTldTooShort"),
    EMAIL_EMPTY_DOMAIN_PART: t("validation.emailEmptyDomainPart"),
    EMAIL_DOMAIN_DOTS: t("validation.emailDomainDots"),
    EMAIL_INVALID_CHARS: t("validation.emailInvalidChars"),
  }
  return map[code] || code
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
    return { success: false, demo: true }
  }
}

export function prepareVoucherEmail(voucher, t) {
  if (t) {
    const subject = t("email.subject").replace("{id}", voucher.id)
    const body =
      t("email.greeting").replace("{name}", voucher.guestName) + "\n\n" +
      t("email.confirmed") + "\n\n" +
      t("email.hotel") + voucher.hotelName + "\n" +
      t("email.room") + voucher.roomType + "\n" +
      t("email.checkIn") + voucher.checkIn + "\n" +
      t("email.checkOut") + voucher.checkOut + "\n" +
      t("email.guests") + voucher.guests + " " + t("email.person") + "\n" +
      t("email.total") + "$" + voucher.totalPrice + "\n\n" +
      t("email.id") + voucher.id + "\n" +
      t("email.sentTo") + voucher.guestEmail + "\n\n" +
      t("email.footer")
    return { to: voucher.guestEmail, subject, body }
  }
  return {
    to: voucher.guestEmail,
    subject: `Sadrul — Booking Confirmation #${voucher.id}`,
    body: `Dear ${voucher.guestName},\n\n` +
      `Your booking has been confirmed!\n\n` +
      `Hotel: ${voucher.hotelName}\n` +
      `Room: ${voucher.roomType}\n` +
      `Check-in: ${voucher.checkIn}\n` +
      `Check-out: ${voucher.checkOut}\n` +
      `Guests: ${voucher.guests} person(s)\n` +
      `Total: $${voucher.totalPrice}\n\n` +
      `Booking ID: ${voucher.id}\n` +
      `Voucher sent to: ${voucher.guestEmail}\n\n` +
      `Thank you for choosing Sadrul Hotel!`
  }
}
