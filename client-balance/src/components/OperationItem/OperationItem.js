/** @format */

import React from 'react'

import { useBalanceContext } from '../../context/BalanceContextProvider'

function OperationItem({ operationItem }) {
  const { typeOperation } = useBalanceContext()
  return (
    <div>
      <p>
        {' '}
        monto {operationItem.monto} categoria {operationItem.concepto} Tipo{' '}
        {typeOperation[operationItem.typeOperationId]}
      </p>
    </div>
  )
}

export default OperationItem
