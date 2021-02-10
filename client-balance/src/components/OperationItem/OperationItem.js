/** @format */

import React, { useState } from 'react'

import { useBalanceContext } from '../../context/BalanceContextProvider'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './OperationItem.css'
import useQuery from '../../hooks'
function OperationItem({ operationItem, index }) {
  const { typeOperation } = useBalanceContext()
  const operation = typeOperation[operationItem.typeOperationId]
  const [edit, setEdit] = useState(false)
  const modifier = useQuery().get('modifier')
  return (
    <Row>
      {edit ? <input value={index} /> : <Col>{index}</Col>}
      <Col className={operation === 'egreso' ? 'set-egreso' : 'set-ingreso'}>
        {operationItem.monto}
      </Col>
      <Col>{operationItem.concepto}</Col>
      <Col>{operation}</Col>

      {modifier === 'edit' && (
        <Col>
          <button onClick={() => setEdit(!edit)}>Edit</button>
        </Col>
      )}
      {modifier === 'delete' && (
        <Col>
          <button onClick={() => setEdit(!edit)}>Delete</button>
        </Col>
      )}
    </Row>
  )
}

export default OperationItem
