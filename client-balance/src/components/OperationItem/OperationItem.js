/** @format */

import React from 'react'

import { useBalanceContext } from '../../context/BalanceContextProvider'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './OperationItem.css'
function OperationItem({ operationItem, index }) {
  const { typeOperation } = useBalanceContext()
  const operation = typeOperation[operationItem.typeOperationId]

  return (
    <Row>
      <Col>{index}</Col>
      <Col className={operation === 'egreso' ? 'set-egreso' : 'set-ingreso'}>
        {operationItem.monto}
      </Col>
      <Col>{operationItem.concepto}</Col>
      <Col>{operation}</Col>
    </Row>
  )
}

export default OperationItem
