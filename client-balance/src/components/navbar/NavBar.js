/** @format */
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import React from 'react'

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Presupuesto</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features">Alta</Nav.Link>
          <Nav.Link href="#pricing">Modificacion</Nav.Link>
          <Nav.Link href="#pricing">Baja</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#deets">HOME</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
