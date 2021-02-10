/** @format */

import React from 'react'

import OperationItem from '../OperationItem/OperationItem'
import Container from 'react-bootstrap/Container'
import useQuery from '../../hooks'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
function OperationList({ operations }) {
  const modifier = useQuery().get('modifier')
  return (
    <Container>
      <Row>
        <Col>Numero</Col>
        <Col>Monto</Col>
        <Col>Concepto</Col>
        <Col>Tipo de Operacion</Col>
        {modifier === 'delete' && <Col>Delete</Col>}
        {modifier === 'edit' && <Col>Edit</Col>}
      </Row>

      {operations.map((opItem, index) => (
        <OperationItem index={index} operationItem={opItem}></OperationItem>
      ))}
    </Container>
  )
}

export default OperationList
