import { useContext } from "react"
import { DarkModeContext } from "./DarkModeContext.jsx"

export function useDarkMode() {
  const ctx = useContext(DarkModeContext)
  if (!ctx) {
    throw new Error("useDarkMode dan foydalanish uchun komponent DarkModeProvider bilan o'ralgan bo'lishi shart.")
  }
  return ctx
}
