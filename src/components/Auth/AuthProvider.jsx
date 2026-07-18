import { useState, useEffect, useCallback } from "react"
import { AuthContext } from "./AuthContext.jsx"

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("authUser")
      if (saved) {
        setUser(JSON.parse(saved))
      }
    } catch {}
    setLoaded(true)
  }, [])

  const login = useCallback((userData) => {
    setUser(userData)
    localStorage.setItem("authUser", JSON.stringify(userData))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("authUser")
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, loaded, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}
