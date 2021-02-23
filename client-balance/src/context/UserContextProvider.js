/** @format */

import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext({})

export const useUserContext = () => useContext(UserContext)

function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    name: '',
    email: '',
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem('token-balance')
    if (token) {
      localStorage.setItem('token-balance', token)
      setIsLoggedIn(true)
    }
  }, [])
  const logOut = () => {
    localStorage.removeItem('token-balance')
    setUser({ name: '', email: '' })
    setIsLoggedIn(false)
  }
  const requestUser = async (url, userInput) => {
    setLoading(true)
    setError(false)
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ user: { ...userInput } }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    setLoading(false)
    if (!data.error) {
      localStorage.setItem('token-balance', data.token)
      setIsLoggedIn(true)
    } else {
      setError(true)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,

        setIsLoggedIn,
        isLoggedIn,
        loading,
        error,
        requestUser,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
export default UserContextProvider
