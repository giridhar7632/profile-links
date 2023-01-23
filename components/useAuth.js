import React, { createContext, useContext, useEffect, useState } from 'react'

export const useAuth = () => useContext(AuthContext)

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    localStorage.setItem('token', isAuth)
    const token = localStorage.getItem('token')
    token && setIsAuth(token)
  }, [isAuth])

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
