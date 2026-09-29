import { useState, useLayoutEffect } from "react"
import { DarkModeContext } from "./DarkModeContext.jsx"

export function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem("darkMode")
      return saved ? JSON.parse(saved) : false
    } catch {
      return false
    }
  })

  useLayoutEffect(() => {
    try {
      localStorage.setItem("darkMode", JSON.stringify(isDark))
    } catch {
      // storage unavailable
    }
    document.documentElement.classList.toggle("dark", isDark)
    document.documentElement.classList.add("dark-transition")
    const timer = setTimeout(() => {
      document.documentElement.classList.remove("dark-transition")
    }, 400)
    return () => clearTimeout(timer)
  }, [isDark])

  const toggleDark = () => setIsDark(prev => !prev)

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </DarkModeContext.Provider>
  )
}
