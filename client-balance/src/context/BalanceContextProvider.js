/** @format */

import React, { useContext, useEffect, createContext, useState } from 'react'

const BalanceContext = createContext({})
export const useBalanceContext = () => useContext(BalanceContext)
function BalanceContextProvider({ children }) {
  const [balance, setBalance] = useState(0)
  const [operations, setOperations] = useState([])
  const [typeOperation, setTypeOperation] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3002/api/balance/${id}`, {
      method: 'DELETE',
    })
    const data = await response.json()
    setRefresh(!refresh)
  }
  const handleEdit = async (editOperation, id) => {
    try {
      console.log(editOperation)
      const response = await fetch(`http://localhost:3002/api/balance/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          balance: {
            ...editOperation,
          },
        }),
      })
      const data = await response.json()
      setRefresh(!refresh)
      if (response.status !== 200) {
        throw new Error(data.message)
      }
    } catch (e) {
      setError(e.message)
      setRefresh(!refresh)
    }
  }
  const handlePost = async (newOperation) => {
    try {
      const response = await fetch('http://localhost:3002/api/balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          balance: {
            ...newOperation,
          },
        }),
      })
      const data = await response.json()
      setRefresh(!refresh)
      if (response.status !== 200) {
        throw new Error(data.message)
      }
    } catch (e) {
      setError(e.message)
      setRefresh(!refresh)
    }
  }

  const fetchTypeOperations = async () => {
    let response = await fetch(`
    http://localhost:3002/api/typeOperations/
    `)
    const typeOperationJson = await response.json()
    let getTypeOperation = {}
    typeOperationJson.forEach(({ id, name }) => {
      getTypeOperation = { ...getTypeOperation, ...{ [id]: name } }
    })
    setTypeOperation(getTypeOperation)
  }
  const fetchBalance = async (typeOperation) => {
    if (!typeOperation) return
    setLoading(true)
    const response = await fetch('http://localhost:3002/api/balance')
    const balanceJson = await response.json()
    let getBalance = 0
    let getOperations = []
    balanceJson.map((operation, index) => {
      if (index < 10) {
        getOperations.push(operation)
      }
      if (typeOperation[operation.typeOperationId] == 'ingreso') {
        getBalance = getBalance + operation.monto
      } else {
        getBalance = getBalance - operation.monto
      }
    })
    setLoading(false)
    setBalance(getBalance)
    setOperations(getOperations)
  }
  useEffect(async () => {
    await fetchTypeOperations()
  }, [])
  useEffect(async () => {
    fetchBalance(typeOperation)
  }, [typeOperation, refresh])

  return (
    <BalanceContext.Provider
      value={{
        balance,
        operations,
        handleDelete,
        typeOperation,
        handlePost,
        loading,
        error,
        handleEdit,
      }}
    >
      {children}
    </BalanceContext.Provider>
  )
}

export default BalanceContextProvider
