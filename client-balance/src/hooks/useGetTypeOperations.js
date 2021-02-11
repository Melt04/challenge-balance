/** @format */

import { useEffect, useState } from 'react'

const useGetTypeOperations = (url) => {
  const [typeOperation, settypeOperation] = useState(null)
  useEffect(async () => {
    let response = await fetch(url)
    const typeOperationJson = await response.json()
    let getTypeOperation = {}
    typeOperationJson.forEach(({ id, name }) => {
      getTypeOperation = { ...getTypeOperation, ...{ [id]: name } }
    })
    settypeOperation(getTypeOperation)
  }, [])
  return { typeOperation }
}

export { useGetTypeOperations }
