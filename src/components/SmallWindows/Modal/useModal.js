import { useContext } from "react"
import { ModalContext } from "./ModalContext.jsx"

export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) {
    throw new Error("Modal oyna bilan bog'liq qandaydir muammo yuz berdi.")
  }
  return ctx
}
