import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('synapse_token'))

  function login(newToken) {
    localStorage.setItem('synapse_token', newToken)
    setToken(newToken)
  }

  function logout() {
    localStorage.removeItem('synapse_token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
