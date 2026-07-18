import emailjs from "@emailjs/browser"
import EMAIL_CONFIG, { isEmailConfigured } from "./emailConfig"

export async function sendVoucherEmail(voucher) {
  if (!isEmailConfigured()) {
    console.log(
      "[EmailJS Demo Mode] Voucher tayyor, lekin EmailJS sozlanmagan.",
      "emailConfig.js faylini ochib SERVICE_ID, TEMPLATE_ID va PUBLIC_KEY ni kiriting."
    )
    console.log("Voucher ma'lumotlari:", voucher)
    return { success: false, demo: true }
  }

  try {
    const templateParams = {
      to_name: voucher.guestName,
      to_email: voucher.guestEmail,
      from_name: EMAIL_CONFIG.FROM_NAME,
      from_email: EMAIL_CONFIG.FROM_EMAIL,
      booking_id: voucher.id,
      hotel_name: voucher.hotelName,
      hotel_location: voucher.hotelLocation,
      room_type: voucher.roomType,
      check_in: voucher.checkIn,
      check_out: voucher.checkOut,
      guests: voucher.guests,
      total_price: `$${voucher.totalPrice}`,
      payment_method: voucher.paymentMethod || "naqt",
      promo_code: voucher.promoCode || "",
      promo_discount: voucher.promoDiscount ? `${voucher.promoDiscount}%` : "",
      status: voucher.status,
      year: new Date().getFullYear()
    }

    const result = await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAIL_CONFIG.PUBLIC_KEY
    )

    return { success: true, result }
  } catch (err) {
    console.error("Email yuborishda xatolik:", err)
    return { success: false, error: err }
  }
}
