/** @format */

import React, { useEffect } from 'react'
import { useBalanceContext } from '../../context/BalanceContextProvider'

import OperationList from '../../components/OperationList/OperationList'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
function BalanceContainer() {
  const {
    setOperations,
    operations,
    balance,
    setBalance,
    setTypeOperation,
  } = useBalanceContext()

  useEffect(async () => {
    let response = await fetch('http://localhost:3002/api/typeOperations/')
    const typeOperationJson = await response.json()
    let getTypeOperation = {}
    typeOperationJson.forEach(({ id, name }) => {
      getTypeOperation = { ...getTypeOperation, ...{ [id]: name } }
    })
    response = await fetch('http://localhost:3002/api/balance')
    const balanceJson = await response.json()
    let getBalance = 0
    let getOperations = []
    balanceJson.map((operation, index) => {
      if (index < 10) {
        getOperations.push(operation)
      }
      if (getTypeOperation[operation.typeOperationId] == 'ingreso') {
        getBalance = getBalance + operation.monto
      } else {
        getBalance = getBalance - operation.monto
      }
    })
    setTypeOperation(getTypeOperation)
    setBalance(getBalance)
    setOperations(getOperations)
  }, [])

  return (
    <Container fluid="md" style={{ background: 'red', textAlign: 'center' }}>
      <Row>
        <Col md={6} style={{ background: 'white' }}>
          <h1>Balance</h1>
        </Col>
        <Col style={{ background: 'blue', fontSize: '40px' }}>{balance}</Col>
      </Row>
      {/*  <Row>
        <Col>{balance}</Col>
      </Row> */}
      <Row>
        <h1>Operaciones</h1>
      </Row>
      <Row>
        {operations.length > 0 && <OperationList operations={operations} />}
      </Row>
    </Container>
  )
}

export default BalanceContainer