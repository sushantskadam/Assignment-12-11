import React from "react";
import {Nav,Navbar,Container,NavDropdown} from 'react-bootstrap'
import{NavLink} from 'react-router-dom'

function Navb() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container fluid={true}>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
           <Nav.Link> <NavLink to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}  >Home</NavLink></Nav.Link>
           <Nav.Link> <NavLink to="/cource" style={{ color: 'inherit', textDecoration: 'inherit'}} >Cource</NavLink></Nav.Link>
           <Nav.Link> <NavLink to="/users" style={{ color: 'inherit', textDecoration: 'inherit'}} >User</NavLink></Nav.Link>

              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navb;
