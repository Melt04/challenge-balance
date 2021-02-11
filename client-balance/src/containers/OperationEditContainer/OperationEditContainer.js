/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import { useBalanceContext } from '../../context/BalanceContextProvider'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import OperationForm from '../../components/OperationForm/OperationForm'
import Container from 'react-bootstrap/Container'

function OperationEditContainer() {
  const {
    operations,
    typeOperation,
    handleEdit,
    loading,
    error,
    success,
  } = useBalanceContext()
  const { id } = useParams()
  const [editOperation, setEditOperation] = useState(null)
  let history = useHistory()
  useEffect(() => {
    if (operations.length === 0) return
    const editOperation = operations.find((op) => op.id == id)
    editOperation['fecha'] = new Date(editOperation['fecha'])
      .toISOString()
      .slice(0, 10)
    const { monto, fecha, concepto } = editOperation
    setEditOperation({ monto, fecha, concepto })
  }, [operations])
  const onChangeHandler = (e) => {
    const { target } = e
    let { name, value } = target
    if (name === 'monto' || name === 'typeOperationId') {
      value = parseFloat(value)
    }
    setEditOperation({ ...editOperation, [name]: value })
  }
  const submitHandler = (e) => {
    e.preventDefault()
    handleEdit(editOperation, id)
  }

  return (
    <Container>
      {success && history.push('/')}
      {loading ? (
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
      ) : (
        editOperation && (
          <OperationForm
            typeOperation={typeOperation}
            newOperation={editOperation}
            onChangeHandler={onChangeHandler}
            edit={true}
            submitHandler={submitHandler}
          />
        )
      )}
      {error && (
        <Container style={{ textAlign: 'center' }}>
          <Alert variant="danger">{error}</Alert>
        </Container>
      )}
      {success && (
        <Container style={{ textAlign: 'center' }}>
          <Alert variant="success">
            <Link to="/">
              <Alert.Link>Exito</Alert.Link>
            </Link>
          </Alert>
        </Container>
      )}
    </Container>
  )
}
export default OperationEditContainer
