/** @format */

import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'

function OperationForm({
  newOperation,
  typeOperation,
  onChangeHandler,
  submitHandler,
  clearHandler,
  edit,
}) {
  const { concepto, monto, typeOperationId, fecha } = newOperation
  console.log(fecha)
  return (
    <Container>
      {typeOperation && (
        <Form>
          <Form.Group as={Row} controlId="formHorizontalConcepto">
            <Form.Label column sm={2}>
              Concepto
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="concepto"
                type="text"
                value={concepto}
                placeholder="Concepto"
                onChange={onChangeHandler}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalMonto">
            <Form.Label column sm={2}>
              Monto
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                value={monto}
                name="monto"
                step="0.01"
                placeholder="0.0"
                onChange={onChangeHandler}
                required
              />
            </Col>
          </Form.Group>
          {!edit && (
            <fieldset>
              <Form.Group as={Row}>
                <Form.Label as="legend" column sm={2}>
                  Tipo
                </Form.Label>
                <Col sm={10}>
                  {Object.keys(typeOperation).map((operation) => {
                    return (
                      <Form.Check
                        type="radio"
                        label={typeOperation[operation]}
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        name="typeOperationId"
                        value={operation}
                        checked={typeOperationId === parseFloat(operation)}
                        onChange={onChangeHandler}
                        required
                      />
                    )
                  })}
                </Col>
              </Form.Group>
            </fieldset>
          )}

          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Fecha
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="fecha"
                onChange={onChangeHandler}
                type="date"
                value={fecha}
                placeholder="Concepto"
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              {!edit ? (
                <>
                  <Button
                    type="submit"
                    size="lg"
                    block
                    active={!(fecha && monto && concepto && typeOperation)}
                    onClick={submitHandler}
                  >
                    Crear
                  </Button>
                  <Button
                    variant="danger"
                    block
                    size="lg"
                    onClick={clearHandler}
                  >
                    Limpiar
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="submit"
                    size="lg"
                    block
                    active={!(fecha && monto && concepto && typeOperation)}
                    onClick={submitHandler}
                  >
                    Guardar
                  </Button>
                  <Link to="/?modifier=edit">
                    <Button variant="danger" block size="lg">
                      cancelar
                    </Button>
                  </Link>
                </>
              )}
            </Col>
          </Form.Group>
        </Form>
      )}
    </Container>
  )
}

export default OperationForm
