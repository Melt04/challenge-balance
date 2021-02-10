/** @format */

import React, { useContext, createContext, useState } from 'react'

const BalanceContext = createContext({})
export const useBalanceContext = () => useContext(BalanceContext)
function BalanceContextProvider({ children }) {
  const [balance, setBalance] = useState(0)
  const [operations, setOperations] = useState([])
  const [typeOperation, setTypeOperation] = useState(null)

  return (
    <BalanceContext.Provider
      value={{
        setBalance,
        balance,
        setOperations,
        operations,
        typeOperation,
        setTypeOperation,
      }}
    >
      {children}
    </BalanceContext.Provider>
  )
}

export default BalanceContextProvider
