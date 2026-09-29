import { extractCategory, categoryMultiplier } from "./roomData"

function readAllBookings() {
  const bookings = []
  try {
    for (const key of Object.keys(localStorage)) {
      if (!key.startsWith("bookings_")) continue
      try {
        const parsed = JSON.parse(localStorage.getItem(key) || "[]")
        if (Array.isArray(parsed)) bookings.push(...parsed)
      } catch {
        // skip a single corrupt record instead of dropping every booking
      }
    }
  } catch {
    // storage unavailable — no bookings can be read
  }
  return bookings
}

export function checkRoomAvailability(hotelId, roomType, checkIn, checkOut, roomTypes) {
  const allBookings = readAllBookings()

  const roomCat = extractCategory(roomType)

  const ci = new Date(checkIn)
  const co = new Date(checkOut)
  const rangeValid = !isNaN(ci) && !isNaN(co)

  const categoryRooms = (roomTypes || []).filter(r => extractCategory(r.id) === roomCat)
  const totalRooms = categoryRooms.length || 6

  const conflicting = rangeValid
    ? allBookings.filter(b => {
        if (Number(b.hotelId) !== Number(hotelId)) return false
        if (extractCategory(b.roomType || b.xonaTuri || "") !== roomCat) return false
        const bci = new Date(b.checkIn)
        const bco = new Date(b.checkOut)
        if (isNaN(bci) || isNaN(bco)) return false
        return bci < co && bco > ci
      })
    : []

  return {
    available: conflicting.length < totalRooms,
    remaining: Math.max(0, totalRooms - conflicting.length),
    totalRooms
  }
}

export function getSimilarRooms(hotelId, roomType, roomTypes, hotelPrice) {
  const getCategory = r => r.category || extractCategory(r.id)
  const addPrice = r => ({ ...r, price: r.price || Math.round(hotelPrice * (categoryMultiplier[getCategory(r).toLowerCase()] || 1)) })

  const selected = roomTypes.find(r => r.id === roomType)
  if (!selected) return roomTypes.slice(0, 3).map(addPrice)

  const selectedWithPrice = addPrice(selected)
  const selectedCategory = getCategory(selected)

  const sameCategory = roomTypes
    .filter(r => getCategory(r) === selectedCategory && r.id !== roomType)
    .map(addPrice)

  const otherCategory = roomTypes
    .filter(r => getCategory(r) !== selectedCategory && r.id !== roomType)
    .map(addPrice)

  const byClosestPrice = (a, b) => Math.abs(a.price - selectedWithPrice.price) - Math.abs(b.price - selectedWithPrice.price)
  const sameCats = sameCategory.sort(byClosestPrice)
  const others = otherCategory.sort(byClosestPrice)

  const combined = [...sameCats, ...others]
  const seen = new Set()
  const unique = combined.filter(r => { if (seen.has(r.id)) return false; seen.add(r.id); return true })

  return unique.slice(0, 6)
}

export function getNearbyHotels(currentHotel, allHotels) {
  const city = currentHotel.location?.split(",")[0]?.trim() || ""
  return allHotels
    .filter(h => h.id !== currentHotel.id && h.coordinates && currentHotel.coordinates && h.location?.includes(city))
    .map(h => ({
      ...h,
      distance: haversine(currentHotel.coordinates.lat, currentHotel.coordinates.lng, h.coordinates.lat, h.coordinates.lng)
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 4)
}

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10
}

export function getAlternativeDates(checkIn, checkOut) {
  const inDate = new Date(checkIn)
  const outDate = new Date(checkOut)
  if (isNaN(inDate) || isNaN(outDate)) {
    const today = new Date()
    return generateAlternatives(today, 1)
  }
  return generateAlternatives(inDate, Math.max(1, Math.round((outDate - inDate) / (1000 * 60 * 60 * 24))))
}

function generateAlternatives(from, duration) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const alts = []
  for (const offset of [-7, -3, 0, 3, 7, 14]) {
    const start = new Date(from)
    start.setDate(start.getDate() + offset)
    if (start < today) {
      start.setTime(today.getTime())
    }
    const end = new Date(start)
    end.setDate(end.getDate() + duration)
    alts.push({
      checkIn: start.toISOString().split("T")[0],
      checkOut: end.toISOString().split("T")[0],
      label: offset === 0 ? "today" : offset < 0 ? `before:${Math.abs(offset)}` : `after:${offset}`
    })
  }
  return alts
}
