/** @format */

import React, { useContext, createContext, useState, useCallback } from 'react'

const URL_BALANCES = 'http://localhost:3002/api/balance/'
const URL_TYPE_OPERATIONS = 'http://localhost:3002/api/typeOperations/'
const URL_CATEGORY = 'http://localhost:3002/api/category'

const BalanceContext = createContext({})
export const useBalanceContext = () => useContext(BalanceContext)
function BalanceContextProvider({ children }) {
  const [balance, setBalance] = useState(0)
  const [category, setCategory] = useState([])
  const [operations, setOperations] = useState([])
  const [typeOperation, setTypeOperation] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSucces] = useState(null)

  const handleDelete = async (id) => {
    setError(false)
    setSucces(false)
    const token = localStorage.getItem('token-balance')
    const response = await fetch(`${URL_BALANCES}${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    await response.json()
    setOperations(operations.filter((op) => op.id !== id))
  }
  const handleEdit = async (editOperation, id) => {
    setError(false)
    setSucces(false)
    const token = localStorage.getItem('token-balance')
    try {
      const response = await fetch(`${URL_BALANCES}${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          balance: {
            ...editOperation,
          },
        }),
      })
      const data = await response.json()
      if (response.status !== 200) {
        throw new Error(data.message)
      }
      setSucces(true)
      setRefresh(!refresh)
    } catch (e) {
      setError(e.message)
      setRefresh(!refresh)
    }
  }
  const handlePost = async (newOperation) => {
    setError(false)
    setSucces(false)
    const token = localStorage.getItem('token-balance')

    try {
      const response = await fetch(URL_BALANCES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          balance: {
            ...newOperation,
          },
        }),
      })

      const data = await response.json()
      if (response.status !== 200) {
        throw new Error(data.error)
      }
      setSucces(true)
      setRefresh(!refresh)
    } catch (e) {
      setError(e.message)
    }
  }
  const fetchBalance = useCallback(async (typeOperation) => {
    if (!typeOperation) return
    setLoading(true)
    setSucces(null)
    const token = localStorage.getItem('token-balance')
    const response = await fetch(`${URL_BALANCES}balances`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
    if (response.status !== 200) {
      return
    }
    const balanceJson = await response.json()
    let getBalance = 0
    let getOperations = []
    balanceJson.forEach((operation, index) => {
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
  }, [])
  const fetchCategory = useCallback(async (typeOperation) => {
    if (!typeOperation) return
    setLoading(true)
    setSucces(null)

    const token = localStorage.getItem('token-balance')
    const response = await fetch(URL_CATEGORY, {
      headers: { authorization: `Bearer ${token}` },
    })
    if (response.status !== 200) return
    const data = await response.json()
    let categories = data.map(({ id, name, typeOperationId }) => {
      return {
        id,
        name,
        typeOperationId,
      }
    })
    setCategory(categories)
  }, [])
  const fetchTypeOperations = useCallback(async () => {
    let response = await fetch(URL_TYPE_OPERATIONS)
    const typeOperationJson = await response.json()
    let getTypeOperation = {}
    typeOperationJson.forEach(({ id, name }) => {
      getTypeOperation = { ...getTypeOperation, ...{ [id]: name } }
    })
    setTypeOperation(getTypeOperation)
  }, [])

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
        fetchTypeOperations,
        fetchBalance,
        fetchCategory,
        category,
        success,
      }}
    >
      {children}
    </BalanceContext.Provider>
  )
}

export default BalanceContextProvider
