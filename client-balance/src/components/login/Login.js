/** @format */

import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useUserContext } from '../../context/UserContextProvider'
import './login.css'
import Alert from 'react-bootstrap/Alert'
const initValue = {
  email: '',
  password: '',
}
function Login() {
  const {
    loading,
    error,

    requestUser,
  } = useUserContext()
  const [userInput, setUserInput] = useState({ email: '', password: '' })
  const [userInputRegister, setUserInputRegister] = useState({ name: '' })
  const [state, setState] = useState('register')
  const onChangeHandler = (event) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value })
  }
  const onChangeRegisterHandler = (event) => {
    setUserInputRegister({
      ...userInputRegister,
      [event.target.name]: event.target.value,
    })
  }
  const changeMode = (event) => {
    setState(event.target.name)
  }
  return (
    <Container className="user-form">
      <div className="user-form-button-container ">
        <ButtonGroup className="user-form-option">
          <Button variant="info" name="login" onClick={changeMode}>
            Loggin
          </Button>
          <Button variant="info" active name="register" onClick={changeMode}>
            Register
          </Button>
        </ButtonGroup>
      </div>
      <hr></hr>
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
          <Form.Group>
            {state === 'register' && (
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={userInputRegister.name}
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={onChangeRegisterHandler}
                />
              </Form.Group>
            )}
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={userInput.email}
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={onChangeHandler}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={userInput.password}
              type="password"
              placeholder="Password"
              name="password"
              onChange={onChangeHandler}
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={() =>
              state === 'register'
                ? requestUser('http://localhost:3002/api/users', {
                    ...userInput,
                    ...userInputRegister,
                  })
                : requestUser(
                    'http://localhost:3002/api/users/signin',
                    userInput
                  )
            }
          >
            {state.toUpperCase()}
          </Button>
          {error && <Alert variant={'danger'}>Wrong credentials</Alert>}
        </Form>
      )}
    </Container>
  )
}

export default Login
