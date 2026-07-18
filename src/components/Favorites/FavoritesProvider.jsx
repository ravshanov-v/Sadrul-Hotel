import { useState, useEffect, useCallback } from "react"
import { FavoritesContext } from "./FavoritesContext.jsx"
import { useAuth } from "../Auth/useAuth.js"

function storageKey(email) {
  return email ? `favorites_${email}` : "favorites_guest"
}

export function FavoritesProvider({ children }) {
  const { user } = useAuth()
  const email = user?.email
  const key = storageKey(email)
  const [favorites, setFavorites] = useState(new Set())

  useEffect(() => {
    try {
      const saved = localStorage.getItem(key)
      setFavorites(saved ? new Set(JSON.parse(saved)) : new Set())
    } catch {
      setFavorites(new Set())
    }
  }, [key])

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify([...favorites]))
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
