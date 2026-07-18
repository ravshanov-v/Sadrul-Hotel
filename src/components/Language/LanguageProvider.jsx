import { useState, useEffect } from "react"
import { LanguageContext } from "./LanguageContext.jsx"
import uz from "../../translations/uz.js"
import ru from "../../translations/ru.js"
import en from "../../translations/en.js"

const translations = { uz, ru, en }

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("lang") || "uz"
  })

  useEffect(() => {
    localStorage.setItem("lang", lang)
    document.documentElement.lang = lang
  }, [lang])

  const t = (path) => {
    const keys = path.split(".")
    let result = translations[lang]
    for (const key of keys) {
      if (result && typeof result === "object" && key in result) {
        result = result[key]
      } else {
        return path
      }
    }
    return result
  }

  const tData = (path, fallback) => {
    const keys = path.split(".")
    let result = translations[lang]
    for (const key of keys) {
      if (result && typeof result === "object" && key in result) {
        result = result[key]
      } else {
        return fallback
      }
    }
    return result
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tData }}>
      {children}
    </LanguageContext.Provider>
  )
}
