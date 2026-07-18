import { useContext } from "react"
import { FavoritesContext } from "./FavoritesContext.jsx"

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) {
    throw new Error("useFavorites dan foydalanish uchun komponent FavoritesProvider bilan o'ralgan bo'lishi shart.")
  }
  return ctx
}
