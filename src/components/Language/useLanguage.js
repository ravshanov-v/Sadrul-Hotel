import { useContext } from "react"
import { LanguageContext } from "./LanguageContext.jsx"

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useLanguage dan foydalanish uchun komponent LanguageProvider bilan o'ralgan bo'lishi shart.")
  }
  return ctx
}
