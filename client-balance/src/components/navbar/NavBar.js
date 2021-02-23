/** @format */
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { useUserContext } from '../../context/UserContextProvider'
import React from 'react'

import { LinkContainer } from 'react-router-bootstrap'

function NavBar() {
  const { isLoggedIn, logOut } = useUserContext()
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>Presupuesto</Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/form">
            <Nav.Link>Alta</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/?modifier=edit">
            <Nav.Link>Modificacion</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/?modifier=delete">
            <Nav.Link>Baja</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav>
          <LinkContainer to="/">
            <Nav.Link>HOME</Nav.Link>
          </LinkContainer>
          {isLoggedIn && (
            <LinkContainer to="/">
              <Nav.Link onClick={logOut}>LOGOUT</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
