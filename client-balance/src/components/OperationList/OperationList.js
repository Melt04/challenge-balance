/** @format */

import React from 'react'

import OperationItem from '../OperationItem/OperationItem'

function OperationList({ operations }) {
  return (
    <div>
      {operations.map((opItem) => (
        <OperationItem operationItem={opItem}></OperationItem>
      ))}
    </div>
  )
}

export default OperationList
