import { useState, useEffect, useCallback } from "react"
import { FavoritesContext } from "./FavoritesContext.jsx"
import { useAuth } from "../Auth/useAuth.js"

function storageKey(email) {
  return email ? `favorites_${email}` : "favorites_guest"
}

function readFavorites(key) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? new Set(JSON.parse(saved)) : new Set()
  } catch {
    return new Set()
  }
}

export function FavoritesProvider({ children }) {
  const { user } = useAuth()
  const email = user?.email
  const key = storageKey(email)
  const [favorites, setFavorites] = useState(() => readFavorites(key))

  const [prevKey, setPrevKey] = useState(key)
  if (prevKey !== key) {
    setPrevKey(key)
    setFavorites(readFavorites(key))
  }

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify([...favorites]))
    } catch {
      // storage unavailable (quota/private mode) — favorites stay in memory
    }
  }, [favorites, key])

  const toggleFav = useCallback((id) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }, [])

  const isFav = useCallback((id) => favorites.has(id), [favorites])

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFav, isFav, count: favorites.size }}>
      {children}
    </FavoritesContext.Provider>
  )
}
