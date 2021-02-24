/** @format */

import React, { useEffect, useState } from 'react'
import { useBalanceContext } from '../../context/BalanceContextProvider'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import CategoryForm from '../../components/CategoryForm/CategoryForm'

function CategoryContainer() {
  const {
    fetchCategory,
    fetchTypeOperations,
    fetchBalance,
    typeOperation,
    loading,
    error,
    createCategory,
    success,
  } = useBalanceContext()
  const [newCategory, setNewCategory] = useState({
    name: '',
    typeOperationId: '',
  })
  const postCategory = async (e) => {
    e.preventDefault()
    await createCategory(newCategory)
    setNewCategory({ name: '', typeOperationId: '' })
  }
  const clearForm = () => {
    setNewCategory({ name: '', typeOperationId: '' })
  }
  const onChangeHandler = (e) => {
    const { target } = e
    let { name, value } = target

    if (name === 'typeOperationId') {
      value = parseFloat(value)
    }
    setNewCategory({ ...newCategory, [name]: value })
  }
  useEffect(() => {
    async function fetch() {
      await fetchCategory(typeOperation)
    }
    fetch()
  }, [typeOperation, fetchCategory])
  useEffect(() => {
    async function fetch() {
      await fetchTypeOperations()
    }
    fetch()
  }, [fetchTypeOperations])
  useEffect(() => {
    async function fetch() {
      await fetchBalance(typeOperation)
    }
    fetch()
  }, [typeOperation, fetchBalance])

  return (
    <div>
      {/* {success && history.push('/')} */}
      {typeOperation && !loading ? (
        <CategoryForm
          typeOperation={typeOperation}
          name={newCategory.name}
          typeOperationId={newCategory.typeOperationId}
          onChangeHandler={onChangeHandler}
          createCategory={postCategory}
          clearForm={clearForm}
        ></CategoryForm>
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
      {success && (
        <Container style={{ textAlign: 'center' }}>
          <Alert variant="success">Caterogia Creada</Alert>
        </Container>
      )}
    </div>
  )
}

export default CategoryContainer
