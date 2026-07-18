import { createContext } from "react"

export const ModalContext = createContext()

export const MODAL_TYPES = {
  LOGIN: 'login',
  SIGNUP: 'signup',
}
