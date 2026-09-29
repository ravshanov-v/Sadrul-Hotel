export function userKey(email) {
  return email || "guest"
}

function seenKey(key, email) {
  return "seen_" + key + "_" + userKey(email)
}

export function getSeen(key, email) {
  try {
    return JSON.parse(localStorage.getItem(seenKey(key, email)) || "0")
  } catch {
    return 0
  }
}

export function setSeen(key, val, email) {
  try {
    localStorage.setItem(seenKey(key, email), JSON.stringify(val))
  } catch {
    // storage unavailable (quota/private mode) — keep the counter in memory only
  }
}

export function getBookingCount(email) {
  try {
    return JSON.parse(localStorage.getItem("bookings_" + userKey(email)) || "[]").length
  } catch {
    return 0
  }
}
