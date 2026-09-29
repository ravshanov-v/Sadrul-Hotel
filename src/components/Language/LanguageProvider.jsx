import { useState, useEffect } from "react"
import { LanguageContext } from "./LanguageContext.jsx"
import uz from "../../translations/uz.js"

// Only the default language ships in the main bundle; ru/en load on demand.
const loaders = {
  uz: async () => ({ default: uz }),
  ru: () => import("../../translations/ru.js"),
  en: () => import("../../translations/en.js"),
}

const cache = { uz }

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("lang") || "uz"
    } catch {
      return "uz"
    }
  })
  const [dicts, setDicts] = useState({ uz })

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang)
    } catch {
      // storage unavailable
    }
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    let alive = true
    if (cache[lang]) {
      return () => { alive = false }
    }
    loaders[lang]().then(module => {
      cache[lang] = module.default
      if (alive) setDicts(prev => ({ ...prev, [lang]: module.default }))
    }).catch(() => {
      // keep Uzbek dictionary as fallback if the language chunk fails to load
    })
    return () => {
      alive = false
    }
  }, [lang])

  const dict = dicts[lang] || uz

  const resolve = (path) => {
    let result = dict
    for (const key of path.split(".")) {
      if (result && typeof result === "object" && key in result) {
        result = result[key]
      } else {
        return undefined
      }
    }
    return result
  }

  const interpolate = (template, params) =>
    Object.entries(params).reduce(
      (acc, [key, value]) => acc.replaceAll(`{${key}}`, String(value)),
      template
    )

  const t = (path, params) => {
    const result = resolve(path)
    if (result === undefined) return path
    if (typeof result !== "string" || !params) return result
    return interpolate(result, params)
  }

  const tData = (path, fallback) => {
    const result = resolve(path)
    return result === undefined ? fallback : result
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tData }}>
      {children}
    </LanguageContext.Provider>
  )
}
