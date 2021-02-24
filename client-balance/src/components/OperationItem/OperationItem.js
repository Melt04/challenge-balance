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
  const { handleDelete, category } = useBalanceContext()
  const modifier = useQuery().get('modifier')
  const categoryData = category.find(
    (cat) => cat.id === operationItem.categoryId
  )

  return (
    <Row className="row-operation-item">
      <Col md>Numero : {index}</Col>
      <Col mdclassName={operation === 'egreso' ? 'set-egreso' : 'set-ingreso'}>
        Monto : {operationItem.monto}
      </Col>
      <Col md>Concepto : {operationItem.concepto}</Col>
      <Col md>Tipo : {operation}</Col>
      <Col md>Fecha : {operationItem.fecha.slice(0, 10)}</Col>
      <Col md>Categoria : {categoryData?.name}</Col>

      {modifier === 'edit' && (
        <Col md>
          <Link to={`/edit/${operationItem.id}`}>
            <Button block variant="warning">
              Edit
            </Button>
          </Link>
        </Col>
      )}
      {modifier === 'delete' && (
        <Col md>
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
