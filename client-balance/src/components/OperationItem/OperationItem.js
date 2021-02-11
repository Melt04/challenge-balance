/** @format */

import React, { useState } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useBalanceContext } from '../../context/BalanceContextProvider'
import './OperationItem.css'
import { useQuery } from '../../hooks'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function OperationItem({ operationItem, index, typeOperation }) {
  const operation = typeOperation[operationItem.typeOperationId]
  const { handleDelete } = useBalanceContext()
  const modifier = useQuery().get('modifier')
  return (
    <Row className="row-operation-item">
      <Col>{index}</Col>
      <Col className={operation === 'egreso' ? 'set-egreso' : 'set-ingreso'}>
        {operationItem.monto}
      </Col>
      <Col>{operationItem.concepto}</Col>
      <Col>{operation}</Col>
      <Col>{operationItem.fecha}</Col>

      {modifier === 'edit' && (
        <Col>
          <Link to={`/edit/${operationItem.id}`}>
            <Button block variant="warning">
              Edit
            </Button>
          </Link>
        </Col>
      )}
      {modifier === 'delete' && (
        <Col>
          <Button
            block
            variant="danger"
            onClick={() => handleDelete(operationItem.id)}
          >
            Delete
          </Button>
        </Col>
      )}
    </Row>
  )
}

export default OperationItem
