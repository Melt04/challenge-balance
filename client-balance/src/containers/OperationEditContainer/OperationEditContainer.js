/** @format */

import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { useBalanceContext } from '../../context/BalanceContextProvider'

import OperationForm from '../../components/OperationForm/OperationForm'
import { Container } from 'react-bootstrap'

function OperationEditContainer() {
  const { operations, typeOperation, handleEdit } = useBalanceContext()
  const { id } = useParams()
  const [editOperation, setEditOperation] = useState(null)
  useEffect(() => {
    if (operations.length === 0) return
    console.log(operations)
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
      {editOperation && (
        <OperationForm
          typeOperation={typeOperation}
          newOperation={editOperation}
          onChangeHandler={onChangeHandler}
          edit={true}
          submitHandler={submitHandler}
        />
      )}
    </Container>
  )
}
export default OperationEditContainer
