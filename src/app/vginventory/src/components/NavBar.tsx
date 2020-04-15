import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

export const NavBar = () => {
    return (
     <div className='App tc f3'>
        <Navbar bg='dark' variant='dark' expand='lg'>
            <LinkContainer to="/">
              <Navbar.Brand>VGinventory</Navbar.Brand>
            </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='mr-auto'>
            <LinkContainer to="/members">
                <Nav.Link>Members</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/users">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/videogames">
                <Nav.Link>Video Games</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
}