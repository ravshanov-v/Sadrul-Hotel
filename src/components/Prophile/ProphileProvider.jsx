import { useState } from "react"
import { ProphileContext } from "./ProphileContext.jsx"

export function ProphileProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const openProphile = () => setIsOpen(true)
  const closeProphile = () => setIsOpen(false)

  return (
    <ProphileContext.Provider value={{ isOpen, openProphile, closeProphile }}>
      {children}
    </ProphileContext.Provider>
  )
}
