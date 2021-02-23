/** @format */

import React from 'react'
import { useBalanceContext } from '../../context/BalanceContextProvider'
import { useUserContext } from '../../context/UserContextProvider'

import OperationList from '../../components/OperationList/OperationList'
import Spinner from 'react-bootstrap/Spinner'
import './BalanceContainer.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
function BalanceContainer() {
  const { typeOperation, operations, balance, loading } = useBalanceContext()
  const { user } = useUserContext()

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
      {loading ? (
        <Spinner
          animation="border"
          variant="secondary"
          role="status"
          style={{ fontSize: '40px' }}
        >
          <span className="sr-only">Loading...</span>{' '}
        </Spinner>
      ) : (
        <>
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
            {operations.length > 0 && typeOperation ? (
              <OperationList
                typeOperation={typeOperation}
                operations={operations}
                handleEdit={handleEditOperation}
              />
            ) : null}
          </Row>
        </>
      )}
    </Container>
  )
}

export default BalanceContainer
