import { useState, useCallback } from "react"
import { AuthContext } from "./AuthContext.jsx"

function readSavedUser() {
  try {
    const user = JSON.parse(localStorage.getItem("authUser"))
    return user && typeof user === "object" ? user : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSavedUser)
  const [loaded] = useState(true)

  const login = useCallback((userData) => {
    setUser(userData)
    try {
      localStorage.setItem("authUser", JSON.stringify(userData))
    } catch {
      // storage unavailable (quota/private mode) — session stays in memory only
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    try {
      localStorage.removeItem("authUser")
    } catch {
      // storage unavailable
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, loaded, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}
