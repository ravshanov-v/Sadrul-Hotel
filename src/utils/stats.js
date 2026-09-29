import { hotels } from "../data/hotels"
import { menuItems } from "../data/taomnoma"
import { takliflar } from "../data/takliflar"

export const hotelCount = hotels.length
export const offerCount = takliflar.length

export const cityCount = [...new Set(hotels.map(h => h.location?.split(",")[0]?.trim()).filter(Boolean))].length

export const totalRoomCount = hotels.reduce((s, h) => s + (h.totalRooms || 0), 0)

export const dishVariantCount = menuItems.reduce((s, item) => s + (item.variants?.length || 0), 0)
