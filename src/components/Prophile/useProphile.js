import { useContext } from "react"
import { ProphileContext } from "./ProphileContext.jsx"

export function useProphile() {
  const ctx = useContext(ProphileContext)
  if (!ctx) {
    throw new Error("useProphile dan foydalanish uchun komponent ProphileProvider bilan o'ralgan bo'lishi shart.")
  }
  return ctx
}
