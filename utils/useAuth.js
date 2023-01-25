import React, { createContext, useContext, useEffect, useState } from 'react'

export const useAuth = () => useContext(AuthContext)

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuth(token)
    } else {
      localStorage.setItem('token', isAuth)
    }
  }, [isAuth])

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
