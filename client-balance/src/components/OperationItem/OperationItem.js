/** @format */

import React, { useState } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './OperationItem.css'
import { useQuery } from '../../hooks'
import { Button } from 'react-bootstrap'
function OperationItem({ operationItem, index, typeOperation }) {
  const operation = typeOperation[operationItem.typeOperationId]
  const [edit, setEdit] = useState(false)
  const modifier = useQuery().get('modifier')
  return (
    <Row className="row-operation-item">
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
          <Button block onClick={() => setEdit(!edit)}>
            Delete
          </Button>
        </Col>
      )}
    </Row>
  )
}

export default OperationItem
