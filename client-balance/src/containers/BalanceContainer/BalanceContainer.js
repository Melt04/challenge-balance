/** @format */

import React, { useEffect, useState } from 'react'
import { useBalanceContext } from '../../context/BalanceContextProvider'
import Row from 'react-bootstrap/Row'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import OperationList from '../../components/OperationList/OperationList'
import Spinner from 'react-bootstrap/Spinner'
import './BalanceContainer.css'
import Container from 'react-bootstrap/Container'

import Col from 'react-bootstrap/Col'
function BalanceContainer() {
  const {
    typeOperation,
    operations,
    balance,
    loading,
    fetchTypeOperations,
    fetchBalance,
    fetchCategory,
    category,
  } = useBalanceContext()
  const [filter, setFilter] = useState(null)
  const handleEditOperation = async (id, Operation) => {
    await fetch(`http://localhost:3002/api/balance/${id}`, {
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
  useEffect(() => {
    async function fetch() {
      await fetchTypeOperations()
    }
    fetch()
  }, [fetchTypeOperations])
  useEffect(() => {
    async function fetch() {
      await fetchBalance(typeOperation, filter)
    }
    fetch()
  }, [typeOperation, fetchBalance, filter])
  useEffect(() => {
    async function fetch() {
      await fetchCategory(typeOperation)
    }
    fetch()
  }, [typeOperation, fetchCategory])

  return (
    <Container
      fluid="md"
      style={{
        textAlign: 'center',
      }}
    >
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
          <Form className="balance-form-filter">
            <h3>Filtro</h3>
            <Form.Group style={{}}>
              <Form.Label sm={2}>Categoria</Form.Label>

              <Form.Control
                as="select"
                custom
                name="categoryId"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="" selected>
                  Por favor seleccione una opcion..
                </option>
                {category.map((cat, ixd) => {
                  return (
                    <option key={ixd} value={cat.id}>
                      {cat.name}
                    </option>
                  )
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group style={{}}>
              <Button size="lg" block onClick={() => setFilter(null)}>
                Limpiar Filtro
              </Button>
            </Form.Group>
          </Form>

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
