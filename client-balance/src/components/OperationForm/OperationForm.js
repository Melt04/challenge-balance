/** @format */

import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { useBalanceContext } from '../../context/BalanceContextProvider'

function OperationForm() {
  const { typeOperation } = useBalanceContext()

  return (
    <Container>
      <Form>
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Concepto
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Concepto" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Monto
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="number" step="0.01" placeholder="Password" />
          </Col>
        </Form.Group>
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
                    value={operation}
                    onChage={() => console.log(2)}
                  />
                )
              })}
            </Col>
          </Form.Group>
        </fieldset>

        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Fecha
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="date" placeholder="Concepto" />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Sign in</Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default OperationForm
