import { useContext } from "react"
import { AuthContext } from "./AuthContext.jsx"

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth dan foydalanish uchun komponent AuthProvider bilan o'ralgan bo'lishi shart.")
  }
  return ctx
}
