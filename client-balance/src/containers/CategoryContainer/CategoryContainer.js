/** @format */

import React, { useEffect } from 'react'
import { useBalanceContext } from '../../context/BalanceContextProvider'

function CategoryContainer() {
  const {
    fetchCategory,
    fetchTypeOperations,
    fetchBalance,
    typeOperation,
  } = useBalanceContext()
  useEffect(() => {
    async function fetch() {
      await fetchCategory(typeOperation)
    }
    fetch()
  }, [typeOperation, fetchCategory])
  useEffect(() => {
    async function fetch() {
      await fetchTypeOperations()
    }
    fetch()
  }, [fetchTypeOperations])
  useEffect(() => {
    async function fetch() {
      await fetchBalance(typeOperation)
    }
    fetch()
  }, [typeOperation, fetchBalance])

  return (
    <div>
      <h1>Hi</h1>
    </div>
  )
}

export default CategoryContainer
