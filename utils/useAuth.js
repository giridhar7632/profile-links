import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'

export const useAuth = () => useContext(AuthContext)

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('')
  const [isAuth, setIsAuth] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const getUser = async (tkn) => {
      const { data: res } = await axios.get('/api/user/verify', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tkn}`,
        },
      })
      setUser(res.user)
    }
    if (token) {
      setIsAuth(token)
      getUser(token)
    } else {
      localStorage.setItem('token', isAuth)
    }
  }, [isAuth])

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
