/** @format */

import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function CategoryForm({
  typeOperation,
  name,
  onChangeHandler,
  typeOperationId,
  createCategory,
  clearForm,
}) {
  return (
    <Container>
      <Form>
        <Form.Group as={Row} controlId="formHorizontalConcepto">
          <Form.Label column sm={2}>
            Nombre
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name="name"
              value={name}
              type="text"
              placeholder="Nombre"
              onChange={onChangeHandler}
              required
            />
          </Col>
        </Form.Group>

        <fieldset>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2}>
              Tipo
            </Form.Label>
            <Col sm={10}>
              {Object.keys(typeOperation).map((operation, idx) => {
                return (
                  <Form.Check
                    key={idx}
                    type="radio"
                    label={typeOperation[operation]}
                    id="formHorizontalRadios2"
                    name="typeOperationId"
                    value={operation}
                    onChange={onChangeHandler}
                    checked={typeOperationId === parseFloat(operation)}
                    required
                  />
                )
              })}
            </Col>
          </Form.Group>
        </fieldset>
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" size="lg" block onClick={createCategory}>
              Crear
            </Button>
            <Button variant="danger" block size="lg" onClick={clearForm}>
              Limpiar
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default CategoryForm
