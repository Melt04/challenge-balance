/** @format */

import React, { useEffect } from 'react'
import { useBalanceContext } from '../../context/BalanceContextProvider'

import { useParams } from 'react-router-dom'
import OperationList from '../../components/OperationList/OperationList'

import './BalanceContainer.css'
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
  const handleEditOperation = async (id, Operation) => {
    await fetch('http://localhost:3002/api/balance/10', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        balance: {
          monto: 999,
        },
      }),
    })
  }
  return (
    <Container fluid="md" style={{ textAlign: 'center' }}>
      <Row>
        <Col md={6}>
          <h1>Balance</h1>
        </Col>
        <Col
          style={{ fontSize: '40px' }}
          className={balance > 0 ? 'balance-positive' : 'balance-negative'}
        >
          {balance}
        </Col>
      </Row>

      <Row className="row-balance">
        <h1 className="column-balance-container">Ultimas Operaciones</h1>
      </Row>
      <Row style={{ width: '100%' }}>
        {operations.length > 0 && (
          <OperationList
            operations={operations}
            handleEdit={handleEditOperation}
          />
        )}
      </Row>
    </Container>
  )
}

export default BalanceContainer
