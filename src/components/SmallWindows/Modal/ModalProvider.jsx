import { useState, useCallback } from "react"
import { ModalContext, MODAL_TYPES } from "./ModalContext.jsx"

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState(MODAL_TYPES.LOGIN)
  const [modalReason, setModalReason] = useState("")

  const openModal = useCallback((type = MODAL_TYPES.LOGIN, reason = "") => {
    setModalType(type)
    setModalReason(reason)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setModalReason("")
  }, [])

  return (
    <ModalContext.Provider value={{ isOpen, modalType, modalReason, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}
