/** @format */

import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import { useUserContext } from '../../context/UserContextProvider'
import Alert from 'react-bootstrap/Alert'

function Login() {
  const { loginUser, loading, error } = useUserContext()
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  })
  const onChangeHandler = (event) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value })
  }
  return (
    <Container>
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
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={userInput.email}
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={onChangeHandler}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={userInput.password}
              type="password"
              placeholder="Password"
              name="password"
              onChange={onChangeHandler}
            />
          </Form.Group>

          <Button variant="primary" onClick={() => loginUser(userInput)}>
            Login
          </Button>
          {error && <Alert variant={'danger'}>Wrong credentials</Alert>}
        </Form>
      )}
    </Container>
  )
}

export default Login
