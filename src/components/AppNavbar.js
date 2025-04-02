import { Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import React from 'react'

export default function AppNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary px-3 shadow sticky-top">
      <Container fluid>
        <Navbar.Brand href="#home" className='fw-bold'>UA GMETRIX DISSAPP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Register</Nav.Link>
            <Nav.Link>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
