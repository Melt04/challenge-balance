/** @format */

import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import OperationForm from '../../components/OperationForm/OperationForm'

import { useGetTypeOperations } from '../../hooks'

function OperationContainer() {
  const { typeOperation } = useGetTypeOperations(
    `http://localhost:3002/api/typeOperations/`
  )
  const initValue = { concepto: '', monto: '', typeOperationId: '', fecha: '' }
  const [newOperation, setNewOperation] = useState(initValue)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const onChangeHandler = (e) => {
    const { target } = e
    let { name, value } = target
    if (name === 'monto' || name === 'typeOperationId') {
      value = parseFloat(value)
    }
    setNewOperation({ ...newOperation, [name]: value })
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3002/api/balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          balance: {
            ...newOperation,
          },
        }),
      })

      const data = await response.json()
      if (response.status !== 200) {
        throw new Error(data.message)
      }
      console.log(data)
      setLoading(false)
      alert('Alta realizada')
      setNewOperation(initValue)
    } catch (e) {
      setLoading(false)
      setError(true)
      setNewOperation(initValue)
      alert(`Error realizando el alta: ${e} `)
    }
  }

  return (
    <div>
      {typeOperation && !loading ? (
        <OperationForm
          typeOperation={typeOperation}
          submitHandler={submitHandler}
          onChangeHandler={onChangeHandler}
          newOperation={newOperation}
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
    </div>
  )
}

export default OperationContainer
