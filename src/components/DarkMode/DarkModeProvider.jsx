import { useState, useEffect } from "react"
import { DarkModeContext } from "./DarkModeContext.jsx"

export function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("darkMode")
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDark))
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const toggleDark = () => setIsDark(prev => !prev)

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </DarkModeContext.Provider>
  )
}
