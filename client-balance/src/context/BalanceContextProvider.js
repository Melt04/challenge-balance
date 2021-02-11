/** @format */

import React, { useContext, createContext, useState } from 'react'

const BalanceContext = createContext({})
export const useBalanceContext = () => useContext(BalanceContext)
function BalanceContextProvider({ children }) {
  const [balance, setBalance] = useState(0)
  const [operations, setOperations] = useState([])

  return (
    <BalanceContext.Provider
      value={{
        setBalance,
        balance,
        setOperations,
        operations,
      }}
    >
      {children}
    </BalanceContext.Provider>
  )
}

export default BalanceContextProvider
