/** @format */

import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import OperationForm from '../../components/OperationForm/OperationForm'
import Alert from 'react-bootstrap/Alert'
import { useHistory } from 'react-router-dom'

import { useBalanceContext } from '../../context/BalanceContextProvider'
function OperationContainer({ initOperation }) {
  const {
    typeOperation,
    handlePost,
    loading,
    error,
    fetchTypeOperations,
    fetchBalance,
    fetchCategory,
    success,
    category,
  } = useBalanceContext()
  let history = useHistory()
  const initValue = initOperation || {
    concepto: '',
    monto: '',
    typeOperationId: '',
    categoryId: '',
    fecha: new Date().toISOString().slice(0, 10),
  }
  const [newOperation, setNewOperation] = useState(initValue)

  const onChangeHandler = (e) => {
    const { target } = e
    let { name, value } = target
    console.log(name)
    if (
      name === 'monto' ||
      name === 'typeOperationId' ||
      name === 'categoryId'
    ) {
      value = parseFloat(value)
    }
    setNewOperation({ ...newOperation, [name]: value })
  }
  const submitHandler = async (e) => {
    e.preventDefault()

    await handlePost(newOperation)
  }
  const clearHandler = () => {
    setNewOperation(initValue)
  }
  useEffect(() => {
    async function fetch() {
      await fetchTypeOperations()
    }
    fetch()
  }, [fetchTypeOperations])
  useEffect(() => {
    async function fetch() {
      fetchBalance(typeOperation)
    }
    fetch()
  }, [typeOperation, fetchBalance])
  useEffect(() => {
    async function fetch() {
      await fetchCategory(typeOperation)
    }
    fetch()
  }, [typeOperation, fetchCategory])
  return (
    <div>
      {success && history.push('/')}
      {typeOperation && !loading ? (
        <OperationForm
          typeOperation={typeOperation}
          submitHandler={submitHandler}
          onChangeHandler={onChangeHandler}
          newOperation={newOperation}
          clearHandler={clearHandler}
          category={category}
        />
      ) : (
        <Container fluid style={{ textAlign: 'center' }}>
          <Spinner
            animation="border"
            variant="secondary"
            role="status"
            style={{ fontSize: '40px' }}
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      )}
      {error && (
        <Container style={{ textAlign: 'center' }}>
          <Alert variant="danger">{error}</Alert>
        </Container>
      )}
      <button onClick={() => console.log(newOperation)}>Click</button>
    </div>
  )
}

export default OperationContainer
